 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useLanguage } from '@/i18n/LanguageContext';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Plus, Minus, Trash2, Send, Sparkles, Square, LayoutGrid, Grid3X3, Maximize2, Home, Sun, Fence } from 'lucide-react';
 import { CalculatorItem } from '@/types/calculator';
 
 interface PriceItem {
   id: string;
   name: string;
   price: number;
   icon: React.ReactNode;
 }
 
 interface SelectedItem {
   item: PriceItem;
   quantity: number;
 }
 
 interface WindowsPriceCalculatorProps {
   onSendToForm?: (items: CalculatorItem[], total: number) => void;
 }
 
 const WindowsPriceCalculator = ({ onSendToForm }: WindowsPriceCalculatorProps) => {
   const { t } = useLanguage();
   const navigate = useNavigate();
   const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
 
   const priceItems: PriceItem[] = [
     { 
       id: 'windowSingle', 
       name: t.windows?.items?.single || 'Одностворчатое окно', 
       price: 40,
       icon: <Square className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'windowDouble', 
       name: t.windows?.items?.double || 'Двухстворчатое окно', 
       price: 50,
       icon: <LayoutGrid className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'windowTriple', 
       name: t.windows?.items?.triple || 'Трёхстворчатое окно', 
       price: 80,
       icon: <Grid3X3 className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'windowBalcony', 
       name: t.windows?.items?.balcony || 'Балконное окно', 
       price: 60,
       icon: <Home className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'windowTerrace', 
       name: t.windows?.items?.terrace || 'Террасное окно', 
       price: 85,
       icon: <Maximize2 className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'windowAttic', 
       name: t.windows?.items?.attic || 'Мансардное окно', 
       price: 40,
       icon: <Sun className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
     },
     { 
       id: 'balustrade', 
       name: t.windows?.items?.balustrade || 'Балюстрада', 
       price: 40,
       icon: <Fence className="w-5 h-5 text-primary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
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
 
   const getCalculatorItems = (): CalculatorItem[] => {
     return selectedItems.map(s => ({
       id: s.item.id,
       name: s.item.name,
       price: s.item.price,
       quantity: s.quantity,
     }));
   };
 
   const handleSendToForm = () => {
     if (selectedItems.length === 0) return;
     
     const items = getCalculatorItems();
     const total = calculateTotal();
     
     if (onSendToForm) {
       onSendToForm(items, total);
     } else {
       navigate('/contacts', { 
         state: { 
           calculatorItems: items, 
           calculatorTotal: total 
         } 
       });
     }
   };
 
   return (
     <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-card border border-border">
       <div className="flex items-center gap-3 mb-6">
         <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
           <Sparkles className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
         </div>
         <div>
           <h3 className="font-serif text-xl font-bold text-foreground">
             {t.windows?.calcTitle || 'Калькулятор мойки окон'}
           </h3>
           <p className="text-sm text-muted-foreground">
             {t.windows?.calcSubtitle || 'Рассчитайте стоимость услуги'}
           </p>
         </div>
       </div>
 
       {/* Price Items */}
       <div className="space-y-2 mb-6">
         <Label className="text-sm font-medium text-muted-foreground">
           {t.calculator?.selectItems || 'Выберите услуги'}
         </Label>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
           {priceItems.map((item) => (
             <Button
               key={item.id}
               variant="ghost"
               size="sm"
               className="justify-start text-left h-auto py-3 px-4 hover:bg-accent/50 border border-border rounded-xl"
               onClick={() => addItem(item)}
             >
               <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                 {item.icon}
               </div>
               <span className="truncate text-sm flex-1">{item.name}</span>
               <span className="ml-2 text-sm font-semibold text-primary">
                 {item.price} {t.prices?.currency || 'PLN'}
               </span>
             </Button>
           ))}
         </div>
       </div>
 
       {/* Selected Items */}
       {selectedItems.length > 0 && (
         <div className="space-y-3 mb-6">
           <div className="flex items-center justify-between">
             <Label className="text-sm font-medium text-muted-foreground">
               {t.calculator?.selectedItems || 'Выбранные услуги'}
             </Label>
             <Button
               variant="ghost"
               size="sm"
               onClick={clearAll}
               className="text-destructive hover:text-destructive h-auto py-1 px-2"
             >
               <Trash2 className="w-3 h-3 mr-1" />
               {t.calculator?.clear || 'Очистить'}
             </Button>
           </div>
 
           <div className="space-y-2 max-h-48 overflow-y-auto">
             {selectedItems.map((selected) => (
               <div
                 key={selected.item.id}
                 className="flex items-center gap-2 p-3 bg-accent/30 rounded-xl"
               >
                 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                   {selected.item.icon}
                 </div>
                 <div className="flex-1 min-w-0">
                   <span className="font-medium text-foreground text-sm block truncate">
                     {selected.item.name}
                   </span>
                   <span className="text-xs text-muted-foreground">
                     {selected.item.price} {t.prices?.currency || 'PLN'}
                   </span>
                 </div>
 
                 <div className="flex items-center gap-1">
                   <Button
                     variant="outline"
                     size="icon"
                     className="h-8 w-8"
                     onClick={() => updateQuantity(selected.item.id, selected.quantity - 1)}
                   >
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
                   <Button
                     variant="outline"
                     size="icon"
                     className="h-8 w-8"
                     onClick={() => updateQuantity(selected.item.id, selected.quantity + 1)}
                   >
                     <Plus className="w-3 h-3" />
                   </Button>
                 </div>
 
                 <div className="w-20 text-right">
                   <span className="font-semibold text-primary text-sm">
                     {selected.item.price * selected.quantity} {t.prices?.currency || 'PLN'}
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
           <span className="text-lg font-medium">{t.calculator?.total || 'Итого'}</span>
           <span className="text-2xl font-bold text-primary">
             {t.prices?.from || 'от'} {calculateTotal()} {t.prices?.currency || 'PLN'}
           </span>
         </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            {t.calculator?.minOrder || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {t.calculator?.minOrderOther || 'Минимальный заказ для других населённых пунктов — 400 zł'}
          </p>
         
         {/* Send to Form Button */}
         {selectedItems.length > 0 && (
           <Button
             onClick={handleSendToForm}
             className="w-full mt-4 bg-fresh hover:bg-fresh/90 text-white shadow-glow transition-all h-12 touch-manipulation active:scale-[0.98]"
           >
             <Send className="w-4 h-4 mr-2" />
             {t.form?.sendToForm || 'Отправить в форму заявки'}
           </Button>
         )}
       </div>
     </div>
   );
 };
 
 export default WindowsPriceCalculator;