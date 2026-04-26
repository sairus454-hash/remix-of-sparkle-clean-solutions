#!/usr/bin/env node
/**
 * Mobile Cold-Load Verification
 * ------------------------------
 * Loads every public route in a mobile viewport from a *cold* state
 * (fresh browser context — no cache, no service worker, no storage)
 * and reports whether the page rendered successfully on the first try.
 *
 * Each route is also re-tested N times (default 2) with a brand new
 * incognito context every time to catch flaky / "doesn't start on the
 * first try" issues.
 *
 * Usage:
 *   BASE_URL=https://masterclean1885.com node scripts/mobile-cold-load-check.mjs
 *   BASE_URL=http://localhost:8080 RUNS=3 node scripts/mobile-cold-load-check.mjs
 */
import { chromium, devices } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const BASE_URL = process.env.BASE_URL || 'https://masterclean1885.com';
const RUNS = Number(process.env.RUNS || 2);
const NAV_TIMEOUT = Number(process.env.NAV_TIMEOUT || 30_000);
const RENDER_TIMEOUT = Number(process.env.RENDER_TIMEOUT || 12_000);

// All public routes (mirrors src/App.tsx + a few city pages)
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/prices',
  '/equipment',
  '/impregnation',
  '/auto',
  '/ozone',
  '/windows',
  '/cleaning',
  '/handyman',
  '/reviews',
  '/contacts',
  '/blog',
  '/privacy-policy',
  '/terms',
  '/cookies',
  '/sitemap',
  '/city/warszawa',
  '/city/krakow',
  '/city/poznan',
];

const device = devices['iPhone 13']; // 390x844, DPR 3, mobile UA

/**
 * Run a single cold-load attempt for one URL.
 * Returns timing + success info.
 */
async function coldLoad(browser, url, attempt) {
  // Fresh context = no cache, no storage, no SW from previous attempts
  const context = await browser.newContext({
    ...device,
    serviceWorkers: 'block', // force a true cold start (skip cached SW)
    bypassCSP: false,
  });
  const page = await context.newPage();

  const errors = [];
  const failedRequests = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text().slice(0, 200)}`);
  });
  page.on('requestfailed', (req) => {
    // Ignore harmless aborts
    const f = req.failure()?.errorText || '';
    if (f.includes('ERR_ABORTED')) return;
    failedRequests.push(`${req.method()} ${req.url()} — ${f}`);
  });

  const t0 = Date.now();
  let status = 'ok';
  let statusCode = 0;
  let firstPaintMs = null;
  let h1Visible = false;
  let rootHasContent = false;

  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
    statusCode = resp?.status() ?? 0;

    // Wait for the React app to actually mount: #root must have children
    // and either an <h1> or main landmark must appear.
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        if (!root || root.children.length === 0) return false;
        const txt = (root.textContent || '').trim();
        return txt.length > 50; // app has rendered real content
      },
      null,
      { timeout: RENDER_TIMEOUT },
    );

    rootHasContent = true;
    h1Visible = await page.locator('h1').first().isVisible().catch(() => false);

    // Capture FCP if available
    firstPaintMs = await page
      .evaluate(() => {
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        return fcp ? Math.round(fcp.startTime) : null;
      })
      .catch(() => null);
  } catch (e) {
    status = 'fail';
    errors.push(`navigation: ${e.message.split('\n')[0]}`);
  }

  const totalMs = Date.now() - t0;
  await context.close();

  return {
    url,
    attempt,
    status: status === 'ok' && rootHasContent ? 'ok' : 'fail',
    statusCode,
    totalMs,
    firstPaintMs,
    h1Visible,
    rootHasContent,
    errors: errors.slice(0, 5),
    failedRequests: failedRequests.slice(0, 3),
  };
}

(async () => {
  console.log(`\n🧪 Mobile cold-load check`);
  console.log(`   Base:   ${BASE_URL}`);
  console.log(`   Routes: ${ROUTES.length}`);
  console.log(`   Runs:   ${RUNS} (fresh context each time)`);
  console.log(`   Device: iPhone 13 (390×844, DPR 3)\n`);

  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const results = [];

  for (const path of ROUTES) {
    const url = BASE_URL.replace(/\/$/, '') + path;
    for (let i = 1; i <= RUNS; i++) {
      const r = await coldLoad(browser, url, i);
      results.push(r);
      const icon = r.status === 'ok' ? '✅' : '❌';
      const fcp = r.firstPaintMs != null ? `FCP ${r.firstPaintMs}ms` : 'FCP n/a';
      console.log(
        `${icon} [${i}/${RUNS}] ${path.padEnd(22)} ${String(r.statusCode).padEnd(4)} ${String(r.totalMs).padStart(5)}ms  ${fcp}` +
          (r.errors.length ? `  ⚠ ${r.errors[0]}` : ''),
      );
    }
  }

  await browser.close();

  // Aggregate
  const byRoute = new Map();
  for (const r of results) {
    if (!byRoute.has(r.url)) byRoute.set(r.url, []);
    byRoute.get(r.url).push(r);
  }

  const summary = [];
  let coldFailures = 0;
  let flaky = 0;
  for (const [url, runs] of byRoute) {
    const okCount = runs.filter((r) => r.status === 'ok').length;
    const firstOk = runs[0].status === 'ok';
    const allOk = okCount === runs.length;
    if (!firstOk) coldFailures++;
    if (firstOk && !allOk) flaky++;
    summary.push({
      url: url.replace(BASE_URL, '') || '/',
      firstAttempt: firstOk ? 'ok' : 'fail',
      okRate: `${okCount}/${runs.length}`,
      avgMs: Math.round(runs.reduce((a, r) => a + r.totalMs, 0) / runs.length),
      avgFcpMs: (() => {
        const v = runs.map((r) => r.firstPaintMs).filter((x) => x != null);
        return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
      })(),
    });
  }

  console.log('\n📊 Summary');
  console.table(summary);

  console.log('\n🎯 Verdict');
  console.log(`   Routes failing on first cold attempt: ${coldFailures}`);
  console.log(`   Routes flaky across reruns:           ${flaky}`);
  console.log(`   Routes always ok:                     ${byRoute.size - coldFailures - flaky}`);

  // Persist full report
  const outPath = resolve('/mnt/documents/mobile-cold-load-report.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(
    outPath,
    JSON.stringify({ baseUrl: BASE_URL, runs: RUNS, generatedAt: new Date().toISOString(), results, summary }, null, 2),
  );
  console.log(`\n📝 Full report → ${outPath}`);

  process.exit(coldFailures > 0 ? 1 : 0);
})();
