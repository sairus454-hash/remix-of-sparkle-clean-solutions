import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Coins, Home, Armchair, Sofa, BedDouble, Car, Wind, Package, Sparkles, Wrench, ChevronDown } from 'lucide-react';
import { useCity } from '@/hooks/useCity';

// Cleaning images
import heroHouseCleaning from '@/assets/hero-house-cleaning.jpg';
import heroHouseCleaning2 from '@/assets/hero-house-cleaning-2.jpg';

// Furniture images
import calcPouf from '@/assets/calc-pouf.jpg';
import calcChair from '@/assets/calc-chair.jpg';
import calcChairSeat from '@/assets/calc-chair-seat.jpg';
import calcChairBack from '@/assets/calc-chair-back.jpg';
import calcChairConference from '@/assets/calc-chair-conference.jpg';
import calcChairSwivel from '@/assets/calc-chair-swivel.jpg';
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
import calcCarpetPickup from '@/assets/calc-carpet-pickup.jpg';
import calcCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import calcCarpetCoveringImpregnation from '@/assets/calc-carpet-covering-impregnation.jpg';
import calcCarpetMedium from '@/assets/calc-carpet-medium.jpg';
import calcCarpetLarge from '@/assets/calc-carpet-large.jpg';
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
import handyLawnMowingHard from '@/assets/handyman/lawn-mowing-hard.jpg';
import handyGrassCleanup from '@/assets/handyman/grass-cleanup.jpg';
import handyTreeTrimming from '@/assets/handyman/tree-trimming.jpg';
import handyYardHelp from '@/assets/handyman/yard-help.jpg';

interface CategorySection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  items: { id: string; name: string; price: number; originalPrice?: number; image: string; unit?: string; priceText?: string; promoBadge?: string }[];
}

interface PriceSectionProps {
  defaultAllOpen?: boolean;
}

