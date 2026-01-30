interface PriceItemProps {
  name: string;
  price: number;
  from: string;
  currency: string;
  unit?: string;
}

const PriceItem = ({ name, price, from, currency, unit }: PriceItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-accent/30 transition-colors px-4 -mx-4 rounded-lg">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-primary font-semibold">
        {from} {price} {currency}{unit && ` / ${unit}`}
      </span>
    </div>
  );
};

export default PriceItem;
