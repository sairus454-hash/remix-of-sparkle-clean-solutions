import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const BackToOrderButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const state = location.state as { openCategory?: string } | null;
    if (state?.openCategory) {
      setShow(true);
      requestAnimationFrame(() => setMounted(true));
    }
  }, [location.state]);

  const label: Record<string, string> = {
    ru: 'Назад к заявке',
    pl: 'Wróć do zamówienia',
    uk: 'Назад до заявки',
    en: 'Back to order',
  };

  if (!show) return null;

  return (
    <button
      onClick={() => navigate('/contacts')}
      className={cn(
        "fixed bottom-6 left-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 ease-out text-sm font-semibold",
        mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      )}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">{label[language] || label.ru}</span>
      <ShoppingCart className="w-4 h-4 sm:hidden" />
    </button>
  );
};

export default BackToOrderButton;
