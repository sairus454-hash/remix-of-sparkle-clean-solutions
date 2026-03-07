import { useState } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import PriceSplash from '@/components/PriceSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Sofa, Sparkles, Calculator, Wrench, ChevronDown
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import PriceCalculatorContent from '@/components/PriceCalculatorContent';
import QuickCalculator from '@/components/QuickCalculator';
import { useSplash } from '@/hooks/useSplash';

// Cleaning images
import heroHouseCleaning from '@/assets/hero-house-cleaning.jpg';
import heroHouseCleaning2 from '@/assets/hero-house-cleaning-2.jpg';

// Furniture images
import calcPouf from '@/assets/calc-pouf.jpg';
import calcChair from '@/assets/calc-chair.jpg';
import calcArmchair from '@/assets/calc-armchair.jpg';
import calcPillow from '@/assets/calc-pillow.jpg';
import calcSofa2 from '@/assets/calc-sofa2.jpg';
import calcSofa3 from '@/assets/calc-sofa3.jpg';
import calcSofaCorner from '@/assets/calc-sofa-corner.jpg';
import calcSofaCornerLarge from '@/assets/calc-sofa-corner-large.jpg';
import calcHeadboard from '@/assets/calc-headboard.jpg';
import calcBedframe from '@/assets/calc-bedframe.jpg';

// Leather images
import calcLeatherPouf from '@/assets/calc-leather-pouf.jpg';
import calcLeatherChair from '@/assets/calc-leather-chair.jpg';
import calcLeatherArmchair from '@/assets/calc-leather-armchair.jpg';
import calcLeatherSofa2 from '@/assets/calc-leather-sofa2.jpg';
import calcLeatherSofa3 from '@/assets/calc-leather-sofa3.jpg';
import calcLeatherCorner from '@/assets/calc-leather-corner.jpg';

// Mattress images
import calcMattressSingle from '@/assets/calc-mattress-single.jpg';
import calcMattressDouble from '@/assets/calc-mattress-double.jpg';

// Auto images
import calcAutoComplex from '@/assets/calc-auto-complex.jpg';
import calcAutoLeather from '@/assets/calc-auto-leather.jpg';
import calcAutoSeat from '@/assets/calc-auto-seat.jpg';
import calcAutoSeats from '@/assets/calc-auto-seats.jpg';
import calcAutoLeatherSeats from '@/assets/calc-auto-leather-seats.jpg';
import calcAutoDoor from '@/assets/calc-auto-door.jpg';
import calcAutoPlastics from '@/assets/calc-auto-plastics.jpg';
import calcAutoCeiling from '@/assets/calc-auto-ceiling.jpg';
import calcAutoFloor from '@/assets/calc-auto-floor.jpg';
import calcAutoTrunk from '@/assets/calc-auto-trunk.jpg';
import calcAutoOzone from '@/assets/calc-auto-ozone.jpg';
import calcAutoTruck from '@/assets/calc-auto-truck.jpg';
import calcAutoVan from '@/assets/calc-auto-van.jpg';
import calcAutoVip from '@/assets/calc-auto-vip.jpg';
import calcAutoVipLeather from '@/assets/calc-auto-vip-leather.jpg';

// Ozone images
import ozone1room from '@/assets/ozone-1room.jpg';
import ozone2room from '@/assets/ozone-2room.jpg';
import ozone3room from '@/assets/ozone-3room.jpg';
import ozoneOfficeSmall from '@/assets/ozone-office-small.jpg';
import ozoneOfficeLarge from '@/assets/ozone-office-large.jpg';

