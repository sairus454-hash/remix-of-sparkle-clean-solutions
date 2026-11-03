export const CONSENT_KEY = 'masterclean-consent-v2';
export const NOTICE_VERSION = '2026-11-03-google-basic-v1';
export const CONSENT_NOTICE = {
  pl: 'Google Ads i Google Analytics otrzymują dane o odwiedzanych stronach, kliknięciach i wysłanych zapytaniach oraz identyfikatory cookies w celu pomiaru i optymalizacji reklam. Nie przekazujemy treści formularzy ani danych kontaktowych. Zgodę możesz wycofać w ustawieniach cookies.',
  ru: 'Google Ads и Google Analytics получают сведения о страницах, кликах и отправленных заявках и идентификаторы cookies для измерения и оптимизации рекламы. Содержимое форм и контактные данные не передаются. Согласие можно отозвать в настройках cookies.',
  en: 'Google Ads and Google Analytics receive page, click and enquiry events and cookie identifiers for measurement and ad optimization. We do not share form contents or contact details. Withdraw consent in Cookie settings.',
  uk: 'Google Ads і Google Analytics отримують дані про сторінки, кліки та надіслані заявки й ідентифікатори cookies для вимірювання та оптимізації реклами. Вміст форм і контактні дані не передаються. Згоду можна відкликати в налаштуваннях cookies.',
};
export interface ConsentRecord {
  visitorId: string;
  region: string;
  advertising: boolean;
  analytics: boolean;
  history: Array<{ at: string; advertising: boolean; analytics: boolean; version: string; notice: string }>;
}
const countries = new Set('AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH CA'.split(' '));
let region = 'UNKNOWN';
let lookup: Promise<string> | undefined;
export function readConsent(): ConsentRecord | null {
  try {
    const r = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return r && typeof r.advertising === 'boolean' && typeof r.analytics === 'boolean' && Array.isArray(r.history) ? r : null;
  } catch { return null; }
}
export function requiresConsent(country: string) {
  return country === 'UNKNOWN' || country === 'XX' || country === 'T1' || countries.has(country);
}
export function resolveRegion(): Promise<string> {
  return lookup ??= (async () => {
    try {
      const res = await fetch('/cdn-cgi/trace', { signal: AbortSignal.timeout(2000) });
      if (!res.ok) return region;
      const text = await res.text();
      const host = text.match(/^h=(.+)$/m)?.[1]?.trim().toLowerCase();
      const country = text.match(/^loc=([A-Z0-9]{2})$/m)?.[1];
      if (host === location.hostname && country) region = country;
    } catch { /* Fail closed. */ }
    return region;
  })();
}
export function canTrack(kind: 'advertising' | 'analytics') {
  const record = readConsent();
  if (record) return record[kind];
  // Legacy acceptance is not evidence for the new notice; legacy refusal stays effective.
  if (sessionStorage.getItem('cookie-consent') === 'rejected') return false;
  return !requiresConsent(region);
}
export function saveConsent(advertising: boolean, analytics: boolean, language: keyof typeof CONSENT_NOTICE) {
  const previous = readConsent();
  const record: ConsentRecord = {
    visitorId: previous?.visitorId || crypto.randomUUID(), region,
    advertising, analytics,
    history: [...(previous?.history || []), { at: new Date().toISOString(), advertising, analytics, version: NOTICE_VERSION, notice: CONSENT_NOTICE[language] }],
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  window.dispatchEvent(new Event('mc-consent-changed'));
}
export function openCookieSettings() { window.dispatchEvent(new Event('mc-cookie-settings')); }