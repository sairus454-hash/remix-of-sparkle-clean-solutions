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
    if (!search) return;
    const params = new URLSearchParams(search);
    const lang = params.get('lang');
    if (!lang) return;
    if (!['ru', 'en', 'uk', 'pl'].includes(lang)) return;

    params.delete('lang');
    const cleanSearch = params.toString();

    // Strip any existing prefix from current path
    const stripped = pathname.replace(/^\/(ru|en|uk)(?=\/|$)/, '') || '/';
    const next = lang === 'pl'
      ? stripped
      : `/${lang}${stripped === '/' ? '' : stripped}`;
    const target = next + (cleanSearch ? `?${cleanSearch}` : '') + hash;

    if (target !== pathname + search + hash) {
      navigate(target, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  return null;
};

export default LegacyLangRedirect;
