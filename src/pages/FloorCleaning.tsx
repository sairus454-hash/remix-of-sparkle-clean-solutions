import { useRef } from 'react';

import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BackToOrderButton from '@/components/BackToOrderButton';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import FloorWorksCarousel from '@/components/FloorWorksCarousel';
import OferteoBadge from '@/components/OferteoBadge';
import { CalculatorItem } from '@/types/calculator';
import { Layers, Sparkles, ShieldCheck, Droplets, CheckCircle2, Truck, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSeoSelfCheck } from '@/hooks/useSeoSelfCheck';

import carpetBeforeAfter from '@/assets/floor-cleaning-carpet-before-after.jpg';
import tileBeforeAfter from '@/assets/floor-cleaning-tile-before-after.jpg';
import floorBa3 from '@/assets/floor-cleaning-ba-3.jpg';
import floorBa4 from '@/assets/floor-cleaning-ba-4.jpg';
import floorBa5 from '@/assets/floor-cleaning-ba-5.jpg';
import mediaexpertCarpetBa from '@/assets/mediaexpert-carpet-ba.jpg';
import heroImage from '@/assets/floor-cleaning-hero.jpg';
import imgCarpetCovering from '@/assets/calc-carpet.jpg';
import imgCarpetMedium from '@/assets/calc-carpet-medium.jpg';
import imgCarpetLarge from '@/assets/calc-carpet-large.jpg';
import imgCarpetPickup from '@/assets/calc-carpet-pickup.jpg';
import imgCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import imgTileCleaning from '@/assets/calc-tile-cleaning.jpg';
import ozone1room from '@/assets/ozone-1room.jpg';
import ozone2room from '@/assets/ozone-2room.jpg';
import ozone3room from '@/assets/ozone-3room.jpg';
import ozoneOfficeSmall from '@/assets/ozone-office-small.jpg';
import ozoneOfficeLarge from '@/assets/ozone-office-large.jpg';
import ozoneCar from '@/assets/ozone-car.jpg';

