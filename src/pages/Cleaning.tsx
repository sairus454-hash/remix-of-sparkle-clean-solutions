import { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { useSplash } from '@/hooks/useSplash';

import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BackToOrderButton from '@/components/BackToOrderButton';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import HeroSlideshow from '@/components/HeroSlideshow';
import CircularRevealCard from '@/components/CircularRevealCard';
import CleaningSplash from '@/components/CleaningSplash';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkles, CheckCircle2, Home, Clock, Shield, Leaf, Users, Calculator, Droplets, ArrowRight, Sofa, Armchair, Square, Zap } from 'lucide-react';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import QuickOrderDialog from '@/components/QuickOrderDialog';
import heroHouseCleaning from '@/assets/hero-house-cleaning.jpg';
import cleaningTeam1 from '@/assets/cleaning-team-work-1.jpg';
import heroHouseCleaning2 from '@/assets/hero-house-cleaning-2.jpg';
import cleaningTeam3 from '@/assets/cleaning-team-work-3.jpg';
import windowCleaning1 from '@/assets/window-cleaning-1.jpg';
import windowCleaning2 from '@/assets/window-cleaning-2.jpg';
import windowCleaning3 from '@/assets/window-cleaning-3.jpg';
import calcPouf from '@/assets/calc-pouf.jpg';
import calcChair from '@/assets/calc-chair.jpg';
import calcArmchair from '@/assets/calc-armchair.jpg';
import calcPillow from '@/assets/calc-pillow.jpg';
import calcSofa2 from '@/assets/calc-sofa2.jpg';
import calcSofa3 from '@/assets/calc-sofa3.jpg';
import calcSofaCorner from '@/assets/calc-sofa-corner.jpg';
import calcSofaCornerLarge from '@/assets/calc-sofa-corner-large.jpg';
import calcCarpet from '@/assets/calc-carpet.jpg';
import calcCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import calcHeadboard from '@/assets/calc-headboard.jpg';
import calcBedframe from '@/assets/calc-bedframe.jpg';
import calcMattressDouble from '@/assets/calc-mattress-double.jpg';
import calcMattressSingle from '@/assets/calc-mattress-single.jpg';
import calcLeatherPouf from '@/assets/calc-leather-pouf.jpg';
import calcLeatherChair from '@/assets/calc-leather-chair.jpg';
import calcLeatherArmchair from '@/assets/calc-leather-armchair.jpg';
import calcLeatherSofa2 from '@/assets/calc-leather-sofa2.jpg';
import calcLeatherSofa3 from '@/assets/calc-leather-sofa3.jpg';
import calcLeatherCorner from '@/assets/calc-leather-corner.jpg';
import calcStroller from '@/assets/calc-stroller.jpg';
import calcCarseat from '@/assets/calc-carseat.jpg';
import calcDrying from '@/assets/calc-drying.jpg';
import calcImpregnation from '@/assets/calc-impregnation.jpg';
import calcTileCleaning from '@/assets/calc-tile-cleaning.jpg';
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
import calcExtraMoldRemoval from '@/assets/calc-mold-removal.jpg';
import calcCarpetMedium from '@/assets/calc-carpet-medium.jpg';
import calcCarpetLarge from '@/assets/calc-carpet-large.jpg';

