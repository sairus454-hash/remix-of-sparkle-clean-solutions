import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Minus, Trash2, Wind } from 'lucide-react';
import PriceItem from '@/components/PriceItem';

interface OzoneItem {
  id: string;
  name: string;
  price: number;
}

interface SelectedItem {
  item: OzoneItem;
  quantity: number;
}

const OzonePriceCalculator = () => {
  const { t } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const ozoneItems: OzoneItem[] = [
    { id: 'ozone1room', name: t.prices.items.ozone1room, price: 120 },
    { id: 'ozone2room', name: t.prices.items.ozone2room, price: 200 },
    { id: 'ozone3room', name: t.prices.items.ozone3room, price: 300 },
    { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 250 },
    { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 400 },
  ];

  const addItem = (item: OzoneItem) => {
    const existing = selectedItems.find((s) => s.item.id === item.id);
    if (existing) {
      setSelectedItems(
        selectedItems.map((s) =>
          s.item.id === item.id ? { ...s, quantity: s.quantity + 1 } : s
        )
      );
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setSelectedItems(
        selectedItems.map((s) =>
          s.item.id === itemId ? { ...s, quantity: newQuantity } : s
        )
      );
    }
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((s) => s.item.id !== itemId));
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (sum, s) => sum + s.item.price * s.quantity,
      0
    );
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="space-y-8">
      {/* Price List */}
      <Card className="shadow-card animate-fade-up">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Wind className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
            <CardTitle className="font-serif text-xl">{t.prices.ozonation}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {ozoneItems.map((item, index) => (
            <PriceItem
              key={index}
              name={item.name}
              price={item.price}
              from={t.prices.from}
              currency={t.prices.currency}
            />
          ))}
        </CardContent>
      </Card>

      {/* Calculator */}
      <Card className="shadow-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="font-serif text-xl">{t.calculator.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Available Items */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              {t.calculator.selectItems}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ozoneItems.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-3 px-4"
                  onClick={() => addItem(item)}
                >
                  <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">
                  {t.calculator.selectedItems}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-destructive hover:text-destructive h-auto py-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t.calculator.clear}
                </Button>
              </div>

              <div className="space-y-2">
                {selectedItems.map((selected) => (
                  <div
                    key={selected.item.id}
                    className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-foreground truncate block">
                        {selected.item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t.prices.from} {selected.item.price} {t.prices.currency}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(selected.item.id, selected.quantity - 1)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={selected.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            selected.item.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-16 h-8 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(selected.item.id, selected.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="w-24 text-right ml-4">
                      <span className="font-semibold text-primary">
                        {selected.item.price * selected.quantity} {t.prices.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{t.calculator.total}</span>
              <span className="text-2xl font-bold text-primary">
                {t.prices.from} {calculateTotal()} {t.prices.currency}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t.calculator.note}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OzonePriceCalculator;
