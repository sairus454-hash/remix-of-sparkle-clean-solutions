import { useState, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import PriceItem from '@/components/PriceItem';
import PriceCalculator from '@/components/PriceCalculator';
import PriceSplash from '@/components/PriceSplash';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Circle, Lamp, Sofa, LayoutGrid, Maximize2, Square,
  Droplets, ShieldCheck, Grid3X3, Baby, Fan, CarFront, Sparkles
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const Prices = () => {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const furniturePrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.pouf, price: 40, icon: Circle },
    { name: t.prices.items.chair, price: 40, icon: Lamp },
    { name: t.prices.items.armchair, price: 70, icon: Armchair },
    { name: t.prices.items.sofa2, price: 140, icon: Sofa },
    { name: t.prices.items.sofa3, price: 170, icon: Sofa },
    { name: t.prices.items.sofaCorner, price: 200, icon: LayoutGrid },
    { name: t.prices.items.sofaCornerLarge, price: 250, icon: Maximize2 },
  ];

  const leatherFurniturePrices: { name: string; price: number; icon: LucideIcon }[] = [
    { name: t.prices.items.leatherPouf, price: 55, icon: Circle },
    { name: t.prices.items.leatherChair, price: 50, icon: Lamp },
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
  ];

  return (
    <>
      {showSplash && <PriceSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animated money icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Coins className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.prices.title}
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {t.prices.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Price Calculator */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <PriceCalculator />
            </div>
          </div>
        </section>

        {/* Price Lists */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Furniture */}
              <Card className="shadow-card animate-fade-up">
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Home className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.furniture}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
              <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.05s' }}>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Armchair className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.items.leatherFurniture}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
              <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.07s' }}>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <BedDouble className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.items.mattressWithDrying}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
              <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Car className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.autoCleaning}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
              <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.15s' }}>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Wind className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.ozonation}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
              <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Package className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <CardTitle className="font-serif text-xl">{t.prices.other}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
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
