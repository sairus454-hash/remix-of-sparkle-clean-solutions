import { forwardRef } from 'react';
import { Link, type LinkProps, useNavigate, type NavigateOptions, type To } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { localizeHref } from './localizedPath';

/**
 * Drop-in replacement for react-router's <Link> that auto-prefixes the URL
 * with the active language (/ru, /en, /uk). PL stays at the root.
 *
 * Usage: replace `import { Link } from 'react-router-dom'` with
 *        `import { Link } from '@/i18n/LocalizedLink'` — same API.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...rest }, ref) => {
    const { language } = useLanguage();
    const target =
      typeof to === 'string'
        ? localizeHref(to, language)
        : { ...to, pathname: to.pathname ? localizeHref(to.pathname, language) : to.pathname };
    return <Link ref={ref} to={target} {...rest} />;
  },
);
LocalizedLink.displayName = 'LocalizedLink';

/** useNavigate that auto-prefixes string targets with the active language. */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (to: To | number, opts?: NavigateOptions) => {
    if (typeof to === 'number') return navigate(to);
    if (typeof to === 'string') return navigate(localizeHref(to, language), opts);
    return navigate(
      { ...to, pathname: to.pathname ? localizeHref(to.pathname, language) : to.pathname },
      opts,
    );
  };
};
