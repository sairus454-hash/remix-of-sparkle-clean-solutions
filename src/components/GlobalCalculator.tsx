import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import PriceCalculatorContent from '@/components/PriceCalculatorContent';

const GlobalCalculator = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show only on Index and Prices pages
  const allowedPaths = ['/', '/prices'];
  const shouldShow = allowedPaths.includes(location.pathname);

  useEffect(() => {
    if (shouldShow) {
      // Delay appearance for smooth animation
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShow]);

  if (!shouldShow) return null;

  const CalculatorButton = (
    <Button
      onClick={() => setIsOpen(true)}
      className={`
        fixed right-4 bottom-24 z-40
        w-14 h-14 rounded-full
        bg-gradient-to-br from-primary to-fresh
        shadow-lg shadow-primary/30
        hover:shadow-xl hover:shadow-primary/40
        hover:scale-110
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
      `}
      size="icon"
      aria-label={t.calculator.title}
    >
      <Calculator className="w-6 h-6 text-primary-foreground" />
    </Button>
  );

  if (isMobile) {
    return (
      <>
        {CalculatorButton}
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <DrawerTitle className="font-serif text-lg">
                  {t.calculator.title}
                </DrawerTitle>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 pb-8">
              <PriceCalculatorContent />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      {CalculatorButton}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                <Calculator className="w-5 h-5 text-primary-foreground" />
              </div>
              <DialogTitle className="font-serif text-xl">
                {t.calculator.title}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 py-4">
            <PriceCalculatorContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalCalculator;
