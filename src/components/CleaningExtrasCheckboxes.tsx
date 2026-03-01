import { Checkbox } from '@/components/ui/checkbox';
import { cleaningExtras, CleaningExtra } from '@/data/cleaningExtras';

const GENERAL_ONLY_EXTRAS = ['ironing', 'balcony', 'petLitter'];

interface CleaningExtrasCheckboxesProps {
  cleaningType: 'standard' | 'general';
  selectedExtras: string[];
  onToggleExtra: (id: string) => void;
  compact?: boolean;
}

const CleaningExtrasCheckboxes = ({ cleaningType, selectedExtras, onToggleExtra, compact = false }: CleaningExtrasCheckboxesProps) => {
  const filteredExtras = cleaningType === 'general'
    ? cleaningExtras.filter(e => GENERAL_ONLY_EXTRAS.includes(e.id))
    : cleaningExtras;

  const getPrice = (extra: CleaningExtra) => {
    return cleaningType === 'standard' ? extra.standardPrice : extra.generalPrice;
  };

  const totalExtras = selectedExtras.reduce((sum, id) => {
    const extra = cleaningExtras.find(e => e.id === id);
    return sum + (extra ? getPrice(extra) : 0);
  }, 0);

  return (
    <div className="space-y-2">
      <p className={`font-semibold text-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
        Дополнительные услуги:
      </p>
      <div className={`space-y-1 ${compact ? 'max-h-48' : 'max-h-64'} overflow-y-auto pr-1`}>
        {filteredExtras.map((extra) => {
          const price = getPrice(extra);
          const isChecked = selectedExtras.includes(extra.id);
          return (
            <label
              key={extra.id}
              className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors hover:bg-accent/30 ${
                isChecked ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleExtra(extra.id)}
                  className="flex-shrink-0"
                />
                <span className={`${compact ? 'text-xs' : 'text-sm'} text-foreground leading-tight`}>
                  {extra.name}
                </span>
              </div>
              <span className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-primary whitespace-nowrap ml-2`}>
                {price.toFixed(2)} zł{extra.unit || ''}
              </span>
            </label>
          );
        })}
      </div>
      {totalExtras > 0 && (
        <div className={`flex items-center justify-between pt-2 border-t border-border ${compact ? 'text-xs' : 'text-sm'}`}>
          <span className="font-medium text-muted-foreground">Доп. услуги:</span>
          <span className="font-bold text-primary">{totalExtras.toFixed(2)} zł</span>
        </div>
      )}
    </div>
  );
};

export default CleaningExtrasCheckboxes;

export const getExtrasTotal = (selectedExtras: string[], cleaningType: 'standard' | 'general'): number => {
  const validIds = cleaningType === 'general'
    ? selectedExtras.filter(id => GENERAL_ONLY_EXTRAS.includes(id))
    : selectedExtras;
  return validIds.reduce((sum, id) => {
    const extra = cleaningExtras.find(e => e.id === id);
    if (!extra) return sum;
    return sum + (cleaningType === 'standard' ? extra.standardPrice : extra.generalPrice);
  }, 0);
};
