import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ShoppingBag, X, ArrowRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculatorItem } from '@/types/calculator';

const FloatingOrderSummary = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<CalculatorItem[]>([]);
  const [total, setTotal] = useState(0);
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
    ru: { title: 'Ваш заказ', items: 'услуг', goToOrder: 'Перейти к заявке', clear: 'Очистить' },
    pl: { title: 'Twoje zamówienie', items: 'usług', goToOrder: 'Przejdź do zamówienia', clear: 'Wyczyść' },
    uk: { title: 'Ваше замовлення', items: 'послуг', goToOrder: 'Перейти до замовлення', clear: 'Очистити' },
    en: { title: 'Your order', items: 'services', goToOrder: 'Go to order', clear: 'Clear' },
  };
  const l = labels[language] || labels.en;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.removeItem('mc_calculator_items');
    sessionStorage.removeItem('mc_calculator_total');
    setItems([]);
    setTotal(0);
    setIsExpanded(false);
  };

  const handleGoToContacts = () => {
    setIsExpanded(false);
    navigate('/contacts');
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 transition-all duration-300 ease-out",
        isVisible && shouldShow
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-10 pointer-events-none"
      )}
    >
      {/* Expanded view */}
      <div
        className={cn(
          "mb-3 bg-card border border-border rounded-2xl shadow-xl overflow-hidden w-72 sm:w-80 transition-all duration-200 ease-out origin-bottom-right",
          isExpanded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none h-0 mb-0"
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <p className="font-serif font-semibold text-foreground">{l.title}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
              title={l.clear}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-3 max-h-48 overflow-y-auto space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm gap-2">
              <span className="text-muted-foreground truncate flex-1">
                {item.name} × {item.quantity || 1}
              </span>
              <span className="font-medium text-foreground whitespace-nowrap">
                {item.price * (item.quantity || 1)} zł
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex justify-between mb-3">
            <span className="font-medium text-foreground">{labels[language]?.title || 'Total'}</span>
            <span className="font-bold text-primary text-lg">{total} zł</span>
          </div>
          <button
            onClick={handleGoToContacts}
            className="w-full py-3 bg-fresh text-white font-semibold rounded-xl hover:bg-fresh/90 transition-colors shadow-glow flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            {l.goToOrder}
          </button>
        </div>
      </div>

      {/* Collapsed badge button */}
      <button
        onClick={() => navigate('/contacts')}
        className={cn(
          "relative flex items-center gap-2.5 py-3 px-5 rounded-full shadow-xl transition-all duration-200",
          "bg-primary text-primary-foreground hover:shadow-2xl hover:scale-105 active:scale-95",
          "border border-primary/20"
        )}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="font-semibold">{total} zł</span>
        <span className="absolute -top-2 -right-2 bg-fresh text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
          {items.length}
        </span>
      </button>
    </div>
  );
};

export default FloatingOrderSummary;
