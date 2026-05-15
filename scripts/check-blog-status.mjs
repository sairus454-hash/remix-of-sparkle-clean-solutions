#!/usr/bin/env node
/**
 * Verifies HTTP status codes for every /blog/{id} URL across all locales.
 *
 * - Existing IDs (extracted from src/data/blogArticles.ts) MUST return 200.
 * - A few known-missing IDs MUST return 404.
 * - Tests both regular and Googlebot UA so the prerender path is also covered.
 *
 * Usage:
 *   node scripts/check-blog-status.mjs                 # checks production
 *   BASE_URL=https://staging.example.com node scripts/check-blog-status.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = (process.env.BASE_URL || 'https://masterclean1885.com').replace(/\/$/, '');
const LOCALES = ['', '/ru', '/en', '/uk']; // PL = no prefix
const MISSING_IDS = [9999, 10000]; // sanity-check 404 path
const UAS = {
  browser: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  bot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
};
const CONCURRENCY = 8;
const TIMEOUT_MS = 15_000;

function extractIds() {
  const file = readFileSync(resolve(__dirname, '../src/data/blogArticles.ts'), 'utf8');
  const ids = new Set();
  for (const m of file.matchAll(/\bid:\s*(\d+)\b/g)) ids.add(Number(m[1]));
  return [...ids].sort((a, b) => a - b);
}

async function fetchStatus(url, ua) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // HEAD first (cheaper); fall back to GET if server rejects HEAD
    let res = await fetch(url, {
      method: 'HEAD',
      headers: { 'user-agent': ua, accept: 'text/html' },
      redirect: 'manual',
      signal: ctrl.signal,
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: 'GET',
        headers: { 'user-agent': ua, accept: 'text/html' },
        redirect: 'manual',
        signal: ctrl.signal,
      });
    }
    return res.status;
  } catch (e) {
    return `ERR:${e.name}`;
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(tasks, limit) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  });
  await Promise.all(workers);
  return results;
}

function buildJobs(ids) {
  const jobs = [];
  for (const id of ids) {
    for (const prefix of LOCALES) {
      const url = `${BASE_URL}${prefix}/blog/${id}`;
      jobs.push({ url, expect: 200, kind: 'exists' });
    }
  }
  for (const id of MISSING_IDS) {
    for (const prefix of LOCALES) {
      const url = `${BASE_URL}${prefix}/blog/${id}`;
      jobs.push({ url, expect: 404, kind: 'missing' });
    }
  }
  return jobs;
}

async function main() {
  const ids = extractIds();
  if (ids.length === 0) {
    console.error('No blog IDs found in src/data/blogArticles.ts');
    process.exit(1);
  }
  const jobs = buildJobs(ids);
  console.log(`Checking ${jobs.length} URLs (${ids.length} ids × ${LOCALES.length} locales + ${MISSING_IDS.length * LOCALES.length} 404 probes) against ${BASE_URL}`);

  const tasks = jobs.flatMap((job) =>
    Object.entries(UAS).map(([uaName, ua]) => async () => {
      const status = await fetchStatus(job.url, ua);
      const ok = status === job.expect;
      return { ...job, uaName, status, ok };
    })
  );

  const results = await runPool(tasks, CONCURRENCY);
  const failures = results.filter((r) => !r.ok);

  for (const r of failures) {
    console.error(`✗ [${r.uaName}] ${r.url} expected ${r.expect}, got ${r.status}`);
  }

  const passed = results.length - failures.length;
  console.log(`\n${passed}/${results.length} checks passed.`);
  if (failures.length > 0) {
    console.error(`${failures.length} failure(s) detected.`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
