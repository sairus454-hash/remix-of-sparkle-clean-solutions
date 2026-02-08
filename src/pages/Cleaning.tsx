import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkles, CheckCircle2, Home, Clock, Shield, Leaf, Users, Calculator, Droplets, ArrowRight } from 'lucide-react';
import cleaningTeam1 from '@/assets/cleaning-team-work-1.jpg';
import cleaningTeam2 from '@/assets/cleaning-team-work-2.jpg';
import cleaningTeam3 from '@/assets/cleaning-team-work-3.jpg';

const Cleaning = () => {
  const { t } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const isMobile = useIsMobile();
  
  // Calculator state
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [area, setArea] = useState(50);
  const [cleaningType, setCleaningType] = useState<'standard' | 'general'>('standard');
  
  const pricePerMeter = cleaningType === 'standard' ? 8 : 10;
  const totalPrice = area * pricePerMeter;
  
  const cleaningTypeLabel = cleaningType === 'standard' 
    ? (t.cleaning?.standardCleaning || 'Стандартная уборка')
    : (t.cleaning?.generalCleaning || 'Генеральная уборка');

  const handleSendToForm = () => {
    const cleaningData = [
      { id: 'cleaning-area', name: `${cleaningTypeLabel} ${area} м²`, price: totalPrice, quantity: 1 }
    ];
    formRef.current?.setCalculatorData(cleaningData, totalPrice);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    { src: cleaningTeam1, alt: t.cleaning?.gallery1 || 'Команда клинеров' },
    { src: cleaningTeam2, alt: t.cleaning?.gallery2 || 'Уборка кухни' },
    { src: cleaningTeam3, alt: t.cleaning?.gallery3 || 'Уборка комнат' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.cleaning?.title || 'Уборка помещений'}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.cleaning?.subtitle || 'Профессиональная уборка квартир, домов и офисов'}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <CircularRevealCard key={index} index={index}>
                <div 
                  className="group rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 bg-gradient-hero p-1"
                  style={{ animation: `float ${4 + index * 0.5}s ease-in-out infinite` }}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <AnimatedImage 
                      src={image.src} 
                      alt={image.alt} 
                      delay={index * 150}
                      duration={800}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-fresh/20 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              </CircularRevealCard>
            ))}
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
                onOrder={() => {
                  setIsCalcOpen(false);
                  handleSendToForm();
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
                            <div className="text-sm text-muted-foreground">8 PLN/м²</div>
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
                  
                  <button
                    onClick={() => {
                      setIsCalcOpen(false);
                      handleSendToForm();
                    }}
                    className="w-full py-4 px-6 bg-gradient-hero text-primary-foreground font-semibold text-lg rounded-xl hover:opacity-90 transition-opacity shadow-glow"
                  >
                    {t.cleaning?.order || 'Заказать уборку'}
                  </button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {t.calculator?.minOrder}
                  </p>
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

      {/* What We Clean */}
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
                        <span className="hidden sm:inline font-medium">{'Узнать больше'}</span>
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
  onOrder: () => void;
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
  onOrder,
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
              <div className="text-xs text-muted-foreground">8 PLN/м²</div>
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
    
    <button
      onClick={onOrder}
      className="w-full py-3 px-6 bg-gradient-hero text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-glow"
    >
      {t.cleaning?.order || 'Заказать уборку'}
    </button>
    
    <p className="text-xs text-muted-foreground text-center">
      {t.calculator?.minOrder}
    </p>
    
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
