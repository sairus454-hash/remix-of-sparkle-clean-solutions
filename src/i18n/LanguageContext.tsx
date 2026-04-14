import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  const supported: Language[] = ['ru', 'en', 'pl', 'uk'];
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'uk' || code === 'ua') return 'uk';
    if (supported.includes(code as Language)) return code as Language;
  }
  return 'pl';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved && ['ru', 'en', 'pl', 'uk'].includes(saved)) return saved as Language;
    return 'pl';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Update html lang attribute for accessibility & SEO
    const langMap: Record<Language, string> = { pl: 'pl', ru: 'ru', en: 'en', uk: 'uk' };
    document.documentElement.lang = langMap[language] || 'pl';
  }, [language]);

  const t = translations[language];

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
      language: 'ru' as Language,
      setLanguage: () => {},
      t: translations.ru,
    };
  }
  return context;
};
