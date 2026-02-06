import { useState, forwardRef, useImperativeHandle } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Plus, Minus, Trash2, Wrench, Droplet, Lightbulb, Frame, ChevronDown, ChevronUp, Send, Leaf } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CalculatorItem } from '@/types/calculator';

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

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  items: PriceItem[];
}

export interface HandymanCalculatorRef {
  getSelectedItems: () => CalculatorItem[];
  getTotal: () => number;
}

interface HandymanPriceCalculatorProps {
  onSendToForm?: (items: CalculatorItem[], total: number) => void;
}

const HandymanPriceCalculator = forwardRef<HandymanCalculatorRef, HandymanPriceCalculatorProps>(
  ({ onSendToForm }, ref) => {
    const { t } = useLanguage();
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [openCategories, setOpenCategories] = useState<string[]>(['plumbing']);

    const categories: Category[] = [
      {
        id: 'plumbing',
        name: t.handyman.plumbing,
        icon: Droplet,
        items: [
          { id: 'faucet', name: t.handyman.calcItems.faucet, price: 120, icon: Droplet },
          { id: 'siphon', name: t.handyman.calcItems.siphon, price: 120, icon: Droplet },
          { id: 'sink', name: t.handyman.calcItems.sink, price: 180, icon: Droplet },
          { id: 'toilet', name: t.handyman.calcItems.toilet, price: 220, icon: Droplet },
          { id: 'sewer', name: t.handyman.calcItems.sewer, price: 400, icon: Droplet },
        ],
      },
      {
        id: 'mounting',
        name: t.handyman.mounting,
        icon: Frame,
        items: [
          { id: 'curtainRod', name: t.handyman.calcItems.curtainRod, price: 120, icon: Frame },
          { id: 'shelf', name: t.handyman.calcItems.shelf, price: 100, icon: Frame },
          { id: 'pictures', name: t.handyman.calcItems.pictures, price: 80, icon: Frame },
          { id: 'furniture', name: t.handyman.calcItems.furnitureAssembly, price: 80, isFrom: true, icon: Wrench },
        ],
      },
      {
        id: 'electrical',
        name: t.handyman.electrical,
        icon: Lightbulb,
        items: [
          { id: 'bulb', name: t.handyman.calcItems.bulb, price: 50, icon: Lightbulb },
          { id: 'socket', name: t.handyman.calcItems.socket, price: 40, icon: Lightbulb },
          { id: 'lamp', name: t.handyman.calcItems.lamp, price: 100, icon: Lightbulb },
          { id: 'stove', name: t.handyman.calcItems.stove, price: 200, icon: Lightbulb },
          { id: 'repair', name: t.handyman.calcItems.repair, price: 100, isFrom: true, icon: Lightbulb },
          { id: 'diagnostic', name: t.handyman.calcItems.diagnostic, price: 350, icon: Lightbulb },
          { id: 'switch', name: t.handyman.calcItems.switch, price: 50, icon: Lightbulb },
        ],
      },
      {
        id: 'other',
        name: t.handyman.other,
        icon: Wrench,
        items: [
          { id: 'mailboxLock', name: t.handyman.calcItems.mailboxLock, price: 140, icon: Wrench },
        ],
      },
      {
        id: 'gardening',
        name: t.handyman.gardening,
        icon: Leaf,
        items: [
          { id: 'lawnMowing', name: t.handyman.calcItems.lawnMowing, price: 110, icon: Leaf },
          { id: 'treeTrimming', name: t.handyman.calcItems.treeTrimming, price: 110, icon: Leaf },
          { id: 'yardHelp', name: t.handyman.calcItems.yardHelp, price: 110, icon: Leaf },
        ],
      },
    ];

    const toggleCategory = (categoryId: string) => {
      setOpenCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    };

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

    const getCalculatorItems = (): CalculatorItem[] => {
      return selectedItems.map(s => ({
        id: s.item.id,
        name: s.item.name,
        price: s.item.price,
        quantity: s.quantity,
      }));
    };

    useImperativeHandle(ref, () => ({
      getSelectedItems: getCalculatorItems,
      getTotal: calculateTotal,
    }));

    const handleSendToForm = () => {
      if (selectedItems.length === 0) return;
      onSendToForm?.(getCalculatorItems(), calculateTotal());
    };

    return (
      <Card className="shadow-card animate-fade-up border-2 border-yellow-400/30 overflow-hidden">
        <CardHeader className="border-b border-border bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <CardTitle className="font-serif text-2xl">{t.calculator.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{t.calculator.selectItems}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Categories */}
          <div className="divide-y divide-border">
            {categories.map((category) => (
              <Collapsible 
                key={category.id}
                open={openCategories.includes(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-yellow-600" />
                      </div>
                      <span className="font-semibold text-lg">{category.name}</span>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {category.items.length}
                      </span>
                    </div>
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.items.map((item) => {
                      const isSelected = selectedItems.some(s => s.item.id === item.id);
                      return (
                        <Button
                          key={item.id}
                          variant="outline"
                          size="sm"
                          className={`justify-start text-left h-auto py-3 px-4 transition-all ${
                            isSelected 
                              ? 'border-yellow-400 bg-yellow-400/20 ring-1 ring-yellow-400/50' 
                              : 'hover:border-yellow-400/50 hover:bg-yellow-400/10'
                          }`}
                          onClick={() => addItem(item)}
                        >
                          <div className="flex-1 min-w-0">
                            <span className="block font-medium text-sm">{item.name}</span>
                            <span className="text-xs text-yellow-600 font-semibold">
                              {item.isFrom ? `${t.prices.from} ` : ''}{item.price} {t.prices.currency}
                            </span>
                          </div>
                          <Plus className="w-5 h-5 ml-2 flex-shrink-0 text-yellow-600" />
                        </Button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="border-t border-border bg-accent/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-semibold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-sm font-bold">
                    {selectedItems.reduce((sum, s) => sum + s.quantity, 0)}
                  </span>
                  {t.calculator.selectedItems}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t.calculator.clear}
                </Button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedItems.map((selected) => (
                  <div
                    key={selected.item.id}
                    className="flex items-center justify-between p-3 bg-card rounded-xl border border-yellow-400/30 shadow-sm"
                  >
                    <div className="flex-1 min-w-0 mr-2">
                      <span className="font-medium text-foreground block truncate text-sm">
                        {selected.item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selected.item.isFrom ? `${t.prices.from} ` : ''}{selected.item.price} {t.prices.currency} / шт.
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(selected.item.id, selected.quantity - 1)}
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
                        className="w-12 h-8 text-center text-sm font-semibold p-0"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(selected.item.id, selected.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="w-20 text-right ml-2">
                      <span className="font-bold text-yellow-600 text-sm">
                        {selected.item.price * selected.quantity} {t.prices.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="p-5 border-t-2 border-yellow-400/30 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold">{t.calculator.total}</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-yellow-600">
                  {selectedItems.some(s => s.item.isFrom) ? `${t.prices.from} ` : ''}{calculateTotal()}
                </span>
                <span className="text-xl font-bold text-yellow-600 ml-1">{t.prices.currency}</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground flex items-start gap-2">
                <span className="text-yellow-500">ℹ️</span>
                {t.calculator.note}
              </p>
              <p className="text-yellow-600 font-semibold flex items-start gap-2 bg-yellow-400/20 rounded-lg p-2">
                <span>⚠️</span>
                {t.handyman.minOrderNote}
              </p>
            </div>

            {/* Send to Form Button */}
            {selectedItems.length > 0 && onSendToForm && (
              <Button
                onClick={handleSendToForm}
                className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-yellow-900 shadow-lg transition-all h-11 touch-manipulation active:scale-[0.98]"
              >
                <Send className="w-4 h-4 mr-2" />
                {t.form.sendToForm}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

HandymanPriceCalculator.displayName = 'HandymanPriceCalculator';

export default HandymanPriceCalculator;