// Cleaning extras images
import calcExtraOven from '@/assets/calc-extra-oven.jpg';
import calcExtraHood from '@/assets/calc-extra-hood.jpg';
import calcExtraCabinets from '@/assets/calc-extra-cabinets.jpg';
import calcExtraDishes from '@/assets/calc-extra-dishes.jpg';
import calcExtraFridge from '@/assets/calc-extra-fridge.jpg';
import calcExtraMicrowave from '@/assets/calc-extra-microwave.jpg';
import calcExtraBalcony from '@/assets/calc-extra-balcony.jpg';
import calcExtraWindowInside from '@/assets/calc-extra-window-inside.jpg';
import calcExtraIroning from '@/assets/calc-extra-ironing.jpg';
import calcExtraPetLitter from '@/assets/calc-extra-pet-litter.jpg';
import calcExtraHours from '@/assets/calc-extra-hours.jpg';
import calcExtraCloset from '@/assets/calc-extra-closet.jpg';

// Other
import calcCarpet from '@/assets/calc-carpet.jpg';
import calcCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import calcStroller from '@/assets/calc-stroller.jpg';
import calcCarseat from '@/assets/calc-carseat.jpg';
import calcDrying from '@/assets/calc-drying.jpg';
import calcImpregnation from '@/assets/calc-impregnation.jpg';
import calcTileCleaning from '@/assets/calc-tile-cleaning.jpg';
import calcMoldRemoval from '@/assets/calc-mold-removal.jpg';

// Windows images
import windowCleaning1 from '@/assets/window-cleaning-1.jpg';
import windowCleaning2 from '@/assets/window-cleaning-2.jpg';
import windowCleaning3 from '@/assets/window-cleaning-3.jpg';

// Handyman images
import handyFaucet from '@/assets/handyman/faucet.jpg';
import handySiphon from '@/assets/handyman/siphon.jpg';
import handySink from '@/assets/handyman/sink.jpg';
import handyToilet from '@/assets/handyman/toilet.jpg';
import handySewer from '@/assets/handyman/sewer.jpg';
import handyWashingMachine from '@/assets/handyman/washing-machine.jpg';
import handyDishwasher from '@/assets/handyman/dishwasher.jpg';
import handyBathroomFan from '@/assets/handyman/bathroom-fan.jpg';
import handyBidet from '@/assets/handyman/bidet.jpg';
import handyUrinal from '@/assets/handyman/urinal.jpg';
import handyHose from '@/assets/handyman/hose.jpg';
import handyDemontage from '@/assets/handyman/demontage.jpg';
import handySealing from '@/assets/handyman/sealing.jpg';
import handyShowerCabin from '@/assets/handyman/shower-cabin.jpg';
import handyShowerTray from '@/assets/handyman/shower-tray.jpg';
import handyBathtub from '@/assets/handyman/bathtub.jpg';
import handyBathroomAccessories from '@/assets/handyman/bathroom-accessories.jpg';
import handyWallShower from '@/assets/handyman/wall-shower.jpg';
import handyCurtainRod from '@/assets/handyman/curtain-rod.jpg';
import handyShelf from '@/assets/handyman/shelf.jpg';
import handyPictures from '@/assets/handyman/pictures.jpg';
import handyFurnitureAssembly from '@/assets/handyman/furniture-assembly.jpg';
import handyBedSofaRepair from '@/assets/handyman/bed-sofa-repair.jpg';
import handyWardrobeRepair from '@/assets/handyman/wardrobe-repair.jpg';
import handyBulb from '@/assets/handyman/bulb.jpg';
import handySocket from '@/assets/handyman/socket.jpg';
import handyLamp from '@/assets/handyman/lamp.jpg';
import handyStove from '@/assets/handyman/stove.jpg';
import handyRepair from '@/assets/handyman/repair.jpg';
import handyDiagnostic from '@/assets/handyman/diagnostic.jpg';
import handySwitch from '@/assets/handyman/switch.jpg';
import handyFuse from '@/assets/handyman/fuse.jpg';
import handyLampRepair from '@/assets/handyman/lamp-repair.jpg';
import handyChandelier from '@/assets/handyman/chandelier.jpg';
import handyMailboxLock from '@/assets/handyman/mailbox-lock.jpg';
import handyDoorHandle from '@/assets/handyman/door-handle.jpg';
import handyDoorCylinder from '@/assets/handyman/door-cylinder.jpg';
import handyAluminumDoor from '@/assets/handyman/aluminum-door.jpg';
import handyWindowAdjustment from '@/assets/handyman/window-adjustment.jpg';
import handyFridgeHinges from '@/assets/handyman/fridge-hinges.jpg';
import handyLawnMowing from '@/assets/handyman/lawn-mowing.jpg';
import handyTreeTrimming from '@/assets/handyman/tree-trimming.jpg';
import handyYardHelp from '@/assets/handyman/yard-help.jpg';

