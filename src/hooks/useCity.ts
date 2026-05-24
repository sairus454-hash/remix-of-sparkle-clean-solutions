import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCityBySlug, CityData } from '@/data/cities';

const CITY_STORAGE_KEY = 'masterclean_selected_city';

/** Wrocław-group cities that get base prices and promos */
const WROCLAW_GROUP = ['wroclaw', 'smolec', 'bielany-wroclawskie'];

/**
 * Cities where furniture cleaning ("furniture", "mattress", "leather") use
 * the same base Wrocław prices (no +10% city markup). Other categories
 * (windows, ozone, etc.) keep the regional markup.
 */
export const FURNITURE_MATTRESS_BASE_CITIES = [
  'swidnica',
  'legnica',
  'sobotka',
  'lubin',
  'olesnica',
  'olawa',
  'sroda-slaska',
  'tyniec-maly',
];

export interface CityInfo {
  city: CityData | null;
  slug: string | null;
  isWroclaw: boolean;
  /** Price multiplier: 1 for Wrocław group, 1.1 for others */
  multiplier: number;
  /** Whether the "Акция недели" promo applies */
  hasPromo: boolean;
  /** True if furniture/mattress prices should be base Wrocław in this city */
  furnitureMattressBase: boolean;
  /** Round price up to nearest 5 */
  applyPrice: (price: number) => number;
}

export function useCity(): CityInfo {
  const location = useLocation();

  return useMemo(() => {
    // 1. Check URL for /city/:slug
    const cityMatch = location.pathname.match(/^\/city\/([^/]+)/);
    const urlSlug = cityMatch ? cityMatch[1] : null;

    // 2. Fallback to localStorage, then default to Wrocław
    let slug: string | null = urlSlug;
    if (!slug) {
      try { slug = localStorage.getItem(CITY_STORAGE_KEY); } catch { slug = null; }
    }
    if (!slug) slug = 'wroclaw';

    const city = slug ? getCityBySlug(slug) || null : null;
    const isWroclaw = !city || WROCLAW_GROUP.includes(city.slug);
    const multiplier = isWroclaw ? 1 : 1.1;
    const hasPromo = isWroclaw;
    const furnitureMattressBase = !!city && FURNITURE_MATTRESS_BASE_CITIES.includes(city.slug);

    const applyPrice = (price: number): number => {
      if (price === 0 || isWroclaw) return price;
      const marked = Math.round(price * 1.1 * 100) / 100; // avoid float imprecision
      return Math.ceil(marked / 5) * 5;
    };

    return { city, slug: city?.slug || null, isWroclaw, multiplier, hasPromo, furnitureMattressBase, applyPrice };
  }, [location.pathname]);
}
