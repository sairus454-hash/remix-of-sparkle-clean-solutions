import { useRef } from 'react';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BackToOrderButton from '@/components/BackToOrderButton';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AutoSplash from '@/components/AutoSplash';
import HeroVideo from '@/components/HeroVideo';
import CircularRevealCard from '@/components/CircularRevealCard';
import Auto3DCarousel from '@/components/Auto3DCarousel';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import { Car, Armchair, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PromotionsSection from '@/components/PromotionsSection';
import { CalculatorItem } from '@/types/calculator';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';

// Auto calculator images
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
import calcCarseat from '@/assets/calc-carseat.jpg';

const Auto = () => {
  const { t } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('auto');
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const autoItems = [
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
    { id: 'carseat', name: t.prices.items.carseat, price: 80, image: calcCarseat },
  ];

  const services = [
    { icon: Car, title: t.auto.interior, description: t.auto.interiorDesc },
    { icon: Armchair, title: t.auto.leather, description: t.auto.leatherDesc },
    { icon: Layers, title: t.auto.carpet, description: t.auto.carpetDesc },
    { icon: Sparkles, title: t.auto.detailing, description: t.auto.detailingDesc },
  ];

  const handleSendToForm = (items: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(items, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="Pranie tapicerki samochodowej — Czyszczenie wnętrza auta"
        description="Profesjonalne pranie tapicerki samochodowej z dojazdem. Czyszczenie foteli, podsufitki, dywaników, bagażnika. Usuwanie plam i zapachów. Wrocław, Opole."
        keywords="pranie tapicerki samochodowej, chemczystka auta, czyszczenie wnętrza samochodu, czyszczenie tapicerki samochodowej, detailing wnętrza, pranie foteli samochodowych, czyszczenie dywaników samochodowych, czyszczenie podsufitki, czyszczenie z dojazdem, dojazd do klienta, auto detailing, pranie tapicerki auta Wrocław, Opole, Poznań"
        canonical="/auto"
        image="https://masterclean1885.pl/og-auto.png"
        breadcrumbs={[{ name: t.nav.auto, path: '/auto' }]}
         jsonLd={{
           '@context': 'https://schema.org',
           '@type': 'Service',
           serviceType: 'Pranie tapicerki samochodowej',
           name: 'Pranie tapicerki samochodowej',
           description: 'Profesjonalne pranie tapicerki samochodowej z dojazdem. Czyszczenie foteli, dywaników i wnętrza auta.',
           url: 'https://masterclean1885.pl/auto',
           provider: {
             '@type': 'LocalBusiness',
             name: 'MasterClean',
             telephone: '+48575211401',
             address: { '@type': 'PostalAddress', addressCountry: 'PL', addressRegion: 'dolnośląskie', addressLocality: 'Wrocław' },
           },
           areaServed: [
             { '@type': 'City', name: 'Wrocław' },
             { '@type': 'City', name: 'Opole' },
             { '@type': 'City', name: 'Legnica' },
             { '@type': 'City', name: 'Kalisz' },
           ],
           offers: [
             { '@type': 'Offer', name: 'Pranie foteli samochodowych', price: '300', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Kompleksowe czyszczenie wnętrza', price: '450', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Czyszczenie skóry w samochodzie', price: '550', priceCurrency: 'PLN' },
           ],
         }}
      />
      <Layout>
        <BackToOrderButton />
        {showSplash && <AutoSplash onComplete={handleSplashComplete} />}

         {/* Hero */}
         <section className="relative min-h-[calc(100vh-120px)] overflow-hidden">
           <div className="absolute inset-0">
             <HeroVideo src="/hero-auto-video.mp4" fallbackImage={autoCleaning1} />
           </div>
           <div className="relative z-10 h-full flex items-center">
             <div className="container mx-auto px-4 w-full">
               <div className="max-w-3xl mx-auto text-center">
                 <div className="flex justify-center mb-4 sm:mb-6 animate-fade-up">
                   <div className="relative">
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                       <Car className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                     </div>
                     <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-fresh rounded-full opacity-75" />
                     <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full opacity-60" />
                   </div>
                 </div>
                 <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animation: 'float 3s ease-in-out infinite' }}>
                   {t.auto.title}
                 </h1>
                 <p className="text-base sm:text-lg animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                   {t.auto.subtitle}
                 </p>
               </div>
             </div>
           </div>
         </section>

        {/* Services */}
        <section className="py-12 sm:py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {services.map((service, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="group flex gap-3 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all duration-300 h-full">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">{service.title}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* Important Note about Floor Mats */}
        <section className="py-8 sm:py-12 bg-amber-50 dark:bg-amber-900/20 border-t border-b border-amber-200 dark:border-amber-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1 sm:mb-2">Чистим только тканевые коврики</p>
                <p className="text-sm sm:text-base text-amber-800 dark:text-amber-200">Мы специализируемся на чистке тканевых ковриков и ковровых покрытий. Резиновые коврики мы не чистим — их можно вымыть самостоятельно дома.</p>
              </div>
            </div>
          </div>
        </section>
        <Auto3DCarousel />

        {/* Mobile compact promo card */}
        <section className="sm:hidden py-6 bg-gradient-section">
          <div className="container mx-auto px-4">
            <Link to="/#promotions">
              <div className="relative overflow-hidden p-4 rounded-2xl shadow-card bg-card/90 border border-border/50">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center shadow-glow flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent truncate">
                      🔥 {t.promotions.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{t.promotions.weeklyDesc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        <div className="hidden sm:block">
          <PromotionsSection />
        </div>

        {/* Card Calculator */}
        <section className="py-12 sm:py-20 bg-card">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={0}>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Car className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {t.prices.autoCleaning}
                    </h2>
                    <p className="text-muted-foreground text-sm">{t.auto.subtitle}</p>
                  </div>
                </div>
                <CardServiceCalculator category="auto" items={autoItems} onSendToForm={handleSendToForm} />
              </div>
            </CircularRevealCard>
          </div>
        </section>


        {/* Contact Form */}
        <section ref={formSectionRef} className="py-12 sm:py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                  {t.form.title}
                </h2>
              </div>
              <CircularRevealCard index={0}>
                <div className="bg-gradient-card p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-card border border-border">
                  <ContactForm ref={formRef} />
                </div>
              </CircularRevealCard>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Auto;
