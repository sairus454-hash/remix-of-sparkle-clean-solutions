import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Plus, Minus, Trash2, Send, Percent, Gift } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Sofa, Car, BedDouble, Droplets, Sparkles, Square, Wrench, Home, Armchair } from 'lucide-react';
import { CalculatorItem } from '@/types/calculator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useDiscountCalculator, getDiscountTiers } from '@/hooks/useDiscountCalculator';

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

interface PriceCalculatorContentProps {
  onSendToForm?: (items: CalculatorItem[], total: number) => void;
  onClose?: () => void;
}

const PriceCalculatorContent = ({ onSendToForm, onClose }: PriceCalculatorContentProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  // Cleaning slider state
  const [cleaningArea, setCleaningArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  
  const STANDARD_PRICE_PER_M2 = 8;
  const GENERAL_PRICE_PER_M2 = 10;
  
  const getCleaningPrice = () => {
    return cleaningArea * (cleaningType === 'standard' ? STANDARD_PRICE_PER_M2 : GENERAL_PRICE_PER_M2);
  };
  
  const addCleaningToCart = () => {
    const typeName = cleaningType === 'standard' 
      ? (t.cleaning?.standardCleaning || 'Стандартная уборка')
      : (t.cleaning?.generalCleaning || 'Генеральная уборка');
    const item: PriceItem = {
      id: `cleaning_${cleaningType}_${cleaningArea}`,
      name: `${typeName} ${cleaningArea} м²`,
      price: getCleaningPrice(),
    };
    
    // Remove any existing cleaning items of the same type and area
    const filteredItems = selectedItems.filter(s => !s.item.id.startsWith('cleaning_'));
    setSelectedItems([...filteredItems, { item, quantity: 1 }]);
  };

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
      id: 'leather',
      name: t.prices.leatherFurnitureTitle,
      icon: <Armchair className="w-5 h-5" />,
      items: [
        { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 55 },
        { id: 'leatherChair', name: t.prices.items.leatherChair, price: 50 },
        { id: 'leatherPillow', name: t.prices.items.leatherPillow, price: 10 },
        { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 90 },
        { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 180 },
        { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 220 },
        { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 250 },
      ],
    },
    {
      id: 'auto',
      name: t.prices.autoCleaning,
      icon: <Car className="w-5 h-5" />,
      items: [
        { id: 'autoSeats', name: t.prices.items.autoSeats, price: 300 },
        { id: 'autoLeatherSeats', name: t.prices.items.autoLeatherSeats, price: 350 },
        { id: 'autoCeiling', name: t.prices.items.autoCeiling, price: 100 },
        { id: 'autoTrunk', name: t.prices.items.autoTrunk, price: 80 },
        { id: 'autoFloor', name: t.prices.items.autoFloor, price: 100 },
        { id: 'autoDoorCard', name: t.prices.items.autoDoorCard, price: 40 },
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 450 },
        { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 550 },
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
     {
       id: 'windows',
       name: t.windows?.title || 'Мойка окон',
       icon: <Square className="w-5 h-5" />,
       items: [
         { id: 'windowSingle', name: t.windows?.items?.single || 'Одностворчатое окно', price: 40 },
         { id: 'windowDouble', name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50 },
         { id: 'windowTriple', name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80 },
         { id: 'windowBalcony', name: t.windows?.items?.balcony || 'Балконное окно', price: 60 },
         { id: 'windowTerrace', name: t.windows?.items?.terrace || 'Террасное окно', price: 85 },
         { id: 'windowAttic', name: t.windows?.items?.attic || 'Мансардное окно', price: 40 },
         { id: 'balustrade', name: t.windows?.items?.balustrade || 'Балюстрада', price: 40 },
       ],
     },
     {
       id: 'handyman',
       name: t.handyman?.title || 'Мастер на час',
       icon: <Wrench className="w-5 h-5" />,
       items: [
         // Сантехника
         { id: 'faucet', name: t.handyman?.calcItems?.faucet || 'Замена/монтаж крана', price: 120 },
         { id: 'siphon', name: t.handyman?.calcItems?.siphon || 'Монтаж/замена сифона', price: 120 },
         { id: 'sink', name: t.handyman?.calcItems?.sink || 'Монтаж раковины', price: 180 },
         { id: 'toilet', name: t.handyman?.calcItems?.toilet || 'Монтаж унитаза', price: 220 },
         { id: 'bidet', name: t.handyman?.calcItems?.bidet || 'Монтаж биде', price: 220 },
         { id: 'urinal', name: t.handyman?.calcItems?.urinal || 'Монтаж писсуара', price: 200 },
         { id: 'hoseReplacement', name: t.handyman?.calcItems?.hoseReplacement || 'Замена шлангов', price: 50 },
         // Монтаж
         { id: 'curtainRod', name: t.handyman?.calcItems?.curtainRod || 'Монтаж карнизов', price: 120 },
         { id: 'shelf', name: t.handyman?.calcItems?.shelf || 'Монтаж полки/зеркала', price: 100 },
         { id: 'bedSofaRepair', name: t.handyman?.calcItems?.bedSofaRepair || 'Ремонт кроватей и диванов', price: 130 },
         { id: 'wardrobeRepair', name: t.handyman?.calcItems?.wardrobeRepair || 'Ремонт шкафов-купе/зеркал', price: 240 },
         // Электрика
         { id: 'socket', name: t.handyman?.calcItems?.socket || 'Монтаж розетки', price: 40 },
         { id: 'lamp', name: t.handyman?.calcItems?.lamp || 'Монтаж люстры/лампы', price: 100 },
         { id: 'switch', name: t.handyman?.calcItems?.switch || 'Монтаж переключателя', price: 50 },
         { id: 'fuseReplacement', name: t.handyman?.calcItems?.fuseReplacement || 'Замена предохранителей', price: 120 },
         { id: 'lampRepair', name: t.handyman?.calcItems?.lampRepair || 'Ремонт люстры', price: 130 },
         { id: 'chandelierInstall', name: t.handyman?.calcItems?.chandelierInstall || 'Монтаж люстры с лампой', price: 130 },
         // Слесарные работы
         { id: 'mailboxLock', name: t.handyman?.calcItems?.mailboxLock || 'Замена замка почт. ящика', price: 140 },
         { id: 'doorHandle', name: t.handyman?.calcItems?.doorHandle || 'Замена дверной ручки', price: 60 },
         { id: 'doorCylinder', name: t.handyman?.calcItems?.doorCylinder || 'Замена цилиндра замка', price: 100 },
         { id: 'aluminumDoorRepair', name: t.handyman?.calcItems?.aluminumDoorRepair || 'Ремонт алюм. дверей', price: 200 },
         { id: 'windowDoorAdjustment', name: t.handyman?.calcItems?.windowDoorAdjustment || 'Регулировка окон/дверей', price: 200 },
         { id: 'fridgeHinges', name: t.handyman?.calcItems?.fridgeHinges || 'Замена петель холодильника', price: 200 },
         // Услуги огородника
         { id: 'lawnMowing', name: t.handyman?.calcItems?.lawnMowing || 'Покос травы (час)', price: 110 },
         { id: 'treeTrimming', name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев (час)', price: 110 },
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

  const clearAll = () => {
    setSelectedItems([]);
  };

  // Применяем хук для расчёта скидок
  const discountInfo = useDiscountCalculator(
    selectedItems.map(s => ({
      id: s.item.id,
      price: s.item.price,
      quantity: s.quantity,
    }))
  );

  const discountTiers = getDiscountTiers(language);

  const getCalculatorItems = (): CalculatorItem[] => {
    return selectedItems.map(s => ({
      id: s.item.id,
      name: s.item.name,
      price: s.item.price,
      quantity: s.quantity,
      unit: s.item.unit,
    }));
  };

  const handleSendToForm = () => {
    if (selectedItems.length === 0) return;
    
    const items = getCalculatorItems();
    // Используем finalTotal со скидкой
    const total = discountInfo.finalTotal;
    
    if (onSendToForm) {
      onSendToForm(items, total);
    } else {
      // Navigate to contacts page with data in URL state
      onClose?.();
      navigate('/contacts', { 
        state: { 
          calculatorItems: items, 
          calculatorTotal: total,
          discountPercent: discountInfo.discountPercent,
          discountAmount: discountInfo.discountAmount,
        } 
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Left Column - Categories with items */}
      <div className="flex-1 space-y-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2">
        <Label className="text-sm font-medium text-muted-foreground">
          {t.calculator.selectItems}
        </Label>
        <div className="space-y-2">
          {/* Cleaning Category with Slider */}
          <Collapsible
            open={openCategory === 'cleaning'}
            onOpenChange={(open) => setOpenCategory(open ? 'cleaning' : null)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Home className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">{t.cleaning?.service || 'Уборка'}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  openCategory === 'cleaning' ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 px-2">
              <div className="space-y-4 p-3 bg-accent/20 rounded-lg">
                {/* Cleaning Type Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{'Тип уборки'}</Label>
                  <RadioGroup 
                    value={cleaningType} 
                    onValueChange={(value) => setCleaningType(value as 'standard' | 'general')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="calc-standard" />
                      <Label htmlFor="calc-standard" className="text-xs cursor-pointer">
                        {t.cleaning?.standardCleaning || 'Стандартная'} ({STANDARD_PRICE_PER_M2} {t.prices.currency}/м²)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="calc-general" />
                      <Label htmlFor="calc-general" className="text-xs cursor-pointer">
                        {t.cleaning?.generalCleaning || 'Генеральная'} ({GENERAL_PRICE_PER_M2} {t.prices.currency}/м²)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Area Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">{'Площадь'}</Label>
                    <span className="text-sm font-bold text-primary">{cleaningArea} м²</span>
                  </div>
                  <Slider
                    value={[cleaningArea]}
                    onValueChange={(value) => setCleaningArea(value[0])}
                    min={20}
                    max={300}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>20 м²</span>
                    <span>300 м²</span>
                  </div>
                </div>
                
                {/* Price and Add Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground">{'Стоимость'}:</span>
                    <span className="ml-2 text-lg font-bold text-primary">{getCleaningPrice()} {t.prices.currency}</span>
                  </div>
                  <Button size="sm" onClick={addCleaningToCart}>
                    <Plus className="w-4 h-4 mr-1" />
                    {'Добавить'}
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Other Categories */}
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
                <div className="grid grid-cols-1 gap-1.5 pl-2">
                  {category.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className="justify-between text-left h-auto py-2.5 px-3 hover:bg-accent/50 w-full"
                      onClick={() => addItem(item)}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Plus className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span className="text-xs sm:text-sm">{item.name}</span>
                      </div>
                      <span className="ml-3 text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
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

      {/* Right Column - Selected Items (always visible on desktop, sticky on mobile) */}
      <div className="lg:w-80 xl:w-96 flex-shrink-0 sticky bottom-0 lg:relative lg:bottom-auto z-10 bg-background/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none pt-2 sm:pt-3 lg:pt-0 -mx-1 px-1 lg:mx-0 lg:px-0 border-t lg:border-t-0 border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] lg:shadow-none">
        <div className="lg:sticky lg:top-4 space-y-2 sm:space-y-3 lg:p-4 lg:bg-muted/30 lg:rounded-xl lg:border lg:border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-muted-foreground">
                {t.calculator.selectedItems}
              </Label>
              {selectedItems.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                  {selectedItems.length}
                </span>
              )}
            </div>
            {selectedItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-destructive hover:text-destructive h-auto py-1 px-2"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                {t.calculator.clear}
              </Button>
            )}
          </div>

          <div className="min-h-[48px] sm:min-h-[60px] lg:min-h-[120px] space-y-1 sm:space-y-1.5 max-h-32 sm:max-h-48 lg:max-h-64 overflow-y-auto rounded-lg border border-dashed border-border p-1 sm:p-2 bg-muted/10 lg:bg-background/50">
            {selectedItems.length === 0 ? (
              <div className="flex items-center justify-center gap-1.5 h-full min-h-[40px] sm:min-h-[50px] lg:min-h-[100px] text-muted-foreground">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-50" />
                <span className="text-[10px] sm:text-xs">
                  {language === 'ru' ? 'Выберите услуги' : 
                   language === 'en' ? 'Select services' : 
                   language === 'pl' ? 'Wybierz usługi' : 
                   'Виберіть послуги'}
                </span>
              </div>
            ) : (
              selectedItems.map((selected) => (
                <div
                  key={selected.item.id}
                  className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-accent/30 rounded-md sm:rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground text-[10px] sm:text-xs block truncate">
                      {selected.item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      onClick={() =>
                        updateQuantity(selected.item.id, selected.quantity - 1)
                      }
                    >
                      <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={selected.quantity}
                      onChange={(e) =>
                        updateQuantity(selected.item.id, parseInt(e.target.value) || 0)
                      }
                      className="w-8 sm:w-10 h-5 sm:h-6 text-center text-[10px] sm:text-xs p-0"
                      inputMode="numeric"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      onClick={() =>
                        updateQuantity(selected.item.id, selected.quantity + 1)
                      }
                    >
                      <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </Button>
                  </div>

                  <div className="w-12 sm:w-14 text-right">
                    <span className="font-semibold text-primary text-[10px] sm:text-xs">
                      {selected.item.price * selected.quantity} {t.prices.currency}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Discount Tiers Info - Compact on mobile */}
          <div className="p-2 sm:p-3 bg-gradient-to-r from-primary/5 to-fresh/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs font-semibold text-foreground">
                {language === 'ru' ? 'Скидки' : 
                 language === 'en' ? 'Discounts' : 
                 language === 'pl' ? 'Rabaty' : 
                 'Знижки'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {discountTiers.map((tier, index) => (
                <div 
                  key={index}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
                    selectedItems.length >= parseInt(tier.services) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tier.services}+: <span className="font-bold">{tier.discount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 sm:pt-3 border-t border-border">
            {/* Показываем информацию о скидке */}
            {discountInfo.hasDiscount && (
              <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-fresh/10 rounded-lg border border-fresh/30">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                  <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fresh" />
                  <span className="text-xs sm:text-sm font-semibold text-fresh">{discountInfo.discountReason}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground line-through">
                    {discountInfo.originalTotal} {t.prices.currency}
                  </span>
                  <span className="font-bold text-fresh">
                    -{discountInfo.discountAmount} {t.prices.currency}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium">{t.calculator.total}</span>
              <span className="text-lg sm:text-xl font-bold text-primary">
                {t.prices.from} {discountInfo.finalTotal} {t.prices.currency}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5 font-medium">
              {t.calculator.minOrder}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
              {t.calculator.minOrderOther}
            </p>
            
            {/* Send to Form Button */}
            {selectedItems.length > 0 && (
              <Button
                onClick={handleSendToForm}
                className="w-full mt-3 sm:mt-4 bg-fresh hover:bg-fresh/90 text-white shadow-glow transition-all h-10 sm:h-11 touch-manipulation active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="text-sm sm:text-base">{t.form.sendToForm}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorContent;