const FloorCleaning = () => {
  const { t, language } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  useSeoSelfCheck('FloorCleaning (/floor-cleaning)');

  // Floor-cleaning prices are exempt from city markup (base Wrocław everywhere)
  const items = [
    { id: 'carpetCovering', name: t.prices?.items?.carpetCovering || 'Wykładzina dywanowa (1-20 m²)', price: 15, unit: 'm²', image: imgCarpetCovering },
    { id: 'carpetFloorMedium', name: t.prices?.items?.carpetFloorMedium || 'Czyszczenie wykładziny (20-50 m²)', price: 10, unit: 'm²', image: imgCarpetMedium },
    { id: 'carpetFloorLarge', name: t.prices?.items?.carpetFloorLarge || 'Czyszczenie wykładziny (50+ m²)', price: 7, priceText: '7-10 zł', unit: 'm²', image: imgCarpetLarge },
    { id: 'carpetPickup', name: t.prices?.items?.carpetPickup || 'Pranie dywanów z odbiorem', price: 30, unit: 'm²', image: imgCarpetPickup },
    { id: 'carpetImpregnation', name: t.prices?.items?.carpetImpregnation || 'Impregnacja dywanu', price: 5, unit: 'm²', image: imgCarpetImpregnation },
    { id: 'tileCleaning', name: t.prices?.items?.tileCleaning || 'Czyszczenie płytek', price: 20, unit: 'm²', image: imgTileCleaning },
  ];

  const handleSendToForm = (calcItems: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(calcItems, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Localized copy
  const copy = {
    pl: {
      title: 'Pranie wykładzin podłogowych — dywany, wykładziny, płytki',
      subtitle: 'Profesjonalne pranie i czyszczenie podłóg w domu i biurze. Ekstrakcyjne pranie dywanów, wykładzin dywanowych i czyszczenie płytek ceramicznych.',
      desc: 'Specjalizujemy się w głębokim praniu wykładzin podłogowych metodą ekstrakcyjną. Usuwamy plamy, kurz, roztocza, alergeny i nieprzyjemne zapachy. Stosujemy bezpieczne środki — bezpieczne dla dzieci, alergików i zwierząt. Dojeżdżamy z profesjonalnym sprzętem Santoemma do klienta lub odbieramy dywany do naszej pralni.',
      whyTitle: 'Dlaczego warto wybrać nasze pranie wykładzin?',
      benefits: [
        'Ekstrakcyjna technologia — głębokie czyszczenie do włókna',
        'Usuwamy plamy organiczne, kawę, wino, mocz zwierząt',
        'Eliminujemy roztocza i alergeny, świeży zapach',
        'Bezpieczne, hipoalergiczne środki czyszczące',
        'Krótki czas schnięcia — 2-4 godziny',
        'Bez markupu cenowego dla wykładzin we wszystkich miastach',
      ],
      gallery: 'Efekty naszej pracy — przed i po',
      formTitle: 'Zamów pranie wykładzin podłogowych',
      tileTitle: 'Czyszczenie płytek — taras, balkon, kuchnia, łazienka',
      tileDesc: 'Usuwamy zabrudzenia z fug, tłuste plamy, naloty z tarasów i balkonów. Płytki ceramiczne i gres odzyskują pierwotny wygląd.',
      processTitle: 'Jak przebiega pranie wykładzin?',
      steps: [
        { n: '1', t: 'Zgłoszenie i wycena', d: 'Wypełniasz formularz lub dzwonisz — przygotowujemy darmową wycenę.' },
        { n: '2', t: 'Dojazd lub odbiór', d: 'Dojeżdżamy ze sprzętem albo odbieramy dywany do pralni.' },
        { n: '3', t: 'Pranie ekstrakcyjne', d: 'Czyszczenie maszyną Santoemma z preparatami profesjonalnymi.' },
        { n: '4', t: 'Suszenie i odbiór', d: 'Wykładzina szybko schnie i wraca jak nowa.' },
      ],
      keywordsBlock: 'Pranie dywanów Wrocław, czyszczenie wykładzin dywanowych Wrocław, pranie wykładziny biurowej, czyszczenie płytek ceramicznych, pranie dywanu z odbiorem, ekstrakcyjne pranie dywanów, impregnacja dywanu, usuwanie plam z dywanu, pranie chodników, czyszczenie tarasu, czyszczenie balkonu.',
      faqTitle: 'Najczęściej zadawane pytania',
      faqs: [
        { q: 'Ile kosztuje pranie dywanu lub wykładziny?', a: 'Cena zależy od metrażu i rodzaju zabrudzeń. Wykładzina dywanowa 1-20 m² — 15 zł/m², 20-50 m² — 10 zł/m², powyżej 50 m² — 7-10 zł/m². Pranie dywanu z odbiorem do pralni — 30 zł/m². Czyszczenie płytek ceramicznych — 20 zł/m². Impregnacja dywanu — 5 zł/m². Cena jest taka sama we wszystkich miastach (bez markupu).' },
        { q: 'Jak długo schnie wykładzina po praniu ekstrakcyjnym?', a: 'Standardowy czas schnięcia to 2-4 godziny przy dobrej wentylacji. Maszyna Santoemma odsysa większość wilgoci podczas prania, więc dywan po naszej wizycie jest tylko lekko wilgotny. W chłodne lub deszczowe dni schnięcie może potrwać do 6-8 godzin.' },
        { q: 'Czy używane środki są bezpieczne dla dzieci i zwierząt?', a: 'Tak. Stosujemy wyłącznie profesjonalne, hipoalergiczne preparaty zgodne z normami UE. Po wyschnięciu wykładzina jest całkowicie bezpieczna dla dzieci, alergików i zwierząt domowych. Nie pozostawiamy szkodliwych pozostałości chemicznych.' },
        { q: 'Czy usuwacie plamy z moczu zwierząt i wina?', a: 'Tak — specjalizujemy się w usuwaniu plam organicznych: mocz zwierząt, kawa, wino, krew, tłuszcz. Używamy preparatów enzymatycznych, które rozkładają zabrudzenia i neutralizują zapachy u źródła, nie tylko maskują je.' },
        { q: 'Czy odbieracie dywany do pralni?', a: 'Tak. Oferujemy pranie dywanów z odbiorem od klienta — 30 zł/m². Odbieramy dywan, czyścimy w naszej pralni i odwozimy z powrotem w ciągu 3-5 dni roboczych. Usługa dostępna we Wrocławiu i okolicy.' },
        { q: 'Co to jest impregnacja dywanu i czy warto?', a: 'Impregnacja to nakładanie warstwy ochronnej (Scotchgard / Teflon), która chroni włókna przed wnikaniem brudu i płynów. Dzięki temu plamy łatwiej zetrzeć, a dywan dłużej zachowuje świeżość. Cena — 5 zł/m². Zalecamy po każdym praniu.' },
        { q: 'Czy czyścicie płytki na balkonie i tarasie?', a: 'Tak — czyścimy płytki ceramiczne i gres na balkonach, tarasach, w kuchniach i łazienkach. Usuwamy zabrudzenia z fug, naloty, tłuste plamy i pozostałości po remontach. Cena — 20 zł/m².' },
      ],
    },
    ru: {
      title: 'Химчистка напольных покрытий — ковры, ковролин, плитка',
      subtitle: 'Профессиональная экстракторная химчистка ковров, ковролина и керамической плитки в Вроцлаве и пригородах.',
      desc: 'Мы специализируемся на глубокой химчистке напольных покрытий методом экстракции. Удаляем пятна, пыль, клещей, аллергены и запахи. Используем гипоаллергенные средства — безопасны для детей, аллергиков и животных. Приезжаем с профессиональным оборудованием Santoemma или забираем ковры в нашу прачечную.',
      whyTitle: 'Почему выбирают нашу химчистку',
      benefits: [
        'Экстракторная технология — глубокая очистка до волокна',
        'Удаление органических пятен, кофе, вина, следов животных',
        'Уничтожение клещей и аллергенов, свежий аромат',
        'Безопасные гипоаллергенные средства',
        'Короткое время сушки — 2-4 часа',
        'Цена без наценки за город — одинаковая в любом регионе',
      ],
      gallery: 'Результаты — до и после',
      formTitle: 'Заказать химчистку напольных покрытий',
      tileTitle: 'Чистка плитки — балкон, терраса, кухня, ванная',
      tileDesc: 'Удаляем загрязнения из швов, жирные пятна, налёт с балконов и террас. Керамическая плитка и керамогранит снова выглядят как новые.',
      processTitle: 'Как проходит чистка',
      steps: [
        { n: '1', t: 'Заявка и расчёт', d: 'Заполняете форму или звоните — бесплатно считаем стоимость.' },
        { n: '2', t: 'Выезд или забор', d: 'Приезжаем с оборудованием или забираем ковёр в прачечную.' },
        { n: '3', t: 'Экстракторная чистка', d: 'Машина Santoemma с профессиональными препаратами.' },
        { n: '4', t: 'Сушка и возврат', d: 'Покрытие быстро сохнет и выглядит как новое.' },
      ],
      keywordsBlock: 'Химчистка ковров Вроцлав, чистка ковролина, мойка ковра с забором, экстракторная чистка ковров, чистка плитки и швов, чистка балкона и террасы, импрегнация ковров, удаление пятен с ковра, чистка офисного ковролина.',
      faqTitle: 'Часто задаваемые вопросы',
      faqs: [
        { q: 'Сколько стоит химчистка ковра или ковролина?', a: 'Цена зависит от площади и типа покрытия. Ковролин 1-20 м² — 15 zł/м², 20-50 м² — 10 zł/м², свыше 50 м² — 7-10 zł/м². Стирка ковра с забором в прачечную — 30 zł/м². Чистка керамической плитки — 20 zł/м². Импрегнация ковра — 5 zł/м². Цена одинаковая во всех городах (без наценки).' },
        { q: 'Сколько сохнет ковёр после экстракторной чистки?', a: 'Стандартное время сушки — 2-4 часа при хорошей вентиляции. Машина Santoemma вытягивает большую часть влаги во время чистки, поэтому ковёр остаётся лишь слегка влажным. В прохладные или дождливые дни сушка может занять 6-8 часов.' },
        { q: 'Безопасны ли средства для детей и животных?', a: 'Да. Мы используем профессиональные гипоаллергенные препараты, сертифицированные по стандартам ЕС. После высыхания покрытие полностью безопасно для детей, аллергиков и домашних животных. Никаких вредных химических остатков.' },
        { q: 'Удаляете ли вы пятна от мочи животных и вина?', a: 'Да — мы специализируемся на удалении органических пятен: моча животных, кофе, вино, кровь, жир. Используем энзимные препараты, которые расщепляют загрязнения и нейтрализуют запахи у источника, а не маскируют их.' },
        { q: 'Забираете ли ковры в прачечную?', a: 'Да. Предлагаем стирку ковров с забором от клиента — 30 zł/м². Забираем ковёр, чистим в нашей прачечной и привозим обратно в течение 3-5 рабочих дней. Услуга доступна во Вроцлаве и пригородах.' },
        { q: 'Что такое импрегнация ковра и нужна ли она?', a: 'Импрегнация — нанесение защитного слоя (Scotchgard / Teflon), который защищает волокна от проникновения грязи и жидкостей. Благодаря этому пятна легче удаляются, а ковёр дольше сохраняет свежий вид. Цена — 5 zł/м². Рекомендуем после каждой чистки.' },
        { q: 'Чистите ли плитку на балконе и террасе?', a: 'Да — чистим керамическую плитку и керамогранит на балконах, террасах, кухнях и в ванных. Удаляем загрязнения из швов, налёт, жирные пятна и остатки после ремонта. Цена — 20 zł/м².' },
      ],
    },
    en: {
      title: 'Floor covering cleaning — carpets, rugs and tile cleaning',
      subtitle: 'Professional extraction cleaning of carpets, fitted carpets and ceramic tile floors at home and office.',
      desc: 'We specialize in deep extraction cleaning of floor coverings. We remove stains, dust, mites, allergens and odors. Hypoallergenic detergents — safe for children, allergy sufferers and pets. We come with professional Santoemma equipment or collect rugs to our laundry.',
      whyTitle: 'Why choose our floor cleaning service',
      benefits: [
        'Extraction technology — deep cleaning down to the fibre',
        'Removes organic stains, coffee, wine, pet marks',
        'Eliminates mites and allergens, fresh fragrance',
        'Safe, hypoallergenic cleaning agents',
        'Short drying time — 2-4 hours',
        'No city surcharge — same price in every region',
      ],
      gallery: 'Before and after results',
      formTitle: 'Order floor covering cleaning',
      tileTitle: 'Tile cleaning — balcony, terrace, kitchen, bathroom',
      tileDesc: 'We remove dirt from grout, greasy stains and deposits from balconies and terraces. Ceramic tiles look like new again.',
      processTitle: 'How the cleaning process works',
      steps: [
        { n: '1', t: 'Request & quote', d: 'Fill the form or call — free estimate.' },
        { n: '2', t: 'Visit or pickup', d: 'We come with equipment or pick up the rug.' },
        { n: '3', t: 'Extraction cleaning', d: 'Santoemma machine with professional detergents.' },
        { n: '4', t: 'Drying & return', d: 'Coverings dry quickly and look like new.' },
      ],
      keywordsBlock: 'Carpet cleaning Wrocław, fitted carpet cleaning, rug cleaning with pickup, extraction carpet cleaning, ceramic tile cleaning, balcony and terrace cleaning, carpet impregnation, stain removal.',
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'How much does carpet or fitted-carpet cleaning cost?', a: 'Price depends on area and covering type. Fitted carpet 1-20 m² — 15 zł/m², 20-50 m² — 10 zł/m², over 50 m² — 7-10 zł/m². Rug cleaning with pickup — 30 zł/m². Ceramic tile cleaning — 20 zł/m². Carpet impregnation — 5 zł/m². The price is the same in every city (no surcharge).' },
        { q: 'How long does a carpet take to dry after extraction cleaning?', a: 'Standard drying time is 2-4 hours with good ventilation. The Santoemma machine extracts most of the moisture during cleaning, so the carpet is only slightly damp. On cool or rainy days drying can take 6-8 hours.' },
        { q: 'Are the cleaning agents safe for children and pets?', a: 'Yes. We use only professional hypoallergenic detergents that comply with EU standards. Once dry, the carpet is completely safe for children, allergy sufferers and pets. No harmful chemical residues remain.' },
        { q: 'Do you remove pet urine and wine stains?', a: 'Yes — we specialize in organic stain removal: pet urine, coffee, wine, blood, grease. We use enzymatic agents that break down dirt and neutralize odors at the source, not just mask them.' },
        { q: 'Do you collect rugs to your laundry?', a: 'Yes. We offer rug cleaning with pickup — 30 zł/m². We collect the rug, clean it in our laundry and return it within 3-5 business days. Service available in Wrocław and surrounding area.' },
        { q: 'What is carpet impregnation and is it worth it?', a: 'Impregnation is a protective layer (Scotchgard / Teflon) that shields fibres from dirt and liquids. Stains become easier to wipe off and the carpet stays fresh longer. Price — 5 zł/m². We recommend it after every cleaning.' },
        { q: 'Do you clean balcony and terrace tiles?', a: 'Yes — we clean ceramic tiles and porcelain stoneware on balconies, terraces, in kitchens and bathrooms. We remove dirt from grout, deposits, greasy stains and post-renovation residue. Price — 20 zł/m².' },
      ],
    },
    uk: {
      title: 'Хімчистка підлогових покриттів — килими, ковроліни, плитка',
      subtitle: 'Професійна екстракторна хімчистка килимів, ковроліну та керамічної плитки в Вроцлаві та передмісті.',
      desc: 'Спеціалізуємося на глибокій екстракторній чистці підлогових покриттів. Видаляємо плями, пил, кліщів, алергени та запахи. Використовуємо гіпоалергенні засоби — безпечні для дітей, алергіків та тварин. Приїжджаємо з обладнанням Santoemma або забираємо килими до нашої пральні.',
      whyTitle: 'Чому обирають нашу хімчистку',
      benefits: [
        'Екстракторна технологія — глибоке очищення до волокна',
        'Видалення органічних плям, кави, вина, слідів тварин',
        'Знищення кліщів та алергенів, свіжий аромат',
        'Безпечні гіпоалергенні засоби',
        'Короткий час сушіння — 2-4 години',
        'Без націнки за місто — однакова ціна скрізь',
      ],
      gallery: 'Результати — до і після',
      formTitle: 'Замовити хімчистку покриттів',
      tileTitle: 'Чистка плитки — балкон, тераса, кухня, ванна',
      tileDesc: 'Видаляємо бруд із швів, жирні плями та наліт із балконів і терас. Керамічна плитка знову виглядає як нова.',
      processTitle: 'Як проходить чистка',
      steps: [
        { n: '1', t: 'Заявка та розрахунок', d: 'Заповнюєте форму або телефонуєте — безкоштовний розрахунок.' },
        { n: '2', t: 'Виїзд або забір', d: 'Приїжджаємо з обладнанням або забираємо килим.' },
        { n: '3', t: 'Екстракторна чистка', d: 'Машина Santoemma з професійними засобами.' },
        { n: '4', t: 'Сушіння та повернення', d: 'Покриття швидко висихає й виглядає як нове.' },
      ],
      keywordsBlock: 'Хімчистка килимів Вроцлав, чистка ковроліну, миття килима із забором, екстракторна чистка килимів, чистка плитки та швів, чистка балкона і тераси, імпрегнація килимів.',
      faqTitle: 'Часті запитання',
      faqs: [
        { q: 'Скільки коштує хімчистка килима або ковроліну?', a: 'Ціна залежить від площі та типу покриття. Ковролін 1-20 м² — 15 zł/м², 20-50 м² — 10 zł/м², понад 50 м² — 7-10 zł/м². Прання килима із забором — 30 zł/м². Чистка керамічної плитки — 20 zł/м². Імпрегнація килима — 5 zł/м². Ціна однакова в усіх містах (без націнки).' },
        { q: 'Скільки сохне килим після екстракторної чистки?', a: 'Стандартний час сушіння — 2-4 години при добрій вентиляції. Машина Santoemma витягує більшу частину вологи під час чистки, тож килим залишається лише трохи вологим. У холодні або дощові дні сушіння може зайняти 6-8 годин.' },
        { q: 'Чи безпечні засоби для дітей і тварин?', a: 'Так. Ми використовуємо професійні гіпоалергенні препарати, сертифіковані за стандартами ЄС. Після висихання покриття повністю безпечне для дітей, алергіків і домашніх тварин.' },
        { q: 'Чи видаляєте плями від сечі тварин і вина?', a: 'Так — ми спеціалізуємося на органічних плямах: сеча тварин, кава, вино, кров, жир. Використовуємо ензимні препарати, які розщеплюють бруд і нейтралізують запахи біля джерела.' },
        { q: 'Чи забираєте килими до пральні?', a: 'Так. Пропонуємо прання килимів із забором від клієнта — 30 zł/м². Забираємо килим, чистимо в нашій пральні й привозимо назад протягом 3-5 робочих днів.' },
        { q: 'Що таке імпрегнація килима і чи варта вона?', a: 'Імпрегнація — нанесення захисного шару (Scotchgard / Teflon), що захищає волокна від бруду та рідин. Плями легше видаляти, килим довше зберігає свіжість. Ціна — 5 zł/м².' },
        { q: 'Чи чистите плитку на балконі та терасі?', a: 'Так — чистимо керамічну плитку та керамограніт на балконах, терасах, кухнях і у ванних. Видаляємо бруд зі швів, наліт, жирні плями та залишки після ремонту. Ціна — 20 zł/м².' },
      ],
    },
  };

  const c = copy[language as keyof typeof copy] || copy.pl;

  const seoCopy: Record<string, { title: string; desc: string; kw: string }> = {
    pl: {
      // 56 chars
      title: 'Pranie wykładzin Wrocław — dywany, kowrolin, płytki',
      // 156 chars
      desc: 'Profesjonalne pranie dywanów, wykładzin dywanowych i czyszczenie płytek we Wrocławiu i okolicach. Ekstrakcyjne pranie, dojazd lub odbiór bez markupu.',
      kw: 'pranie dywanów wrocław, pranie wykładzin wrocław, czyszczenie wykładziny dywanowej, pranie dywanu z odbiorem wrocław, ekstrakcyjne pranie dywanów, czyszczenie płytek wrocław, czyszczenie fug, impregnacja dywanu, czyszczenie balkonu wrocław, czyszczenie tarasu wrocław, ozonowanie wrocław, ozonowanie mieszkania, ozonowanie biura, ozonowanie samochodu, dezynfekcja ozonem, usuwanie zapachów ozonem',
    },
    ru: {
      // 57 chars
      title: 'Химчистка ковров и плитки во Вроцлаве — выезд',
      // 158 chars
      desc: 'Профессиональная экстракторная химчистка ковров, ковролина и плитки во Вроцлаве и пригородах. Выезд или забор в прачечную. Цена без наценки за город.',
      kw: 'химчистка ковров вроцлав, чистка ковролина вроцлав, мойка ковра с забором вроцлав, экстракторная чистка ковров, чистка плитки вроцлав, чистка швов плитки, импрегнация ковра, чистка балкона вроцлав, чистка террасы, озонирование вроцлав, озонирование квартиры, озонирование офиса, озонирование авто, дезинфекция озоном, удаление запахов озоном',
    },
    en: {
      // 53 chars
      title: 'Carpet & Tile Cleaning Wrocław — Floor Coverings',
      // 154 chars
      desc: 'Professional carpet, fitted carpet and ceramic tile cleaning in Wrocław and surrounding cities. Extraction method, on-site service or pickup. No surcharge.',
      kw: 'carpet cleaning wroclaw, rug cleaning pickup wroclaw, fitted carpet cleaning, extraction carpet cleaning, tile cleaning wroclaw, grout cleaning, carpet impregnation, balcony tile cleaning, terrace cleaning, ozonation wroclaw, apartment ozonation, office ozonation, car ozonation, ozone disinfection, odor removal with ozone',
    },
    uk: {
      // 47 chars
      title: 'Хімчистка килимів і плитки Вроцлав — виїзд',
      // 152 chars
      desc: 'Професійна екстракторна хімчистка килимів, ковроліну та керамічної плитки у Вроцлаві та передмісті. Виїзд або забір. Без націнки за місто, гарантія якості.',
      kw: 'хімчистка килимів вроцлав, чистка ковроліну вроцлав, миття килима із забором, екстракторна чистка килимів, чистка плитки вроцлав, чистка швів, імпрегнація килима, чистка балкона вроцлав, чистка тераси, озонування вроцлав, озонування квартири, озонування офісу, озонування авто, дезінфекція озоном, усунення запахів озоном',
    },
  };
  const s = seoCopy[language as keyof typeof seoCopy] || seoCopy.pl;

  return (
    <>
      <SEO
        title={s.title}
        description={s.desc}
        keywords={s.kw}
        canonical="/floor-cleaning"
        image="/og-floor-cleaning.jpg"
        breadcrumbs={[{ name: c.title.split('—')[0].trim(), path: '/floor-cleaning' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Floor covering cleaning',
            name: c.title,
            description: c.desc,
            url: 'https://masterclean1885.com/floor-cleaning',
            provider: {
              '@type': 'LocalBusiness',
              name: 'MasterClean',
              telephone: '+48575211401',
              address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
            },
            offers: [
              { '@type': 'Offer', name: 'Carpet covering 1-20 m²', price: '15', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Carpet 20-50 m²', price: '10', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Carpet 50+ m²', price: '7', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Carpet pickup cleaning', price: '30', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Tile cleaning', price: '20', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Carpet impregnation', price: '5', priceCurrency: 'PLN' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Ozonation',
            name: language === 'pl' ? 'Ozonowanie pomieszczeń i samochodów'
                : language === 'ru' ? 'Озонирование помещений и автомобилей'
                : language === 'uk' ? 'Озонування приміщень та автомобілів'
                : 'Ozonation of rooms and cars',
            description: language === 'pl' ? 'Usuwanie nieprzyjemnych zapachów i dezynfekcja powietrza generatorem ozonu w mieszkaniach, biurach i samochodach.'
                       : language === 'ru' ? 'Удаление неприятных запахов и дезинфекция воздуха генератором озона в квартирах, офисах и автомобилях.'
                       : language === 'uk' ? 'Усунення неприємних запахів та дезінфекція повітря генератором озону в квартирах, офісах та автомобілях.'
                       : 'Removing unpleasant odors and air disinfection with an ozone generator in apartments, offices and cars.',
            areaServed: { '@type': 'City', name: 'Wrocław' },
            url: 'https://masterclean1885.com/floor-cleaning#ozonation',
            provider: {
              '@type': 'LocalBusiness',
              name: 'MasterClean',
              telephone: '+48575211401',
              address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
            },
            offers: [
              { '@type': 'Offer', name: 'Ozonation 1-room apartment (20-40 m²)', price: '200', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Ozonation 2-room apartment (40-60 m²)', price: '250', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Ozonation 3-room apartment (60+ m²)', price: '300', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Ozonation office (up to 100 m²)', price: '350', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Ozonation office (100-150 m²)', price: '500', priceCurrency: 'PLN' },
              { '@type': 'Offer', name: 'Car ozonation', price: '150', priceCurrency: 'PLN' },
            ],
          },
        ]}
      />

      {/* Canonical + hreflang теперь всегда clean URLs через глобальный SEO-компонент,
          поэтому per-page Helmet override больше не нужен. */}
      <Layout>
        <BackToOrderButton />

        {/* Hero */}
        <section className="py-20 bg-gradient-section relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Layers className="w-8 h-8 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{t.nav.floorCleaning}</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  {c.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {c.subtitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Truck className="w-4 h-4" /> Wrocław · Smolec · 31 miast
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fresh/10 text-fresh text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" /> Santoemma
                  </span>
                </div>
              </div>
              <div className="relative">
                <CircularRevealCard index={0}>
                  <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-gradient-hero p-1">
                    <AnimatedImage
                      src={heroImage}
                      alt={c.title}
                      className="w-full h-[28rem] md:h-[32rem] object-contain object-center rounded-xl bg-card"
                      duration={800}
                    />
                  </div>
                </CircularRevealCard>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                {c.desc}
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <CircularRevealCard index={0}>
                <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
                  <CardServiceCalculator
                    items={items}
                    category="floorCleaning"
                    largeCards
                    onSendToForm={handleSendToForm}
                  />
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* Ozonation pricing */}
        <section id="ozonation" className="py-20 bg-card scroll-mt-20">

          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  {language === 'pl' ? 'Ozonowanie pomieszczeń i samochodów' :
                   language === 'ru' ? 'Озонирование помещений и автомобилей' :
                   language === 'uk' ? 'Озонування приміщень та автомобілів' :
                   'Ozonation of rooms and cars'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'pl' ? 'Usuwanie nieprzyjemnych zapachów, dezynfekcja powietrza' :
                   language === 'ru' ? 'Удаление неприятных запахов, дезинфекция воздуха' :
                   language === 'uk' ? 'Усунення неприємних запахів, дезінфекція повітря' :
                   'Removing unpleasant odors, air disinfection'}
                </p>
              </div>
              <CircularRevealCard index={0}>
                <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
                  <CardServiceCalculator
                    items={[
                      { id: 'ozone1room', name: t.prices.items.ozone1room, price: 200, image: ozone1room },
                      { id: 'ozone2room', name: t.prices.items.ozone2room, price: 250, image: ozone2room },
                      { id: 'ozone3room', name: t.prices.items.ozone3room, price: 300, image: ozone3room },
                      { id: 'ozoneOfficeSmall', name: t.prices.items.ozoneOfficeSmall, price: 350, image: ozoneOfficeSmall },
                      { id: 'ozoneOfficeLarge', name: t.prices.items.ozoneOfficeLarge, price: 500, image: ozoneOfficeLarge },
                      { id: 'autoOzone', name: t.prices.items.autoOzone, price: 150, image: ozoneCar },
                    ]}
                    category="ozone"
                    onSendToForm={handleSendToForm}
                  />
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* Before / After Gallery */}

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
              {c.gallery}
            </h2>
            <FloorWorksCarousel
              slides={[
                { src: carpetBeforeAfter, label: language === 'pl' ? 'Pranie dywanu — efekt przed/po' : language === 'ru' ? 'Химчистка ковра — до/после' : language === 'uk' ? 'Хімчистка килима — до/після' : 'Carpet cleaning — before/after' },
                { src: tileBeforeAfter, label: language === 'pl' ? 'Czyszczenie płytek — efekt przed/po' : language === 'ru' ? 'Чистка плитки — до/после' : language === 'uk' ? 'Чистка плитки — до/після' : 'Tile cleaning — before/after' },
                { src: floorBa3, label: language === 'pl' ? 'Pranie wykładziny biurowej — przed/po' : language === 'ru' ? 'Чистка офисного покрытия — до/после' : language === 'uk' ? 'Чистка офісного покриття — до/після' : 'Office carpet cleaning — before/after' },
                { src: floorBa4, label: language === 'pl' ? 'Pranie wykładziny w biurze — przed/po' : language === 'ru' ? 'Чистка коврового покрытия в офисе — до/после' : language === 'uk' ? 'Чистка килимового покриття в офісі — до/після' : 'Office carpet — before/after' },
                { src: mediaexpertCarpetBa, label: language === 'pl' ? 'Pranie wykładziny w sklepie Media Expert — przed/po' : language === 'ru' ? 'Чистка коврового покрытия в магазине Media Expert — до/после' : language === 'uk' ? 'Чистка килимового покриття в магазині Media Expert — до/після' : 'Media Expert store carpet cleaning — before/after' },
              ]}
            />
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-card-hover border-2 border-border bg-muted">
                <img
                  src={floorBa5}
                  alt={language === 'pl' ? 'Profesjonalny sprzęt Santoemma do prania wykładzin' : language === 'ru' ? 'Профессиональное оборудование Santoemma для химчистки' : language === 'uk' ? 'Професійне обладнання Santoemma' : 'Professional Santoemma cleaning equipment'}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">
                {language === 'pl' ? 'Profesjonalny sprzęt Santoemma — głębokie pranie ekstrakcyjne' : language === 'ru' ? 'Профессиональное оборудование Santoemma — глубокая экстракторная чистка' : language === 'uk' ? 'Професійне обладнання Santoemma — глибока екстракторна чистка' : 'Professional Santoemma equipment — deep extraction cleaning'}
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                {c.whyTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {c.benefits.map((b, i) => (
                  <CircularRevealCard key={i} index={i}>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border shadow-card h-full">
                      <CheckCircle2 className="w-6 h-6 text-fresh flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{b}</p>
                    </div>
                  </CircularRevealCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tile sub-section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">{c.tileTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{c.tileDesc}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
              {c.processTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {c.steps.map((step, i) => (
                <CircularRevealCard key={i} index={i}>
                  <div className="p-6 rounded-2xl bg-gradient-card border border-border text-center h-full shadow-card">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <span className="text-xl font-bold text-primary-foreground">{step.n}</span>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">{step.t}</h3>
                    <p className="text-sm text-muted-foreground">{step.d}</p>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section ref={formSectionRef} className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <Droplets className="w-10 h-10 text-primary mx-auto mb-3" style={{ animation: 'float 3s ease-in-out infinite' }} />
                <h2 className="font-serif text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  {c.formTitle}
                </h2>
              </div>
              <CircularRevealCard index={0}>
                <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
                  <ContactForm ref={formRef} />
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" style={{ animation: 'float 3s ease-in-out infinite' }} />
                <h2 className="font-serif text-3xl font-bold bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  {c.faqTitle}
                </h2>
              </div>
              <CircularRevealCard index={0}>
                <Accordion type="single" collapsible className="bg-card rounded-2xl shadow-card border border-border p-2 md:p-4">
                  {c.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary px-3">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed px-3">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CircularRevealCard>
            </div>
          </div>
        </section>

        {/* SEO Keywords block (visible) */}
        <section className="py-10 bg-gradient-section">
          <div className="container mx-auto px-4">
            <p className="max-w-4xl mx-auto text-xs text-muted-foreground/70 text-center leading-relaxed">
              {c.keywordsBlock}
            </p>
          </div>
        </section>
        <OferteoBadge />
      </Layout>
    </>
  );
};

export default FloorCleaning;
