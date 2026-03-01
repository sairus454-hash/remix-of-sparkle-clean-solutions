import { useLanguage } from '@/i18n/LanguageContext';
import PriceAccordion, { PriceAccordionCategory } from '@/components/PriceAccordion';
import { 
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
   Circle, Lamp, Sofa, LayoutGrid, Maximize2, Square,
   ShieldCheck, Grid3X3, Baby, Fan, CarFront, Sparkles, Sun, Fence,
   Wrench, Droplet, Lightbulb, Frame, Leaf
} from 'lucide-react';

const PriceSection = () => {
  const { t } = useLanguage();

  const categories: PriceAccordionCategory[] = [
    {
      id: 'cleaning',
      title: t.cleaning?.service || 'Уборка',
      description: t.cleaning?.subtitle || 'Профессиональная уборка помещений',
      minPrice: 6,
      icon: Home,
      items: [
        { name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'} (${t.cleaning?.pricePerMeter || 'за м²'})`, price: 6, unit: 'm²', icon: Home },
        { name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'} (${t.cleaning?.pricePerMeter || 'за м²'})`, price: 8, unit: 'm²', icon: Sparkles },
        { name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'} 50 м²`, price: 300, icon: Home },
        { name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'} 80 м²`, price: 480, icon: Home },
        { name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'} 100 м²`, price: 600, icon: Home },
        { name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'} 50 м²`, price: 400, icon: Sparkles },
        { name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'} 80 м²`, price: 640, icon: Sparkles },
        { name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'} 100 м²`, price: 800, icon: Sparkles },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктів — 300 zł'}`,
    },
    {
      id: 'furniture',
      title: t.prices.furniture,
      description: t.prices.furnitureDesc,
      minPrice: 10,
      icon: Armchair,
      items: [
        { name: t.prices.items.pouf, price: 40, icon: Circle },
        { name: t.prices.items.chair, price: 40, icon: Lamp },
        { name: t.prices.items.pillow, price: 10, icon: Square },
        { name: t.prices.items.armchair, price: 70, icon: Armchair },
        { name: t.prices.items.sofa2, price: 140, icon: Sofa },
        { name: t.prices.items.sofa3, price: 170, icon: Sofa },
        { name: t.prices.items.sofaCorner, price: 200, icon: LayoutGrid },
        { name: t.prices.items.sofaCornerLarge, price: 250, icon: Maximize2 },
        { name: t.prices.items.bedHeadboard, price: 100, icon: BedDouble },
        { name: t.prices.items.bedFrame, price: 100, icon: BedDouble },
        { name: t.prices.items.expressRefresh, price: 150, icon: Sparkles },
      ],
      note: `${t.prices.items.flockNote}\n${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
      id: 'leather',
      title: t.prices.leatherFurnitureTitle,
      description: t.prices.leatherFurnitureDesc,
      minPrice: 10,
      icon: Armchair,
      items: [
        { name: t.prices.items.leatherPouf, price: 55, icon: Circle },
        { name: t.prices.items.leatherChair, price: 50, icon: Lamp },
        { name: t.prices.items.leatherPillow, price: 10, icon: Square },
        { name: t.prices.items.leatherArmchair, price: 90, icon: Armchair },
        { name: t.prices.items.leatherSofa2, price: 180, icon: Sofa },
        { name: t.prices.items.leatherSofa3, price: 220, icon: Sofa },
        { name: t.prices.items.leatherSofaCorner, price: 270, icon: LayoutGrid },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
      id: 'mattress',
      title: t.prices.mattressTitle,
      description: t.prices.mattressDesc,
      minPrice: 140,
      icon: BedDouble,
      items: [
        { name: t.prices.items.mattressSingleDry, price: 140, icon: BedDouble },
        { name: t.prices.items.mattressSingleDry2, price: 220, icon: BedDouble },
        { name: t.prices.items.mattressDoubleDry, price: 180, icon: BedDouble },
        { name: t.prices.items.mattressDoubleDry2, price: 280, icon: BedDouble },
        { name: t.prices.items.expressRefresh, price: 150, icon: Sparkles },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
      id: 'auto',
      title: t.prices.autoCleaning,
      description: t.prices.autoCleaningDesc,
      minPrice: 70,
      icon: Car,
      items: [
        { name: t.prices.items.autoComplex, price: 450, icon: CarFront },
        { name: t.prices.items.autoComplexLeather, price: 550, icon: CarFront },
        { name: t.prices.items.autoSeat, price: 80, icon: Square },
        { name: t.prices.items.autoSeats, price: 300, icon: LayoutGrid },
        { name: t.prices.items.autoLeatherSeats, price: 350, icon: LayoutGrid },
        { name: t.prices.items.autoDoorCard, price: 40, icon: Square },
        { name: t.prices.items.autoPlastics, price: 70, icon: Sparkles },
        { name: t.prices.items.autoCeiling, price: 100, icon: Maximize2 },
        { name: t.prices.items.autoFloor, price: 100, icon: Grid3X3 },
        { name: t.prices.items.autoTrunk, price: 80, icon: Package },
        { name: t.prices.items.autoOzone, price: 100, icon: Wind },
        { name: t.prices.items.autoTruckCabin, price: 650, icon: CarFront },
        { name: t.prices.items.autoVanCabin, price: 400, icon: CarFront },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
      id: 'ozone',
      title: t.prices.ozonation,
      description: t.prices.ozonationDesc,
      minPrice: 120,
      icon: Wind,
      items: [
        { name: t.prices.items.ozone1room, price: 120, icon: Home },
        { name: t.prices.items.ozone2room, price: 200, icon: Home },
        { name: t.prices.items.ozone3room, price: 300, icon: Home },
        { name: t.prices.items.ozoneOfficeSmall, price: 250, icon: LayoutGrid },
        { name: t.prices.items.ozoneOfficeLarge, price: 400, icon: Maximize2 },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
      id: 'other',
      title: t.prices.other,
      description: t.prices.otherDesc,
      minPrice: 25,
      icon: Package,
      items: [
        { name: t.prices.items.carpetCovering, price: 25, unit: 'm²', icon: Grid3X3 },
        { name: t.prices.items.stroller, price: 100, icon: Baby },
        { name: t.prices.items.drying, price: 60, icon: Fan },
        { name: t.prices.items.impregnation, price: 80, icon: ShieldCheck },
        { name: t.prices.items.tileCleaning, price: 25, unit: 'm²', icon: Grid3X3 },
      ],
      note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
    },
    {
        id: 'windows',
        title: t.windows?.title || 'Мойка окон',
        description: t.windows?.subtitle || 'Профессиональная мойка окон',
        minPrice: 40,
        icon: Sparkles,
        items: [
          { name: t.windows?.items?.single || 'Одностворчатое окно', price: 40, icon: Square },
          { name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50, icon: LayoutGrid },
          { name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80, icon: Grid3X3 },
          { name: t.windows?.items?.balcony || 'Балконное окно', price: 60, icon: Home },
          { name: t.windows?.items?.terrace || 'Террасное окно', price: 85, icon: Maximize2 },
          { name: t.windows?.items?.attic || 'Мансардное окно', price: 40, icon: Sun },
          { name: t.windows?.items?.balustrade || 'Балюстрада', price: 40, icon: Fence },
        ],
        note: `${t.handyman?.minOrderNote || 'Минимальный заказ для Вроцлава и пригорода (R=10 km) — 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
      },
      {
        id: 'handyman',
        title: t.handyman?.title || 'Мастер на час',
        description: t.handyman?.subtitle || 'Быстрое решение бытовых проблем',
        minPrice: 40,
        icon: Wrench,
        items: [
          { name: t.handyman?.calcItems?.faucet || 'Замена/монтаж крана', price: 120, icon: Droplet },
          { name: t.handyman?.calcItems?.siphon || 'Монтаж/замена сифона', price: 120, icon: Droplet },
          { name: t.handyman?.calcItems?.sink || 'Монтаж раковины', price: 180, icon: Droplet },
          { name: t.handyman?.calcItems?.toilet || 'Монтаж унитаза', price: 220, icon: Droplet },
          { name: t.handyman?.calcItems?.sewer || 'Чистка канализации', price: 250, icon: Droplet },
          { name: t.handyman?.calcItems?.washingMachine || 'Подключение стиральной машины', price: 140, icon: Droplet },
          { name: t.handyman?.calcItems?.dishwasher || 'Подключение посудомоечной машины', price: 140, icon: Droplet },
          { name: t.handyman?.calcItems?.bathroomFan || 'Установка вентилятора в ванной', price: 80, icon: Droplet },
          { name: t.handyman?.calcItems?.bidet || 'Установка биде', price: 220, icon: Droplet },
          { name: t.handyman?.calcItems?.urinal || 'Установка писсуара', price: 200, icon: Droplet },
          { name: t.handyman?.calcItems?.hoseReplacement || 'Замена шлангов для смесителя', price: 50, icon: Droplet },
          { name: t.handyman?.calcItems?.plumbingDemontage || 'Демонтаж сантехники', price: 80, icon: Droplet },
          { name: t.handyman?.calcItems?.sealingJoints || 'Герметизация швов', price: 40, unit: 'm²', icon: Droplet },
          { name: t.handyman?.calcItems?.showerCabinInstall || 'Установка душевой кабины', price: 450, icon: Droplet },
          { name: t.handyman?.calcItems?.showerTrayInstall || 'Установка поддона', price: 200, icon: Droplet },
          { name: t.handyman?.calcItems?.bathtubInstall || 'Установка ванны', price: 300, icon: Droplet },
          { name: t.handyman?.calcItems?.bathroomAccessories || 'Установка аксессуаров в ванной', price: 30, icon: Droplet },
          { name: t.handyman?.calcItems?.wallMountedShower || 'Монтаж навесного душа', price: 200, icon: Droplet },
          { name: t.handyman?.calcItems?.curtainRod || 'Монтаж карнизов', price: 120, icon: Frame },
          { name: t.handyman?.calcItems?.shelf || 'Монтаж полки/зеркала', price: 100, icon: Frame },
          { name: t.handyman?.calcItems?.pictures || 'Навешивание картин/фото', price: 80, icon: Frame },
          { name: t.handyman?.calcItems?.furnitureAssembly || 'Сборка мебели', price: 80, icon: Wrench },
          { name: t.handyman?.calcItems?.bedSofaRepair || 'Ремонт кроватей и диванов', price: 130, icon: Frame },
          { name: t.handyman?.calcItems?.wardrobeRepair || 'Ремонт шкафов-купе/приклеивание зеркал', price: 240, icon: Frame },
          { name: t.handyman?.calcItems?.bulb || 'Замена лампочки/стартера', price: 50, icon: Lightbulb },
          { name: t.handyman?.calcItems?.socket || 'Монтаж электрической розетки', price: 40, icon: Lightbulb },
          { name: t.handyman?.calcItems?.lamp || 'Монтаж люстры/лампы', price: 100, icon: Lightbulb },
          { name: t.handyman?.calcItems?.stove || 'Подключение электроплиты', price: 200, icon: Lightbulb },
          { name: t.handyman?.calcItems?.repair || 'Ремонт электрики', price: 100, icon: Lightbulb },
          { name: t.handyman?.calcItems?.diagnostic || 'Диагностика электрики', price: 350, icon: Lightbulb },
          { name: t.handyman?.calcItems?.switch || 'Монтаж/замена переключателя', price: 50, icon: Lightbulb },
          { name: t.handyman?.calcItems?.fuseReplacement || 'Замена предохранителей', price: 120, icon: Lightbulb },
          { name: t.handyman?.calcItems?.lampRepair || 'Ремонт люстры/светильника', price: 130, icon: Lightbulb },
          { name: t.handyman?.calcItems?.chandelierInstall || 'Монтаж/замена люстры с лампой', price: 130, icon: Lightbulb },
          { name: t.handyman?.calcItems?.mailboxLock || 'Замена замка на почт. ящике', price: 140, icon: Wrench },
          { name: t.handyman?.calcItems?.doorHandle || 'Установка/ремонт дверной ручки', price: 60, icon: Wrench },
          { name: t.handyman?.calcItems?.doorCylinder || 'Установка/замена цилиндра замка', price: 100, icon: Wrench },
          { name: t.handyman?.calcItems?.aluminumDoorRepair || 'Ремонт алюминиевых дверей', price: 200, icon: Wrench },
          { name: t.handyman?.calcItems?.windowDoorAdjustment || 'Регулировка окон и дверей', price: 200, icon: Wrench },
          { name: t.handyman?.calcItems?.fridgeHinges || 'Ремонт петель холодильника', price: 200, icon: Wrench },
          { name: t.handyman?.calcItems?.lawnMowing || 'Покос травы', price: 110, icon: Leaf },
          { name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев', price: 110, icon: Leaf },
          { name: t.handyman?.calcItems?.yardHelp || 'Помощь на участке', price: 110, icon: Leaf },
        ],
        note: `${t.handyman?.minOrderNote || 'Минимальный заказ 180 zł'}\n${t.handyman?.minOrderNoteOther || 'Минимальный заказ для других населённых пунктов — 300 zł'}`,
      },
  ];

  return (
    <section className="py-12 sm:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          {/* Animated money icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-fresh opacity-75" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary opacity-60" />
            </div>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
            {t.prices.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base px-4">
            {t.prices.subtitle}
          </p>
        </div>
        
        {/* Accordion Price Lists */}
        <div className="max-w-3xl mx-auto">
          <PriceAccordion categories={categories} />
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
