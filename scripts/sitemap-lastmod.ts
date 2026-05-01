import type { Plugin } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin: rewrites every <lastmod>YYYY-MM-DD</lastmod> in public/sitemap.xml
 * to today's date on each production build. This keeps Google's "Last modified"
 * signal fresh so changes are re-crawled faster.
 *
 * Activates only when `command === 'build'` to avoid touching the file in dev.
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
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const original = readFileSync(sitemapPath, 'utf8');
      const updated = original.replace(
        /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
        `<lastmod>${today}</lastmod>`,
      );
      if (updated !== original) {
        writeFileSync(sitemapPath, updated, 'utf8');
        const count = (original.match(/<lastmod>/g) || []).length;
        // eslint-disable-next-line no-console
        console.log(`[sitemap-lastmod] Updated ${count} <lastmod> entries → ${today}`);
      }
    },
  };
}
