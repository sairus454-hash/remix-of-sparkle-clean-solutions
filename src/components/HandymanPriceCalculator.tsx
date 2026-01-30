import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Minus, Trash2, Wrench, Droplet, Lightbulb, Frame } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface PriceItem {
  id: string;
  name: string;
  price: number;
  isFrom?: boolean;
  icon: LucideIcon;
}

interface SelectedItem {
  item: PriceItem;
  quantity: number;
}

const HandymanPriceCalculator = () => {
  const { t } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const availableItems: PriceItem[] = [
    // Plumbing
    { id: 'faucet', name: 'Wymiana/montaż kranu baterii', price: 120, icon: Droplet },
    { id: 'siphon', name: 'Montaż/wymiana syfonu w umywalce', price: 120, icon: Droplet },
    { id: 'sink', name: 'Montaż umywalki', price: 180, icon: Droplet },
    { id: 'toilet', name: 'Montaż sedesu', price: 220, icon: Droplet },
    { id: 'sewer', name: 'Czyszczenie kanalizacji', price: 400, icon: Droplet },
    // Mounting
    { id: 'curtainRod', name: 'Montaż karniszy', price: 120, icon: Frame },
    { id: 'shelf', name: 'Montaż/wymiana półki, lustra', price: 100, icon: Frame },
    { id: 'pictures', name: 'Montaż zawieszenie obrazów, tablic, plansz itp.', price: 80, icon: Frame },
    { id: 'furniture', name: 'Skręcanie mebli', price: 80, isFrom: true, icon: Wrench },
    // Electrical
    { id: 'bulb', name: 'Wymiana żarówki, halogenu, jarzeniówki', price: 50, icon: Lightbulb },
    { id: 'socket', name: 'Montaż/wymiana gniazdka elektrycznego', price: 40, icon: Lightbulb },
    { id: 'lamp', name: 'Montaż/wymiana podłączenie żyrandola lampy', price: 100, icon: Lightbulb },
    { id: 'stove', name: 'Podłączenie płyty elektrycznej', price: 200, icon: Lightbulb },
    { id: 'repair', name: 'Naprawa połączeń elektrycznych', price: 100, isFrom: true, icon: Lightbulb },
    { id: 'diagnostic', name: 'Diagnostyka elektryczna', price: 350, icon: Lightbulb },
    { id: 'switch', name: 'Montaż/wymiana przełącznika', price: 50, icon: Lightbulb },
  ];

  const addItem = (item: PriceItem) => {
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
    <Card className="shadow-card animate-fade-up border-2 border-yellow-400/30">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-yellow-600" />
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
            {availableItems.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto py-3 px-3 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                onClick={() => addItem(item)}
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mr-3">
                  <item.icon className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block truncate text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.isFrom ? `${t.prices.from} ` : ''}{item.price} zł
                  </span>
                </div>
                <Plus className="w-4 h-4 ml-2 flex-shrink-0 text-yellow-600" />
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
                  className="flex items-center justify-between p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                      <selected.item.icon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium text-foreground block truncate">
                        {selected.item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {selected.item.isFrom ? `${t.prices.from} ` : ''}{selected.item.price} zł
                      </span>
                    </div>
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
                    <span className="font-semibold text-yellow-600">
                      {selected.item.price * selected.quantity} zł
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
            <span className="text-2xl font-bold text-yellow-600">
              {selectedItems.some(s => s.item.isFrom) ? `${t.prices.from} ` : ''}{calculateTotal()} zł
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t.calculator.note}
          </p>
          <p className="text-sm text-yellow-600 font-semibold mt-2">
            Minimalny zakup wynosi 180 zł
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandymanPriceCalculator;
