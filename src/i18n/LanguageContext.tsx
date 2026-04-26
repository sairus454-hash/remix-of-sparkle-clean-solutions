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
  const [language, setLanguage] = useState<Language>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null;
    if (saved && SUPPORTED.includes(saved as Language)) return saved as Language;
    return 'pl';
  });

  // Holds the active translation bundle. Falls back to PL while another
  // language is being fetched so the UI never shows empty strings.
  const [t, setT] = useState<TranslationKeys>(() => cache[language] ?? defaultTranslations);

  useEffect(() => {
    localStorage.setItem('language', language);
    const langMap: Record<Language, string> = { pl: 'pl', ru: 'ru', en: 'en', uk: 'uk' };
    document.documentElement.lang = langMap[language] || 'pl';

    // If we already have it cached, swap immediately
    const cached = cache[language];
    if (cached) {
      setT(cached);
      return;
    }

    // Otherwise lazy-load the language chunk
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

    return () => {
      cancelled = true;
    };
  }, [language]);

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
