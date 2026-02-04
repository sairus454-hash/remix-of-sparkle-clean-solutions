import { useLanguage } from '@/i18n/LanguageContext';
import PriceItem from '@/components/PriceItem';

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Circle, Lamp, Sofa, LayoutGrid, Maximize2, Square,
  ShieldCheck, Grid3X3, Baby, Fan, CarFront, Sparkles
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface PriceCategory {
  id: string;
  title: string;
  description: string;
  minPrice: number;
  icon: LucideIcon;
  items: { name: string; price: number; unit?: string; icon: LucideIcon }[];
  note?: string;
}

const PriceSection = () => {
  const { t } = useLanguage();

  const categories: PriceCategory[] = [
    {
      id: 'furniture',
      title: t.prices.furniture,
      description: t.prices.furnitureDesc,
      minPrice: 10,
      icon: Home,
      items: [
        { name: t.prices.items.pouf, price: 40, icon: Circle },
        { name: t.prices.items.chair, price: 40, icon: Lamp },
        { name: t.prices.items.pillow, price: 10, icon: Square },
        { name: t.prices.items.armchair, price: 70, icon: Armchair },
        { name: t.prices.items.sofa2, price: 140, icon: Sofa },
        { name: t.prices.items.sofa3, price: 170, icon: Sofa },
        { name: t.prices.items.sofaCorner, price: 200, icon: LayoutGrid },
        { name: t.prices.items.sofaCornerLarge, price: 250, icon: Maximize2 },
        { name: t.prices.items.bedHeadboard, price: 100, icon: BedDouble },
        { name: t.prices.items.bedFrame, price: 100, icon: BedDouble },
      ],
      note: t.prices.items.flockNote,
    },
    {
      id: 'leather',
      title: t.prices.leatherFurnitureTitle,
      description: t.prices.leatherFurnitureDesc,
      minPrice: 10,
      icon: Armchair,
      items: [
        { name: t.prices.items.leatherPouf, price: 55, icon: Circle },
        { name: t.prices.items.leatherChair, price: 50, icon: Lamp },
        { name: t.prices.items.leatherPillow, price: 10, icon: Square },
        { name: t.prices.items.leatherArmchair, price: 90, icon: Armchair },
        { name: t.prices.items.leatherSofa2, price: 180, icon: Sofa },
        { name: t.prices.items.leatherSofa3, price: 220, icon: Sofa },
        { name: t.prices.items.leatherSofaCorner, price: 270, icon: LayoutGrid },
      ],
    },
    {
      id: 'mattress',
      title: t.prices.mattressTitle,
      description: t.prices.mattressDesc,
      minPrice: 140,
      icon: BedDouble,
      items: [
        { name: t.prices.items.mattressSingleDry, price: 140, icon: BedDouble },
        { name: t.prices.items.mattressSingleDry2, price: 220, icon: BedDouble },
        { name: t.prices.items.mattressDoubleDry, price: 180, icon: BedDouble },
        { name: t.prices.items.mattressDoubleDry2, price: 280, icon: BedDouble },
      ],
    },
    {
      id: 'auto',
      title: t.prices.autoCleaning,
      description: t.prices.autoCleaningDesc,
      minPrice: 70,
      icon: Car,
      items: [
        { name: t.prices.items.autoComplex, price: 450, icon: CarFront },
        { name: t.prices.items.autoSeat, price: 80, icon: Square },
        { name: t.prices.items.autoSeats, price: 300, icon: LayoutGrid },
        { name: t.prices.items.autoPlastics, price: 70, icon: Sparkles },
        { name: t.prices.items.autoCeiling, price: 100, icon: Maximize2 },
        { name: t.prices.items.autoFloor, price: 100, icon: Grid3X3 },
        { name: t.prices.items.autoTrunk, price: 80, icon: Package },
        { name: t.prices.items.autoOzone, price: 100, icon: Wind },
        { name: t.prices.items.autoTruckCabin, price: 650, icon: CarFront },
        { name: t.prices.items.autoVanCabin, price: 400, icon: CarFront },
      ],
    },
    {
      id: 'ozone',
      title: t.prices.ozonation,
      description: t.prices.ozonationDesc,
      minPrice: 120,
      icon: Wind,
      items: [
        { name: t.prices.items.ozone1room, price: 120, icon: Home },
        { name: t.prices.items.ozone2room, price: 200, icon: Home },
        { name: t.prices.items.ozone3room, price: 300, icon: Home },
        { name: t.prices.items.ozoneOfficeSmall, price: 250, icon: LayoutGrid },
        { name: t.prices.items.ozoneOfficeLarge, price: 400, icon: Maximize2 },
      ],
    },
    {
      id: 'other',
      title: t.prices.other,
      description: t.prices.otherDesc,
      minPrice: 25,
      icon: Package,
      items: [
        { name: t.prices.items.carpetCovering, price: 25, unit: 'm²', icon: Grid3X3 },
        { name: t.prices.items.stroller, price: 100, icon: Baby },
        { name: t.prices.items.drying, price: 60, icon: Fan },
        { name: t.prices.items.impregnation, price: 80, icon: ShieldCheck },
        { name: t.prices.items.tileCleaning, price: 25, unit: 'm²', icon: Grid3X3 },
      ],
    },
  ];

  return (
    <>
      {/* Price Section Header */}
      <section className="py-12 sm:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
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
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.prices.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base px-4">
              {t.prices.subtitle}
            </p>
          </div>
          {/* Accordion Price Lists */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <AccordionItem 
                    key={category.id} 
                    value={category.id}
                    className="bg-card border border-border rounded-xl shadow-card overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline hover:bg-accent/30 transition-colors group">
                      <div className="flex items-center gap-3 sm:gap-4 w-full">
                        {/* Icon */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                        </div>
                        
                        {/* Title and description */}
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground truncate">
                            {category.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {category.description}
                          </p>
                        </div>
                        
                        {/* Min price badge */}
                        <div className="flex-shrink-0 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                          {t.prices.from} {category.minPrice} {t.prices.currency}
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-3 sm:px-6 pb-4">
                      <div className="pt-2 border-t border-border">
                        {category.items.map((item, itemIndex) => (
                          <PriceItem
                            key={itemIndex}
                            name={item.name}
                            price={item.price}
                            from={t.prices.from}
                            currency={t.prices.currency}
                            unit={item.unit}
                            icon={item.icon}
                          />
                        ))}
                        {category.note && (
                          <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border italic">
                            {category.note}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default PriceSection;
