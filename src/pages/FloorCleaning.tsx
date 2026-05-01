import { useRef } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BackToOrderButton from '@/components/BackToOrderButton';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import { CalculatorItem } from '@/types/calculator';
import { Layers, Sparkles, ShieldCheck, Droplets, CheckCircle2, Truck, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import carpetBeforeAfter from '@/assets/floor-cleaning-carpet-before-after.jpg';
import tileBeforeAfter from '@/assets/floor-cleaning-tile-before-after.jpg';
import heroImage from '@/assets/floor-cleaning-hero.jpg';
import imgCarpetCovering from '@/assets/calc-carpet.jpg';
import imgCarpetMedium from '@/assets/calc-carpet-medium.jpg';
import imgCarpetLarge from '@/assets/calc-carpet-large.jpg';
import imgCarpetPickup from '@/assets/calc-carpet-pickup.jpg';
import imgCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import imgTileCleaning from '@/assets/calc-tile-cleaning.jpg';

const FloorCleaning = () => {
  const { t, language } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

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
    },
  };

  const c = copy[language as keyof typeof copy] || copy.pl;

  const seoCopy: Record<string, { title: string; desc: string; kw: string }> = {
    pl: {
      title: 'Pranie wykładzin Wrocław — dywany, ​ko­wro­lin, płytki | MasterClean',
      desc: 'Profesjonalne pranie dywanów, wykładzin dywanowych i czyszczenie płytek ceramicznych we Wrocławiu. Ekstrakcyjne pranie, dojazd lub odbiór. Cena bez markupu.',
      kw: 'pranie dywanów wrocław, pranie wykładzin, czyszczenie wykładziny dywanowej, pranie dywanu z odbiorem, ekstrakcyjne pranie dywanów, czyszczenie płytek wrocław, czyszczenie fug, impregnacja dywanu, czyszczenie balkonu, czyszczenie tarasu',
    },
    ru: {
      title: 'Химчистка ковров и плитки во Вроцлаве — ковролин, плитка | MasterClean',
      desc: 'Профессиональная химчистка ковров, ковролина и керамической плитки во Вроцлаве. Экстракторный метод, выезд или забор. Цена без наценки за город.',
      kw: 'химчистка ковров вроцлав, чистка ковролина, мойка ковра с забором, экстракторная чистка, чистка плитки вроцлав, чистка швов, импрегнация ковра, чистка балкона',
    },
    en: {
      title: 'Carpet & Tile Cleaning Wrocław — Floor Coverings | MasterClean',
      desc: 'Professional carpet, fitted carpet and tile cleaning in Wrocław. Extraction method, on-site service or pickup. No city surcharge.',
      kw: 'carpet cleaning wroclaw, rug cleaning pickup, fitted carpet cleaning, extraction cleaning, tile cleaning wroclaw, grout cleaning, carpet impregnation',
    },
    uk: {
      title: 'Хімчистка килимів і плитки Вроцлав | MasterClean',
      desc: 'Професійна хімчистка килимів, ковроліну та плитки у Вроцлаві. Екстракторний метод, виїзд або забір. Без націнки за місто.',
      kw: 'хімчистка килимів вроцлав, чистка ковроліну, миття килима із забором, чистка плитки, імпрегнація килима',
    },
  };
  const s = seoCopy[language as keyof typeof seoCopy] || seoCopy.pl;

  return (
    <>
      <SEO
        title={s.title.slice(0, 60)}
        description={s.desc}
        keywords={s.kw}
        canonical="/floor-cleaning"
        image="https://masterclean1885.com/og-image.png"
        breadcrumbs={[{ name: c.title.split('—')[0].trim(), path: '/floor-cleaning' }]}
        jsonLd={{
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
        }}
      />
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
            <div className="max-w-3xl mx-auto">
              <CircularRevealCard index={0}>
                <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
                  <CardServiceCalculator
                    items={items}
                    category="floorCleaning"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <CircularRevealCard index={0}>
                <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-gradient-hero p-1">
                  <div className="relative rounded-xl overflow-hidden">
                    <AnimatedImage
                      src={carpetBeforeAfter}
                      alt="Pranie dywanu — przed i po (Wrocław)"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground bg-card py-3 rounded-b-xl">
                    {language === 'pl' ? 'Pranie dywanu — efekt przed/po' : language === 'ru' ? 'Химчистка ковра — до/после' : language === 'uk' ? 'Хімчистка килима — до/після' : 'Carpet cleaning — before/after'}
                  </p>
                </div>
              </CircularRevealCard>
              <CircularRevealCard index={1}>
                <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-gradient-hero p-1">
                  <div className="relative rounded-xl overflow-hidden">
                    <AnimatedImage
                      src={tileBeforeAfter}
                      alt="Czyszczenie płytek balkonowych — przed i po"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground bg-card py-3 rounded-b-xl">
                    {language === 'pl' ? 'Czyszczenie płytek — efekt przed/po' : language === 'ru' ? 'Чистка плитки — до/после' : language === 'uk' ? 'Чистка плитки — до/після' : 'Tile cleaning — before/after'}
                  </p>
                </div>
              </CircularRevealCard>
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

        {/* SEO Keywords block (visible) */}
        <section className="py-10 bg-gradient-section">
          <div className="container mx-auto px-4">
            <p className="max-w-4xl mx-auto text-xs text-muted-foreground/70 text-center leading-relaxed">
              {c.keywordsBlock}
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default FloorCleaning;
