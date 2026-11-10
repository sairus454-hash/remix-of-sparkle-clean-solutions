import { describe, expect, it } from 'vitest';
import { getPageSnapshot, renderCrawlerNav } from '../../supabase/functions/seo-prerender/crawlerNav';
import { cities } from '../../supabase/functions/seo-prerender/city/cities';

const LANGS = ['pl', 'ru', 'en', 'uk'] as const;
const SERVICE_PAGES = ['/services', '/prices', '/ozone', '/pranie-materacy', '/cleaning', '/floor-cleaning', '/windows', '/city/olawa', '/blog/10'];
const words = (html: string) => new Set(html.replace(/<[^>]+>/g, ' ').toLowerCase().split(/\s+/).filter(w => w.length > 3));
const escape = (v: string) => v;

describe('Crawler page content', () => {
  it('gives each service page its own content instead of a homepage copy, in every language', () => {
    for (const lang of LANGS) {
      const home = words(getPageSnapshot('/', lang) ?? '');
      for (const path of SERVICE_PAGES) {
        const html = getPageSnapshot(path, lang);
        expect(html, `${lang} ${path}`).toBeTruthy();
        expect(html!.match(/<h1>/g)?.length, `${lang} ${path} h1`).toBe(1);
        const own = words(html!);
        const shared = [...own].filter(w => home.has(w)).length;
        expect(shared / own.size, `${lang} ${path} overlap with homepage`).toBeLessThan(0.6);
      }
    }
  });

  it('links every crawler page to all city pages and the main services', () => {
    for (const lang of LANGS) {
      const nav = renderCrawlerNav(lang, '/', escape);
      const prefix = lang === 'pl' ? '' : `/${lang}`;
      for (const city of cities) expect(nav).toContain(`https://masterclean1885.com${prefix}/city/${city.slug}"`);
      for (const path of ['/services', '/pranie-materacy', '/auto', '/ozone', '/prices']) {
        expect(nav).toContain(`https://masterclean1885.com${prefix}${path}"`);
      }
    }
  });
});
