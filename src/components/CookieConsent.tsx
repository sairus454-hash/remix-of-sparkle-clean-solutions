import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

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
  const t = texts[language as keyof typeof texts] || texts.pl;

  useEffect(() => {
    const consent = sessionStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    sessionStorage.setItem('cookie-consent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-card border border-border/60 rounded-xl p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground/85 leading-relaxed">
            {t.message}{' '}
            <Link to="/cookies" className="text-primary underline hover:text-primary/80 transition-colors">{t.link}</Link>
          </p>
        </div>
        <div className="flex gap-2 mt-3 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChoice('rejected')}
            className="text-xs h-8"
          >
            {t.reject}
          </Button>
          <Button
            size="sm"
            onClick={() => handleChoice('accepted')}
            className="text-xs h-8"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
