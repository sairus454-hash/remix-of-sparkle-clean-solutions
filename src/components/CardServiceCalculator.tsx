import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Trash2, Send, CheckCircle2, Zap, ArrowRight, Check } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { toast } from 'sonner';
import { CalculatorItem } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickOrderDialog from './QuickOrderDialog';

interface ServiceCardItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit?: string;
  promoBadge?: string;
}

interface CardServiceCalculatorProps {
  items: ServiceCardItem[];
  category?: string;
  onSendToForm?: (items: CalculatorItem[], total: number) => void;
  onQuickOrder?: (items: CalculatorItem[], total: number) => void;
}

/* Cascade scroll-reveal grid */
const CascadeGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
    {children}
  </div>
);

/* Individual card with IntersectionObserver cascade */
const CascadeCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = index * (isMobile ? 25 : 35);
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: '80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, isMobile]);

  const angle = (index * 55) % 360;
  const radius = isMobile ? 15 : 25;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translate3d(0,0,0) scale(1)'
          : `translate3d(${x}px,${y}px,0) scale(0.93)`,
        transitionDuration: isMobile ? '350ms' : '450ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

const CardServiceCalculator = ({ items, category, onSendToForm, onQuickOrder }: CardServiceCalculatorProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{ item: ServiceCardItem; quantity: number }[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [justRemoved, setJustRemoved] = useState<string | null>(null);

  const addItem = (item: ServiceCardItem) => {
    const existing = selectedItems.find((s) => s.item.id === item.id);
    if (existing) {
      // Toggle: remove if already selected with qty 1
      if (existing.quantity === 1) {
        setJustRemoved(item.id);
        setTimeout(() => {
          setSelectedItems(prev => prev.filter((s) => s.item.id !== item.id));
          setJustRemoved(null);
        }, 300);
        return;
      }
      setSelectedItems(selectedItems.map((s) =>
        s.item.id === item.id ? { ...s, quantity: s.quantity + 1 } : s
      ));
    } else {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 600);
  };

  const [removingListItemId, setRemovingListItemId] = useState<string | null>(null);

  const animatedRemoveFromList = (itemId: string) => {
    setRemovingListItemId(itemId);
    setTimeout(() => {
      setSelectedItems(prev => prev.filter((s) => s.item.id !== itemId));
      setRemovingListItemId(null);
    }, 300);
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      animatedRemoveFromList(itemId);
    } else {
      setSelectedItems(selectedItems.map((s) =>
        s.item.id === itemId ? { ...s, quantity: qty } : s
      ));
    }
  };

  const isSelected = (id: string) => selectedItems.some(s => s.item.id === id);
  const getQty = (id: string) => selectedItems.find(s => s.item.id === id)?.quantity || 0;

  const total = selectedItems.reduce((sum, s) => sum + s.item.price * s.quantity, 0);

  const handleSendToContacts = () => {
    if (selectedItems.length === 0) return;
    const calcItems: CalculatorItem[] = selectedItems.map(s => ({
      id: s.item.id,
      name: s.item.name,
      price: s.item.price,
      quantity: s.quantity,
      category,
    }));
    // Save to sessionStorage for ContactForm to pick up
    try {
      const existing = JSON.parse(sessionStorage.getItem('mc_calculator_items') || '[]');
      const merged = [...existing];
      calcItems.forEach(item => {
        const idx = merged.findIndex((e: CalculatorItem) => e.id === item.id);
        if (idx >= 0) {
          merged[idx].quantity = (merged[idx].quantity || 1) + item.quantity;
        } else {
          merged.push(item);
        }
      });
      const newTotal = merged.reduce((s: number, i: CalculatorItem) => s + i.price * (i.quantity || 1), 0);
      sessionStorage.setItem('mc_calculator_items', JSON.stringify(merged));
      sessionStorage.setItem('mc_calculator_total', String(newTotal));
    } catch {}
    toast.success(t.form?.addedToOrder || 'Добавлено в заявку ✓', {
      duration: 2000,
      description: `${calcItems.length} ${calcItems.length === 1 ? 'услуга' : 'услуг'} — ${total} zł`,
      action: {
        label: t.form?.fullOrder || 'Общая заявка',
        onClick: () => navigate('/contacts'),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Cards grid */}
      <CascadeGrid>
        {items.map((item, index) => {
          const selected = isSelected(item.id);
          const qty = getQty(item.id);
          const wasJustAdded = justAdded === item.id;
          const wasJustRemoved = justRemoved === item.id;

          return (
            <CascadeCard key={item.id} index={index}>
              <Popover open={popoverId === item.id} onOpenChange={(open) => {
                if (open) {
                  if (isSelected(item.id) && getQty(item.id) === 1) {
                    // Toggle deselect
                    addItem(item);
                    setPopoverId(null);
                    return;
                  }
                  if (!isSelected(item.id)) addItem(item);
                  setPopoverId(item.id);
                } else {
                  setPopoverId(null);
                }
              }}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "relative flex flex-col items-center text-center rounded-2xl border overflow-hidden transition-all duration-500 group cursor-pointer w-full",
                      "hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.35)] hover:-translate-y-2",
                      selected && !wasJustRemoved
                        ? "border-primary bg-primary/5 shadow-card ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/40",
                      wasJustAdded && "scale-[1.03]",
                      wasJustRemoved && "animate-scale-out opacity-70 ring-0 border-destructive/30"
                    )}
                  >
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1] rounded-2xl bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2] overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>

                  {/* Selection badge */}
                  {selected && (
                    <div className="absolute top-2 right-2 z-10">
                      {qty > 1 ? (
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-scale-in shadow-glow">
                          {qty}
                        </span>
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in drop-shadow-md" />
                      )}
                    </div>
                  )}

                  {/* Ripple */}
                  {wasJustAdded && (
                    <span className="absolute inset-0 bg-primary/10 animate-scale-in rounded-2xl pointer-events-none z-20" />
                  )}

                  {/* Image */}
                  <div className="w-full aspect-square overflow-hidden bg-accent/20 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700 ease-out",
                        "group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-[1.1]",
                        selected && "brightness-95"
                      )}
                    />
                    {/* Bottom gradient on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Hover hint or quantity overlay */}
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-[3]",
                      selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <span className={cn(
                        "px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-lg",
                        selected
                          ? "bg-primary/85 text-primary-foreground"
                          : "bg-black/55 text-white"
                      )}>
                        {selected ? `× ${qty}` : (t.calculator?.clickHere || 'Kliknij tutaj')}
                      </span>
                    </div>
                  </div>

                  {/* Promo badge */}
                  {item.promoBadge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md animate-pulse">
                        {item.promoBadge}
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-3 w-full">
                    <h3 className={cn(
                      "text-xs sm:text-sm font-medium leading-tight mb-1 transition-colors",
                      selected ? "text-foreground" : "text-foreground"
                    )}>
                      {item.name}
                    </h3>
                    {item.promoBadge ? (
                      <p className="text-xs sm:text-sm font-bold text-green-600 line-through-price">
                        <span className="line-through text-muted-foreground mr-1">{item.price} zł</span>
                        <span className="text-green-600 font-bold">0 zł</span>
                      </p>
                    ) : (
                      <p className={cn(
                        "text-sm sm:text-base font-bold transition-colors",
                        selected ? "text-primary" : "text-primary/80 group-hover:text-primary"
                      )}>
                        {item.price} zł{item.unit ? `/${item.unit}` : ''}
                      </p>
                    )}
                  </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent side="top" align="center" className="w-auto p-3 rounded-xl shadow-lg border-primary/20">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border-primary/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newQty = qty - 1;
                        updateQuantity(item.id, newQty);
                        if (newQty <= 0) setPopoverId(null);
                      }}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-bold text-foreground min-w-[2ch] text-center">{qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border-primary/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, qty + 1);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1.5">{item.price * qty} zł</p>
                </PopoverContent>
              </Popover>
            </CascadeCard>
          );
        })}
      </CascadeGrid>

      {/* Selected items summary */}
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
                className={cn(
                  "flex items-center gap-3 p-3 bg-accent/30 rounded-xl transition-all duration-300",
                  removingListItemId === selected.item.id && "opacity-0 scale-95 -translate-x-4"
                )}
              >
                <img
                  src={selected.item.image}
                  alt={selected.item.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
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
            <p className="text-xs text-muted-foreground mb-1">
              {t.calculator?.minOrder}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              {t.calculator?.minOrderOther}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button onClick={() => {
                const calcItems: CalculatorItem[] = selectedItems.map(s => ({
                  id: s.item.id, name: s.item.name, price: s.item.price, quantity: s.quantity, category,
                }));
                if (onQuickOrder) {
                  onQuickOrder(calcItems, total);
                } else {
                  setQuickOrderOpen(true);
                }
              }} className="w-full bg-fresh hover:bg-fresh/90 text-white shadow-glow h-12">
                <Zap className="w-4 h-4 mr-2" />
                {t.form?.quickOrder || 'Быстрый заказ'}
              </Button>
              <Button onClick={handleSendToContacts} variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary/10 h-12">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t.form?.addToFullOrder || 'Добавить в общую заявку'}
              </Button>
            </div>
          </div>

          <QuickOrderDialog
            open={quickOrderOpen}
            onOpenChange={setQuickOrderOpen}
            items={selectedItems.map(s => ({
              id: s.item.id,
              name: s.item.name,
              price: s.item.price,
              quantity: s.quantity,
              category,
            }))}
            total={total}
          />
        </div>
      )}
    </div>
  );
};

export default CardServiceCalculator;
