// Single source of truth for language ↔ URL path conversion.
// PL is the default language and lives at the root (/, /about, /blog/14).
// RU/EN/UK are served under /ru/, /en/, /uk/ prefixes — that gives Google
// distinct URLs per language so each version can be indexed independently
// (instead of being collapsed as duplicates of the same canonical).

import type { Language } from './translations';

export const SUPPORTED_LANGS: Language[] = ['pl', 'ru', 'en', 'uk'];
export const PREFIXED_LANGS: Exclude<Language, 'pl'>[] = ['ru', 'en', 'uk'];
export const DEFAULT_LANG: Language = 'pl';

const PREFIX_RE = /^\/(ru|en|uk)(\/|$)/;

/** Extract the language declared by the URL prefix. */
export const langFromPath = (pathname: string): Language => {
  const m = pathname.match(PREFIX_RE);
  return (m ? m[1] : DEFAULT_LANG) as Language;
};

/** Strip the language prefix → return the canonical "logical" path. */
export const stripLangPrefix = (pathname: string): string => {
  const stripped = pathname.replace(PREFIX_RE, '/');
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

/** Build a URL path for a given language and logical path. */
export const buildLangPath = (lang: Language, logicalPath: string): string => {
  const clean = stripLangPrefix(logicalPath || '/');
  if (lang === DEFAULT_LANG) return clean === '' ? '/' : clean;
  // Avoid double slashes
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
};

/**
 * Convert any incoming path/href (absolute path, relative, or full URL) into
 * the localized version for the active language. External URLs and anchors
 * are returned untouched.
 */
export const localizeHref = (href: string, lang: Language): string => {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|#|\?)/i.test(href)) return href;
  if (!href.startsWith('/')) return href; // relative/in-page navigation
  // Preserve query/hash
  const [pathOnly, ...rest] = href.split(/(?=[?#])/);
  return buildLangPath(lang, pathOnly) + rest.join('');
};
