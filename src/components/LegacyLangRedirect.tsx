import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 301-style client redirect for legacy `?lang=ru|en|uk` URLs that Google
 * already indexed. We move them to the new prefix-based URL so old links
 * keep working and link equity transfers to the canonical localized URL.
 *
 * Examples:
 *   /?lang=ru          → /ru
 *   /blog/14?lang=uk   → /uk/blog/14
 *   /?lang=pl          → /        (PL lives at the root)
 */
const LegacyLangRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1) Legacy ?lang= query → prefixed URL
    if (search) {
      const params = new URLSearchParams(search);
      const lang = params.get('lang');
      if (lang && ['ru', 'en', 'uk', 'pl'].includes(lang)) {
        params.delete('lang');
        const cleanSearch = params.toString();
        const stripped = pathname.replace(/^\/(ru|en|uk)(?=\/|$)/, '') || '/';
        const next = lang === 'pl'
          ? stripped
          : `/${lang}${stripped === '/' ? '' : stripped}`;
        const target = next + (cleanSearch ? `?${cleanSearch}` : '') + hash;
        if (target !== pathname + search + hash) {
          navigate(target, { replace: true });
          return;
        }
      }
    }

    // 2) Preserve previously chosen language across navigation:
    //    if URL has NO lang prefix but the user previously picked ru/en/uk,
    //    redirect to the prefixed URL so language stays sticky.
    const hasPrefix = /^\/(ru|en|uk)(\/|$)/.test(pathname);
    if (!hasPrefix) {
      let stored: string | null = null;
      try { stored = localStorage.getItem('language'); } catch {}
      if (stored && ['ru', 'en', 'uk'].includes(stored)) {
        const next = `/${stored}${pathname === '/' ? '' : pathname}`;
        navigate(next + search + hash, { replace: true });
      }
    }
  }, [pathname, search, hash, navigate]);

  return null;
};

export default LegacyLangRedirect;
