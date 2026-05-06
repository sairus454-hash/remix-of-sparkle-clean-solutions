import { useState, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CircularRevealCard from '@/components/CircularRevealCard';
import BackToOrderButton from '@/components/BackToOrderButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home, Coins, Package, Car, Wind, Armchair, BedDouble,
  Sofa, Sparkles, Wrench, ChevronDown, MapPin,
  Gift, Percent, Droplets, Tag, Leaf
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCityBySlug } from '@/data/cities';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { img } from '@/utils/imageMap';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import { CalculatorItem } from '@/types/calculator';
import SmartServiceFilter, { useFilteredCategoryItems } from '@/components/SmartServiceFilter';
import MobilePromotionsCard from '@/components/MobilePromotionsCard';
import PromotionsSection from '@/components/PromotionsSection';
import { getCityProfile } from '@/data/cityProfiles';
import { generateCityContent } from '@/data/cityContentGenerator';
import { getServiceCategoryMeta } from '@/lib/serviceCategoryMeta';
import CleaningPricingTopBlock from '@/components/CleaningPricingTopBlock';

// FAQ data helper for SEO
function getFaqData(language: string, cityName: string, isWroclaw: boolean) {
  const faqs = {
    pl: [
      { q: `Jakie usługi oferujecie w ${cityName}?`, a: isWroclaw ? `W ${cityName} oferujemy pełen zakres usług: pranie tapicerki meblowej i samochodowej, czyszczenie materacy i dywanów, ozonowanie, mycie okien, sprzątanie mieszkań i domów oraz usługi złotej rączki.` : `W ${cityName} oferujemy: pranie tapicerki meblowej i samochodowej, czyszczenie materacy i dywanów, ozonowanie, mycie okien oraz impregnację. Usługi sprzątania i złotej rączki dostępne są wyłącznie we Wrocławiu.` },
      { q: `Ile kosztuje pranie tapicerki w ${cityName}?`, a: isWroclaw ? `Ceny zaczynają się od 36 PLN za pufę. Sofa 2-osobowa — 160 PLN, sofa 3-osobowa — 180 PLN, narożnik — od 230 PLN. Minimalne zamówienie: 160 PLN.` : `Ceny w ${cityName} są o 10% wyższe od bazowych cen wrocławskich. Przykładowo: sofa 2-osobowa — 180 PLN, sofa 3-osobowa — 200 PLN. Minimalne zamówienie: 220 PLN.` },
      { q: `Jak szybko możecie przyjechać do ${cityName}?`, a: `Realizujemy zamówienia w ${cityName} regularnie. Termin ustalamy indywidualnie — często możemy przyjechać tego samego lub następnego dnia. Zadzwoń: +48 575 211 401.` },
      { q: 'Czy używacie bezpiecznych środków czyszczących?', a: 'Tak! Stosujemy profesjonalną chemię Allegrini, Bissell i Global, która jest bezpieczna dla dzieci, zwierząt i alergików. Używamy sprzętu Kärcher i SantoEmma.' },
    ],
    ru: [
      { q: `Какие услуги доступны в городе ${cityName}?`, a: isWroclaw ? `В ${cityName} доступен полный спектр услуг: химчистка мебели и авто, чистка матрасов и ковров, озонирование, мойка окон, уборка и мастер на час.` : `В ${cityName} доступны: химчистка мебели и авто, чистка матрасов и ковров, озонирование, мойка окон, импрегнация. Уборка и мастер на час — только во Вроцлаве.` },
      { q: `Сколько стоит химчистка мебели в ${cityName}?`, a: isWroclaw ? `Цены начинаются от 36 PLN за пуф. Диван 2-мест. — 160 PLN, 3-мест. — 180 PLN, угловой — от 230 PLN. Минимальный заказ: 160 PLN.` : `Цены в ${cityName} на 10% выше базовых. Например: диван 2-мест. — 180 PLN, 3-мест. — 200 PLN. Минимальный заказ: 220 PLN.` },
      { q: `Как быстро вы приедете в ${cityName}?`, a: `Мы регулярно выезжаем в ${cityName}. Срок обговаривается индивидуально — часто в тот же или следующий день. Звоните: +48 575 211 401.` },
      { q: 'Безопасна ли ваша химия для детей и животных?', a: 'Да! Используем профессиональную химию Allegrini, Bissell и Global — безопасна для детей, животных и аллергиков. Оборудование Kärcher и SantoEmma.' },
    ],
    en: [
      { q: `What services do you offer in ${cityName}?`, a: isWroclaw ? `In ${cityName} we offer the full range: upholstery and car cleaning, mattress and carpet cleaning, ozonation, window cleaning, house cleaning and handyman services.` : `In ${cityName} we offer: upholstery and car cleaning, mattress and carpet cleaning, ozonation, window cleaning and impregnation. House cleaning and handyman services are available only in Wrocław.` },
      { q: `How much does upholstery cleaning cost in ${cityName}?`, a: isWroclaw ? `Prices start from 36 PLN for an ottoman. 2-seater sofa — 160 PLN, 3-seater — 180 PLN, corner sofa — from 230 PLN. Minimum order: 160 PLN.` : `Prices in ${cityName} are 10% higher than base Wrocław prices. Example: 2-seater sofa — 180 PLN, 3-seater — 200 PLN. Minimum order: 220 PLN.` },
      { q: `How quickly can you come to ${cityName}?`, a: `We regularly serve ${cityName}. Scheduling is individual — often same or next day. Call: +48 575 211 401.` },
      { q: 'Are your cleaning products safe for children and pets?', a: 'Yes! We use professional Allegrini, Bissell and Global cleaning products — safe for children, pets and allergy sufferers. Equipment: Kärcher and SantoEmma.' },
    ],
    uk: [
      { q: `Які послуги доступні в ${cityName}?`, a: isWroclaw ? `В ${cityName} доступний повний спектр послуг: хімчистка меблів та авто, чистка матраців і килимів, озонування, миття вікон, прибирання та майстер на годину.` : `В ${cityName} доступні: хімчистка меблів та авто, чистка матраців і килимів, озонування, миття вікон, імпрегнація. Прибирання та майстер — лише у Вроцлаві.` },
      { q: `Скільки коштує хімчистка меблів у ${cityName}?`, a: isWroclaw ? `Ціни починаються від 36 PLN за пуф. Диван 2-місний — 160 PLN, 3-місний — 180 PLN, кутовий — від 230 PLN. Мінімальне замовлення: 160 PLN.` : `Ціни в ${cityName} на 10% вищі за базові. Наприклад: диван 2-місний — 180 PLN, 3-місний — 200 PLN. Мінімальне замовлення: 220 PLN.` },
      { q: `Як швидко ви приїдете до ${cityName}?`, a: `Ми регулярно виїжджаємо до ${cityName}. Термін обговорюється індивідуально — часто того ж або наступного дня. Телефонуйте: +48 575 211 401.` },
      { q: 'Чи безпечна ваша хімія для дітей та тварин?', a: 'Так! Використовуємо професійну хімію Allegrini, Bissell та Global — безпечна для дітей, тварин та алергіків. Обладнання Kärcher та SantoEmma.' },
    ],
  };
  return faqs[language as keyof typeof faqs] || faqs.pl;
}

