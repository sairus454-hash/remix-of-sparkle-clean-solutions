import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cities } from '@/data/cities';

const STORAGE_KEY = 'masterclean_selected_city';
const GEO_DONE_KEY = 'masterclean_geo_redirect_done';
const DEFAULT_CITY = 'wroclaw';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Safely mark geo step as completed so we don't retry next render. */
const markDone = () => {
  try { sessionStorage.setItem(GEO_DONE_KEY, '1'); } catch { /* noop */ }
};

/** Fallback: keep user on home page (no redirect) with Wrocław as default city. */
const fallbackToWroclawHome = () => {
  try {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, DEFAULT_CITY);
    }
  } catch { /* noop */ }
  markDone();
};

/**
 * On the very first visit (only on the language-root paths "/", "/ru", "/en", "/uk"),
 * detects the user's city via IP geolocation and, if it matches one of our supported
 * cities, redirects to /city/:slug (preserving language prefix).
 *
 * Error handling — in ALL of these cases we DO NOT redirect and silently default to
 * Wrocław as the active city (Polish home stays as-is):
 *   • IP API unreachable / blocked / timeout / network error
 *   • Non-200 response or invalid JSON
 *   • Visitor outside Poland
 *   • City field missing or doesn't match any supported city
 *   • localStorage / sessionStorage unavailable
 *   • Bot / prerender request
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

    // Storage availability + already-handled checks
    try {
      if (sessionStorage.getItem(GEO_DONE_KEY)) return;
      // If user already manually picked a city, don't override
      if (localStorage.getItem(STORAGE_KEY)) {
        markDone();
        return;
      }
    } catch {
      // Storage unavailable — don't redirect, no fallback to write either
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

        if (!res.ok) {
          // 4xx/5xx from geo API → fall back silently
          fallbackToWroclawHome();
          return;
        }

        let data: { country_code?: string; city?: string } | null = null;
        try {
          data = await res.json();
        } catch {
          fallbackToWroclawHome();
          return;
        }

        // Visitor outside Poland → no redirect, default to Wrocław
        if (data?.country_code && data.country_code !== 'PL') {
          fallbackToWroclawHome();
          return;
        }

        const cityName = data?.city;
        if (!cityName) {
          fallbackToWroclawHome();
          return;
        }

        const target = normalize(cityName);
        const match = cities.find(
          (c) => c.slug === target || normalize(c.name) === target,
        );

        if (!match) {
          // City not in our coverage list → stay on home, default to Wrocław
          fallbackToWroclawHome();
          return;
        }

        // Success: persist + redirect, preserving language prefix
        try { localStorage.setItem(STORAGE_KEY, match.slug); } catch { /* noop */ }
        markDone();

        const langPrefix = path === '/' ? '' : path; // '/ru' | '/en' | '/uk'
        navigate(`${langPrefix}/city/${match.slug}`, { replace: true });
      } catch {
        // Network error / timeout / abort → silent fallback
        fallbackToWroclawHome();
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
