import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import PriceItem from '@/components/PriceItem';
import CircularRevealCard from '@/components/CircularRevealCard';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LucideIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface PriceAccordionCategory {
  id: string;
  title: string;
  description: string;
  minPrice: number;
  icon: LucideIcon;
  items: { name: string; price: number; unit?: string; icon?: LucideIcon }[];
  note?: string;
  isSlider?: boolean;
}

interface PriceAccordionProps {
  categories: PriceAccordionCategory[];
  className?: string;
}

const PriceAccordion = ({ categories, className = '' }: PriceAccordionProps) => {
  const { t } = useLanguage();
  
  // Cleaning slider state
  const [cleaningArea, setCleaningArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  
  const STANDARD_PRICE_PER_M2 = 8;
  const GENERAL_PRICE_PER_M2 = 10;
  
  const getCleaningPrice = () => {
    const basePrice = cleaningArea * (cleaningType === 'standard' ? STANDARD_PRICE_PER_M2 : GENERAL_PRICE_PER_M2);
    // В аккордеоне показываем базовую цену без скидки
    return basePrice;
  };

  return (
    <Accordion type="single" collapsible className={`space-y-4 ${className}`}>
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <CircularRevealCard key={category.id} index={index}>
            <AccordionItem 
              value={category.id}
              className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
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
                    {category.minPrice} {t.prices.currency}{category.id === 'cleaning' ? '/м²' : ''}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-3 sm:px-6 pb-4">
                <div className="pt-2 border-t border-border">
                  {/* Slider content for cleaning */}
                  {category.isSlider ? (
                    <div className="space-y-6 py-4">
                      {/* Cleaning Type Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Тип уборки
                        </Label>
                        <RadioGroup
                          value={cleaningType}
                          onValueChange={(value) => setCleaningType(value as 'standard' | 'general')}
                          className="flex flex-col sm:flex-row gap-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="accordion-standard" />
                            <Label htmlFor="accordion-standard" className="cursor-pointer">
                              {t.cleaning?.standardCleaning || 'Стандартная уборка'} ({STANDARD_PRICE_PER_M2} {t.prices.currency}/м²)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="accordion-general" />
                            <Label htmlFor="accordion-general" className="cursor-pointer">
                              {t.cleaning?.generalCleaning || 'Генеральная уборка'} ({GENERAL_PRICE_PER_M2} {t.prices.currency}/м²)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Area Slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm font-medium">
                            {t.cleaning?.area || 'Площадь'}
                          </Label>
                          <span className="text-lg font-bold text-primary">
                            {cleaningArea} м²
                          </span>
                        </div>
                        <Slider
                          value={[cleaningArea]}
                          onValueChange={(value) => setCleaningArea(value[0])}
                          min={20}
                          max={300}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>20 м²</span>
                          <span>300 м²</span>
                        </div>
                      </div>
                      
                      {/* Calculated Price */}
                      <div className="bg-primary/5 rounded-xl p-4 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Расчетная стоимость:
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {getCleaningPrice()} {t.prices.currency}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
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
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 flex items-start gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 rounded-lg p-3 whitespace-pre-line">
                            <span className="flex-shrink-0">⚠️</span>
                            <span>{category.note}</span>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </CircularRevealCard>
        );
      })}
    </Accordion>
  );
};

export default PriceAccordion;