const PriceSection = ({ defaultAllOpen = false }: PriceSectionProps) => {
  const { t } = useLanguage();
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [loadedCategories, setLoadedCategories] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  const categories: CategorySection[] = [
    {
      id: 'cleaning',
      title: t.cleaning?.service || 'Уборка',
      description: t.cleaning?.subtitle || 'Профессиональная уборка помещений',
      icon: Home,
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
      id: 'furniture',
      title: t.prices.furniture,
      description: t.prices.furnitureDesc,
      icon: Sofa,
      items: [
        { id: 'pouf', name: t.prices.items.pouf, price: 30, originalPrice: 35, image: calcPouf, promoBadge: '🔥 -10%' },
        { id: 'chairSeat', name: t.prices.items.chairSeat, price: 15, image: calcChairSeat },
        { id: 'chairWithBack', name: t.prices.items.chairWithBack, price: 25, image: calcChairBack },
        { id: 'chairConference', name: t.prices.items.chairConference, price: 30, image: calcChairConference },
        { id: 'chairSwivel', name: t.prices.items.chairSwivel, price: 45, image: calcChairSwivel },
        { id: 'chair', name: t.prices.items.chair, price: 25, image: calcChair },
        { id: 'armchair', name: t.prices.items.armchair, price: 65, originalPrice: 75, image: calcArmchair, promoBadge: '🔥 -10%' },
        { id: 'pillow', name: t.prices.items.pillow, price: 10, image: calcPillow },
        { id: 'sofa2', name: t.prices.items.sofa2, price: 130, originalPrice: 145, image: calcSofa2, promoBadge: '🔥 -10%' },
        { id: 'sofa3', name: t.prices.items.sofa3, price: 150, originalPrice: 165, image: calcSofa3, promoBadge: '🔥 -10%' },
        { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 180, originalPrice: 200, image: calcSofaCorner, promoBadge: '🔥 -10%' },
        { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 210, originalPrice: 235, image: calcSofaCornerLarge, promoBadge: '🔥 -10%' },
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 80, originalPrice: 90, image: calcHeadboard, promoBadge: '🔥 -10%' },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 80, originalPrice: 90, image: calcBedframe, promoBadge: '🔥 -10%' },
      ],
    },
    {
      id: 'leather',
      title: t.prices.leatherFurnitureTitle,
      description: t.prices.leatherFurnitureDesc,
      icon: Armchair,
      items: [
        { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 40, originalPrice: 45, image: calcLeatherPouf, promoBadge: '🔥 -10%' },
        { id: 'leatherChair', name: t.prices.items.leatherChair, price: 40, originalPrice: 45, image: calcLeatherChair, promoBadge: '🔥 -10%' },
        { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 75, originalPrice: 80, image: calcLeatherArmchair, promoBadge: '🔥 -10%' },
        { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 145, originalPrice: 160, image: calcLeatherSofa2, promoBadge: '🔥 -10%' },
        { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 180, originalPrice: 200, image: calcLeatherSofa3, promoBadge: '🔥 -10%' },
        { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 220, originalPrice: 245, image: calcLeatherCorner, promoBadge: '🔥 -10%' },
        { id: 'leatherChairSwivel', name: t.prices.items.leatherChairSwivel, price: 60, originalPrice: 70, image: calcChairSwivel, promoBadge: '🔥 -10%' },
      ],
    },
    {
      id: 'mattress',
      title: t.prices.mattressTitle,
      description: t.prices.mattressDesc,
      icon: BedDouble,
      items: [
        { id: 'mattressSingle', name: t.prices.items.mattressSingleDry, price: 115, originalPrice: 125, image: calcMattressSingle, promoBadge: '🔥 -10%' },
        { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 180, originalPrice: 200, image: calcMattressSingle, promoBadge: '🔥 -10%' },
        { id: 'mattressDouble', name: t.prices.items.mattressDoubleDry, price: 175, originalPrice: 195, image: calcMattressDouble, promoBadge: '🔥 -10%' },
        { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 240, originalPrice: 265, image: calcMattressDouble, promoBadge: '🔥 -10%' },
        { id: 'bedHeadboardM', name: t.prices.items.bedHeadboard, price: 80, originalPrice: 90, image: calcHeadboard, promoBadge: '🔥 -10%' },
        { id: 'bedFrameM', name: t.prices.items.bedFrame, price: 80, originalPrice: 90, image: calcBedframe, promoBadge: '🔥 -10%' },
      ],
    },
    {
      id: 'auto',
      title: t.prices.autoCleaning,
      description: t.prices.autoCleaningDesc,
      icon: Car,
      items: [
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 500, image: calcAutoComplex },
        { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 600, image: calcAutoLeather },
        { id: 'autoVip', name: t.prices.items.autoVip, price: 700, image: calcAutoVip },
        { id: 'autoVipLeather', name: t.prices.items.autoVipLeather, price: 800, image: calcAutoVipLeather },
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
      id: 'ozone',
      title: t.prices.ozonation,
      description: t.prices.ozonationDesc,
      icon: Wind,
      items: [
        { id: 'ozone1room', name: t.prices.items.ozone1room, price: 144, image: ozone1room },
        { id: 'ozone2room', name: t.prices.items.ozone2room, price: 240, image: ozone2room },
        { id: 'ozone3room', name: t.prices.items.ozone3room, price: 360, image: ozone3room },
        { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 300, image: ozoneOfficeSmall },
        { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 480, image: ozoneOfficeLarge },
      ],
    },
    {
      id: 'other',
      title: t.prices.other,
      description: t.prices.otherDesc,
      icon: Package,
      items: [
        { id: 'carpetCovering', name: t.prices.items.carpetCovering, price: 25, image: calcCarpet, unit: 'm²' },
        { id: 'carpetPickup', name: t.prices.items.carpetPickup, price: 35, image: calcCarpetPickup, unit: 'm²' },
        { id: 'carpetImpregnation', name: t.prices.items.carpetImpregnation, price: 5, image: calcCarpetImpregnation, unit: 'm²' },
        { id: 'carpetCoveringImpregnation', name: t.prices.items.carpetCoveringImpregnation, price: 8, image: calcCarpetCoveringImpregnation, unit: 'm²' },
        { id: 'stroller', name: t.prices.items.stroller, price: 100, image: calcStroller },
        { id: 'carseat', name: t.prices.items.carseat, price: 80, image: calcCarseat },
        { id: 'drying', name: t.prices.items.drying, price: 0, image: calcDrying, promoBadge: t.promotions.dryingFreeSpring },
        { id: 'impregnation', name: t.prices.items.impregnation, price: 80, image: calcImpregnation },
        { id: 'tileCleaning', name: t.prices.items.tileCleaning, price: 25, image: calcTileCleaning, unit: 'm²' },
        { id: 'carpetFloorMedium', name: t.prices.items.carpetFloorMedium, price: 15, image: calcCarpetMedium, unit: 'm²' },
        { id: 'carpetFloorLarge', name: t.prices.items.carpetFloorLarge, price: 10, image: calcCarpetLarge, unit: 'm²' },
      ],
    },
    {
      id: 'windows',
      title: t.windows?.title || 'Мойка окон',
      description: t.windows?.subtitle || 'Профессиональная мойка окон',
      icon: Sparkles,
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
      id: 'handyman',
      title: t.handyman?.title || 'Мастер на час',
      description: t.handyman?.subtitle || 'Быстрое решение бытовых проблем',
      icon: Wrench,
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
        { id: 'lawnMowing', name: t.handyman?.calcItems?.lawnMowing || 'Покос травы', price: 1, image: handyLawnMowing, unit: 'm²', priceText: '1.00 - 1.20 zł' },
        { id: 'lawnMowingHard', name: t.handyman?.calcItems?.lawnMowingHard || 'Покос травы (сложный рельеф)', price: 1.3, image: handyLawnMowingHard, unit: 'm²', priceText: '1.30 - 1.50 zł' },
        { id: 'grassCleanup', name: t.handyman?.calcItems?.grassCleanup || 'Уборка и вывоз травы', price: 1, image: handyGrassCleanup, unit: 'm²', priceText: '1.00 - 1.50 zł' },
        { id: 'treeTrimming', name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев', price: 100, image: handyTreeTrimming },
        { id: 'yardHelp', name: t.handyman?.calcItems?.yardHelp || 'Помощь на участке', price: 100, image: handyYardHelp },
      ],
    },
  ];

  // Initialize all open when defaultAllOpen
  useEffect(() => {
    if (defaultAllOpen && !initialized) {
      const allIds = new Set(categories.map(c => c.id));
      setOpenCategories(allIds);
      setLoadedCategories(allIds);
      setInitialized(true);
    }
  }, [defaultAllOpen, initialized, categories]);

  const isOpen = (id: string) => openCategories.has(id);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setLoadedCategories(prev => new Set(prev).add(id));
  };

  return (
    <section className="py-12 sm:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
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

        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
          {categories.map((cat, catIndex) => (
            <CircularRevealCard key={cat.id} index={catIndex}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-card">
                <button
                  onClick={() => toggleCategory(cat.id)}
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
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen(cat.id) ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen(cat.id) ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 sm:p-5 pt-0">
                      {loadedCategories.has(cat.id) && (
                        <CardServiceCalculator category={cat.id} items={cat.items} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CircularRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
