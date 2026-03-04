import { useRef } from 'react';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AutoSplash from '@/components/AutoSplash';
import AutoHeroSlideshow from '@/components/AutoHeroSlideshow';
import CircularRevealCard from '@/components/CircularRevealCard';
import Auto3DCarousel from '@/components/Auto3DCarousel';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import { Car, Armchair, Layers, Sparkles } from 'lucide-react';
import { CalculatorItem } from '@/types/calculator';

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
        title="Химчистка салона авто — Чистка сидений, ковриков"
        description="Профессиональная химчистка салона автомобиля. Чистка сидений, потолка, ковриков, багажника. Удаление пятен и запахов."
        keywords="химчистка авто, чистка салона, химчистка на дому, выезд к клиенту, pranie tapicerki samochodowej, czyszczenie wnętrza samochodu, detailing wnętrza, pranie foteli samochodowych, czyszczenie dywaników, czyszczenie z dojazdem, dojazd do klienta, car interior cleaning, mobile car cleaning, auto detailing Opole Wrocław"
        canonical="/auto"
        image="https://masterclean1885.pl/og-auto.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Химчистка салона автомобиля',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          offers: [
            { '@type': 'Offer', name: 'Химчистка сидений', price: '300', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Комплексная химчистка авто', price: '450', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Комплексная чистка (кожа)', price: '550', priceCurrency: 'PLN' },
          ],
        }}
      />
      <Layout>
        {showSplash && <AutoSplash onComplete={handleSplashComplete} />}

        {/* Hero */}
        <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
          <AutoHeroSlideshow />
          <div className="container mx-auto px-4 relative z-10">
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
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.auto.title}
              </h1>
              <p className="text-base sm:text-lg animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {t.auto.subtitle}
              </p>
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
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">{service.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After 3D Carousel */}
        <Auto3DCarousel />

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
