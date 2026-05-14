#!/usr/bin/env node
/**
 * Static OG / Twitter Card meta check
 * -----------------------------------
 * Catches mismatches between og:image / twitter:image and broken image paths
 * BEFORE deploy. Designed to run in CI (no browser, no dev server required).
 *
 * Checks:
 *   1. SEO.tsx still emits og:image AND twitter:image from the SAME `imageUrl`
 *      variable (so they cannot drift). Also requires og:title/twitter:title,
 *      og:description/twitter:description, and twitter:card=summary_large_image.
 *   2. Every static `image="..."` prop passed to <SEO> in src/pages/**.tsx
 *      points to a real file under public/ (or a full https URL whose path
 *      maps to public/).
 *   3. Every `og-*.jpg` referenced by CityPage.tsx exists in public/.
 *
 * Usage:
 *   node scripts/check-og-meta.mjs
 *   npm run check:og
 *
 * Exits non-zero on any failure so CI fails the build.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(process.cwd());
const PUBLIC_DIR = join(ROOT, 'public');
const PAGES_DIR = join(ROOT, 'src/pages');
const SEO_FILE = join(ROOT, 'src/components/SEO.tsx');
const SITE_URL = 'https://masterclean1885.com';

const errors = [];
const warnings = [];
const ok = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
function pass(msg) { ok.push(msg); }

// ---------- 1. SEO.tsx invariants ----------
function checkSeoComponent() {
  if (!existsSync(SEO_FILE)) {
    err(`SEO component not found at ${relative(ROOT, SEO_FILE)}`);
    return;
  }
  const src = readFileSync(SEO_FILE, 'utf8');

  const required = [
    { name: 'og:title',          re: /property=["']og:title["']\s+content=\{fullTitle\}/ },
    { name: 'og:description',    re: /property=["']og:description["']\s+content=\{description\}/ },
    { name: 'og:image',          re: /property=["']og:image["']\s+content=\{imageUrl\}/ },
    { name: 'og:url',            re: /property=["']og:url["']\s+content=\{canonicalUrl\}/ },
    { name: 'twitter:card',      re: /name=["']twitter:card["']\s+content=["']summary_large_image["']/ },
    { name: 'twitter:title',     re: /name=["']twitter:title["']\s+content=\{fullTitle\}/ },
    { name: 'twitter:description', re: /name=["']twitter:description["']\s+content=\{description\}/ },
    { name: 'twitter:image',     re: /name=["']twitter:image["']\s+content=\{imageUrl\}/ },
  ];

  for (const { name, re } of required) {
    if (re.test(src)) pass(`SEO.tsx emits ${name}`);
    else err(`SEO.tsx missing or malformed tag: ${name}`);
  }

  // Critical: og:image and twitter:image MUST share the same source variable.
  const ogImageMatch  = src.match(/property=["']og:image["']\s+content=\{([^}]+)\}/);
  const twImageMatch  = src.match(/name=["']twitter:image["']\s+content=\{([^}]+)\}/);
  if (ogImageMatch && twImageMatch) {
    if (ogImageMatch[1].trim() !== twImageMatch[1].trim()) {
      err(`og:image (${ogImageMatch[1]}) and twitter:image (${twImageMatch[1]}) use DIFFERENT variables — they can drift apart.`);
    } else {
      pass(`og:image and twitter:image bound to same variable: ${ogImageMatch[1].trim()}`);
    }
  }
}

// ---------- 2. Per-page static `image=` props ----------
function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|jsx?)$/.test(entry)) yield full;
  }
}

function resolvePublicPath(urlOrPath) {
  let p = urlOrPath;
  if (p.startsWith(SITE_URL)) p = p.slice(SITE_URL.length);
  if (!p.startsWith('/')) return null; // dynamic / non-public
  return join(PUBLIC_DIR, p);
}

function checkPageImages() {
  // Match <SEO ... image="..." ...>  (static string only)
  const re = /\bimage=(["'])([^"']+)\1/g;
  for (const file of walk(PAGES_DIR)) {
    const src = readFileSync(file, 'utf8');
    let m;
    while ((m = re.exec(src)) !== null) {
      const value = m[2];
      const rel = relative(ROOT, file);
      // Only validate strings that look like absolute URLs to our site or root paths.
      if (!value.startsWith('http') && !value.startsWith('/')) continue;

      // Domain sanity
      if (value.startsWith('http') && !value.startsWith(SITE_URL)) {
        err(`${rel}: image="${value}" — wrong domain (expected ${SITE_URL}).`);
        continue;
      }

      const fsPath = resolvePublicPath(value);
      if (!fsPath) continue;
      if (!existsSync(fsPath)) {
        err(`${rel}: image="${value}" — file missing at public${value.replace(SITE_URL, '')}`);
      } else {
        pass(`${rel}: image="${value}" exists`);
      }
    }
  }
}

// ---------- 3. CityPage dynamic OG slugs ----------
function checkCityPageOg() {
  const file = join(ROOT, 'src/pages/CityPage.tsx');
  if (!existsSync(file)) return;
  const src = readFileSync(file, 'utf8');
  // Find ogCities Set: new Set([...])
  const m = src.match(/ogCities\s*=\s*new Set\(\s*\[([^\]]+)\]/);
  if (!m) {
    warn('CityPage.tsx: could not locate ogCities set — skip.');
    return;
  }
  const slugs = [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
  // Pattern in code: og-${slug}.jpg
  for (const slug of slugs) {
    const fsPath = join(PUBLIC_DIR, `og-${slug}.jpg`);
    if (existsSync(fsPath)) pass(`CityPage og-${slug}.jpg exists`);
    else err(`CityPage references og-${slug}.jpg but file is missing in public/`);
  }
  // Default fallback
  if (!existsSync(join(PUBLIC_DIR, 'og-image.jpg'))) {
    err('Default fallback public/og-image.jpg is missing');
  }
}

// ---------- run ----------
checkSeoComponent();
checkPageImages();
checkCityPageOg();

console.log(`\n✅ Passed: ${ok.length}`);
if (warnings.length) {
  console.log(`\n⚠️  Warnings: ${warnings.length}`);
  for (const w of warnings) console.log(`   - ${w}`);
}
if (errors.length) {
  console.log(`\n❌ Failed: ${errors.length}`);
  for (const e of errors) console.log(`   - ${e}`);
  console.log('\nOG/Twitter meta check FAILED.\n');
  process.exit(1);
}
console.log('\nOG/Twitter meta check passed.\n');
