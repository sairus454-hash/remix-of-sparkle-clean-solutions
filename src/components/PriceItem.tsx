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
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-accent/30 transition-colors px-4 -mx-4 rounded-lg">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
        <span className="font-medium text-foreground">{name}</span>
      </div>
      <span className="text-blue-600 font-semibold whitespace-nowrap ml-4">
        {from} {price} {currency}{unit && ` / ${unit}`}
      </span>
    </div>
  );
};

export default PriceItem;
