import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { CONSENT_NOTICE, readConsent, resolveRegion, requiresConsent, saveConsent } from '@/lib/trackingConsent';
import { cookieSettingsLabels } from './TrackingDisclosure';
import { Checkbox } from '@/components/ui/checkbox';

const texts = {
  pl: {
    message: 'Ten serwis używa plików cookies w celach statystycznych i marketingowych.',
    link: 'Przeczytaj politykę cookies',
    accept: 'Zaakceptuj',
    reject: 'Odrzuć',
  },
  ru: {
    message: 'Этот сайт использует файлы cookie в статистических и маркетинговых целях.',
    link: 'Прочитать политику cookie',
    accept: 'Принять',
    reject: 'Отклонить',
  },
  en: {
    message: 'This website uses cookies for statistical and marketing purposes.',
    link: 'Read our cookie policy',
    accept: 'Accept',
    reject: 'Reject',
  },
  uk: {
    message: 'Цей сайт використовує файли cookie у статистичних та маркетингових цілях.',
    link: 'Прочитати політику cookie',
    accept: 'Прийняти',
    reject: 'Відхилити',
  },
};

const CookieConsent = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const t = texts[language as keyof typeof texts] || texts.pl;

  useEffect(() => {
    const open = () => {
      const saved = readConsent();
      setAdvertising(saved?.advertising || false);
      setAnalytics(saved?.analytics || false);
      setVisible(true);
    };
    void resolveRegion().then(country => { if (!readConsent() && requiresConsent(country)) setVisible(true); });
    window.addEventListener('mc-cookie-settings', open);
    return () => window.removeEventListener('mc-cookie-settings', open);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    sessionStorage.setItem('cookie-consent', choice);
    saveConsent(choice === 'accepted', choice === 'accepted', language);
    setVisible(false);
  };

  if (!visible) return <Button variant="outline" size="sm" onClick={() => {
    const saved = readConsent(); setAdvertising(saved?.advertising || false); setAnalytics(saved?.analytics || false); setVisible(true);
  }} className="fixed bottom-2 left-2 z-50 gap-2 text-xs"><Cookie className="h-4 w-4" />{cookieSettingsLabels[language]}</Button>;

  return (
    <div className="fixed bottom-4 left-4 right-16 sm:right-auto z-[9999] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-card border border-border/60 rounded-xl p-4 shadow-xl relative">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground leading-relaxed">
            {CONSENT_NOTICE[language]}{' '}
            <Link to={`${language === 'pl' ? '' : `/${language}`}/cookies`} className="text-foreground underline font-medium transition-colors">{t.link}</Link>
          </p>
        </div>
        <div className="my-3 space-y-2 text-sm">
          <label className="flex items-center gap-2"><Checkbox checked={advertising} onCheckedChange={v => setAdvertising(v === true)} />Google Ads</label>
          <label className="flex items-center gap-2"><Checkbox checked={analytics} onCheckedChange={v => setAnalytics(v === true)} />Google Analytics</label>
          <Button variant="ghost" size="sm" onClick={() => { saveConsent(advertising, analytics, language); setVisible(false); }}>{cookieSettingsLabels[language]} — OK</Button>
        </div>
        <div className="flex gap-2 mt-3 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChoice('rejected')}
            className="text-xs h-10 min-w-[72px] touch-manipulation"
          >
            {t.reject}
          </Button>
          <Button
            size="sm"
            onClick={() => handleChoice('accepted')}
            className="text-xs h-10 min-w-[72px] touch-manipulation"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
