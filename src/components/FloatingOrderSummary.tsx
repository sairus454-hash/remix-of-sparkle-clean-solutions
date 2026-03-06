import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ShoppingBag, X, ArrowRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorItem } from '@/types/calculator';

const FloatingOrderSummary = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<CalculatorItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const readStorage = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mc_calculator_items') || '[]');
      const storedTotal = parseFloat(localStorage.getItem('mc_calculator_total') || '0');
      setItems(stored);
      setTotal(storedTotal);
    } catch {
      setItems([]);
      setTotal(0);
    }
  }, []);

  useEffect(() => {
    readStorage();
    // Listen for storage changes (cross-tab) and custom event (same tab)
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
    // Poll for changes every 2s (same-tab localStorage updates don't fire storage event)
    const interval = setInterval(readStorage, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mc_order_updated', handleCustom);
      clearInterval(interval);
    };
  }, [readStorage]);

  // Reset dismissed when items change
  useEffect(() => {
    if (items.length > 0) setDismissed(false);
  }, [items.length]);

  // Hide on /contacts
  if (location.pathname === '/contacts') return null;
  if (items.length === 0 || dismissed) return null;

  const labels = {
    ru: { title: 'Ваш заказ', items: 'услуг', goToOrder: 'Перейти к заявке', clear: 'Очистить' },
    pl: { title: 'Twoje zamówienie', items: 'usług', goToOrder: 'Przejdź do zamówienia', clear: 'Wyczyść' },
    uk: { title: 'Ваше замовлення', items: 'послуг', goToOrder: 'Перейти до замовлення', clear: 'Очистити' },
    en: { title: 'Your order', items: 'services', goToOrder: 'Go to order', clear: 'Clear' },
  };
  const l = labels[language] || labels.en;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('mc_calculator_items');
    localStorage.removeItem('mc_calculator_total');
    setItems([]);
    setTotal(0);
    setIsExpanded(false);
  };

  const handleGoToContacts = () => {
    setIsExpanded(false);
    navigate('/contacts');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6"
      >
        {/* Expanded view */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-3 bg-card border border-border rounded-2xl shadow-xl overflow-hidden w-72 sm:w-80"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h4 className="font-serif font-semibold text-foreground">{l.title}</h4>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed badge button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "relative flex items-center gap-2.5 py-3 px-5 rounded-full shadow-xl transition-all",
            "bg-primary text-primary-foreground hover:shadow-2xl",
            "border border-primary/20"
          )}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-semibold">{total} zł</span>
          <span className="absolute -top-2 -right-2 bg-fresh text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
            {items.length}
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingOrderSummary;
