import { useState, useEffect, useRef } from 'react';
import MobilePromotionsCard from '@/components/MobilePromotionsCard';
import { useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import PriceSplash from '@/components/PriceSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import BackToOrderButton from '@/components/BackToOrderButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Sofa, Sparkles, Calculator, Wrench, ChevronDown, Star, Award, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

import { img } from '@/utils/imageMap';


const Prices = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { showSplash, handleSplashComplete } = useSplash('prices');
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isFullCalc, setIsFullCalc] = useState(false);
  const [closedCategories, setClosedCategories] = useState<Set<string>>(new Set());
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isCategoryOpen = (id: string) => !closedCategories.has(id);
  const toggleCategory = (id: string) => {
    setClosedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Auto-open category from navigation state (e.g., from recommendation chips)
  useEffect(() => {
    const state = location.state as { openCategory?: string } | null;
    if (state?.openCategory) {
      const catId = state.openCategory;
      setClosedCategories(prev => { const next = new Set(prev); next.delete(catId); return next; });
      setTimeout(() => {
        categoryRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const categories = [
    {
      id: 'cleaning', title: t.nav?.cleaning || 'Уборка', description: t.cleaning?.subtitle || 'Стандартная и генеральная уборка', icon: Home,
      items: [
        { id: 'cleaning-standard', name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'}`, price: 7, image: img('hero-house-cleaning.jpg'), unit: 'm²' },
        { id: 'cleaning-general', name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'}`, price: 10, image: img('hero-house-cleaning-2.jpg'), unit: 'm²' },
        { id: 'extra-oven', name: t.cleaning?.extras?.oven || 'Помоем духовку', price: 40, image: img('calc-extra-oven.jpg') },
        { id: 'extra-hood', name: t.cleaning?.extras?.hood || 'Помоем вытяжку', price: 40, image: img('calc-extra-hood.jpg') },
        { id: 'extra-cabinets', name: t.cleaning?.extras?.cabinets || 'Уберем в кухонных шкафчиках', price: 55, image: img('calc-extra-cabinets.jpg') },
        { id: 'extra-dishes', name: t.cleaning?.extras?.dishes || 'Помоем посуду', price: 25, image: img('calc-extra-dishes.jpg') },
        { id: 'extra-fridge', name: t.cleaning?.extras?.fridge || 'Почистим холодильник', price: 40, image: img('calc-extra-fridge.jpg') },
        { id: 'extra-microwave', name: t.cleaning?.extras?.microwave || 'Помоем микроволновку', price: 20, image: img('calc-extra-microwave.jpg') },
        { id: 'extra-balcony', name: t.cleaning?.extras?.balcony || 'Уберем на балконе', price: 30, image: img('calc-extra-balcony.jpg') },
        { id: 'extra-windowInside', name: t.cleaning?.extras?.windowInside || 'Мытье окон (внутр. сторона)', price: 30, image: img('calc-extra-window-inside.jpg') },
        { id: 'extra-ironing', name: t.cleaning?.extras?.ironing || 'Глажка', price: 50, image: img('calc-extra-ironing.jpg'), unit: 'ч' },
        { id: 'extra-petLitter', name: t.cleaning?.extras?.petLitter || 'Убрать лоток для животных', price: 10, image: img('calc-extra-pet-litter.jpg') },
        { id: 'extra-extraHours', name: t.cleaning?.extras?.extraHours || 'Дополнительные часы', price: 50, image: img('calc-extra-hours.jpg'), unit: 'ч' },
        { id: 'extra-closet', name: t.cleaning?.extras?.closet || 'Убрать в шкафу', price: 30, image: img('calc-extra-closet.jpg') },
        { id: 'extra-moldRemoval', name: t.cleaning?.extras?.moldRemoval || 'Устранение грибка со стены', price: 80, image: img('calc-mold-removal.jpg') },
      ],
    },
    {
      id: 'furniture', title: t.prices.furniture, description: t.prices.furnitureDesc, icon: Sofa,
      items: [
        { id: 'pouf', name: t.prices.items.pouf, price: 30, originalPrice: 35, image: img('calc-pouf.jpg'), promoBadge: '🔥 -10%' },
        { id: 'chairSeat', name: t.prices.items.chairSeat, price: 15, image: img('calc-chair-seat.jpg') },
        { id: 'chairWithBack', name: t.prices.items.chairWithBack, price: 25, image: img('calc-chair-back.jpg') },
        { id: 'chairConference', name: t.prices.items.chairConference, price: 30, image: img('calc-chair-conference.jpg') },
        { id: 'chairSwivel', name: t.prices.items.chairSwivel, price: 45, image: img('calc-chair-swivel.jpg') },
        { id: 'chair', name: t.prices.items.chair, price: 25, image: img('calc-chair.jpg') },
        { id: 'armchair', name: t.prices.items.armchair, price: 65, originalPrice: 75, image: img('calc-armchair.jpg'), promoBadge: '🔥 -10%' },
        { id: 'pillow', name: t.prices.items.pillow, price: 10, image: img('calc-pillow.jpg') },
        { id: 'sofa2', name: t.prices.items.sofa2, price: 130, originalPrice: 145, image: img('calc-sofa2.jpg'), promoBadge: '🔥 -10%' },
        { id: 'sofa3', name: t.prices.items.sofa3, price: 150, originalPrice: 165, image: img('calc-sofa3.jpg'), promoBadge: '🔥 -10%' },
        { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 180, originalPrice: 200, image: img('calc-sofa-corner.jpg'), promoBadge: '🔥 -10%' },
        { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 210, originalPrice: 235, image: img('calc-sofa-corner-large.jpg'), promoBadge: '🔥 -10%' },
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 80, originalPrice: 90, image: img('calc-headboard.jpg'), promoBadge: '🔥 -10%' },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 80, originalPrice: 90, image: img('calc-bedframe.jpg'), promoBadge: '🔥 -10%' },
        
      ],
    },
    {
      id: 'leather', title: t.prices.leatherFurnitureTitle, description: t.prices.leatherFurnitureDesc, icon: Armchair,
      items: [
        { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 40, originalPrice: 45, image: img('calc-leather-pouf.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherChair', name: t.prices.items.leatherChair, price: 40, originalPrice: 45, image: img('calc-leather-chair.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherPillow', name: t.prices.items.leatherPillow, price: 15, originalPrice: 20, image: img('calc-leather-pouf.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 75, originalPrice: 80, image: img('calc-leather-armchair.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 145, originalPrice: 160, image: img('calc-leather-sofa2.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 180, originalPrice: 200, image: img('calc-leather-sofa3.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 220, originalPrice: 245, image: img('calc-leather-corner.jpg'), promoBadge: '🔥 -10%' },
        { id: 'leatherChairSwivel', name: t.prices.items.leatherChairSwivel, price: 60, originalPrice: 70, image: img('calc-chair-swivel.jpg'), promoBadge: '🔥 -10%' },
      ],
    },
    {
      id: 'mattress', title: t.prices.mattressTitle, description: t.prices.mattressDesc, icon: BedDouble,
      items: [
        { id: 'mattressSingle', name: t.prices.items.mattressSingleDry, price: 115, originalPrice: 125, image: img('calc-mattress-single.jpg'), promoBadge: '🔥 -10%' },
        { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 180, originalPrice: 200, image: img('calc-mattress-single.jpg'), promoBadge: '🔥 -10%' },
        { id: 'mattressDouble', name: t.prices.items.mattressDoubleDry, price: 175, originalPrice: 195, image: img('calc-mattress-double.jpg'), promoBadge: '🔥 -10%' },
        { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 240, originalPrice: 265, image: img('calc-mattress-double.jpg'), promoBadge: '🔥 -10%' },
        
      ],
    },
    {
      id: 'auto', title: t.prices.autoCleaning, description: t.prices.autoCleaningDesc, icon: Car,
      items: [
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 500, image: img('calc-auto-complex.jpg') },
        { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 600, image: img('calc-auto-leather.jpg') },
        { id: 'autoVip', name: t.prices.items.autoVip, price: 700, image: img('calc-auto-vip.jpg') },
        { id: 'autoVipLeather', name: t.prices.items.autoVipLeather, price: 800, image: img('calc-auto-vip-leather.jpg') },
        { id: 'autoSeat', name: t.prices.items.autoSeat, price: 80, image: img('calc-auto-seat.jpg') },
        { id: 'autoSeats', name: t.prices.items.autoSeats, price: 300, image: img('calc-auto-seats.jpg') },
        { id: 'autoLeatherSeats', name: t.prices.items.autoLeatherSeats, price: 350, image: img('calc-auto-leather-seats.jpg') },
        { id: 'autoDoorCard', name: t.prices.items.autoDoorCard, price: 40, image: img('calc-auto-door.jpg') },
        { id: 'autoPlastics', name: t.prices.items.autoPlastics, price: 70, image: img('calc-auto-plastics.jpg') },
        { id: 'autoCeiling', name: t.prices.items.autoCeiling, price: 100, image: img('calc-auto-ceiling.jpg') },
        { id: 'autoFloor', name: t.prices.items.autoFloor, price: 100, image: img('calc-auto-floor.jpg') },
        { id: 'autoTrunk', name: t.prices.items.autoTrunk, price: 80, image: img('calc-auto-trunk.jpg') },
        { id: 'autoOzone', name: t.prices.items.autoOzone, price: 120, image: img('calc-auto-ozone.jpg') },
        { id: 'autoTruckCabin', name: t.prices.items.autoTruckCabin, price: 650, image: img('calc-auto-truck.jpg') },
        { id: 'autoVanCabin', name: t.prices.items.autoVanCabin, price: 400, image: img('calc-auto-van.jpg') },
      ],
    },
    {
      id: 'ozone', title: t.prices.ozonation, description: t.prices.ozonationDesc, icon: Wind,
      items: [
        { id: 'ozone1room', name: t.prices.items.ozone1room, price: 144, image: img('ozone-1room.jpg') },
        { id: 'ozone2room', name: t.prices.items.ozone2room, price: 240, image: img('ozone-2room.jpg') },
        { id: 'ozone3room', name: t.prices.items.ozone3room, price: 360, image: img('ozone-3room.jpg') },
        { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 300, image: img('ozone-office-small.jpg') },
        { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 480, image: img('ozone-office-large.jpg') },
      ],
    },
    {
      id: 'other', title: t.prices.other, description: t.prices.otherDesc, icon: Package,
      items: [
        { id: 'carpetCovering', name: t.prices.items.carpetCovering, price: 25, image: img('calc-carpet.jpg'), unit: 'm²' },
        { id: 'carpetPickup', name: t.prices.items.carpetPickup, price: 35, image: img('calc-carpet-pickup.jpg'), unit: 'm²' },
        { id: 'carpetImpregnation', name: t.prices.items.carpetImpregnation, price: 5, image: img('calc-carpet-impregnation.jpg'), unit: 'm²' },
        { id: 'carpetCoveringImpregnation', name: t.prices.items.carpetCoveringImpregnation, price: 8, image: img('calc-carpet-covering-impregnation.jpg'), unit: 'm²' },
        { id: 'stroller', name: t.prices.items.stroller, price: 100, image: img('calc-stroller.jpg') },
        { id: 'carseat', name: t.prices.items.carseat, price: 80, image: img('calc-carseat.jpg') },
        { id: 'drying', name: t.prices.items.drying, price: 0, image: img('calc-drying.jpg'), promoBadge: t.promotions.dryingFreeSpring },
        { id: 'impregnation', name: t.prices.items.impregnation, price: 80, image: img('calc-impregnation.jpg') },
        { id: 'tileCleaning', name: t.prices.items.tileCleaning, price: 25, image: img('calc-tile-cleaning.jpg'), unit: 'm²' },
        { id: 'carpetFloorMedium', name: t.prices.items.carpetFloorMedium, price: 15, image: img('calc-carpet-medium.jpg'), unit: 'm²' },
        { id: 'carpetFloorLarge', name: t.prices.items.carpetFloorLarge, price: 10, image: img('calc-carpet-large.jpg'), unit: 'm²' },
      ],
    },
    {
      id: 'windows', title: t.windows?.title || 'Мойка окон', description: t.windows?.subtitle || 'Профессиональная мойка окон', icon: Sparkles,
      items: [
        { id: 'windowSingle', name: t.windows?.items?.single || 'Одностворчатое окно', price: 40, image: img('window-cleaning-1.jpg') },
        { id: 'windowDouble', name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50, image: img('window-cleaning-2.jpg') },
        { id: 'windowTriple', name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80, image: img('window-cleaning-3.jpg') },
        { id: 'windowBalcony', name: t.windows?.items?.balcony || 'Балконное окно', price: 60, image: img('window-cleaning-1.jpg') },
        { id: 'windowTerrace', name: t.windows?.items?.terrace || 'Террасное окно', price: 85, image: img('window-cleaning-2.jpg') },
        { id: 'windowAttic', name: t.windows?.items?.attic || 'Мансардное окно', price: 40, image: img('window-cleaning-3.jpg') },
        { id: 'balustrade', name: t.windows?.items?.balustrade || 'Балюстрада', price: 40, image: img('window-cleaning-1.jpg') },
      ],
    },
    {
      id: 'handyman', title: t.handyman?.title || 'Мастер на час', description: t.handyman?.subtitle || 'Быстрое решение бытовых проблем', icon: Wrench,
      items: [
        { id: 'faucet', name: t.handyman?.calcItems?.faucet || 'Замена/монтаж крана', price: 120, image: img('handyman/faucet.jpg') },
        { id: 'siphon', name: t.handyman?.calcItems?.siphon || 'Монтаж/замена сифона', price: 120, image: img('handyman/siphon.jpg') },
        { id: 'sink', name: t.handyman?.calcItems?.sink || 'Монтаж раковины', price: 180, image: img('handyman/sink.jpg') },
        { id: 'toilet', name: t.handyman?.calcItems?.toilet || 'Монтаж унитаза', price: 220, image: img('handyman/toilet.jpg') },
        { id: 'sewer', name: t.handyman?.calcItems?.sewer || 'Чистка канализации', price: 250, image: img('handyman/sewer.jpg') },
        { id: 'washingMachine', name: t.handyman?.calcItems?.washingMachine || 'Подключение стиральной машины', price: 140, image: img('handyman/washing-machine.jpg') },
        { id: 'dishwasher', name: t.handyman?.calcItems?.dishwasher || 'Подключение посудомоечной машины', price: 140, image: img('handyman/dishwasher.jpg') },
        { id: 'bathroomFan', name: t.handyman?.calcItems?.bathroomFan || 'Установка вентилятора в ванной', price: 80, image: img('handyman/bathroom-fan.jpg') },
        { id: 'bidet', name: t.handyman?.calcItems?.bidet || 'Установка биде', price: 220, image: img('handyman/bidet.jpg') },
        { id: 'urinal', name: t.handyman?.calcItems?.urinal || 'Установка писсуара', price: 200, image: img('handyman/urinal.jpg') },
        { id: 'hoseReplacement', name: t.handyman?.calcItems?.hoseReplacement || 'Замена шлангов', price: 50, image: img('handyman/hose.jpg') },
        { id: 'plumbingDemontage', name: t.handyman?.calcItems?.plumbingDemontage || 'Демонтаж сантехники', price: 80, image: img('handyman/demontage.jpg') },
        { id: 'sealingJoints', name: t.handyman?.calcItems?.sealingJoints || 'Герметизация швов', price: 40, image: img('handyman/sealing.jpg'), unit: 'm²' },
        { id: 'showerCabinInstall', name: t.handyman?.calcItems?.showerCabinInstall || 'Установка душевой кабины', price: 450, image: img('handyman/shower-cabin.jpg') },
        { id: 'showerTrayInstall', name: t.handyman?.calcItems?.showerTrayInstall || 'Установка поддона', price: 200, image: img('handyman/shower-tray.jpg') },
        { id: 'bathtubInstall', name: t.handyman?.calcItems?.bathtubInstall || 'Установка ванны', price: 300, image: img('handyman/bathtub.jpg') },
        { id: 'bathroomAccessories', name: t.handyman?.calcItems?.bathroomAccessories || 'Аксессуары в ванной', price: 30, image: img('handyman/bathroom-accessories.jpg') },
        { id: 'wallMountedShower', name: t.handyman?.calcItems?.wallMountedShower || 'Монтаж навесного душа', price: 200, image: img('handyman/wall-shower.jpg') },
        { id: 'curtainRod', name: t.handyman?.calcItems?.curtainRod || 'Монтаж карнизов', price: 120, image: img('handyman/curtain-rod.jpg') },
        { id: 'shelf', name: t.handyman?.calcItems?.shelf || 'Монтаж полки/зеркала', price: 100, image: img('handyman/shelf.jpg') },
        { id: 'pictures', name: t.handyman?.calcItems?.pictures || 'Навешивание картин/фото', price: 80, image: img('handyman/pictures.jpg') },
        { id: 'furnitureAssembly', name: t.handyman?.calcItems?.furnitureAssembly || 'Сборка мебели', price: 80, image: img('handyman/furniture-assembly.jpg') },
        { id: 'bedSofaRepair', name: t.handyman?.calcItems?.bedSofaRepair || 'Ремонт кроватей и диванов', price: 130, image: img('handyman/bed-sofa-repair.jpg') },
        { id: 'wardrobeRepair', name: t.handyman?.calcItems?.wardrobeRepair || 'Ремонт шкафов-купе', price: 240, image: img('handyman/wardrobe-repair.jpg') },
        { id: 'bulb', name: t.handyman?.calcItems?.bulb || 'Замена лампочки/стартера', price: 50, image: img('handyman/bulb.jpg') },
        { id: 'socket', name: t.handyman?.calcItems?.socket || 'Монтаж розетки', price: 40, image: img('handyman/socket.jpg') },
        { id: 'lamp', name: t.handyman?.calcItems?.lamp || 'Монтаж люстры/лампы', price: 100, image: img('handyman/lamp.jpg') },
        { id: 'stove', name: t.handyman?.calcItems?.stove || 'Подключение электроплиты', price: 200, image: img('handyman/stove.jpg') },
        { id: 'repair', name: t.handyman?.calcItems?.repair || 'Ремонт электрики', price: 100, image: img('handyman/repair.jpg') },
        { id: 'diagnostic', name: t.handyman?.calcItems?.diagnostic || 'Диагностика электрики', price: 350, image: img('handyman/diagnostic.jpg') },
        { id: 'switch', name: t.handyman?.calcItems?.switch || 'Монтаж/замена переключателя', price: 50, image: img('handyman/switch.jpg') },
        { id: 'fuseReplacement', name: t.handyman?.calcItems?.fuseReplacement || 'Замена предохранителей', price: 120, image: img('handyman/fuse.jpg') },
        { id: 'lampRepair', name: t.handyman?.calcItems?.lampRepair || 'Ремонт люстры/светильника', price: 130, image: img('handyman/lamp-repair.jpg') },
        { id: 'chandelierInstall', name: t.handyman?.calcItems?.chandelierInstall || 'Монтаж/замена люстры', price: 130, image: img('handyman/chandelier.jpg') },
        { id: 'mailboxLock', name: t.handyman?.calcItems?.mailboxLock || 'Замена замка на почт. ящике', price: 140, image: img('handyman/mailbox-lock.jpg') },
        { id: 'doorHandle', name: t.handyman?.calcItems?.doorHandle || 'Установка/ремонт дверной ручки', price: 60, image: img('handyman/door-handle.jpg') },
        { id: 'doorCylinder', name: t.handyman?.calcItems?.doorCylinder || 'Замена цилиндра замка', price: 100, image: img('handyman/door-cylinder.jpg') },
        { id: 'aluminumDoorRepair', name: t.handyman?.calcItems?.aluminumDoorRepair || 'Ремонт алюминиевых дверей', price: 200, image: img('handyman/aluminum-door.jpg') },
        { id: 'windowDoorAdjustment', name: t.handyman?.calcItems?.windowDoorAdjustment || 'Регулировка окон и дверей', price: 200, image: img('handyman/window-adjustment.jpg') },
        { id: 'fridgeHinges', name: t.handyman?.calcItems?.fridgeHinges || 'Ремонт петель холодильника', price: 200, image: img('handyman/fridge-hinges.jpg') },
        { id: 'lawnMowing', name: t.handyman?.calcItems?.lawnMowing || 'Покос травы', price: 1, image: img('handyman/lawn-mowing.jpg'), unit: 'm²', priceText: '1.00 - 1.20 zł' },
        { id: 'lawnMowingHard', name: t.handyman?.calcItems?.lawnMowingHard || 'Покос травы (сложный рельеф)', price: 1.3, image: img('handyman/lawn-mowing-hard.jpg'), unit: 'm²', priceText: '1.30 - 1.50 zł' },
        { id: 'grassCleanup', name: t.handyman?.calcItems?.grassCleanup || 'Уборка и вывоз травы', price: 1, image: img('handyman/grass-cleanup.jpg'), unit: 'm²', priceText: '1.00 - 1.50 zł' },
        { id: 'treeTrimming', name: t.handyman?.calcItems?.treeTrimming || 'Обрезка деревьев', price: 100, image: img('handyman/tree-trimming.jpg') },
        { id: 'yardHelp', name: t.handyman?.calcItems?.yardHelp || 'Помощь на участке', price: 100, image: img('handyman/yard-help.jpg') },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Cennik prania tapicerki i czyszczenia — MasterClean"
        description="Aktualny cennik prania tapicerki meblowej, czyszczenia dywanów, materacy, tapicerki samochodowej, ozonowania i sprzątania. Kalkulator kosztów. Wrocław, Opole."
        keywords="cennik prania tapicerki, cennik czyszczenia mebli, cennik chemczystki mebli, ceny czyszczenia dywanów, cennik prania kanapy, cennik ozonowania, cennik mycia okien, cennik sprzątania, cennik złota rączka, ile kosztuje pranie tapicerki, pranie tapicerki cena Wrocław, cleaning prices Poland"
        canonical="/prices"
        image="https://masterclean1885.com/og-prices.png"
        breadcrumbs={[{ name: t.nav.prices, path: '/prices' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Cennik usług MasterClean',
          description: 'Aktualne ceny wszystkich usług czyszczenia i sprzątania',
          isPartOf: { '@type': 'WebSite', name: 'MasterClean', url: 'https://masterclean1885.com' },
          mainEntity: {
            '@type': 'OfferCatalog',
            name: 'Usługi MasterClean',
            itemListElement: [
              { '@type': 'Offer', name: 'Pranie tapicerki meblowej', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Ozonowanie', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Sprzątanie', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Mycie okien', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Złota rączka', priceCurrency: 'PLN' },
            ],
          },
        }}
      />
      {showSplash && <PriceSplash onComplete={handleSplashComplete} />}
      <Layout>
        <BackToOrderButton />
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

        <MobilePromotionsCard />

        {/* Promotions Section — desktop only */}
        <section id="promotions" className="hidden sm:block py-12 sm:py-20 bg-gradient-section content-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 flex items-center justify-center shadow-glow animate-pulse">
                    <span className="text-3xl sm:text-4xl" style={{ animation: 'float 2s ease-in-out infinite' }}>🎁</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 opacity-60" />
                </div>
              </div>
              <div 
                className="inline-block px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 animate-fade-up"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 2s linear infinite' }}>
                    🔥 {t.promotions.title} 🔥
                  </span>
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <span className="font-medium text-foreground/80">✨ {t.promotions.subtitle} ✨</span>
              </p>
              <p className="text-sm sm:text-base text-fresh font-semibold mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                💰 {t.promotions.saveUpTo}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* 4+ Services */}
              <CircularRevealCard index={1} slow className="h-full">
                <div 
                  className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/25 to-transparent rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-xl translate-y-1/2 translate-x-1/2" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-cyan-500 text-white shadow-glow animate-pulse">
                       {t.promotions.services4plusBadge}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-400 to-cyan-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 to-cyan-500 bg-clip-text text-transparent">
                       {t.promotions.services4plus}
                    </h3>
                    <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                      <p className="text-foreground text-center text-sm sm:text-base font-semibold leading-relaxed bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent animate-pulse">
                        {t.promotions.springDryingPromo}
                      </p>
                      <p className="text-foreground text-center text-xs sm:text-sm font-bold leading-relaxed bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                        🎉 {t.promotions.dryingFreeSpring}
                      </p>
                    </div>
                  </div>
                </div>
              </CircularRevealCard>

              {/* VIP Deal */}
              <CircularRevealCard index={2} slow className="sm:col-span-2 lg:col-span-1 h-full">
                <div 
                  className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-orange-600/20 to-teal-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-600 to-teal-600 text-white shadow-glow animate-pulse">
                      VIP
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-600 to-teal-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                      {t.promotions.services6plus}
                    </h3>
                    <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                      {t.promotions.loyaltyDesc}
                    </p>
                    <p className="text-orange-600 text-center text-2xl sm:text-3xl font-bold mt-2">
                      -15%
                    </p>
                  </div>
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* Price Cards by Category */}
        <section className="py-12 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
              {categories.map((cat, catIndex) => (
                <CircularRevealCard key={cat.id} index={catIndex}>
                  <div 
                    ref={(el) => { categoryRefs.current[cat.id] = el; }}
                    className="rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-card"
                  >
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
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isCategoryOpen(cat.id) ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-in-out"
                      style={{
                        gridTemplateRows: isCategoryOpen(cat.id) ? '1fr' : '0fr',
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
