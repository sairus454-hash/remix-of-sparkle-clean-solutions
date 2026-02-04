import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Trash2 } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Sofa, Car, BedDouble, Droplets, Sparkles } from 'lucide-react';

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

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: PriceItem[];
}

const PriceCalculatorContent = () => {
  const { t } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'furniture',
      name: t.prices.furniture,
      icon: <Sofa className="w-5 h-5" />,
      items: [
        { id: 'pouf', name: t.prices.items.pouf, price: 40 },
        { id: 'chair', name: t.prices.items.chair, price: 40 },
        { id: 'armchair', name: t.prices.items.armchair, price: 70 },
        { id: 'pillow', name: t.prices.items.pillow, price: 15 },
        { id: 'sofa2', name: t.prices.items.sofa2, price: 140 },
        { id: 'sofa3', name: t.prices.items.sofa3, price: 170 },
        { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 200 },
        { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 250 },
        { id: 'carpet', name: t.prices.items.carpet, price: 25, unit: 'm²' },
      ],
    },
    {
      id: 'auto',
      name: t.prices.autoCleaning,
      icon: <Car className="w-5 h-5" />,
      items: [
        { id: 'autoSeats', name: t.prices.items.autoSeats, price: 200 },
        { id: 'autoCeiling', name: t.prices.items.autoCeiling, price: 150 },
        { id: 'autoTrunk', name: t.prices.items.autoTrunk, price: 100 },
        { id: 'autoFloor', name: t.prices.items.autoFloor, price: 80 },
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 550 },
        { id: 'autoTruckCabin', name: t.prices.items.autoTruckCabin, price: 650 },
        { id: 'autoVanCabin', name: t.prices.items.autoVanCabin, price: 400 },
      ],
    },
    {
      id: 'mattress',
      name: t.prices.mattressTitle,
      icon: <BedDouble className="w-5 h-5" />,
      items: [
        { id: 'mattressDouble', name: t.prices.items.mattressDouble, price: 180 },
        { id: 'mattressSingle', name: t.prices.items.mattressSingle, price: 140 },
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 100 },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 100 },
        { id: 'mattressSingleDry', name: t.prices.items.mattressSingleDry, price: 140 },
        { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 220 },
        { id: 'mattressDoubleDry', name: t.prices.items.mattressDoubleDry, price: 180 },
        { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 280 },
      ],
    },
    {
      id: 'ozone',
      name: t.prices.ozonation,
      icon: <Droplets className="w-5 h-5" />,
      items: [
        { id: 'ozone1room', name: t.prices.items.ozone1room, price: 120 },
        { id: 'ozone2room', name: t.prices.items.ozone2room, price: 200 },
        { id: 'ozone3room', name: t.prices.items.ozone3room, price: 300 },
        { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 250 },
        { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 400 },
      ],
    },
    {
      id: 'other',
      name: t.prices.other,
      icon: <Sparkles className="w-5 h-5" />,
      items: [
        { id: 'carpetCovering', name: t.prices.items.carpetCovering, price: 25, unit: 'm²' },
        { id: 'stroller', name: t.prices.items.stroller, price: 100 },
        { id: 'drying', name: t.prices.items.drying, price: 60 },
        { id: 'impregnation', name: t.prices.items.impregnation, price: 80 },
        { id: 'tileCleaning', name: t.prices.items.tileCleaning, price: 25, unit: 'm²' },
      ],
    },
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
    return selectedItems.reduce((sum, s) => sum + s.item.price * s.quantity, 0);
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="space-y-4">
      {/* Categories with items */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          {t.calculator.selectItems}
        </Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <Collapsible
              key={category.id}
              open={openCategory === category.id}
              onOpenChange={(open) => setOpenCategory(open ? category.id : null)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {category.icon}
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    openCategory === category.id ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                  {category.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3 hover:bg-accent/50"
                      onClick={() => addItem(item)}
                    >
                      <Plus className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                      <span className="truncate text-xs">{item.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {item.price} {t.prices.currency}
                        {item.unit && `/${item.unit}`}
                      </span>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">
              {t.calculator.selectedItems}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-destructive hover:text-destructive h-auto py-1 px-2"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              {t.calculator.clear}
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedItems.map((selected) => (
              <div
                key={selected.item.id}
                className="flex items-center gap-2 p-2 bg-accent/30 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground text-xs block truncate">
                    {selected.item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selected.item.price} {t.prices.currency}
                    {selected.item.unit && ` / ${selected.item.unit}`}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      updateQuantity(selected.item.id, selected.quantity - 1)
                    }
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={selected.quantity}
                    onChange={(e) =>
                      updateQuantity(selected.item.id, parseInt(e.target.value) || 0)
                    }
                    className="w-12 h-7 text-center text-sm p-1"
                    inputMode="numeric"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      updateQuantity(selected.item.id, selected.quantity + 1)
                    }
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <div className="w-16 text-right">
                  <span className="font-semibold text-primary text-sm">
                    {selected.item.price * selected.quantity} {t.prices.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">{t.calculator.total}</span>
          <span className="text-xl font-bold text-primary">
            {t.prices.from} {calculateTotal()} {t.prices.currency}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{t.calculator.note}</p>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          {t.calculator.minOrder}
        </p>
      </div>
    </div>
  );
};

export default PriceCalculatorContent;
