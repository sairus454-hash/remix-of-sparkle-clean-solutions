import { LucideIcon } from 'lucide-react';

interface PriceItemProps {
  name: string;
  price: number;
  from: string;
  currency: string;
  unit?: string;
  icon?: LucideIcon;
}

const PriceItem = ({ name, price, from, currency, unit, icon: Icon }: PriceItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 sm:py-4 border-b border-border last:border-0 hover:bg-accent/30 active:bg-accent/50 transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-lg touch-manipulation">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {Icon && (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
        )}
        <span className="font-medium text-foreground text-sm sm:text-base leading-tight">{name}</span>
      </div>
      <span className="text-primary font-semibold whitespace-nowrap ml-2 sm:ml-4 text-sm sm:text-base">
        {price} {currency}{unit && ` / ${unit}`}
      </span>
    </div>
  );
};

export default PriceItem;
