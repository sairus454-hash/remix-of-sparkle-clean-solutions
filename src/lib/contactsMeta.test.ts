import { describe, it, expect } from 'vitest';
import { CONTACTS_META } from '../../supabase/functions/seo-prerender/contactsMeta';
import { getSeoMeta } from './pageSeo';

const LANGS = ['pl', 'ru', 'en', 'uk'] as const;

describe('contact page search snippet', () => {
  it.each(LANGS)('%s title stays under 60 characters and names Wrocław', (lang) => {
    const { title } = CONTACTS_META[lang];
    expect(title.length).toBeLessThan(60);
    expect(title).toMatch(/Wrocław|Вроцлав/);
  });

  it.each(LANGS)('%s description is 120-160 characters with phone and address', (lang) => {
    const { description } = CONTACTS_META[lang];
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).toContain('+48 575 211 401');
    expect(description).toContain('ul. Jedności Narodowej 160');
  });

  it.each(LANGS)('%s visitor page uses the same snippet as the crawler', (lang) => {
    const meta = getSeoMeta('contacts', lang);
    expect(meta.title).toBe(CONTACTS_META[lang].title);
    expect(meta.description).toBe(CONTACTS_META[lang].description);
  });
});