const Prices = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { showSplash, handleSplashComplete } = useSplash('prices');
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isFullCalc, setIsFullCalc] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'cleaning', title: t.nav?.cleaning || 'Уборка', description: t.cleaning?.subtitle || 'Стандартная и генеральная уборка', icon: Home,
      items: [
        { id: 'cleaning-standard', name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'}`, price: 7, image: heroHouseCleaning, unit: 'm²' },
        { id: 'cleaning-general', name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'}`, price: 10, image: heroHouseCleaning2, unit: 'm²' },
        { id: 'extra-oven', name: t.cleaning?.extras?.oven || 'Помоем духовку', price: 40, image: calcExtraOven },
        { id: 'extra-hood', name: t.cleaning?.extras?.hood || 'Помоем вытяжку', price: 40, image: calcExtraHood },
        { id: 'extra-cabinets', name: t.cleaning?.extras?.cabinets || 'Уберем в кухонных шкафчиках', price: 55, image: calcExtraCabinets },
        { id: 'extra-dishes', name: t.cleaning?.extras?.dishes || 'Помоем посуду', price: 25, image: calcExtraDishes },
        { id: 'extra-fridge', name: t.cleaning?.extras?.fridge || 'Почистим холодильник', price: 40, image: calcExtraFridge },
        { id: 'extra-microwave', name: t.cleaning?.extras?.microwave || 'Помоем микроволновку', price: 20, image: calcExtraMicrowave },
        { id: 'extra-balcony', name: t.cleaning?.extras?.balcony || 'Уберем на балконе', price: 30, image: calcExtraBalcony },
        { id: 'extra-windowInside', name: t.cleaning?.extras?.windowInside || 'Мытье окон (внутр. сторона)', price: 30, image: calcExtraWindowInside },
        { id: 'extra-ironing', name: t.cleaning?.extras?.ironing || 'Глажка', price: 50, image: calcExtraIroning, unit: 'ч' },
        { id: 'extra-petLitter', name: t.cleaning?.extras?.petLitter || 'Убрать лоток для животных', price: 10, image: calcExtraPetLitter },
        { id: 'extra-extraHours', name: t.cleaning?.extras?.extraHours || 'Дополнительные часы', price: 50, image: calcExtraHours, unit: 'ч' },
        { id: 'extra-closet', name: t.cleaning?.extras?.closet || 'Убрать в шкафу', price: 30, image: calcExtraCloset },
        { id: 'extra-moldRemoval', name: t.cleaning?.extras?.moldRemoval || 'Устранение грибка со стены', price: 80, image: calcMoldRemoval },
      ],
    },
    {
      id: 'furniture', title: t.prices.furniture, description: t.prices.furnitureDesc, icon: Sofa,
      items: [
        { id: 'pouf', name: t.prices.items.pouf, price: 40, image: calcPouf },
        { id: 'chair', name: t.prices.items.chair, price: 40, image: calcChair },
        { id: 'armchair', name: t.prices.items.armchair, price: 70, image: calcArmchair },
        { id: 'pillow', name: t.prices.items.pillow, price: 10, image: calcPillow },
        { id: 'sofa2', name: t.prices.items.sofa2, price: 140, image: calcSofa2 },
        { id: 'sofa3', name: t.prices.items.sofa3, price: 170, image: calcSofa3 },
        { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 200, image: calcSofaCorner },
        { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 250, image: calcSofaCornerLarge },
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 100, image: calcHeadboard },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 100, image: calcBedframe },
        { id: 'expressRefresh', name: t.prices.items.expressRefresh, price: 150, image: calcSofa2 },
      ],
    },
    {
      id: 'leather', title: t.prices.leatherFurnitureTitle, description: t.prices.leatherFurnitureDesc, icon: Armchair,
      items: [
        { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 55, image: calcLeatherPouf },
        { id: 'leatherChair', name: t.prices.items.leatherChair, price: 50, image: calcLeatherChair },
        { id: 'leatherPillow', name: t.prices.items.leatherPillow, price: 20, image: calcLeatherPouf },
        { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 90, image: calcLeatherArmchair },
        { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 180, image: calcLeatherSofa2 },
        { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 220, image: calcLeatherSofa3 },
        { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 270, image: calcLeatherCorner },
      ],
    },
    {
      id: 'mattress', title: t.prices.mattressTitle, description: t.prices.mattressDesc, icon: BedDouble,
      items: [
        { id: 'mattressSingle', name: t.prices.items.mattressSingleDry, price: 140, image: calcMattressSingle },
        { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 220, image: calcMattressSingle },
        { id: 'mattressDouble', name: t.prices.items.mattressDoubleDry, price: 180, image: calcMattressDouble },
        { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 280, image: calcMattressDouble },
        { id: 'expressRefreshM', name: t.prices.items.expressRefresh, price: 150, image: calcMattressSingle },
      ],
    },
    {
      id: 'auto', title: t.prices.autoCleaning, description: t.prices.autoCleaningDesc, icon: Car,
      items: [
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 450, image: calcAutoComplex },
        { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 550, image: calcAutoLeather },
        { id: 'autoVip', name: t.prices.items.autoVip, price: 650, image: calcAutoVip },
        { id: 'autoVipLeather', name: t.prices.items.autoVipLeather, price: 750, image: calcAutoVipLeather },
        { id: 'autoSeat', name: t.prices.items.autoSeat, price: 80, image: calcAutoSeat },
        { id: 'autoSeats', name: t.prices.items.autoSeats, price: 300, image: calcAutoSeats },
        { id: 'autoLeatherSeats', name: t.prices.items.autoLeatherSeats, price: 350, image: calcAutoLeatherSeats },
        { id: 'autoDoorCard', name: t.prices.items.autoDoorCard, price: 40, image: calcAutoDoor },
        { id: 'autoPlastics', name: t.prices.items.autoPlastics, price: 70, image: calcAutoPlastics },
        { id: 'autoCeiling', name: t.prices.items.autoCeiling, price: 100, image: calcAutoCeiling },
        { id: 'autoFloor', name: t.prices.items.autoFloor, price: 100, image: calcAutoFloor },
        { id: 'autoTrunk', name: t.prices.items.autoTrunk, price: 80, image: calcAutoTrunk },
        { id: 'autoOzone', name: t.prices.items.autoOzone, price: 120, image: calcAutoOzone },
        { id: 'autoTruckCabin', name: t.prices.items.autoTruckCabin, price: 650, image: calcAutoTruck },
        { id: 'autoVanCabin', name: t.prices.items.autoVanCabin, price: 400, image: calcAutoVan },
      ],
    },
    {
      id: 'ozone', title: t.prices.ozonation, description: t.prices.ozonationDesc, icon: Wind,
      items: [
        { id: 'ozone1room', name: t.prices.items.ozone1room, price: 144, image: ozone1room },
        { id: 'ozone2room', name: t.prices.items.ozone2room, price: 240, image: ozone2room },
        { id: 'ozone3room', name: t.prices.items.ozone3room, price: 360, image: ozone3room },
        { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 300, image: ozoneOfficeSmall },
        { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 480, image: ozoneOfficeLarge },
      ],
    },
    {
      id: 'other', title: t.prices.other, description: t.prices.otherDesc, icon: Package,
      items: [
        { id: 'carpetCovering', name: t.prices.items.carpetCovering, price: 25, image: calcCarpet, unit: 'm²' },
        { id: 'carpetImpregnation', name: t.prices.items.carpetImpregnation, price: 5, image: calcCarpetImpregnation, unit: 'm²' },
        { id: 'stroller', name: t.prices.items.stroller, price: 100, image: calcStroller },
        { id: 'carseat', name: t.prices.items.carseat, price: 80, image: calcCarseat },
        { id: 'drying', name: t.prices.items.drying, price: 60, image: calcDrying, promoBadge: t.promotions.dryingFreeSpring },
        { id: 'impregnation', name: t.prices.items.impregnation, price: 80, image: calcImpregnation },
        { id: 'tileCleaning', name: t.prices.items.tileCleaning, price: 25, image: calcTileCleaning, unit: 'm²' },
        
      ],
    },
    {
      id: 'windows', title: t.windows?.title || 'Мойка окон', description: t.windows?.subtitle || 'Профессиональная мойка окон', icon: Sparkles,
      items: [
        { id: 'windowSingle', name: t.windows?.items?.single || 'Одностворчатое окно', price: 40, image: windowCleaning1 },
        { id: 'windowDouble', name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50, image: windowCleaning2 },
        { id: 'windowTriple', name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80, image: windowCleaning3 },
        { id: 'windowBalcony', name: t.windows?.items?.balcony || 'Балконное окно', price: 60, image: windowCleaning1 },
        { id: 'windowTerrace', name: t.windows?.items?.terrace || 'Террасное окно', price: 85, image: windowCleaning2 },
        { id: 'windowAttic', name: t.windows?.items?.attic || 'Мансардное окно', price: 40, image: windowCleaning3 },
        { id: 'balustrade', name: t.windows?.items?.balustrade || 'Балюстрада', price: 40, image: windowCleaning1 },
      ],
    },
    {
      id: 'handyman', title: t.handyman?.title || 'Мастер на час', description: t.handyman?.subtitle || 'Быстрое решение бытовых проблем', icon: Wrench,
      items: [
        { id: 'faucet', name: t.handyman?.calcItems?.faucet || 'Замена/монтаж крана', price: 120, image: handyFaucet },
        { id: 'siphon', name: t.handyman?.calcItems?.siphon || 'Монтаж/замена сифона', price: 120, image: handySiphon },
        { id: 'sink', name: t.handyman?.calcItems?.sink || 'Монтаж раковины', price: 180, image: handySink },
        { id: 'toilet', name: t.handyman?.calcItems?.toilet || 'Монтаж унитаза', price: 220, image: handyToilet },
        { id: 'sewer', name: t.handyman?.calcItems?.sewer || 'Чистка канализации', price: 250, image: handySewer },
        { id: 'washingMachine', name: t.handyman?.calcItems?.washingMachine || 'Подключение стиральной машины', price: 140, image: handyWashingMachine },
        { id: 'dishwasher', name: t.handyman?.calcItems?.dishwasher || 'Подключение посудомоечной машины', price: 140, image: handyDishwasher },
        { id: 'bathroomFan', name: t.handyman?.calcItems?.bathroomFan || 'Установка вентилятора в ванной', price: 80, image: handyBathroomFan },
        { id: 'bidet', name: t.handyman?.calcItems?.bidet || 'Установка биде', price: 220, image: handyBidet },
        { id: 'urinal', name: t.handyman?.calcItems?.urinal || 'Установка писсуара', price: 200, image: handyUrinal },
        { id: 'hoseReplacement', name: t.handyman?.calcItems?.hoseReplacement || 'Замена шлангов', price: 50, image: handyHose },
        { id: 'plumbingDemontage', name: t.handyman?.calcItems?.plumbingDemontage || 'Демонтаж сантехники', price: 80, image: handyDemontage },
        { id: 'sealingJoints', name: t.handyman?.calcItems?.sealingJoints || 'Герметизация швов', price: 40, image: handySealing, unit: 'm²' },
        { id: 'showerCabinInstall', name: t.handyman?.calcItems?.showerCabinInstall || 'Установка душевой кабины', price: 450, image: handyShowerCabin },
        { id: 'showerTrayInstall', name: t.handyman?.calcItems?.showerTrayInstall || 'Установка поддона', price: 200, image: handyShowerTray },
        { id: 'bathtubInstall', name: t.handyman?.calcItems?.bathtubInstall || 'Установка ванны', price: 300, image: handyBathtub },
        { id: 'bathroomAccessories', name: t.handyman?.calcItems?.bathroomAccessories || 'Аксессуары в ванной', price: 30, image: handyBathroomAccessories },
        { id: 'wallMountedShower', name: t.handyman?.calcItems?.wallMountedShower || 'Монтаж навесного душа', price: 200, image: handyWallShower },
        { id: 'curtainRod', name: t.handyman?.calcItems?.curtainRod || 'Монтаж карнизов', price: 120, image: handyCurtainRod },
        { id: 'shelf', name: t.handyman?.calcItems?.shelf || 'Монтаж полки/зеркала', price: 100, image: handyShelf },
        { id: 'pictures', name: t.handyman?.calcItems?.pictures || 'Навешивание картин/фото', price: 80, image: handyPictures },
        { id: 'furnitureAssembly', name: t.handyman?.calcItems?.furnitureAssembly || 'Сборка мебели', price: 80, image: handyFurnitureAssembly },
        { id: 'bedSofaRepair', name: t.handyman?.calcItems?.bedSofaRepair || 'Ремонт кроватей и диванов', price: 130, image: handyBedSofaRepair },
        { id: 'wardrobeRepair', name: t.handyman?.calcItems?.wardrobeRepair || 'Ремонт шкафов-купе', price: 240, image: handyWardrobeRepair },
        { id: 'bulb', name: t.handyman?.calcItems?.bulb || 'Замена лампочки/стартера', price: 50, image: handyBulb },
        { id: 'socket', name: t.handyman?.calcItems?.socket || 'Монтаж розетки', price: 40, image: handySocket },
        { id: 'lamp', name: t.handyman?.calcItems?.lamp || 'Монтаж люстры/лампы', price: 100, image: handyLamp },
        { id: 'stove', name: t.handyman?.calcItems?.stove || 'Подключение электроплиты', price: 200, image: handyStove },
        { id: 'repair', name: t.handyman?.calcItems?.repair || 'Ремонт электрики', price: 100, image: handyRepair },
        { id: 'diagnostic', name: t.handyman?.calcItems?.diagnostic || 'Диагностика электрики', price: 350, image: handyDiagnostic },
        { id: 'switch', name: t.handyman?.calcItems?.switch || 'Монтаж/замена переключателя', price: 50, image: handySwitch },
        { id: 'fuseReplacement', name: t.handyman?.calcItems?.fuseReplacement || 'Замена предохранителей', price: 120, image: handyFuse },
        { id: 'lampRepair', name: t.handyman?.calcItems?.lampRepair || 'Ремонт люстры/светильника', price: 130, image: handyLampRepair },
        { id: 'chandelierInstall', name: t.handyman?.calcItems?.chandelierInstall || 'Монтаж/замена люстры', price: 130, image: handyChandelier },
        { id: 'mailboxLock', name: t.handyman?.calcItems?.mailboxLock || 'Замена замка на почт. ящике', price: 140, image: handyMailboxLock },
        { id: 'doorHandle', name: t.handyman?.calcItems?.doorHandle || 'Установка/ремонт дверной ручки', price: 60, image: handyDoorHandle },
        { id: 'doorCylinder', name: t.handyman?.calcItems?.doorCylinder || 'Замена цилиндра замка', price: 100, image: handyDoorCylinder },
        { id: 'aluminumDoorRepair', name: t.handyman?.calcItems?.aluminumDoorRepair || 'Ремонт алюминиевых дверей', price: 200, image: handyAluminumDoor },
        { id: 'windowDoorAdjustment', name: t.handyman?.calcItems?.windowDoorAdjustment || 'Регулировка окон и дверей', price: 200, image: handyWindowAdjustment },
        { id: 'fridgeHinges', name: t.handyman?.calcItems?.fridgeHinges || 'Ремонт петель холодильника', price: 200, image: handyFridgeHinges },
        { id: 'lawnMowing', name: t.handyman?.calcItems?.lawnMowing || 'Покос травы', price: 110, image: handyLawnMowing },
        { id: 'treeTrimming', name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев', price: 110, image: handyTreeTrimming },
        { id: 'yardHelp', name: t.handyman?.calcItems?.yardHelp || 'Помощь на участке', price: 110, image: handyYardHelp },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Прайс-лист на химчистку — Цены на услуги MasterClean"
        description="Актуальные цены на химчистку мебели, ковров, матрасов, авто, озонирование и уборку. Калькулятор стоимости онлайн."
        keywords="цены химчистка, прайс химчистка, cennik prania tapicerki, cennik sprzątania, ceny czyszczenia dywanów, cennik ozonowania, cennik mycia okien, cleaning prices Poland"
        canonical="/prices"
        image="https://masterclean1885.pl/og-prices.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'PriceSpecification',
          name: 'Прайс-лист MasterClean',
          description: 'Актуальные цены на все услуги химчистки и клининга',
          priceCurrency: 'PLN',
          url: 'https://masterclean1885.pl/prices',
        }}
      />
      {showSplash && <PriceSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero */}
        <section className="py-12 sm:py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-fresh opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary opacity-60" />
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.prices.title}
              </h1>
              <p className="text-base sm:text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fade-up px-4" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {t.prices.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Trigger */}
        <section className="py-6 sm:py-10 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <CircularRevealCard index={0}>
                <Card 
                  className="shadow-card cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setIsCalcOpen(true)}
                >
                  <CardContent className="py-5 sm:py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                          <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                        </div>
                        <div>
                          <h2 className="font-serif text-lg sm:text-xl font-semibold">{t.calculator.title}</h2>
                          <p className="text-sm text-muted-foreground">{t.calculator.selectItems}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hidden sm:flex">
                        {t.calculator.title}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* Calculator Modal/Drawer */}
        {isMobile ? (
          <Drawer open={isCalcOpen} onOpenChange={(open) => {
            setIsCalcOpen(open);
            if (!open) setIsFullCalc(false);
          }}>
            <DrawerContent className="max-h-[90vh]">
              <DrawerHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                    <Calculator className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <DrawerTitle className="font-serif text-lg">
                    {isFullCalc ? t.calculator.title : t.calculator.quickTitle}
                  </DrawerTitle>
                </div>
              </DrawerHeader>
              <div className="overflow-y-auto p-4 pb-8">
                {isFullCalc ? (
                  <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
                ) : (
                  <QuickCalculator 
                    onOpenFull={() => setIsFullCalc(true)} 
                    onClose={() => setIsCalcOpen(false)} 
                  />
                )}
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
              <DialogHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                    <Calculator className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <DialogTitle className="font-serif text-xl">
                    {t.calculator.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">{t.calculator.selectItems}</DialogDescription>
                </div>
              </DialogHeader>
              <div className="overflow-y-auto flex-1 py-4">
                <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Price Cards by Category */}
        <section className="py-12 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
              {categories.map((cat, catIndex) => (
                <CircularRevealCard key={cat.id} index={catIndex}>
                  <div className="rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-card">
                    <button
                      onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                      className="flex items-center gap-4 w-full p-4 sm:p-5 cursor-pointer text-left transition-colors hover:bg-accent/30"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0">
                        <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                          {cat.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm truncate">{cat.description}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${openCategory === cat.id ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-in-out"
                      style={{
                        gridTemplateRows: openCategory === cat.id ? '1fr' : '0fr',
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="p-4 sm:p-5 pt-0">
                          <CardServiceCalculator category={cat.id} items={cat.items} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Prices;