const Cleaning = () => {
  const { t, language } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const extrasSectionRef = useRef<HTMLDivElement>(null);
  
  const isMobile = useIsMobile();
  const { showSplash, handleSplashComplete } = useSplash('cleaning');
  
  // Calculator state
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [area, setArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  
  const pricePerMeter = cleaningType === 'standard' ? 7 : 10;
  const totalPrice = area * pricePerMeter;
  
  const cleaningTypeLabel = cleaningType === 'standard' 
    ? (t.cleaning?.standardCleaning || 'Стандартная уборка')
    : (t.cleaning?.generalCleaning || 'Генеральная уборка');

  const getCleaningCalcItems = () => [
    { id: 'cleaning-area', name: `${cleaningTypeLabel} ${area} м²`, price: totalPrice, quantity: 1 }
  ];

  const handleSendToForm = () => {
    formRef.current?.setCalculatorData(getCleaningCalcItems(), totalPrice);
  };

  const handleCleaningQuickOrder = () => {
    setQuickOrderOpen(true);
  };

  const handleCleaningAddToFullOrder = () => {
    const items = getCleaningCalcItems();
    try {
      const existing = JSON.parse(sessionStorage.getItem('mc_calculator_items') || '[]');
      const merged = [...existing];
      items.forEach(item => {
        const idx = merged.findIndex((e: any) => e.id === item.id);
        if (idx >= 0) {
          merged[idx].quantity = (merged[idx].quantity || 1) + item.quantity;
        } else {
          merged.push(item);
        }
      });
      const newTotal = merged.reduce((s: number, i: any) => s + i.price * (i.quantity || 1), 0);
      sessionStorage.setItem('mc_calculator_items', JSON.stringify(merged));
      sessionStorage.setItem('mc_calculator_total', String(newTotal));
    } catch {}
    toast({
      title: '✅ ' + (t.form?.addedToOrder || 'Добавлено в заявку ✓'),
      description: `${totalPrice} zł`,
      action: <Button variant="outline" size="sm" onClick={() => window.location.href = '/contacts'}>{t.form?.fullOrder || 'Общая заявка'}</Button>,
      duration: 8000,
    });
  };

  const handleCardToForm = (calcItems: any[], calcTotal: number) => {
    formRef.current?.setCalculatorData(calcItems, calcTotal);
  };

  const handleQuickAdd = (calcItems: any[], calcTotal: number) => {
    formRef.current?.setCalculatorData(calcItems, calcTotal);
    toast({
      title: '✅ ' + (language === 'ru' ? 'Принято!' : language === 'pl' ? 'Przyjęto!' : language === 'uk' ? 'Прийнято!' : 'Accepted!'),
      description: language === 'ru' ? 'Услуги добавлены в заявку' : language === 'pl' ? 'Usługi dodane do zamówienia' : language === 'uk' ? 'Послуги додані до замовлення' : 'Services added to order',
      duration: 2000,
    });
  };

  const benefits = [
    { icon: Clock, text: t.cleaning?.benefit1 || 'Экономия вашего времени' },
    { icon: Shield, text: t.cleaning?.benefit2 || 'Профессиональные средства' },
    { icon: Leaf, text: t.cleaning?.benefit3 || 'Экологичная уборка' },
    { icon: Users, text: t.cleaning?.benefit4 || 'Опытная команда' },
  ];

  const cleaningTypes = [
    { title: t.cleaning?.type1 || 'Генеральная уборка', desc: t.cleaning?.type1Desc || 'Полная уборка всех помещений от пола до потолка' },
    { title: t.cleaning?.type2 || 'Поддерживающая уборка', desc: t.cleaning?.type2Desc || 'Регулярная уборка для поддержания чистоты' },
    { title: t.cleaning?.type3 || 'Уборка после ремонта', desc: t.cleaning?.type3Desc || 'Удаление строительной пыли и грязи' },
    { title: t.cleaning?.type4 || 'Уборка офисов', desc: t.cleaning?.type4Desc || 'Профессиональная уборка офисных помещений' },
  ];

  const whatWeDo = [
    t.cleaning?.do1 || 'Мытьё полов и плинтусов',
    t.cleaning?.do2 || 'Уборка пыли со всех поверхностей',
    t.cleaning?.do3 || 'Мытьё зеркал и стёкол',
    t.cleaning?.do4 || 'Уборка кухни и санузлов',
    t.cleaning?.do5 || 'Вынос мусора',
    t.cleaning?.do6 || 'Уход за мебелью и техникой',
  ];

  const standardServices = t.cleaning?.standardServices || [
    'Прибирання пилу з поверхонь не вище 2 м.',
    'Чистка плити від жиру та бруду.',
    'Заміна постільної білизни (за бажанням замовника).',
    'Чистка фасадів шаф, дверей, ручок.',
    'Прибирання підлоги пилососом та вологе прибирання (без висування меблів).',
    'Усунення пилу та бруду з підвіконь та підлогових плінтусів.',
    'Очистка змішувачів від вапняного нальоту з поліруванням.',
    'Очистка душової кабіни/ванни від вапняного нальоту та бруду (без усунення плісняви).',
    'Очистка та дезінфекція унітазу, умивальників, біде.',
    'Очистка дзеркал до блиску.',
    'Чистка мікрохвильовки.',
    'Очистка кухонного "фартуха" від жиру та бруду.',
    'Прибирання стільниці та зони обідньої.',
    'Чистка іншої побутової техніки ззовні.',
    'Усунення пилу з м\'яких меблів пилососом.',
  ];

  const generalServices = t.cleaning?.generalServices || [
    'Устранення пилу та бруду з підвіконь і підлогових плінтусів.',
    'Очищення змішувачів від вапняного каменю з поліруванням.',
    'Очищення душової кабіни/ванни від вапняного нальоту та бруду (без усунення цвілі).',
    'Очищення та дезінфекція унітазу, умивальників, біде.',
    'Очищення дзеркал до блиску.',
    'Чистка мікрохвильової печі.',
    'Очищення кухонного "фартуха" від жиру та бруду.',
    'Прибирання стільниці та зони їдальні.',
    'Чистка іншої побутової техніки ззовні.',
    'Устранення пилу з м\'яких меблів пилососом.',
    'Прибирання підлоги пилососом та вологе прибирання (з пересуванням меблів або під ними).',
    'Прибирання пилу та павутиння з потолку до підлоги.',
    'Прибирання пилу з шаф та ламп/світильників.',
    'Очищення плитки в ванній кімнаті на стінах та підлозі (без чистки швів).',
    'Чистка та дезінфекція пральної машини.',
    'Чистка витяжки та вентиляційних решіток.',
    'Чистка та дезінфекція посудомийної машини.',
  ];

  const galleryImages = [
    { src: heroHouseCleaning, alt: t.cleaning?.gallery1 || 'Профессиональная уборка' },
    { src: heroHouseCleaning2, alt: t.cleaning?.gallery2 || 'Уборка квартиры' },
    { src: cleaningTeam3, alt: t.cleaning?.gallery3 || 'Уборка комнат' },
  ];

  return (
    <>
      <SEO
        title="Уборка квартир и домов — Стандартная и генеральная"
        description="Профессиональная уборка квартир, домов и офисов. Стандартная и генеральная уборка. Рассчитайте стоимость онлайн."
        keywords="уборка квартир, генеральная уборка, клининг, sprzątanie mieszkań, sprzątanie domów, sprzątanie biur, sprzątanie generalne, firma sprzątająca, usługi sprzątania Opole Wrocław, house cleaning Poland"
        canonical="/cleaning"
        image="https://masterclean1885.pl/og-cleaning.png"
        breadcrumbs={[{ name: t.nav.cleaning, path: '/cleaning' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Уборка помещений',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          offers: [
            { '@type': 'Offer', name: 'Стандартная уборка', price: '6', priceCurrency: 'PLN', unitText: 'за м²' },
            { '@type': 'Offer', name: 'Генеральная уборка', price: '10', priceCurrency: 'PLN', unitText: 'за м²' },
          ],
        }}
      />
      {showSplash && <CleaningSplash onComplete={handleSplashComplete} />}
      <Layout>
      <BackToOrderButton />
      {/* Hero with Background Photo Slideshow */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
        <HeroSlideshow images={galleryImages} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary opacity-60" />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.cleaning?.title || 'Уборка помещений'}
            </h1>
            <p className="text-lg animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {t.cleaning?.subtitle || 'Профессиональная уборка квартир, домов и офисов'}
            </p>
          </div>
        </div>
      </section>

      {/* Compact Calculator Trigger */}
      <section className="py-6 sm:py-10 bg-gradient-section">
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
                        <h2 className="font-serif text-lg sm:text-xl font-semibold">{t.cleaning?.calculatorTitle || 'Рассчитайте стоимость уборки'}</h2>
                        <p className="text-sm text-muted-foreground">{t.cleaning?.selectType || 'Выберите тип уборки'}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      {t.calculator?.title || 'Калькулятор'}
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
        <Drawer open={isCalcOpen} onOpenChange={setIsCalcOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <DrawerTitle className="font-serif text-lg">
                  {t.cleaning?.calculatorTitle || 'Рассчитайте стоимость уборки'}
                </DrawerTitle>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 pb-8">
              <CleaningCalculatorContent 
                area={area}
                setArea={setArea}
                cleaningType={cleaningType}
                setCleaningType={setCleaningType}
                pricePerMeter={pricePerMeter}
                totalPrice={totalPrice}
                standardServices={standardServices}
                generalServices={generalServices}
                onQuickOrder={() => {
                  setIsCalcOpen(false);
                  handleCleaningQuickOrder();
                }}
                onAddToFullOrder={() => {
                  setIsCalcOpen(false);
                  handleCleaningAddToFullOrder();
                }}
                onExtrasHint={() => {
                  setIsCalcOpen(false);
                  setTimeout(() => extrasSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                }}
                t={t}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="font-serif text-2xl">
                    {t.cleaning?.calculatorTitle || 'Рассчитайте стоимость уборки'}
                  </DialogTitle>
                  <DialogDescription className="sr-only">{t.cleaning?.subtitle || 'Профессиональная уборка квартир, домов и офисов'}</DialogDescription>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.cleaning?.subtitle || 'Профессиональная уборка квартир, домов и офисов'}
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column - Calculator */}
                <div className="space-y-6">
                  {/* Cleaning Type Tabs */}
                  <div>
                    <label className="block text-foreground mb-3 font-medium text-lg">
                      {t.cleaning?.selectType || 'Выберите тип уборки'}:
                    </label>
                    <Tabs value={cleaningType} onValueChange={(v) => setCleaningType(v as 'standard' | 'general')} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-auto">
                        <TabsTrigger value="standard" className="py-4 text-base">
                          <div className="text-center">
                            <div className="font-semibold">{t.cleaning?.standardCleaning || 'Стандартная'}</div>
                            <div className="text-sm text-muted-foreground">7 PLN/м²</div>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger value="general" className="py-4 text-base">
                          <div className="text-center">
                            <div className="font-semibold">{t.cleaning?.generalCleaning || 'Генеральная'}</div>
                            <div className="text-sm text-muted-foreground">10 PLN/м²</div>
                          </div>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Area Slider */}
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <label className="block text-foreground mb-4 text-lg">
                      {t.cleaning?.area || 'Площадь'}: <strong className="text-primary text-2xl">{area} м²</strong>
                    </label>
                    <Slider
                      value={[area]}
                      onValueChange={(value) => setArea(value[0])}
                      min={20}
                      max={300}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>20 м²</span>
                      <span>300 м²</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {t.cleaning?.pricePerMeter || 'Цена за м²'}: <strong className="text-foreground">{pricePerMeter} PLN</strong>
                  </p>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-serif text-4xl font-bold text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent">
                      {t.cleaning?.total || 'Итого'}: {totalPrice} PLN
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setIsCalcOpen(false);
                        handleCleaningQuickOrder();
                      }}
                      className="w-full py-4 px-6 bg-fresh text-white font-semibold text-lg rounded-xl hover:bg-fresh/90 transition-opacity shadow-glow flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      {t.form?.quickOrder || 'Быстрый заказ'}
                    </button>
                    <button
                      onClick={() => {
                        setIsCalcOpen(false);
                        handleCleaningAddToFullOrder();
                      }}
                      className="w-full py-4 px-6 border border-primary/40 text-primary font-semibold text-lg rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      {t.form?.addToFullOrder || 'В общую заявку'}
                    </button>
                  </div>
                  
                   <p className="text-xs text-muted-foreground text-center">
                     {t.calculator?.minOrder}
                   </p>
                   <p className="text-xs text-muted-foreground text-center">
                     {t.calculator?.minOrderOther}
                   </p>
                   <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center font-semibold mt-1">
                     {t.calculator?.cleaningTempNote}
                   </p>
                   <button
                     type="button"
                     onClick={() => {
                       setIsCalcOpen(false);
                       setTimeout(() => extrasSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                     }}
                     className="w-full text-center text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors mt-2 flex items-center justify-center gap-1.5"
                   >
                     <Sparkles className="w-3.5 h-3.5" />
                     {'Смотрите дополнительные услуги ниже ↓'}
                   </button>
                </div>
                
                {/* Right column - Services included */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-fresh" />
                    {t.cleaning?.includedTitle || 'Что входит в уборку:'}
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground max-h-[400px] overflow-y-auto pr-2">
                    {(cleaningType === 'standard' ? standardServices : generalServices).map((service, index) => (
                      <li key={index} className="flex items-start gap-3 py-1">
                        <CheckCircle2 className="w-4 h-4 text-fresh mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Cleaning Extras - Additional Services */}
      <section ref={extrasSectionRef} className="py-10 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Card className="shadow-card">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">{t.cleaning?.extras?.title || 'Дополнительные услуги'}</h2>
                      <p className="text-sm text-muted-foreground">{'Дополнительно к уборке'}</p>
                    </div>
                  </div>
                  <CardServiceCalculator
                    category="cleaning"
                    items={[
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
                      
                    ]}
                    onSendToForm={handleCardToForm}
                    onQuickOrder={handleQuickAdd}
                  />
                </CardContent>
              </Card>
            </CircularRevealCard>
          </div>
        </div>
      </section>



      <section className="py-10 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Card className="shadow-card">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Square className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">{t.windows?.calcTitle || 'Калькулятор мойки окон'}</h2>
                      <p className="text-sm text-muted-foreground">{t.windows?.calcSubtitle || 'Рассчитайте стоимость услуги'}</p>
                    </div>
                  </div>
                  <CardServiceCalculator
                    category="windows"
                    items={[
                      { id: 'windowSingle', name: t.windows?.items?.single || 'Одностворчатое окно', price: 40, image: windowCleaning1 },
                      { id: 'windowDouble', name: t.windows?.items?.double || 'Двухстворчатое окно', price: 50, image: windowCleaning2 },
                      { id: 'windowTriple', name: t.windows?.items?.triple || 'Трёхстворчатое окно', price: 80, image: windowCleaning3 },
                      { id: 'windowBalcony', name: t.windows?.items?.balcony || 'Балконное окно', price: 60, image: windowCleaning1 },
                      { id: 'windowTerrace', name: t.windows?.items?.terrace || 'Террасное окно', price: 85, image: windowCleaning2 },
                      { id: 'windowAttic', name: t.windows?.items?.attic || 'Мансардное окно', price: 40, image: windowCleaning3 },
                      { id: 'balustrade', name: t.windows?.items?.balustrade || 'Балюстрада', price: 40, image: windowCleaning1 },
                    ]}
                    onSendToForm={handleCardToForm}
                    onQuickOrder={handleQuickAdd}
                  />
                </CardContent>
              </Card>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Furniture Cleaning Calculator */}
      <section className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Card className="shadow-card">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <Sofa className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">{t.prices?.furniture || 'Химчистка мебели'} & {t.prices?.mattressTitle || 'Матрасы'}</h2>
                      <p className="text-sm text-muted-foreground">{t.prices?.furnitureDesc || 'Мягкая мебель, ковры и матрасы'}</p>
                    </div>
                  </div>
                  <CardServiceCalculator
                    category="furniture"
                    items={[
                      { id: 'pouf', name: t.prices?.items?.pouf || 'Пуф', price: 40, image: calcPouf },
                      { id: 'chair', name: t.prices?.items?.chair || 'Стул', price: 40, image: calcChair },
                      { id: 'armchair', name: t.prices?.items?.armchair || 'Кресло', price: 70, image: calcArmchair },
                      { id: 'pillow', name: t.prices?.items?.pillow || 'Подушка', price: 15, image: calcPillow },
                      { id: 'sofa2', name: t.prices?.items?.sofa2 || 'Диван 2-мест.', price: 140, image: calcSofa2 },
                      { id: 'sofa3', name: t.prices?.items?.sofa3 || 'Диван 3-мест.', price: 170, image: calcSofa3 },
                      { id: 'sofaCorner', name: t.prices?.items?.sofaCorner || 'Угловой диван', price: 200, image: calcSofaCorner },
                      { id: 'sofaCornerLarge', name: t.prices?.items?.sofaCornerLarge || 'Большой угловой диван', price: 250, image: calcSofaCornerLarge },
                      { id: 'carpet', name: t.prices?.items?.carpet || 'Ковёр', price: 25, image: calcCarpet, unit: 'm²' },
                      { id: 'bedHeadboard', name: t.prices?.items?.bedHeadboard || 'Изголовье кровати', price: 100, image: calcHeadboard },
                      { id: 'bedFrame', name: t.prices?.items?.bedFrame || 'Каркас кровати', price: 100, image: calcBedframe },
                      { id: 'mattressSingleDry', name: t.prices?.items?.mattressSingleDry || 'Матрас односп. сухая чистка', price: 140, image: calcMattressSingle },
                      { id: 'mattressSingleDry2', name: t.prices?.items?.mattressSingleDry2 || 'Матрас односп. сухая чистка×2', price: 220, image: calcMattressSingle },
                      { id: 'mattressDoubleDry', name: t.prices?.items?.mattressDoubleDry || 'Матрас двусп. сухая чистка', price: 180, image: calcMattressDouble },
                      { id: 'mattressDoubleDry2', name: t.prices?.items?.mattressDoubleDry2 || 'Матрас двусп. сухая чистка×2', price: 280, image: calcMattressDouble },
                    ]}
                    onSendToForm={handleCardToForm}
                    onQuickOrder={handleQuickAdd}
                  />
                </CardContent>
              </Card>
            </CircularRevealCard>

            {/* Leather Furniture */}
            <div className="mt-6">
              <CircularRevealCard index={1}>
                <Card className="shadow-card">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                        <Armchair className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-semibold">{t.prices?.leatherFurnitureTitle || 'Кожаная мебель'}</h2>
                        <p className="text-sm text-muted-foreground">{t.prices?.leatherFurnitureTitle || 'Чистка кожаной мебели'}</p>
                      </div>
                    </div>
                    <CardServiceCalculator
                      category="leather"
                      items={[
                        { id: 'leatherPouf', name: t.prices?.items?.leatherPouf || 'Кожаный пуф', price: 55, image: calcLeatherPouf },
                        { id: 'leatherChair', name: t.prices?.items?.leatherChair || 'Кожаный стул', price: 50, image: calcLeatherChair },
                        { id: 'leatherPillow', name: t.prices?.items?.leatherPillow || 'Кожаная подушка', price: 20, image: calcPillow },
                        { id: 'leatherArmchair', name: t.prices?.items?.leatherArmchair || 'Кожаное кресло', price: 90, image: calcLeatherArmchair },
                        { id: 'leatherSofa2', name: t.prices?.items?.leatherSofa2 || 'Кожаный диван 2-мест.', price: 180, image: calcLeatherSofa2 },
                        { id: 'leatherSofa3', name: t.prices?.items?.leatherSofa3 || 'Кожаный диван 3-мест.', price: 220, image: calcLeatherSofa3 },
                        { id: 'leatherSofaCorner', name: t.prices?.items?.leatherSofaCorner || 'Кожаный угловой диван', price: 250, image: calcLeatherCorner },
                      ]}
                      onSendToForm={handleCardToForm}
                      onQuickOrder={handleQuickAdd}
                    />
                  </CardContent>
                </Card>
              </CircularRevealCard>
            </div>

            {/* Other Services */}
            <div className="mt-6">
              <CircularRevealCard index={2}>
                <Card className="shadow-card">
                  <CardContent className="py-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-semibold">{t.prices?.other || 'Другое'}</h2>
                        <p className="text-sm text-muted-foreground">{t.prices?.otherDesc || 'Ковры, коляски, плитка и дополнительные услуги'}</p>
                      </div>
                    </div>
                    <CardServiceCalculator
                      category="other"
                      items={[
                        { id: 'carpetCovering', name: t.prices?.items?.carpetCovering || 'Ковровое покрытие', price: 25, image: calcCarpet, unit: 'm²' },
                        { id: 'carpetImpregnation', name: t.prices?.items?.carpetImpregnation || 'Импрегнация ковра', price: 5, image: calcCarpetImpregnation, unit: 'm²' },
                        { id: 'stroller', name: t.prices?.items?.stroller || 'Коляска', price: 100, image: calcStroller },
                        { id: 'carseat', name: t.prices?.items?.carseat || 'Автокресло', price: 80, image: calcCarseat },
                        { id: 'drying', name: t.prices?.items?.drying || 'Сушка', price: 60, image: calcDrying, promoBadge: t.promotions?.dryingFreeSpring || 'Бесплатно до конца весны' },
                        { id: 'impregnation', name: t.prices?.items?.impregnation || 'Импрегнация', price: 80, image: calcImpregnation },
                        { id: 'tileCleaning', name: t.prices?.items?.tileCleaning || 'Чистка плитки', price: 25, image: calcTileCleaning, unit: 'm²' },
                      ]}
                      onSendToForm={handleCardToForm}
                      onQuickOrder={handleQuickAdd}
                    />
                  </CardContent>
                </Card>
              </CircularRevealCard>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <CircularRevealCard index={0}>
              <div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Home className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                  {t.cleaning?.whatTitle || 'Что мы убираем'}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.cleaning?.whatDesc || 'Наша команда профессиональных клинеров выполнит полный комплекс уборочных работ для вашего дома или офиса. Используем только проверенные и безопасные средства.'}
                </p>
                <ul className="space-y-3">
                  {whatWeDo.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CircularRevealCard>
            
            <CircularRevealCard index={1}>
              <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card h-full">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  {t.cleaning?.benefitsTitle || 'Почему выбирают нас'}
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-fresh" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                      </div>
                      <span className="text-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Window Cleaning Link Block */}
      <section className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Link to="/windows" className="block group">
                <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border-2 border-sky-200 dark:border-sky-800 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30">
                  <CardContent className="py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                          <Droplets className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-sky-700 dark:text-sky-300">
                            {t.nav?.windows || 'Мойка окон'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t.windows?.subtitle || 'Профессиональная мойка окон любой сложности'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                        <span className="hidden sm:inline font-medium">{t.hero?.secondary || 'Узнать больше'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Types of Cleaning */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
            {t.cleaning?.typesTitle || 'Виды уборки'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cleaningTypes.map((type, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group p-6 rounded-2xl bg-card border border-border text-center hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formSectionRef} className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.form.title}
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
    </Layout>
    <QuickOrderDialog
      open={quickOrderOpen}
      onOpenChange={setQuickOrderOpen}
      items={getCleaningCalcItems()}
      total={totalPrice}
    />
    </>
  );
};

// Extracted calculator content component
interface CleaningCalculatorContentProps {
  area: number;
  setArea: (area: number) => void;
  cleaningType: 'standard' | 'general';
  setCleaningType: (type: 'standard' | 'general') => void;
  pricePerMeter: number;
  totalPrice: number;
  standardServices: string[];
  generalServices: string[];
  onQuickOrder: () => void;
  onAddToFullOrder: () => void;
  onExtrasHint: () => void;
  t: any;
}

const CleaningCalculatorContent = ({
  area,
  setArea,
  cleaningType,
  setCleaningType,
  pricePerMeter,
  totalPrice,
  standardServices,
  generalServices,
  onQuickOrder,
  onAddToFullOrder,
  onExtrasHint,
  t,
}: CleaningCalculatorContentProps) => (
  <div className="space-y-6">
    {/* Cleaning Type Tabs */}
    <div>
      <label className="block text-foreground mb-3 font-medium">
        {t.cleaning?.selectType || 'Выберите тип уборки'}:
      </label>
      <Tabs value={cleaningType} onValueChange={(v) => setCleaningType(v as 'standard' | 'general')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="standard" className="py-3 text-sm">
            <div className="text-center">
              <div className="font-medium">{t.cleaning?.standardCleaning || 'Стандартная'}</div>
              <div className="text-xs text-muted-foreground">7 PLN/м²</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="general" className="py-3 text-sm">
            <div className="text-center">
              <div className="font-medium">{t.cleaning?.generalCleaning || 'Генеральная'}</div>
              <div className="text-xs text-muted-foreground">10 PLN/м²</div>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    
    {/* Area Slider */}
    <div>
      <label className="block text-foreground mb-2">
        {t.cleaning?.area || 'Площадь'}: <strong className="text-primary">{area} м²</strong>
      </label>
      <Slider
        value={[area]}
        onValueChange={(value) => setArea(value[0])}
        min={20}
        max={300}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>20 м²</span>
        <span>300 м²</span>
      </div>
    </div>
    
    <p className="text-muted-foreground">
      {t.cleaning?.pricePerMeter || 'Цена за м²'}: <strong className="text-foreground">{pricePerMeter} PLN</strong>
    </p>
    
    <div className="pt-4 border-t border-border">
      <h4 className="font-serif text-3xl font-bold text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent">
        {t.cleaning?.total || 'Итого'}: {totalPrice} PLN
      </h4>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        onClick={onQuickOrder}
        className="w-full py-3 px-6 bg-fresh text-white font-medium rounded-xl hover:bg-fresh/90 transition-opacity shadow-glow flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        {t.form?.quickOrder || 'Быстрый заказ'}
      </button>
      <button
        onClick={onAddToFullOrder}
        className="w-full py-3 px-6 border border-primary/40 text-primary font-medium rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        {t.form?.addToFullOrder || 'Добавить в общую заявку'}
      </button>
    </div>
    
     <p className="text-xs text-muted-foreground text-center">
       {t.calculator?.minOrder}
     </p>
     <p className="text-xs text-muted-foreground text-center">
       {t.calculator?.minOrderOther}
     </p>
     <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center font-semibold mt-1">
       {t.calculator?.cleaningTempNote}
     </p>
     <button
       type="button"
       onClick={onExtrasHint}
       className="w-full text-center text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors mt-2 flex items-center justify-center gap-1.5"
     >
       <Sparkles className="w-3.5 h-3.5" />
       {'Смотрите дополнительные услуги ниже ↓'}
     </button>
    
    {/* Services included */}
    <div className="mt-4 pt-4 border-t border-border">
      <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-fresh" />
        {t.cleaning?.includedTitle || 'Что входит в уборку:'}
      </h4>
      <ul className="space-y-2 text-sm text-muted-foreground max-h-48 overflow-y-auto">
        {(cleaningType === 'standard' ? standardServices : generalServices).map((service, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-fresh mt-0.5">•</span>
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Cleaning;
