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
      const SITE = 'https://masterclean1885.com';

      // 0) Auto-discover blog articles from src/data/blogArticles.ts so new
      //    posts always appear in the sitemap. Hreflang alternates for
      //    /ru, /en, /uk are added by step (3) below.
      const articlesPath = resolve(process.cwd(), 'src/data/blogArticles.ts');
      if (existsSync(articlesPath)) {
        const src = readFileSync(articlesPath, 'utf8');
        const articles = new Map<number, string>();
        const entryRe = /id:\s*(\d+)[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g;
        let m: RegExpExecArray | null;
        while ((m = entryRe.exec(src)) !== null) {
          const id = Number(m[1]);
          const date = m[2];
          const prev = articles.get(id);
          if (!prev || date > prev) articles.set(id, date);
        }

        const existingIds = new Set<number>();
        const blogUrlRe = /<loc>https:\/\/masterclean1885\.com\/blog\/(\d+)<\/loc>/g;
        let mm: RegExpExecArray | null;
        while ((mm = blogUrlRe.exec(xml)) !== null) existingIds.add(Number(mm[1]));

        // Blog IDs deliberately de-indexed (return 404). Keep in sync with
        // BLOCKED_BLOG_IDS in src/pages/Blog.tsx and src/pages/BlogArticle.tsx.
        const BLOCKED_BLOG_IDS = new Set<number>([15, 16, 17, 19, 20, 21]);
        const missing = [...articles.entries()]
          .filter(([id]) => !existingIds.has(id) && !BLOCKED_BLOG_IDS.has(id))
          .sort((a, b) => a[0] - b[0]);

        if (missing.length > 0) {
          const newEntries = missing
            .map(
              ([id, date]) =>
                `  <url><loc>${SITE}/blog/${id}</loc><lastmod>${date}</lastmod><priority>0.6</priority><changefreq>monthly</changefreq></url>`,
            )
            .join('\n');
          xml = xml.replace('</urlset>', `${newEntries}\n</urlset>`);
          // eslint-disable-next-line no-console
          console.log(
            `[sitemap-lastmod] Auto-added ${missing.length} blog URL(s): ${missing.map(([id]) => id).join(', ')}`,
          );
        }
      }

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
          if (inner.includes('xhtml:link')) return match;
          const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
          if (!locMatch) return match;
          const loc = locMatch[1];
          if (!loc.startsWith(SITE)) return match;
          const path = loc.slice(SITE.length) || '/';
          if (/^\/(ru|en|uk)(\/|$)/.test(path)) return match;
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
