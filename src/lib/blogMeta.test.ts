import { describe, expect, it } from 'vitest';
import { BLOG_META } from '../../supabase/functions/seo-prerender/blogMeta';
import { blogArticles } from '@/data/blogArticles';

describe('Crawler article identity', () => {
  it('resolves every published article to its own source record in all four languages', () => {
    for (const lang of ['pl', 'ru', 'en', 'uk'] as const) {
      for (const article of blogArticles[lang]) {
        const entry = BLOG_META[lang][String(article.id) as keyof typeof BLOG_META[typeof lang]];
        expect(entry).toEqual({
          title: article.seo?.title || `${article.title} | MasterClean Blog`,
          description: article.seo?.description || article.summary,
        });
      }
      expect(Object.keys(BLOG_META[lang])).toHaveLength(32);
    }
  });
});