import { useLanguage } from '@/i18n/LanguageContext';
import { CONSENT_NOTICE, openCookieSettings } from '@/lib/trackingConsent';
import { Button } from '@/components/ui/button';
export const cookieSettingsLabels = { pl: 'Ustawienia cookies', ru: 'Настройки cookies', en: 'Cookie settings', uk: 'Налаштування cookies' };
export default function TrackingDisclosure() {
  const { language } = useLanguage();
  return <section className="my-8 space-y-3">
    <h2 className="font-serif text-xl font-semibold">Google Ads / Google Analytics</h2>
    <p>{CONSENT_NOTICE[language]}</p>
    <p><a className="text-primary underline" href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">Google — Privacy &amp; Terms</a></p>
    <Button variant="outline" onClick={openCookieSettings}>{cookieSettingsLabels[language]}</Button>
  </section>;
}