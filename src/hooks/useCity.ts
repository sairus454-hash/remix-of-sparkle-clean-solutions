import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCityBySlug, CityData } from '@/data/cities';

const CITY_STORAGE_KEY = 'masterclean_selected_city';

/** Wrocław-group cities that get base prices and promos */
const WROCLAW_GROUP = ['wroclaw', 'smolec', 'bielany-wroclawskie'];

export interface CityInfo {
  city: CityData | null;
  slug: string | null;
  isWroclaw: boolean;
  /** Price multiplier: 1 for Wrocław group, 1.1 for others */
  multiplier: number;
  /** Whether the "Акция недели" promo applies */
  hasPromo: boolean;
  /** Round price up to nearest 5 */
  applyPrice: (price: number) => number;
}

export function useCity(): CityInfo {
  const location = useLocation();

  return useMemo(() => {
    // 1. Check URL for /city/:slug
    const cityMatch = location.pathname.match(/^\/city\/([^/]+)/);
    const urlSlug = cityMatch ? cityMatch[1] : null;

    // 2. Fallback to localStorage
    let slug: string | null = urlSlug;
    if (!slug) {
      try { slug = localStorage.getItem(CITY_STORAGE_KEY); } catch { slug = null; }
    }

    const city = slug ? getCityBySlug(slug) || null : null;
    const isWroclaw = !city || WROCLAW_GROUP.includes(city.slug);
    const multiplier = isWroclaw ? 1 : 1.1;
    const hasPromo = isWroclaw;

    const applyPrice = (price: number): number => {
      if (price === 0 || isWroclaw) return price;
      return Math.ceil((price * 1.1) / 5) * 5;
    };

    return { city, slug: city?.slug || null, isWroclaw, multiplier, hasPromo, applyPrice };
  }, [location.pathname]);
}
