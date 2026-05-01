import type { Plugin } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin (build-only) that maintains public/sitemap.xml:
 *
 *  1. Rewrites every <lastmod>…</lastmod> to today's date so Google sees the
 *     content as fresh and re-crawls quickly.
 *  2. Injects xhtml:link rel="alternate" hreflang="…" entries for every
 *     supported language (PL = root, RU = /ru, EN = /en, UK = /uk) so each
 *     localized URL is discoverable and properly clustered with the others.
 */
export function sitemapLastmodPlugin(): Plugin {
  return {
    name: 'masterclean-sitemap-lastmod',
    apply: 'build',
    buildStart() {
      const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');
      if (!existsSync(sitemapPath)) {
        this.warn(`[sitemap-lastmod] public/sitemap.xml not found, skipping`);
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      let xml = readFileSync(sitemapPath, 'utf8');
      const before = xml;

      // 1) Refresh lastmod for every URL
      xml = xml.replace(
        /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
        `<lastmod>${today}</lastmod>`,
      );

      // 2) Ensure xhtml namespace is declared on the root <urlset>
      if (!/xmlns:xhtml=/.test(xml)) {
        xml = xml.replace(
          /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"`,
        );
      }

      // 3) Inject hreflang alternates into every <url> that doesn't already have them.
      //    Skip URLs that already include a /ru, /en, /uk prefix (those should
      //    not appear in sitemap; the prefix is added per alternate here).
      const SITE = 'https://masterclean1885.com';
      const buildAlternates = (logicalPath: string): string => {
        const langs: Array<{ code: string; href: string }> = [
          { code: 'pl', href: `${SITE}${logicalPath}` },
          { code: 'ru', href: `${SITE}/ru${logicalPath === '/' ? '' : logicalPath}` },
          { code: 'en', href: `${SITE}/en${logicalPath === '/' ? '' : logicalPath}` },
          { code: 'uk', href: `${SITE}/uk${logicalPath === '/' ? '' : logicalPath}` },
        ];
        const lines = langs
          .map(
            (l) =>
              `<xhtml:link rel="alternate" hreflang="${l.code}" href="${l.href}"/>`,
          )
          .join('');
        return (
          lines +
          `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${logicalPath}"/>`
        );
      };

      let injected = 0;
      xml = xml.replace(
        /<url>(?<inner>[\s\S]*?)<\/url>/g,
        (match, _inner: string, _offset: number, _full: string, groups?: { inner: string }) => {
          const inner = groups?.inner ?? '';
          if (inner.includes('xhtml:link')) return match; // already has alternates
          const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
          if (!locMatch) return match;
          const loc = locMatch[1];
          // Only treat root-domain, non-prefixed URLs as logical pages.
          if (!loc.startsWith(SITE)) return match;
          const path = loc.slice(SITE.length) || '/';
          if (/^\/(ru|en|uk)(\/|$)/.test(path)) return match; // skip prefixed URLs
          injected += 1;
          return `<url>${inner}${buildAlternates(path)}</url>`;
        },
      );

      if (xml !== before) {
        writeFileSync(sitemapPath, xml, 'utf8');
        const count = (before.match(/<lastmod>/g) || []).length;
        // eslint-disable-next-line no-console
        console.log(
          `[sitemap-lastmod] Updated ${count} <lastmod> → ${today}, injected hreflang into ${injected} <url> entries`,
        );
      }
    },
  };
}
