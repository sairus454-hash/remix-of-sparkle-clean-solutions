import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculatorItem } from '@/types/calculator';
import { useDiscountCalculator } from '@/hooks/useDiscountCalculator';
import { localizeHref } from '@/i18n/localizedPath';

const FloatingOrderSummary = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<CalculatorItem[]>([]);
  const [total, setTotal] = useState(0);
  const discountInfo = useDiscountCalculator(items);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const readStorage = useCallback(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('mc_calculator_items') || '[]');
      const storedTotal = parseFloat(sessionStorage.getItem('mc_calculator_total') || '0');
      setItems(stored);
      setTotal(storedTotal);
    } catch {
      setItems([]);
      setTotal(0);
    }
  }, []);

  useEffect(() => {
    readStorage();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mc_calculator_items' || e.key === 'mc_calculator_total') {
        readStorage();
        setDismissed(false);
      }
    };
    const handleCustom = () => {
      readStorage();
      setDismissed(false);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('mc_order_updated', handleCustom);
    const interval = setInterval(readStorage, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mc_order_updated', handleCustom);
      clearInterval(interval);
    };
  }, [readStorage]);

  useEffect(() => {
    if (items.length > 0) setDismissed(false);
  }, [items.length]);

  // Animate in/out
  const shouldShow = items.length > 0 && !dismissed && location.pathname !== '/contacts';
  useEffect(() => {
    if (shouldShow) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [shouldShow]);

  if (!shouldShow && !isVisible) return null;

  const labels = {
    ru: { ordered: 'Заказал', goToOrder: 'Перейти к оформлению', dismiss: 'Скрыть' },
    pl: { ordered: 'Zamówione', goToOrder: 'Przejdź do zamówienia', dismiss: 'Ukryj' },
    uk: { ordered: 'Замовлено', goToOrder: 'Перейти до оформлення', dismiss: 'Сховати' },
    en: { ordered: 'Ordered', goToOrder: 'Go to order', dismiss: 'Hide' },
  };
  const l = labels[language] || labels.en;

  const handleGoToContacts = () => {
    // Honor active language prefix so we don't drop the user back to PL.
    navigate(localizeHref('/contacts', language));
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleGoToContacts}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoToContacts(); }}
      aria-label={l.goToOrder}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 cursor-pointer',
        'transition-all duration-300 ease-out',
        isVisible && shouldShow
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full pointer-events-none',
      )}
    >
      <div className="mx-auto max-w-3xl px-3 pb-3 sm:pb-4">
        <div
          className={cn(
            'group relative flex items-center gap-3 sm:gap-4 rounded-2xl shadow-2xl',
            'bg-primary text-primary-foreground border border-primary/30',
            'px-4 sm:px-5 py-3 sm:py-3.5',
            'hover:scale-[1.01] active:scale-[0.99] transition-transform',
          )}
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-fresh text-white text-[10px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-md">
              {items.length}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] sm:text-xs uppercase tracking-wide opacity-80 leading-none">
              {l.ordered}
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-serif font-bold text-lg sm:text-xl leading-none">
                {discountInfo.finalTotal} zł
              </span>
              {discountInfo.hasDiscount && (
                <span className="text-xs sm:text-sm line-through opacity-70 leading-none">
                  {discountInfo.originalTotal} zł
                </span>
              )}
            </div>
            {discountInfo.hasDiscount && discountInfo.discountReason && (
              <p className="hidden sm:flex items-center gap-1 mt-1 text-[11px] opacity-90">
                <Tag className="w-3 h-3" />
                <span className="truncate">{discountInfo.discountReason}</span>
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-semibold text-sm">
            {l.goToOrder}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
          <ArrowRight className="sm:hidden w-5 h-5 shrink-0" />

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={l.dismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card text-foreground border border-border shadow-md flex items-center justify-center hover:bg-accent transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingOrderSummary;
