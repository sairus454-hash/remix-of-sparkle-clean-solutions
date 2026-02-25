import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Plus, Minus, Trash2, Send, Percent, Gift, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Sofa, Car, BedDouble, Droplets, Sparkles, Square, Wrench, Home, Armchair } from 'lucide-react';
import { CalculatorItem } from '@/types/calculator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useDiscountCalculator, getDiscountTiers } from '@/hooks/useDiscountCalculator';
import { useIsMobile } from '@/hooks/use-mobile';

interface PriceItem {
  id: string;
  name: string;
  price: number;
  unit?: string;
  subcategory?: string;
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
  const isMobile = useIsMobile();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  
  // Cleaning slider state
  const [cleaningArea, setCleaningArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  
  const STANDARD_PRICE_PER_M2 = 6;
  const GENERAL_PRICE_PER_M2 = 8;
  
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
    // Collapse cart on mobile when adding items
    if (isMobile) {
      setIsCartExpanded(false);
    }
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
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 100 },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 100 },
        { id: 'expressRefreshFurniture', name: t.prices.items.expressRefresh, price: 150 },
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
        { id: 'expressRefreshMattress', name: t.prices.items.expressRefresh, price: 150 },
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
          { id: 'faucet', name: t.handyman?.calcItems?.faucet || 'Замена/монтаж крана', price: 120, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'siphon', name: t.handyman?.calcItems?.siphon || 'Монтаж/замена сифона', price: 120, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'sink', name: t.handyman?.calcItems?.sink || 'Монтаж раковины', price: 180, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'toilet', name: t.handyman?.calcItems?.toilet || 'Монтаж унитаза', price: 220, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'sewer', name: t.handyman?.calcItems?.sewer || 'Чистка канализации', price: 250, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'washingMachine', name: t.handyman?.calcItems?.washingMachine || 'Подключение стиральной машины', price: 140, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'dishwasher', name: t.handyman?.calcItems?.dishwasher || 'Подключение посудомоечной машины', price: 140, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'bathroomFan', name: t.handyman?.calcItems?.bathroomFan || 'Установка вентилятора в ванной', price: 80, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'bidet', name: t.handyman?.calcItems?.bidet || 'Установка биде', price: 220, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'urinal', name: t.handyman?.calcItems?.urinal || 'Установка писсуара', price: 200, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'hoseReplacement', name: t.handyman?.calcItems?.hoseReplacement || 'Замена шлангов для смесителя', price: 50, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'plumbingDemontage', name: t.handyman?.calcItems?.plumbingDemontage || 'Демонтаж сантехники', price: 80, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'sealingJoints', name: t.handyman?.calcItems?.sealingJoints || 'Герметизация швов', price: 40, unit: 'm²', subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'showerCabinInstall', name: t.handyman?.calcItems?.showerCabinInstall || 'Установка душевой кабины', price: 450, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'showerTrayInstall', name: t.handyman?.calcItems?.showerTrayInstall || 'Установка поддона', price: 200, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'bathtubInstall', name: t.handyman?.calcItems?.bathtubInstall || 'Установка ванны', price: 300, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'bathroomAccessories', name: t.handyman?.calcItems?.bathroomAccessories || 'Установка аксессуаров в ванной', price: 30, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          { id: 'wallMountedShower', name: t.handyman?.calcItems?.wallMountedShower || 'Монтаж навесного душа', price: 200, subcategory: t.handyman?.subcategories?.plumbing || '🔧 Сантехника' },
          // Монтаж
          { id: 'curtainRod', name: t.handyman?.calcItems?.curtainRod || 'Монтаж карнизов', price: 120, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          { id: 'shelf', name: t.handyman?.calcItems?.shelf || 'Монтаж полки/зеркала', price: 100, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          { id: 'pictures', name: t.handyman?.calcItems?.pictures || 'Навешивание картин/фото', price: 80, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          { id: 'furnitureAssembly', name: t.handyman?.calcItems?.furnitureAssembly || 'Сборка мебели', price: 80, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          { id: 'bedSofaRepair', name: t.handyman?.calcItems?.bedSofaRepair || 'Ремонт кроватей и диванов', price: 130, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          { id: 'wardrobeRepair', name: t.handyman?.calcItems?.wardrobeRepair || 'Ремонт шкафов-купе/приклеивание зеркал', price: 240, subcategory: t.handyman?.subcategories?.mounting || '🛠 Монтаж' },
          // Электрика
          { id: 'bulb', name: t.handyman?.calcItems?.bulb || 'Замена лампочки/стартера', price: 50, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'socket', name: t.handyman?.calcItems?.socket || 'Монтаж электрической розетки', price: 40, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'lamp', name: t.handyman?.calcItems?.lamp || 'Монтаж люстры/лампы', price: 100, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'stove', name: t.handyman?.calcItems?.stove || 'Подключение электроплиты', price: 200, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'repair', name: t.handyman?.calcItems?.repair || 'Ремонт электрики', price: 100, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'diagnostic', name: t.handyman?.calcItems?.diagnostic || 'Диагностика электрики', price: 350, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'switch', name: t.handyman?.calcItems?.switch || 'Монтаж/замена переключателя', price: 50, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'fuseReplacement', name: t.handyman?.calcItems?.fuseReplacement || 'Замена предохранителей', price: 120, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'lampRepair', name: t.handyman?.calcItems?.lampRepair || 'Ремонт люстры/светильника', price: 130, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          { id: 'chandelierInstall', name: t.handyman?.calcItems?.chandelierInstall || 'Монтаж/замена люстры с лампой', price: 130, subcategory: t.handyman?.subcategories?.electrical || '⚡ Электрика' },
          // Слесарные работы
          { id: 'mailboxLock', name: t.handyman?.calcItems?.mailboxLock || 'Замена замка на почт. ящике', price: 140, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          { id: 'doorHandle', name: t.handyman?.calcItems?.doorHandle || 'Установка/ремонт дверной ручки', price: 60, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          { id: 'doorCylinder', name: t.handyman?.calcItems?.doorCylinder || 'Установка/замена цилиндра замка', price: 100, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          { id: 'aluminumDoorRepair', name: t.handyman?.calcItems?.aluminumDoorRepair || 'Ремонт алюминиевых дверей', price: 200, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          { id: 'windowDoorAdjustment', name: t.handyman?.calcItems?.windowDoorAdjustment || 'Регулировка окон и дверей', price: 200, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          { id: 'fridgeHinges', name: t.handyman?.calcItems?.fridgeHinges || 'Ремонт петель холодильника', price: 200, subcategory: t.handyman?.subcategories?.locksmith || '🔑 Слесарные работы' },
          // Услуги огородника
          { id: 'lawnMowing', name: t.handyman?.calcItems?.lawnMowing || 'Покос травы', price: 110, subcategory: t.handyman?.subcategories?.gardening || '🌿 Услуги огородника' },
          { id: 'treeTrimming', name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев', price: 110, subcategory: t.handyman?.subcategories?.gardening || '🌿 Услуги огородника' },
          { id: 'yardHelp', name: t.handyman?.calcItems?.yardHelp || 'Помощь на участке', price: 110, subcategory: t.handyman?.subcategories?.gardening || '🌿 Услуги огородника' },
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
    // Collapse cart on mobile when adding items
    if (isMobile) {
      setIsCartExpanded(false);
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

  // Определяем категорию для каждого выбранного элемента
  const getCategoryForItem = (itemId: string): string => {
    if (itemId.startsWith('cleaning_')) return 'cleaning';
    for (const category of categories) {
      if (category.items.some(item => item.id === itemId)) {
        return category.id;
      }
    }
    return 'other';
  };

  // Применяем хук для расчёта скидок
  const discountInfo = useDiscountCalculator(
    selectedItems.map(s => ({
      id: s.item.id,
      price: s.item.price,
      quantity: s.quantity,
      category: getCategoryForItem(s.item.id),
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
      category: getCategoryForItem(s.item.id),
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
                  {category.items.map((item, index) => {
                    const showSubcategoryHeader = item.subcategory && 
                      (index === 0 || category.items[index - 1]?.subcategory !== item.subcategory);
                    return (
                      <div key={item.id}>
                        {showSubcategoryHeader && (
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-3 pb-1 px-3 border-b border-border/50 mb-1">
                            {item.subcategory}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start text-left h-auto py-2 px-3 hover:bg-accent/50 w-full"
                          onClick={() => addItem(item)}
                        >
                          <Plus className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                          <span className="text-xs sm:text-sm">{item.name}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Right Column - Selected Items (always visible on desktop, sticky on mobile) */}
      <div className="lg:w-80 xl:w-96 flex-shrink-0 sticky bottom-0 lg:relative lg:bottom-auto z-10 bg-background/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none pt-2 sm:pt-3 lg:pt-0 -mx-1 px-1 lg:mx-0 lg:px-0 border-t lg:border-t-0 border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] lg:shadow-none">
        <div className="lg:sticky lg:top-4 space-y-2 sm:space-y-3 lg:p-4 lg:bg-muted/30 lg:rounded-xl lg:border lg:border-border">
          {/* Header - clickable on mobile to expand/collapse */}
          <button
            onClick={() => isMobile && setIsCartExpanded(!isCartExpanded)}
            className="flex items-center justify-between w-full lg:cursor-default"
          >
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-muted-foreground pointer-events-none">
                {t.calculator.selectedItems}
              </Label>
              {selectedItems.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                  {selectedItems.length}
                </span>
              )}
              {/* Mobile expand indicator */}
              {isMobile && selectedItems.length > 0 && (
                <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform lg:hidden ${isCartExpanded ? 'rotate-180' : ''}`} />
              )}
            </div>
            {selectedItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="text-destructive hover:text-destructive h-auto py-1 px-2"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                {t.calculator.clear}
              </Button>
            )}
          </button>

          {/* Mobile: Compact summary when collapsed */}
          {isMobile && !isCartExpanded && selectedItems.length > 0 && (
            <div className="flex items-center justify-between px-2 py-1.5 bg-accent/30 rounded-lg lg:hidden">
              <span className="text-xs text-muted-foreground truncate max-w-[60%]">
                {selectedItems.slice(0, 2).map(s => s.item.name).join(', ')}
                {selectedItems.length > 2 && ` +${selectedItems.length - 2}`}
              </span>
              <span className="text-sm font-bold text-primary">
                {discountInfo.finalTotal} zł
              </span>
            </div>
          )}

          {/* Selected items list - collapsible on mobile */}
          <div className={`${isMobile && !isCartExpanded ? 'hidden' : 'block'} lg:block`}>
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
          </div>

          {/* Discount Tiers Info - Hidden on mobile */}
          <div className="hidden lg:block p-2 sm:p-3 bg-gradient-to-r from-primary/5 to-fresh/5 rounded-lg border border-primary/20">
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
            {/* Показываем информацию о скидке - hidden on mobile */}
            {discountInfo.hasDiscount && (
              <div className="hidden lg:block mb-2 sm:mb-3 p-2 sm:p-3 bg-fresh/10 rounded-lg border border-fresh/30">
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
            {/* Min order info - hidden on mobile */}
            <p className="hidden lg:block text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5 font-medium">
              {t.calculator.minOrder}
            </p>
             <p className="hidden lg:block text-[10px] sm:text-xs text-muted-foreground font-medium">
               {t.calculator.minOrderOther}
             </p>
             <p className="hidden lg:block text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
               {t.calculator.cleaningTempNote}
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
