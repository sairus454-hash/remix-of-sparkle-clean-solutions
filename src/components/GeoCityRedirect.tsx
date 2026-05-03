import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cities } from '@/data/cities';

const STORAGE_KEY = 'masterclean_selected_city';
const GEO_DONE_KEY = 'masterclean_geo_redirect_done';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * On the very first visit (only on the root path "/" of any language),
 * detects the user's city via IP geolocation and, if it matches one of
 * our supported cities, redirects to /city/:slug (preserving language prefix).
 * Runs at most once per browser (sessionStorage flag) and never hijacks
 * deep links — so SEO/landing pages keep working.
 */
const GeoCityRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only on language-root paths: /, /ru, /en, /uk
    const path = location.pathname.replace(/\/$/, '') || '/';
    const isLangRoot = path === '/' || path === '/ru' || path === '/en' || path === '/uk';
    if (!isLangRoot) return;

    // Skip bots / prerender requests
    if (/bot|crawl|spider|prerender/i.test(navigator.userAgent)) return;

    try {
      if (sessionStorage.getItem(GEO_DONE_KEY)) return;
      // If user already manually picked a city, don't override
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return;
        const data = await res.json();

        try { sessionStorage.setItem(GEO_DONE_KEY, '1'); } catch {}

        // Only act for visitors from Poland
        if (data?.country_code && data.country_code !== 'PL') return;

        const cityName: string | undefined = data?.city;
        if (!cityName) return;
        const target = normalize(cityName);

        const match = cities.find(
          (c) => c.slug === target || normalize(c.name) === target,
        );
        if (!match) return;

        // Persist so subsequent visits / pricing logic respect it
        try { localStorage.setItem(STORAGE_KEY, match.slug); } catch {}

        // Preserve current language prefix
        const langPrefix = path === '/' ? '' : path; // '/ru' | '/en' | '/uk'
        navigate(`${langPrefix}/city/${match.slug}`, { replace: true });
      } catch {
        try { sessionStorage.setItem(GEO_DONE_KEY, '1'); } catch {}
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [location.pathname, navigate]);

  return null;
};

export default GeoCityRedirect;
