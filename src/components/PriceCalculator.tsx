import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Minus, Trash2 } from 'lucide-react';
interface PriceItem {
  id: string;
  name: string;
  price: number;
  unit?: string;
}
interface SelectedItem {
  item: PriceItem;
  quantity: number;
}
const PriceCalculator = () => {
  const {
    t
  } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const availableItems: PriceItem[] = [
  // Furniture
  {
    id: 'pouf',
    name: t.prices.items.pouf,
    price: 40
  }, {
    id: 'chair',
    name: t.prices.items.chair,
    price: 40
  }, {
    id: 'armchair',
    name: t.prices.items.armchair,
    price: 70
  }, {
    id: 'pillow',
    name: t.prices.items.pillow,
    price: 15
  }, {
    id: 'sofa2',
    name: t.prices.items.sofa2,
    price: 140
  }, {
    id: 'sofa3',
    name: t.prices.items.sofa3,
    price: 170
  }, {
    id: 'sofaCorner',
    name: t.prices.items.sofaCorner,
    price: 200
  }, {
    id: 'sofaCornerLarge',
    name: t.prices.items.sofaCornerLarge,
    price: 250
  }, {
    id: 'carpet',
    name: t.prices.items.carpet,
    price: 25,
    unit: 'm²'
  }, {
    id: 'mattressDouble',
    name: t.prices.items.mattressDouble,
    price: 180
  }, {
    id: 'mattressSingle',
    name: t.prices.items.mattressSingle,
    price: 140
  }, {
    id: 'bedHeadboard',
    name: t.prices.items.bedHeadboard,
    price: 100
  }, {
    id: 'bedFrame',
    name: t.prices.items.bedFrame,
    price: 100
  },
  // Leather Furniture
  {
    id: 'leatherPouf',
    name: t.prices.items.leatherPouf,
    price: 55
  }, {
    id: 'leatherChair',
    name: t.prices.items.leatherChair,
    price: 50
  }, {
    id: 'leatherArmchair',
    name: t.prices.items.leatherArmchair,
    price: 90
  }, {
    id: 'leatherSofa2',
    name: t.prices.items.leatherSofa2,
    price: 180
  }, {
    id: 'leatherSofa3',
    name: t.prices.items.leatherSofa3,
    price: 220
  }, {
    id: 'leatherSofaCorner',
    name: t.prices.items.leatherSofaCorner,
    price: 270
  },
  // Mattress with Drying
  {
    id: 'mattressSingleDry',
    name: t.prices.items.mattressSingleDry,
    price: 140
  }, {
    id: 'mattressSingleDry2',
    name: t.prices.items.mattressSingleDry2,
    price: 220
  }, {
    id: 'mattressDoubleDry',
    name: t.prices.items.mattressDoubleDry,
    price: 180
  }, {
    id: 'mattressDoubleDry2',
    name: t.prices.items.mattressDoubleDry2,
    price: 280
  },
  // Ozonation
  {
    id: 'ozone1room',
    name: t.prices.items.ozone1room,
    price: 120
  }, {
    id: 'ozone2room',
    name: t.prices.items.ozone2room,
    price: 200
  }, {
    id: 'ozone3room',
    name: t.prices.items.ozone3room,
    price: 300
  }, {
    id: 'ozoneOfficeSmall',
    name: t.prices.items.ozoneOfficeSmall,
    price: 250
  }, {
    id: 'ozoneOfficeLarge',
    name: t.prices.items.ozoneOfficeLarge,
    price: 400
  },
  // Other
  {
    id: 'carpetCovering',
    name: t.prices.items.carpetCovering,
    price: 25,
    unit: 'm²'
  }, {
    id: 'stroller',
    name: t.prices.items.stroller,
    price: 100
  }, {
    id: 'drying',
    name: t.prices.items.drying,
    price: 60
  }, {
    id: 'impregnation',
    name: t.prices.items.impregnation,
    price: 80
  }, {
    id: 'tileCleaning',
    name: t.prices.items.tileCleaning,
    price: 25,
    unit: 'm²'
  }];
  const addItem = (item: PriceItem) => {
    const existing = selectedItems.find(s => s.item.id === item.id);
    if (existing) {
      setSelectedItems(selectedItems.map(s => s.item.id === item.id ? {
        ...s,
        quantity: s.quantity + 1
      } : s));
    } else {
      setSelectedItems([...selectedItems, {
        item,
        quantity: 1
      }]);
    }
  };
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setSelectedItems(selectedItems.map(s => s.item.id === itemId ? {
        ...s,
        quantity: newQuantity
      } : s));
    }
  };
  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter(s => s.item.id !== itemId));
  };
  const calculateTotal = () => {
    return selectedItems.reduce((sum, s) => sum + s.item.price * s.quantity, 0);
  };
  const clearAll = () => {
    setSelectedItems([]);
  };
  return <Card className="shadow-card animate-fade-up">
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 border rounded-lg p-2 bg-muted/20">
            {availableItems.map(item => <Button key={item.id} variant="outline" size="sm" className="justify-start text-left h-auto py-3 px-3 touch-manipulation active:scale-95 transition-transform" onClick={() => addItem(item)}>
                <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="truncate text-sm">{item.name}</span>
              </Button>)}
          </div>
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-muted-foreground">
                {t.calculator.selectedItems}
              </Label>
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive h-auto py-2 px-3 touch-manipulation">
                <Trash2 className="w-4 h-4 mr-1" />
                {t.calculator.clear}
              </Button>
            </div>

            <div className="space-y-3">
              {selectedItems.map(selected => <div key={selected.item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 bg-accent/30 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground text-sm sm:text-base block leading-tight">
                      {selected.item.name}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {selected.item.price} {t.prices.currency}
                      {selected.item.unit && ` / ${selected.item.unit}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button variant="outline" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 touch-manipulation active:scale-95" onClick={() => updateQuantity(selected.item.id, selected.quantity - 1)}>
                        <Minus className="w-5 h-5 sm:w-4 sm:h-4" />
                      </Button>
                      <Input type="number" min="1" value={selected.quantity} onChange={e => updateQuantity(selected.item.id, parseInt(e.target.value) || 0)} className="w-14 sm:w-16 h-10 sm:h-9 text-center text-base" inputMode="numeric" />
                      <Button variant="outline" size="icon" className="h-10 w-10 sm:h-9 sm:w-9 touch-manipulation active:scale-95" onClick={() => updateQuantity(selected.item.id, selected.quantity + 1)}>
                        <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
                      </Button>
                    </div>

                    <div className="w-20 sm:w-24 text-right">
                      <span className="font-semibold text-primary text-base sm:text-lg">
                        {selected.item.price * selected.quantity} {t.prices.currency}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>}

        {/* Total */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{t.calculator.total}</span>
            <span className="text-2xl font-bold text-primary">
              {calculateTotal()} {t.prices.currency}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            {t.calculator.minOrder}
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            {t.calculator.minOrderOther}
          </p>
        </div>
      </CardContent>
    </Card>;
};
export default PriceCalculator;