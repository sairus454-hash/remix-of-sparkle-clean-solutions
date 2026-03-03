import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Trash2, Send, CheckCircle2 } from 'lucide-react';
import { CalculatorItem } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

interface MiniServiceCalculatorProps {
  items: ServiceItem[];
  onSendToForm?: (items: CalculatorItem[], total: number) => void;
}

const MiniServiceCalculator = ({ items, onSendToForm }: MiniServiceCalculatorProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{ item: ServiceItem; quantity: number }[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const addItem = (item: ServiceItem) => {
    const existing = selectedItems.find((s) => s.item.id === item.id);
    if (existing) {
      setSelectedItems(selectedItems.map((s) =>
        s.item.id === item.id ? { ...s, quantity: s.quantity + 1 } : s
      ));
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
    // Flash feedback
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 600);
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      setSelectedItems(selectedItems.filter((s) => s.item.id !== itemId));
    } else {
      setSelectedItems(selectedItems.map((s) =>
        s.item.id === itemId ? { ...s, quantity: qty } : s
      ));
    }
  };

  const isSelected = (id: string) => selectedItems.some(s => s.item.id === id);
  const getQty = (id: string) => selectedItems.find(s => s.item.id === id)?.quantity || 0;

  const total = selectedItems.reduce((sum, s) => sum + s.item.price * s.quantity, 0);

  const handleSend = () => {
    if (selectedItems.length === 0) return;
    const calcItems: CalculatorItem[] = selectedItems.map(s => ({
      id: s.item.id,
      name: s.item.name,
      price: s.item.price,
      quantity: s.quantity,
    }));
    if (onSendToForm) {
      onSendToForm(calcItems, total);
    } else {
      navigate('/contacts', { state: { calculatorItems: calcItems, calculatorTotal: total } });
    }
  };

  return (
    <div className="space-y-4">
      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, index) => {
          const selected = isSelected(item.id);
          const qty = getQty(item.id);
          const wasJustAdded = justAdded === item.id;

          return (
            <button
              key={item.id}
              onClick={() => addItem(item)}
              className={cn(
                "relative flex items-center justify-between text-left h-auto py-3 px-4 rounded-xl border transition-all duration-300 group overflow-hidden",
                selected
                  ? "border-primary/50 bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-accent/40",
                wasJustAdded && "scale-[1.03]"
              )}
              style={{
                animation: `fade-in 0.3s ease-out ${index * 0.04}s both`,
              }}
            >
              {/* Ripple on add */}
              {wasJustAdded && (
                <span className="absolute inset-0 bg-primary/10 animate-scale-in rounded-xl pointer-events-none" />
              )}

              <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                {selected && (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 animate-scale-in" />
                )}
                <span className={cn(
                  "text-sm transition-colors duration-200",
                  selected ? "text-foreground font-medium" : "text-foreground"
                )}>
                  {item.name}
                </span>
                {selected && qty > 1 && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0 animate-scale-in">
                    {qty}
                  </span>
                )}
              </div>

              <span className={cn(
                "text-sm font-semibold whitespace-nowrap transition-colors duration-200",
                selected ? "text-primary" : "text-primary/80 group-hover:text-primary"
              )}>
                {item.price} zł{item.unit ? `/${item.unit}` : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected items */}
      {selectedItems.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t.calculator?.selectedItems || 'Выбранные услуги'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedItems([])}
              className="text-destructive hover:text-destructive h-auto py-1 px-2"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              {t.calculator?.clear || 'Очистить'}
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedItems.map((selected, i) => (
              <div
                key={selected.item.id}
                className="flex items-center gap-2 p-3 bg-accent/30 rounded-xl"
                style={{ animation: `fade-in 0.3s ease-out ${i * 0.05}s both` }}
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-sm block truncate">{selected.item.name}</span>
                  <span className="text-xs text-muted-foreground">{selected.item.price} zł</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(selected.item.id, selected.quantity - 1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={selected.quantity}
                    onChange={(e) => updateQuantity(selected.item.id, parseInt(e.target.value) || 0)}
                    className="w-14 h-8 text-center text-sm p-1"
                    inputMode="numeric"
                  />
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(selected.item.id, selected.quantity + 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <span className="w-16 text-right font-semibold text-primary text-sm">
                  {selected.item.price * selected.quantity} zł
                </span>
              </div>
            ))}
          </div>

          {/* Total & send */}
          <div className="pt-4 border-t border-border animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium">{t.calculator?.total || 'Итого'}</span>
              <span className="text-2xl font-bold text-primary">{total} zł</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {t.calculator?.minOrder}
            </p>
            <Button onClick={handleSend} className="w-full bg-fresh hover:bg-fresh/90 text-white shadow-glow h-12">
              <Send className="w-4 h-4 mr-2" />
              {t.form?.sendToForm || 'Отправить в форму заявки'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniServiceCalculator;
