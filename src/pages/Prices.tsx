import { useState, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import PriceItem from '@/components/PriceItem';
import PriceSplash from '@/components/PriceSplash';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Circle, Lamp, Sofa, LayoutGrid, Maximize2, Square,
  Droplets, ShieldCheck, Grid3X3, Baby, Fan, CarFront, Sparkles,
  Calculator
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import PriceCalculatorContent from '@/components/PriceCalculatorContent';

const Prices = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [showSplash, setShowSplash] = useState(true);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const furniturePrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.pouf, price: 40, icon: Circle },
    { name: t.prices.items.chair, price: 40, icon: Lamp },
    { name: t.prices.items.pillow, price: 10, icon: Square },
    { name: t.prices.items.armchair, price: 70, icon: Armchair },
    { name: t.prices.items.sofa2, price: 140, icon: Sofa },
    { name: t.prices.items.sofa3, price: 170, icon: Sofa },
    { name: t.prices.items.sofaCorner, price: 200, icon: LayoutGrid },
    { name: t.prices.items.sofaCornerLarge, price: 250, icon: Maximize2 },
  ];

  const leatherFurniturePrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.leatherPouf, price: 55, icon: Circle },
    { name: t.prices.items.leatherChair, price: 50, icon: Lamp },
    { name: t.prices.items.leatherPillow, price: 10, icon: Square },
    { name: t.prices.items.leatherArmchair, price: 90, icon: Armchair },
    { name: t.prices.items.leatherSofa2, price: 180, icon: Sofa },
    { name: t.prices.items.leatherSofa3, price: 220, icon: Sofa },
    { name: t.prices.items.leatherSofaCorner, price: 270, icon: LayoutGrid },
  ];

  const mattressDryingPrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.mattressSingleDry, price: 140, icon: BedDouble },
    { name: t.prices.items.mattressSingleDry2, price: 220, icon: BedDouble },
    { name: t.prices.items.mattressDoubleDry, price: 180, icon: BedDouble },
    { name: t.prices.items.mattressDoubleDry2, price: 280, icon: BedDouble },
  ];

  const autoPrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.autoComplex, price: 450, icon: CarFront },
    { name: t.prices.items.autoSeat, price: 80, icon: Square },
    { name: t.prices.items.autoSeats, price: 300, icon: LayoutGrid },
    { name: t.prices.items.autoPlastics, price: 70, icon: Sparkles },
    { name: t.prices.items.autoCeiling, price: 100, icon: Maximize2 },
    { name: t.prices.items.autoFloor, price: 100, icon: Grid3X3 },
    { name: t.prices.items.autoTrunk, price: 80, icon: Package },
    { name: t.prices.items.autoOzone, price: 100, icon: Wind },
  ];

  const ozonePrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.ozone1room, price: 120, icon: Home },
    { name: t.prices.items.ozone2room, price: 200, icon: Home },
    { name: t.prices.items.ozone3room, price: 300, icon: Home },
    { name: t.prices.items.ozoneOfficeSmall, price: 250, icon: LayoutGrid },
    { name: t.prices.items.ozoneOfficeLarge, price: 400, icon: Maximize2 },
  ];

  const otherPrices: { name: string; price: number; unit?: string; icon: LucideIcon }[] = [
    { name: t.prices.items.stroller, price: 100, icon: Baby },
    { name: t.prices.items.drying, price: 60, icon: Fan },
    { name: t.prices.items.impregnation, price: 80, icon: ShieldCheck },
    { name: t.prices.items.tileCleaning, price: 25, unit: 'm²', icon: Grid3X3 },
    { name: t.prices.items.carpetCovering, price: 25, unit: 'm²', icon: LayoutGrid },
  ];

  return (
    <>
      {showSplash && <PriceSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero */}
        <section className="py-12 sm:py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animated money icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-fresh animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.prices.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground animate-fade-up px-4" style={{ animationDelay: '0.1s' }}>
                {t.prices.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Trigger */}
        <section className="py-6 sm:py-10 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card 
                className="shadow-card animate-fade-up cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setIsCalcOpen(true)}
              >
                <CardContent className="py-5 sm:py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                        <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-semibold">{t.calculator.title}</h2>
                        <p className="text-sm text-muted-foreground">{t.calculator.selectItems}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      {t.calculator.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculator Modal/Drawer */}
        {isMobile ? (
          <Drawer open={isCalcOpen} onOpenChange={setIsCalcOpen}>
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
                <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
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
                <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Price Lists */}
        <section className="py-12 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
              {/* Furniture */}
              <Card className="shadow-card animate-fade-up overflow-hidden">
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.furniture}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {furniturePrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Leather Furniture */}
              <Card className="shadow-card animate-fade-up overflow-hidden" style={{ animationDelay: '0.05s' }}>
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Armchair className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.items.leatherFurniture}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {leatherFurniturePrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Mattress with Drying */}
              <Card className="shadow-card animate-fade-up overflow-hidden" style={{ animationDelay: '0.07s' }}>
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <BedDouble className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.items.mattressWithDrying}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {mattressDryingPrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Auto Cleaning */}
              <Card className="shadow-card animate-fade-up overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Car className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.autoCleaning}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {autoPrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Ozonation */}
              <Card className="shadow-card animate-fade-up overflow-hidden" style={{ animationDelay: '0.15s' }}>
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.ozonation}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {ozonePrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Other */}
              <Card className="shadow-card animate-fade-up overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="border-b border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-lg sm:text-xl">{t.prices.other}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 sm:pt-4 px-3 sm:px-6">
                  {otherPrices.map((item, index) => (
                    <PriceItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      from={t.prices.from}
                      currency={t.prices.currency}
                      unit={item.unit}
                      icon={item.icon}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Prices;
