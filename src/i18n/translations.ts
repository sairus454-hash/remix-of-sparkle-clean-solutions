// Type-only file. Actual translations are split by language and loaded on demand.
// See src/i18n/locales/{ru,en,pl,uk}.ts and LanguageContext.tsx
import plTranslations from './locales/pl';

export type Language = 'ru' | 'en' | 'pl' | 'uk';
export type TranslationKeys = typeof plTranslations;

// Re-export the default (Polish) bundle synchronously so callers always have a
// fallback while async language switches are loading.
export const defaultTranslations: TranslationKeys = plTranslations;

// Backwards-compat: a few legacy imports still reference `translations`. Keep
// only the synchronous default language to avoid bundling all locales.
export const translations: Record<Language, TranslationKeys> = {
  pl: plTranslations,
  // Lazy placeholders — populated at runtime by LanguageContext when switched.
  ru: plTranslations,
  en: plTranslations,
  uk: plTranslations,
};
