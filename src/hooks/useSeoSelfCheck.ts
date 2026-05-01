import { useEffect } from 'react';

/**
 * Dev-only SEO self-check. Reads all <link rel="canonical"> and
 * <link rel="alternate" hreflang="..."> tags from <head> and prints
 * a console table. Detects:
 *   - Multiple canonical tags
 *   - Canonical with different href values (real conflict)
 *   - Duplicate hreflang codes pointing to different URLs
 *   - Query params in canonical/hreflang (project rule violation)
 *
 * Runs in `import.meta.env.DEV` or when URL contains `?seo-debug=1`.
 * Adds a 250 ms delay so react-helmet-async finishes flushing tags.
 */
export function useSeoSelfCheck(pageLabel: string) {
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const isDebug =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('seo-debug');
    if (!isDev && !isDebug) return;

    const timer = window.setTimeout(() => {
      const canonicals = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
      );
      const alternates = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]'),
      );

      const canonicalRows = canonicals.map((el, i) => ({
        '#': i + 1,
        href: el.href,
        hasQueryParam: el.href.includes('?'),
      }));

      const hreflangRows = alternates.map((el, i) => ({
        '#': i + 1,
        hreflang: el.getAttribute('hreflang'),
        href: el.href,
        hasQueryParam: el.href.includes('?'),
      }));

      const conflicts: string[] = [];

      // 1. Multiple canonical with different href = HARD conflict
      const uniqueCanonicalHrefs = new Set(canonicals.map((c) => c.href));
      if (canonicals.length > 1 && uniqueCanonicalHrefs.size > 1) {
        conflicts.push(
          `❌ CANONICAL CONFLICT: ${canonicals.length} canonical tags with ${uniqueCanonicalHrefs.size} different URLs.`,
        );
      } else if (canonicals.length > 1) {
        conflicts.push(
          `⚠️  ${canonicals.length} duplicate canonical tags (same URL, harmless but noisy).`,
        );
      } else if (canonicals.length === 0) {
        conflicts.push('❌ No canonical tag found.');
      }

      // 2. Duplicate hreflang code with different URLs
      const byHreflang = new Map<string, Set<string>>();
      for (const a of alternates) {
        const code = a.getAttribute('hreflang') || '';
        if (!byHreflang.has(code)) byHreflang.set(code, new Set());
        byHreflang.get(code)!.add(a.href);
      }
      for (const [code, hrefs] of byHreflang) {
        if (hrefs.size > 1) {
          conflicts.push(
            `❌ HREFLANG CONFLICT for "${code}": ${hrefs.size} different URLs.`,
          );
        }
      }

      // 3. Query params in canonical/hreflang (project rule)
      const dirty = [...canonicals, ...alternates].filter((el) => el.href.includes('?'));
      if (dirty.length > 0) {
        conflicts.push(
          `❌ ${dirty.length} canonical/hreflang URL(s) contain "?" — project rule requires clean URLs.`,
        );
      }

      // Output
      const groupLabel = `🔎 SEO self-check — ${pageLabel}`;
      // eslint-disable-next-line no-console
      console.groupCollapsed(groupLabel);
      // eslint-disable-next-line no-console
      console.log('Canonical tags:');
      // eslint-disable-next-line no-console
      console.table(canonicalRows);
      // eslint-disable-next-line no-console
      console.log('Hreflang alternates:');
      // eslint-disable-next-line no-console
      console.table(hreflangRows);
      if (conflicts.length === 0) {
        // eslint-disable-next-line no-console
        console.log('%c✅ No conflicts detected.', 'color:#16a34a;font-weight:bold');
      } else {
        for (const msg of conflicts) {
          // eslint-disable-next-line no-console
          console.warn(msg);
        }
      }
      // eslint-disable-next-line no-console
      console.groupEnd();
    }, 250);

    return () => window.clearTimeout(timer);
  }, [pageLabel]);
}
