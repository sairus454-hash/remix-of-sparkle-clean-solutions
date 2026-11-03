import { describe, expect, it } from 'vitest';
import { getCityPage } from '../../supabase/functions/seo-prerender/city/citySeo';
import { cities } from '@/data/cities';

describe('City page resolution', () => {
  it('resolves Oława rather than the Wrocław homepage for every language', () => {
    for (const lang of ['pl', 'ru', 'en', 'uk'] as const) {
      const page = getCityPage('olawa', lang);
      expect(page?.city.name).toBe('Oława');
      expect(page?.city.slug).toBe('olawa');
      expect(page?.city.region).toBe('dolnośląskie');
    }
  });
  it('keeps all existing cities available without resolving unknown cities to the homepage', () => {
    for (const city of cities) {
      for (const lang of ['pl', 'ru', 'en', 'uk'] as const) {
        expect(getCityPage(city.slug, lang)?.city.slug).toBe(city.slug);
      }
    }
    expect(getCityPage('unknown-city', 'pl')).toBeUndefined();
  });
});