const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isFullCalc, setIsFullCalc] = useState(false);
  const [closedCategories, setClosedCategories] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleSendToForm = (items: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(items, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const city = getCityBySlug(slug || '');
  if (!city) return <Navigate to="/prices" replace />;

  const lang = language as keyof typeof city.content;
  const cityContent = city.content[lang] || city.content.pl;
  const isWroclaw = city.slug === 'wroclaw' || city.slug === 'smolec' || city.slug === 'bielany-wroclawskie';
  const isCleaningCity = city.slug === 'wroclaw' || city.slug === 'smolec' || city.slug === 'bielany-wroclawskie' || city.slug === 'tyniec-maly';

  // FAQ data for SEO — base FAQs (shared) + 2 unique per-city FAQs from generator
  const profile = getCityProfile(city.slug);
  const generated = generateCityContent(city.name, city.slug, lang as 'pl' | 'ru' | 'en' | 'uk', profile);
  const baseFaqs = getFaqData(language, city.name, isWroclaw);
  const faqData = [...generated.faqs, ...baseFaqs];

  const META = getServiceCategoryMeta(t);
  const categories = [
    {
      ...META.cleaning,
      items: [
        { id: 'cleaning-standard', name: `${t.cleaning?.standardCleaning || 'Стандартная уборка'}`, price: 7, image: img('hero-house-cleaning.jpg'), unit: 'm²' },
        { id: 'cleaning-general', name: `${t.cleaning?.generalCleaning || 'Генеральная уборка'}`, price: 10, image: img('hero-house-cleaning-2.jpg'), unit: 'm²' },
        { id: 'extra-oven', name: t.cleaning?.extras?.oven || 'Помоем духовку', price: 40, image: img('calc-extra-oven.jpg') },
        { id: 'extra-hood', name: t.cleaning?.extras?.hood || 'Помоем вытяжку', price: 40, image: img('calc-extra-hood.jpg') },
        { id: 'extra-cabinets', name: t.cleaning?.extras?.cabinets || 'Уберем в кухонных шкафчиках', price: 40, image: img('calc-extra-cabinets.jpg') },
        { id: 'extra-dishes', name: t.cleaning?.extras?.dishes || 'Помоем посуду', price: 25, image: img('calc-extra-dishes.jpg') },
        { id: 'extra-fridge', name: t.cleaning?.extras?.fridge || 'Почистим холодильник', price: 40, image: img('calc-extra-fridge.jpg') },
        { id: 'extra-fridgeSmall', name: t.cleaning?.extras?.fridgeSmall || 'Холодильник малый', price: 20, image: img('calc-extra-fridge-small.jpg') },
        { id: 'extra-microwave', name: t.cleaning?.extras?.microwave || 'Помоем микроволновку', price: 10, image: img('calc-extra-microwave.jpg') },
        { id: 'extra-balcony', name: t.cleaning?.extras?.balcony || 'Уберем на балконе', price: 8, image: img('calc-extra-balcony.jpg'), unit: 'm²' },
        { id: 'extra-ironing', name: t.cleaning?.extras?.ironing || 'Глажка', price: 50, image: img('calc-extra-ironing.jpg'), unit: 'ч' },
        { id: 'extra-petLitter', name: t.cleaning?.extras?.petLitter || 'Убрать лоток для животных', price: 10, image: img('calc-extra-pet-litter.jpg') },
        { id: 'extra-closet', name: t.cleaning?.extras?.closet || 'Убрать в шкафу', price: 30, image: img('calc-extra-closet.jpg') },
      ],
    },
    {
      ...META.furniture,
      items: [
        { id: 'pouf', name: t.prices.items.pouf, price: 30, image: img('calc-pouf.jpg') },
        { id: 'chairSeat', name: t.prices.items.chairSeat, price: 15, image: img('calc-chair-seat.jpg') },
        { id: 'chairWithBack', name: t.prices.items.chairWithBack, price: 25, image: img('calc-chair-back.jpg') },
        { id: 'chairConference', name: t.prices.items.chairConference, price: 30, image: img('calc-chair-conference.jpg') },
        { id: 'chairSwivel', name: t.prices.items.chairSwivel, price: 45, image: img('calc-chair-swivel.jpg') },
        { id: 'chair', name: t.prices.items.chair, price: 25, image: img('calc-chair.jpg') },
        { id: 'armchair', name: t.prices.items.armchair, price: 65, image: img('calc-armchair.jpg') },
        { id: 'pillow', name: t.prices.items.pillow, price: 5, image: img('calc-pillow.jpg') },
        { id: 'sofa2', name: t.prices.items.sofa2, price: 160, image: img('calc-sofa2.jpg') },
        { id: 'sofa3', name: t.prices.items.sofa3, price: 180, image: img('calc-sofa3.jpg') },
        { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 230, image: img('calc-sofa-corner.jpg') },
        { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 280, image: img('calc-sofa-corner-large.jpg') },
        { id: 'kitchenCorner', name: t.prices.items.kitchenCorner, price: 180, image: img('calc-kitchen-corner.jpg') },
        { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 100, image: img('calc-headboard.jpg') },
        { id: 'bedFrame', name: t.prices.items.bedFrame, price: 100, image: img('calc-bedframe.jpg') },
        
      ],
    },
    {
      ...META.mattress,
      items: [
        { id: 'mattressSingle', name: t.prices.items.mattressSingleDry, price: 115, image: img('calc-mattress-single.jpg') },
        { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2, price: 180, image: img('calc-mattress-single.jpg') },
        { id: 'mattressDouble', name: t.prices.items.mattressDoubleDry, price: 175, image: img('calc-mattress-double.jpg') },
        { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2, price: 300, image: img('calc-mattress-double.jpg') },
        
      ],
    },
    {
      ...META.leather,
      items: [
        { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 40, image: img('calc-leather-pouf.jpg') },
        { id: 'leatherChair', name: t.prices.items.leatherChair, price: 40, image: img('calc-leather-chair.jpg') },
        { id: 'leatherPillow', name: t.prices.items.leatherPillow, price: 15, image: img('calc-leather-pouf.jpg') },
        { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 75, image: img('calc-leather-armchair.jpg') },
        { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 145, image: img('calc-leather-sofa2.jpg') },
        { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 180, image: img('calc-leather-sofa3.jpg') },
        { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 220, image: img('calc-leather-corner.jpg') },
        { id: 'leatherChairSwivel', name: t.prices.items.leatherChairSwivel, price: 60, image: img('calc-leather-chair-swivel.jpg') },
      ],
    },
    {
      ...META.auto,
      items: [
        { id: 'autoComplex', name: t.prices.items.autoComplex, price: 450, image: img('calc-auto-complex.jpg') },
        { id: 'autoComplexLeather', name: t.prices.items.autoComplexLeather, price: 550, image: img('calc-auto-leather.jpg') },
        { id: 'autoVip', name: t.prices.items.autoVip, price: 700, image: img('calc-auto-vip.jpg') },
        { id: 'autoVipLeather', name: t.prices.items.autoVipLeather, price: 800, image: img('calc-auto-vip-leather.jpg') },
        { id: 'autoSeat', name: t.prices.items.autoSeat, price: 80, image: img('calc-auto-seat.jpg') },
        { id: 'autoSeats', name: t.prices.items.autoSeats, price: 250, image: img('calc-auto-seats.jpg') },
        { id: 'autoLeatherSeats', name: t.prices.items.autoLeatherSeats, price: 300, image: img('calc-auto-leather-seats.jpg') },
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
      ...META.ozone,
      items: [
        { id: 'ozone1room', name: t.prices.items.ozone1room, price: 144, image: img('ozone-1room.jpg') },
        { id: 'ozone2room', name: t.prices.items.ozone2room, price: 240, image: img('ozone-2room.jpg') },
        { id: 'ozone3room', name: t.prices.items.ozone3room, price: 360, image: img('ozone-3room.jpg') },
        { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 300, image: img('ozone-office-small.jpg') },
        { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 480, image: img('ozone-office-large.jpg') },
      ],
    },
    {
      ...META.floorCleaning,
      items: [
        { id: 'carpetCovering', name: t.prices.items.carpetCovering, price: 15, image: img('calc-carpet.jpg'), unit: 'm²' },
        { id: 'carpetFloorMedium', name: t.prices.items.carpetFloorMedium, price: 10, image: img('calc-carpet-medium.jpg'), unit: 'm²' },
        { id: 'carpetFloorLarge', name: t.prices.items.carpetFloorLarge, price: 7, image: img('calc-carpet-large.jpg'), unit: 'm²', priceText: '7-10 zł' },
        { id: 'carpetImpregnation', name: t.prices.items.carpetImpregnation, price: 5, image: img('calc-carpet-impregnation.jpg'), unit: 'm²' },
        { id: 'tileCleaning', name: t.prices.items.tileCleaning, price: 20, image: img('calc-tile-cleaning.jpg'), unit: 'm²' },
        { id: 'carpetPickup', name: t.prices.items.carpetPickup, price: 30, image: img('calc-carpet-pickup.jpg'), unit: 'm²' },
        { id: 'carpetCoveringImpregnation', name: t.prices.items.carpetCoveringImpregnation, price: 3, image: img('calc-carpet-covering-impregnation.jpg'), unit: 'm²' },
      ],
    },
    {
      ...META.other,
      items: [
        { id: 'stroller', name: t.prices.items.stroller, price: 100, image: img('calc-stroller.jpg') },
        { id: 'carseat', name: t.prices.items.carseat, price: 80, image: img('calc-carseat.jpg') },
        { id: 'drying', name: t.prices.items.drying, price: 0, image: img('calc-drying.jpg'), promoBadge: t.promotions.dryingFreeSpring },
        { id: 'impregnation', name: t.prices.items.impregnation, price: 80, image: img('calc-impregnation.jpg') },
      ],
    },
    {
      ...META.windows,
      items: [
        { id: 'windowSingle', name: t.windows?.items?.single || 'Одностворчатое окно', price: 40, image: img('window-cleaning-1.jpg') },
        { id: 'windowDouble', name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50, image: img('window-cleaning-2.jpg') },
        { id: 'windowTriple', name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80, image: img('window-cleaning-3.jpg') },
        { id: 'windowBalcony', name: t.windows?.items?.balcony || 'Балконное окно', price: 60, image: img('window-cleaning-1.jpg') },
        { id: 'windowTerrace', name: t.windows?.items?.terrace || 'Террасное окно', price: 85, image: img('window-cleaning-2.jpg') },
        { id: 'windowAttic', name: t.windows?.items?.attic || 'Мансардное окно', price: 40, image: img('window-cleaning-3.jpg') },
        { id: 'balustrade', name: t.windows?.items?.balustrade || 'Балюстрада', price: 40, image: img('window-cleaning-1.jpg') },
        { id: 'glassPanels', name: t.windows?.items?.glassPanels || 'Mycie paneli szklanych', price: 10, unit: 'm²', image: img('window-cleaning-2.jpg') },
      ],
    },
    {
      ...META.handyman,
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
      ],
    },
  ];
  void Leaf;

  const isNoGardeningSurcharge = city.slug === 'wroclaw' || city.slug === 'smolec';

  // Floor cleaning items keep base Wrocław prices in every city (no regional markup)
  const carpetItemIds = new Set([
    'carpetCovering',
    'carpetFloorMedium',
    'carpetFloorLarge',
    'carpetImpregnation',
    'carpetPickup',
    'carpetCoveringImpregnation',
    'tileCleaning',
  ]);

  // For non-Wrocław cities: +10% rounded up, except free items (price=0) and carpet items
  const applyMarkup = (cats: typeof categories, multiplier = 1.1) =>
    cats.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({
        ...item,
        price:
          item.price === 0 || carpetItemIds.has(item.id)
            ? item.price
            : Math.ceil((item.price * multiplier) / 5) * 5,
      })),
    }));

  // Auto cleaning: no regional markup — keep Wrocław base prices in all cities
  const hiddenOtherServicesOutsideBase = ['carpetPickup', 'carpetCoveringImpregnation'];

  // Build a slim "cleaning" category with only Standard + General (m² with slider)
  // For Wrocław/Smolec — base prices; for other cities — +10% markup
  const buildCleaningSlim = (withMarkup: boolean) => {
    const cleaningCat = categories.find(c => c.id === 'cleaning');
    if (!cleaningCat) return [];
    const slim = {
      ...cleaningCat,
      id: 'cleaning-area',
      items: cleaningCat.items.filter(i => i.id === 'cleaning-standard' || i.id === 'cleaning-general'),
    };
    return withMarkup ? applyMarkup([slim]) : [slim];
  };

  const filteredCategories = isCleaningCity
    ? categories.filter(c => c.id !== 'cleaning')
    : categories
        .filter(c => c.id !== 'cleaning' && c.id !== 'handyman' && c.id !== 'gardening')
        .map(cat => {
          // Auto: always base Wrocław prices and stays directly after leather furniture
          if (cat.id === 'auto') return cat;
          const visibleCat = (cat.id === 'other' || cat.id === 'floorCleaning')
            ? { ...cat, items: cat.items.filter(item => !hiddenOtherServicesOutsideBase.includes(item.id)) }
            : cat;
          return applyMarkup([visibleCat])[0];
        });

  const { categories: displayCategories } = useFilteredCategoryItems(filteredCategories, activeFilter, searchQuery);

  return (
    <>
      <SEO
        title={city.seo.title}
        description={city.seo.description}
        keywords={city.seo.keywords}
        canonical={`/city/${city.slug}`}
        image={`https://masterclean1885.com/og-${city.slug === 'ostrow-wielkopolski' ? 'ostrow' : city.slug}.png`}
        breadcrumbs={[{ name: city.name, path: `/city/${city.slug}` }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: `MasterClean — ${city.name}`,
              description: city.seo.description,
              url: `https://masterclean1885.com/city/${city.slug}`,
              areaServed: {
                '@type': 'City',
                name: city.name,
              },
              provider: {
                '@type': 'LocalBusiness',
                name: 'MasterClean',
                url: 'https://masterclean1885.com',
                telephone: '+48575211401',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'PL',
                  addressRegion: city.region,
                  addressLocality: city.name,
                },
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'PLN',
                lowPrice: isWroclaw ? '36' : '40',
                highPrice: isWroclaw ? '675' : '743',
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqData.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ],
        }}
      />
      <Layout>
        <BackToOrderButton />
        {/* Hero */}
        <section className="py-12 sm:py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-glow p-2" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <img
                      src={`/coats/${city.slug}.png`}
                      alt={`Herb ${city.name}`}
                      className="w-full h-full object-contain drop-shadow-md"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-fresh opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary opacity-60" />
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {cityContent.heading}
              </h1>
              <p className="text-base sm:text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fade-up px-4 font-medium" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {cityContent.subtitle}
              </p>
              <p className="text-sm sm:text-base text-white/90 font-bold mt-4 animate-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.15s' }}>
                {language === 'ru'
                  ? 'Гарантия на качество выполненных услуг — 7 дней'
                  : language === 'uk'
                  ? 'Гарантія на якість виконаних послуг — 7 днів'
                  : language === 'en'
                  ? '7-day quality guarantee on all services'
                  : 'Gwarancja jakości wykonanych usług — 7 dni'}
              </p>
            </div>
          </div>
        </section>

        {/* City Description — unique generated content per city */}
        <section className="py-8 sm:py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-border bg-background">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div className="space-y-3">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2">
                    {city.name} — {city.region}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {cityContent.description}
                  </p>
                  {generated.paragraphs.map((para, i) => (
                    <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground text-center mb-6">
                {language === 'pl' ? '🎁 Aktualne promocje' : language === 'en' ? '🎁 Current promotions' : language === 'uk' ? '🎁 Актуальні акції' : '🎁 Актуальные акции'}
              </h2>
              <div className="grid gap-3 sm:gap-4">
                {/* Free drying */}
                <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-fresh/30 bg-fresh/5 p-4 sm:p-5">
                  <div className="w-10 h-10 rounded-lg bg-fresh/20 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-5 h-5 text-fresh" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      {language === 'pl' ? 'Suszenie mebli — GRATIS!' : language === 'en' ? 'Furniture drying — FREE!' : language === 'uk' ? 'Сушка меблів — БЕЗКОШТОВНО!' : 'Сушка мебели — БЕСПЛАТНО!'}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {language === 'pl' ? 'Do każdego zamówienia dołączamy profesjonalne suszenie — bezpłatnie do końca wiosny.' : language === 'en' ? 'Professional drying included with every order — free until the end of spring.' : language === 'uk' ? 'До кожного замовлення додаємо професійне сушіння — безкоштовно до кінця весни.' : 'К каждому заказу добавляем профессиональную сушку — бесплатно до конца весны.'}
                    </p>
                  </div>
                </div>

                {/* Multi-service discount */}
                <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Percent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      {language === 'pl' ? 'Rabaty za wiele usług: do -15%' : language === 'en' ? 'Multi-service discounts: up to -15%' : language === 'uk' ? 'Знижки за кілька послуг: до -15%' : 'Скидки за несколько услуг: до -15%'}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {language === 'pl' ? '2 kategorie usług — 5%, 4 kategorie — 10%, 6 kategorii — 15% VIP. Automatyczny rabat w kalkulatorze!' : language === 'en' ? '2 service categories — 5%, 4 categories — 10%, 6 categories — 15% VIP. Auto-calculated!' : language === 'uk' ? '2 категорії послуг — 5%, 4 категорії — 10%, 6 категорій — 15% VIP. Автоматичний розрахунок!' : '2 категории услуг — 5%, 4 категории — 10%, 6 категорий — 15% VIP. Автоматический расчёт!'}
                    </p>
                  </div>
                </div>


                {/* Free delivery */}
                <div className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      {language === 'pl' ? 'Dojazd gratis — bez ukrytych kosztów' : language === 'en' ? 'Free delivery — no hidden fees' : language === 'uk' ? 'Безкоштовний виїзд — без прихованих витрат' : 'Бесплатный выезд — без скрытых расходов'}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {language === 'pl' ? `Realizujemy zamówienia w ${city.name} regularnie. Dojazd jest wliczony w cenę usługi.` : language === 'en' ? `We regularly serve ${city.name}. Delivery is included in the service price.` : language === 'uk' ? `Ми регулярно обслуговуємо ${city.name}. Виїзд включено у вартість послуги.` : `Мы регулярно обслуживаем ${city.name}. Выезд включён в стоимость услуги.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Полные блоки акций (как на главной) — только для Wrocław-группы */}
        {isWroclaw && (
          <>
            <MobilePromotionsCard />
            <div className="hidden md:block">
              <PromotionsSection />
            </div>
          </>
        )}

        {/* Соседская акция — для остальных городов */}
        {!isWroclaw && (
          <section className="py-10 sm:py-16 bg-gradient-section">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative overflow-hidden p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-card bg-card/90 border border-border/50 hover:shadow-glow transition-all duration-500">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-orange-400/25 to-transparent rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-500/20 to-transparent rounded-full blur-xl translate-y-1/2 translate-x-1/2" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-600 to-teal-600 text-primary-foreground shadow-glow animate-pulse">
                      -20%
                    </span>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                      {language === 'pl'
                        ? 'Promocja sąsiedzka — oboje oszczędzacie'
                        : language === 'en'
                        ? 'Neighbour promo — both of you save'
                        : language === 'uk'
                        ? 'Сусідська акція — обидва економите'
                        : 'Соседская акция — экономите оба'}
                    </h2>
                    <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium">
                      {language === 'pl'
                        ? 'Przyprowadź sąsiada — oboje otrzymujecie 20% rabatu na całe zamówienie.'
                        : language === 'en'
                        ? 'Bring a neighbour — both of you get 20% off the entire order.'
                        : language === 'uk'
                        ? 'Приведіть сусіда — обидва отримуєте 20% знижки на все замовлення.'
                        : 'Приведите соседа — оба получаете 20% скидки на весь заказ.'}
                    </p>
                    <p className="text-orange-600 text-3xl sm:text-4xl font-bold mt-3">-20%</p>
                    <Button
                      onClick={() => {
                        const neighborLabels: Record<string, string> = {
                          ru: '🏘️ Соседская акция — 20% (приведи соседа, оба получают -20%)',
                          pl: '🏘️ Promocja sąsiedzka — 20% (przyprowadź sąsiada, oboje -20%)',
                          uk: '🏘️ Сусідська акція — 20% (приведи сусіда, обидва -20%)',
                          en: '🏘️ Neighbor promo — 20% (bring a neighbor, both get -20%)',
                        };
                        formRef.current?.setPromotion(neighborLabels[language] || neighborLabels.ru);
                        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="mt-5 bg-gradient-to-r from-orange-600 to-teal-600 text-primary-foreground hover:opacity-90 font-bold rounded-full px-6 py-5 shadow-glow"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      {language === 'pl' ? 'Odbierz rabat' : language === 'en' ? 'Get the discount' : language === 'uk' ? 'Отримати знижку' : 'Получить скидку'}
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cleaning pricing top block (apartment cleaning + extras) — only for Wrocław/Smolec */}
        {isCleaningCity && (
          <CleaningPricingTopBlock onSendToForm={handleSendToForm} />
        )}

        {/* Price Cards by Category */}
        <section className="py-12 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <SmartServiceFilter
              categories={filteredCategories.map(c => ({ id: c.id, title: c.title, icon: c.icon }))}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultsCount={displayCategories.reduce((s, c) => s + c.items.length, 0)}
            />
            <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
              {displayCategories.map((cat, catIndex) => (
                <div key={cat.id}>
                  <div 
                    ref={(el) => { categoryRefs.current[cat.id] = el; }}
                    className="rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-card"
                  >
                    <button
                      onClick={() => setClosedCategories(prev => {
                        const next = new Set(prev);
                        if (next.has(cat.id)) next.delete(cat.id);
                        else next.add(cat.id);
                        return next;
                      })}
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
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${!closedCategories.has(cat.id) ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-in-out"
                      style={{
                        gridTemplateRows: !closedCategories.has(cat.id) ? '1fr' : '0fr',
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="p-4 sm:p-5 pt-0">
                          <CardServiceCalculator
                            items={cat.items}
                            category={`city-${city.slug}-${cat.id}`}
                            groupHighlight={cat.id === 'floorCleaning' ? {
                              count: 5,
                              label: language === 'pl' ? 'Czyszczenie według m² (suwak)' :
                                     language === 'en' ? 'Per m² services (slider)' :
                                     language === 'uk' ? 'Розрахунок за м² (слайдер)' :
                                     'Расчёт по м² (слайдер)',
                            } : undefined}
                            onSendToForm={handleSendToForm}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Notice about Wrocław-only services */}
              {!isWroclaw && (
                <div className="rounded-2xl border border-border bg-accent/20 p-5 sm:p-6 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">
                    {language === 'pl' && 'Usługi złotej rączki oraz dodatkowe opcje sprzątania (mycie piekarnika, lodówki, okien itd.) dostępne są wyłącznie we Wrocławiu.'}
                    {language === 'en' && 'Handyman services and additional cleaning options (oven, fridge, windows, etc.) are available only in Wrocław.'}
                    {language === 'ru' && 'Услуги мастера на час и дополнительные опции уборки (духовка, холодильник, окна и т.д.) доступны только во Вроцлаве.'}
                    {language === 'uk' && 'Послуги майстра на годину та додаткові опції прибирання (духовка, холодильник, вікна тощо) доступні лише у Вроцлаві.'}
                  </p>
                  <a href="/city/wroclaw" className="inline-block text-sm text-primary hover:underline font-semibold">
                    {language === 'pl' ? 'Zobacz pełną ofertę dla Wrocławia →' : language === 'en' ? 'See full offer for Wrocław →' : language === 'uk' ? 'Переглянути повну пропозицію для Вроцлава →' : 'Смотреть полный прайс для Вроцлава →'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={formSectionRef} className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <ContactForm ref={formRef} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
                {language === 'pl' ? 'Najczęściej zadawane pytania' : language === 'en' ? 'Frequently Asked Questions' : language === 'uk' ? 'Часті запитання' : 'Часто задаваемые вопросы'}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqData.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4 bg-background">
                    <AccordionTrigger className="hover:no-underline py-4 text-left text-sm sm:text-base font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CityPage;
