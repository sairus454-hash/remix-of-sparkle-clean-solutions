import { useLanguage } from '@/i18n/LanguageContext';
import PriceItem from '@/components/PriceItem';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LucideIcon } from 'lucide-react';

export interface PriceAccordionCategory {
  id: string;
  title: string;
  description: string;
  minPrice: number;
  icon: LucideIcon;
  items: { name: string; price: number; unit?: string; icon?: LucideIcon }[];
  note?: string;
}

interface PriceAccordionProps {
  categories: PriceAccordionCategory[];
  className?: string;
}

const PriceAccordion = ({ categories, className = '' }: PriceAccordionProps) => {
  const { t } = useLanguage();

  return (
    <Accordion type="single" collapsible className={`space-y-4 ${className}`}>
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
  );
};

export default PriceAccordion;
