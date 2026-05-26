import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultTranslations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED: Language[] = ['ru', 'en', 'pl', 'uk'];

const detectBrowserLanguage = (): Language => {
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'uk' || code === 'ua') return 'uk';
    if (SUPPORTED.includes(code as Language)) return code as Language;
  }
  return 'pl';
};

// Async loader: returns a chunk per language. PL is bundled in the main chunk
// (used as synchronous fallback), so importing it stays virtually free.
const loaders: Record<Language, () => Promise<{ default: TranslationKeys }>> = {
  pl: () => import('./locales/pl'),
  ru: () => import('./locales/ru'),
  en: () => import('./locales/en'),
  uk: () => import('./locales/uk'),
};

// In-memory cache so we don't reload the same chunk twice
const cache: Partial<Record<Language, TranslationKeys>> = {
  pl: defaultTranslations,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Source of truth for language is the URL prefix (/ru, /en, /uk → otherwise PL).
  // localStorage is only used to restore preference on the very first visit
  // and to redirect users from / → /ru/ if that's what they had last time.
  const readLangFromUrl = (): Language => {
    if (typeof window === 'undefined') return 'pl';
    const m = window.location.pathname.match(/^\/(ru|en|uk)(\/|$)/);
    return (m ? m[1] : 'pl') as Language;
  };

  const [language, setLanguageState] = useState<Language>(readLangFromUrl);

  // Holds the active translation bundle. Falls back to PL while another
  // language is being fetched so the UI never shows empty strings.
  const [t, setT] = useState<TranslationKeys>(() => cache[language] ?? defaultTranslations);

  // Keep <html lang> + cache in sync whenever language changes.
  useEffect(() => {
    // NOTE: do NOT write `language` here — URL-driven changes would overwrite
    // the user's explicit preference (e.g. after raw <Link> navigation to a
    // PL URL). The explicit preference is set inside setLanguage() below.
    document.documentElement.lang = language;

    const cached = cache[language];
    if (cached) {
      setT(cached);
      return;
    }
    let cancelled = false;
    loaders[language]()
      .then((mod) => {
        if (cancelled) return;
        cache[language] = mod.default;
        setT(mod.default);
      })
      .catch((err) => {
        console.error('Failed to load language chunk:', language, err);
      });
    return () => { cancelled = true; };
  }, [language]);

  // Listen for SPA route changes — keep `language` in sync with the URL prefix
  // (e.g. user clicks a localized link or hits Back/Forward).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onLocation = () => {
      const fromUrl = readLangFromUrl();
      setLanguageState((prev) => (prev !== fromUrl ? fromUrl : prev));
    };
    window.addEventListener('popstate', onLocation);
    // react-router calls pushState/replaceState; patch them once to fire an event.
    const fire = () => window.dispatchEvent(new Event('locationchange'));
    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;
    window.history.pushState = function (...args) { origPush.apply(this, args); fire(); };
    window.history.replaceState = function (...args) { origReplace.apply(this, args); fire(); };
    window.addEventListener('locationchange', onLocation);
    return () => {
      window.removeEventListener('popstate', onLocation);
      window.removeEventListener('locationchange', onLocation);
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, []);

  // Switching language now navigates to the localized URL — single source of truth.
  const setLanguage = (lang: Language) => {
    // Persist explicit choice so LegacyLangRedirect can keep it sticky across pages.
    try { localStorage.setItem('language', lang); } catch { /* noop */ }
    if (typeof window === 'undefined') { setLanguageState(lang); return; }
    const { pathname, search, hash } = window.location;
    const stripped = pathname.replace(/^\/(ru|en|uk)(?=\/|$)/, '') || '/';
    const next = lang === 'pl' ? stripped : `/${lang}${stripped === '/' ? '' : stripped}`;
    if (next + search + hash !== pathname + search + hash) {
      window.history.pushState({}, '', next + search + hash);
    }
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback for edge cases during HMR or lazy loading race conditions
    return {
      language: 'pl' as Language,
      setLanguage: () => {},
      t: defaultTranslations,
    };
  }
  return context;
};
