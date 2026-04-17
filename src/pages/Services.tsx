import { useState, useEffect } from 'react';
import LazySection from '@/components/LazySection';
import MobilePromotionsCard from '@/components/MobilePromotionsCard';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CircularRevealCard from '@/components/CircularRevealCard';
import PromotionsSection from '@/components/PromotionsSection';
import { Sparkles, Sofa, Armchair, Bed, Package } from 'lucide-react';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import servicesCleaning from '@/assets/services-cleaning.jpg';
import servicesDrying from '@/assets/services-drying.jpg';

// Hero images
import heroUpholsteryCleaning from '@/assets/hero-upholstery-cleaning.jpg';
import mattressCleaningService from '@/assets/mattress-cleaning-service.jpg';
import armchairCleaning from '@/assets/armchair-cleaning.jpg';
import sofaBeforeAfter from '@/assets/sofa-before-after.jpg';
import mattressBeforeAfter from '@/assets/mattress-before-after.jpg';

// Furniture calculator images
import calcPouf from '@/assets/calc-pouf.jpg';
import calcChair from '@/assets/calc-chair.jpg';
import calcChairSeat from '@/assets/calc-chair-seat.jpg';
import calcChairBack from '@/assets/calc-chair-back.jpg';
import calcChairConference from '@/assets/calc-chair-conference.jpg';
import calcChairSwivel from '@/assets/calc-chair-swivel.jpg';
import calcLeatherChairSwivel from '@/assets/calc-leather-chair-swivel.jpg';
import calcArmchair from '@/assets/calc-armchair.jpg';
import calcPillow from '@/assets/calc-pillow.jpg';
import calcSofa2 from '@/assets/calc-sofa2.jpg';
import calcSofa3 from '@/assets/calc-sofa3.jpg';
import calcSofaCorner from '@/assets/calc-sofa-corner.jpg';
import calcSofaCornerLarge from '@/assets/calc-sofa-corner-large.jpg';
import calcKitchenCorner from '@/assets/calc-kitchen-corner.jpg';
import calcMattressSingle from '@/assets/calc-mattress-single.jpg';
import calcMattressDouble from '@/assets/calc-mattress-double.jpg';
import calcHeadboard from '@/assets/calc-headboard.jpg';
import calcBedframe from '@/assets/calc-bedframe.jpg';

// Leather calculator images
import calcLeatherPouf from '@/assets/calc-leather-pouf.jpg';
import calcLeatherChair from '@/assets/calc-leather-chair.jpg';
import calcLeatherArmchair from '@/assets/calc-leather-armchair.jpg';
import calcLeatherSofa2 from '@/assets/calc-leather-sofa2.jpg';
import calcLeatherSofa3 from '@/assets/calc-leather-sofa3.jpg';
import calcLeatherCorner from '@/assets/calc-leather-corner.jpg';
import calcImpregnation from '@/assets/calc-impregnation.jpg';
import calcCarpetImpregnation from '@/assets/calc-carpet-impregnation.jpg';
import calcCarpetCoveringImpregnation from '@/assets/calc-carpet-covering-impregnation.jpg';
import calcDrying from '@/assets/calc-drying.jpg';
import calcCarpet from '@/assets/calc-carpet.jpg';
import calcCarpetPickup from '@/assets/calc-carpet-pickup.jpg';
import calcStroller from '@/assets/calc-stroller.jpg';
import calcCarseat from '@/assets/calc-carseat.jpg';
import calcCarpetMedium from '@/assets/calc-carpet-medium.jpg';
import calcCarpetLarge from '@/assets/calc-carpet-large.jpg';

const Services = () => {
  const { t, language } = useLanguage();
  const heroSlides = [servicesCleaning, servicesDrying];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroImages = [
    { src: heroUpholsteryCleaning, alt: 'Professional upholstery cleaning' },
    { src: armchairCleaning, alt: 'Armchair cleaning' },
    { src: sofaBeforeAfter, alt: 'Sofa before and after' },
    { src: mattressBeforeAfter, alt: 'Mattress before and after' },
  ];

  const furnitureItems = [
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
    { id: 'kitchenCorner', name: t.prices.items.kitchenCorner, price: 130, image: calcKitchenCorner },
    { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 80, originalPrice: 90, image: calcHeadboard, promoBadge: '🔥 -10%' },
    { id: 'bedFrame', name: t.prices.items.bedFrame, price: 80, originalPrice: 90, image: calcBedframe, promoBadge: '🔥 -10%' },
  ];

  const mattressItems = [
    { id: 'mattressSingle', name: t.prices.items.mattressSingle, price: 115, originalPrice: 125, image: calcMattressSingle, promoBadge: '🔥 -10%' },
    { id: 'mattressDouble', name: t.prices.items.mattressDouble, price: 175, originalPrice: 195, image: calcMattressDouble, promoBadge: '🔥 -10%' },
    { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2 || 'Матрас односп. с двух сторон', price: 180, originalPrice: 200, image: calcMattressSingle, promoBadge: '🔥 -10%' },
    { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2 || 'Матрас двусп. с двух сторон', price: 240, originalPrice: 265, image: calcMattressDouble, promoBadge: '🔥 -10%' },
  ];

  const { t: translations } = useLanguage();
  const extrasItems = [
    { id: 'impregnation', name: language === 'pl' ? 'Impregnacja mebli na 1 rok' : language === 'en' ? 'Furniture impregnation 1 year' : 'Импрегнация мебели на 1 год', price: 80, image: calcImpregnation },
    { id: 'drying', name: language === 'pl' ? 'Suszenie mebli' : language === 'en' ? 'Furniture drying' : 'Сушение мебели', price: 0, image: calcDrying, promoBadge: translations.promotions?.dryingFreeSpring || 'Бесплатно до конца весны' },
    { id: 'carpet', name: language === 'pl' ? 'Wykładzina dywanowa' : language === 'en' ? 'Carpet cleaning' : 'Ковровое покрытие', price: 25, image: calcCarpet, unit: 'm²' },
    { id: 'carpetPickup', name: t.prices?.items?.carpetPickup || (language === 'pl' ? 'Pranie dywanów z odbiorem' : language === 'en' ? 'Carpet washing with pickup' : 'Стирка ковров с забором'), price: 35, image: calcCarpetPickup, unit: 'm²' },
    { id: 'carpetImpregnation', name: t.prices?.items?.carpetImpregnation || (language === 'pl' ? 'Impregnacja dywanu' : language === 'en' ? 'Carpet impregnation' : 'Импрегнация ковра'), price: 5, image: calcCarpetImpregnation, unit: 'm²' },
    { id: 'carpetCoveringImpregnation', name: t.prices?.items?.carpetCoveringImpregnation || (language === 'pl' ? 'Impregnacja wykładziny dywanowej z odbiorem' : language === 'en' ? 'Carpet covering impregnation with pickup' : 'Импрегнация коврового покрытия с забором'), price: 8, image: calcCarpetCoveringImpregnation, unit: 'm²' },
    { id: 'stroller', name: language === 'pl' ? 'Wózek dziecięcy' : language === 'en' ? 'Baby stroller' : 'Детская коляска', price: 100, image: calcStroller },
    { id: 'carseat', name: language === 'pl' ? 'Fotelik samochodowy' : language === 'en' ? 'Car seat' : 'Автокресло', price: 80, image: calcCarseat },
    { id: 'carpetFloorMedium', name: t.prices?.items?.carpetFloorMedium || 'Чистка ковролина (20-50 м²)', price: 15, image: calcCarpetMedium, unit: 'm²' },
    { id: 'carpetFloorLarge', name: t.prices?.items?.carpetFloorLarge || 'Чистка ковролина (50+ м²)', price: 10, image: calcCarpetLarge, unit: 'm²' },
  ];

  const leatherItems = [
    { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 50, image: calcLeatherPouf },
    { id: 'leatherChair', name: t.prices.items.leatherChair, price: 45, image: calcLeatherChair },
    { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 80, image: calcLeatherArmchair },
    { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 160, image: calcLeatherSofa2 },
    { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 200, image: calcLeatherSofa3 },
    { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 245, image: calcLeatherCorner },
    { id: 'leatherChairSwivel', name: t.prices.items.leatherChairSwivel, price: 70, image: calcLeatherChairSwivel },
  ];

  return (
    <>
      <SEO
        title="Pranie kanapy, materaca, narożnika — Chemczystka mebli"
        description="Profesjonalne pranie kanapy, materaca i narożnika z dojazdem. Chemczystka mebli tapicerowanych i skórzanych, czyszczenie kanap, foteli, sof. Kalkulator online. Wrocław, Opole."
        keywords="pranie kanapy, pranie materaca, pranie narożnika, chemczystka mebli, pranie tapicerki meblowej, pranie tapicerki skórzanej, czyszczenie mebli, pranie sofy, czyszczenie fotela, czyszczenie tapicerki, czyszczenie skóry, pranie tapicerki cennik, pranie tapicerki z dojazdem, pranie ekstrakcyjne, czyszczenie mebli Wrocław, Opole, Poznań"
        canonical="/services"
        image="https://masterclean1885.com/og-services.png"
        breadcrumbs={[{ name: t.nav.services, path: '/services' }]}
         jsonLd={{
           '@context': 'https://schema.org',
           '@type': 'Service',
           serviceType: 'Pranie tapicerki meblowej',
           name: 'Pranie tapicerki meblowej i skórzanej',
           description: 'Profesjonalne pranie tapicerki meblowej i skórzanej z dojazdem do klienta. Czyszczenie kanap, foteli, sof, materacy.',
           url: 'https://masterclean1885.com/services',
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
             { '@type': 'Offer', name: 'Pranie kanapy 2-osobowej', price: '126', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie kanapy 3-osobowej', price: '153', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie narożnika', price: '225', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie materaca', price: '90', priceCurrency: 'PLN' },
           ],
         }}
      />
      <Layout>
         {/* Hero */}
         <section className="relative min-h-[calc(100vh-120px)] overflow-hidden">
            <div className="absolute inset-0">
               {heroSlides.map((slide, index) => (
                 <img
                   key={index}
                   src={slide}
                   alt={index === 0 ? 'Profesjonalne pranie tapicerki meblowej' : 'Suszenie mebli po praniu'}
                   width={1920}
                   height={1080}
                   loading={index === 0 ? 'eager' : 'lazy'}
                   fetchPriority={index === 0 ? 'high' : undefined}
                   className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                   style={{ opacity: currentSlide === index ? 1 : 0 }}
                 />
               ))}
               <div className="absolute inset-0 bg-black/15" />
             </div>
           <div className="relative z-10 h-full flex items-center">
             <div className="container mx-auto px-4 w-full">
               <div className="max-w-3xl mx-auto text-center">
                 <div className="flex justify-center mb-6 animate-fade-up">
                   <div className="relative">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                       <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                     </div>
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                     <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
                   </div>
                 </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animation: 'float 3s ease-in-out infinite', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                    {t.nav.services}
                  </h1>
                 <p className="text-lg animate-fade-up text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                    <span className="hidden sm:inline">{t.services.subtitle}</span>
                    <span className="sm:hidden">{t.services.subtitleShort}</span>
                  </p>
               </div>
             </div>
           </div>
         </section>

        <MobilePromotionsCard />

        {/* Desktop promotions */}
        <div className="hidden sm:block">
          <PromotionsSection />
        </div>

        {/* Furniture Calculator */}
        <LazySection minHeight="400px">
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={0}>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Sofa className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {t.services.furniture}
                    </h2>
                    <p className="text-muted-foreground text-sm">{t.services.furnitureDesc}</p>
                  </div>
                </div>
                <CardServiceCalculator items={furnitureItems} category="furniture" />
              </div>
            </CircularRevealCard>
          </div>
        </section>
        </LazySection>

        {/* Leather Calculator */}
        <LazySection minHeight="400px">
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={1}>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Armchair className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {t.services.leather}
                    </h2>
                    <p className="text-muted-foreground text-sm">{t.services.leatherDesc}</p>
                  </div>
                </div>
                <CardServiceCalculator items={leatherItems} category="leather" />
              </div>
            </CircularRevealCard>
          </div>
        </section>
        </LazySection>

        {/* Mattress Calculator */}
        <LazySection minHeight="400px">
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={2}>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Bed className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {language === 'pl' ? 'Pranie materacy' : language === 'en' ? 'Mattress cleaning' : language === 'uk' ? 'Хімчистка матраців' : 'Химчистка матрасов'}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {language === 'pl' ? 'Głębokie czyszczenie i suszenie materacy' : language === 'en' ? 'Deep cleaning and drying of mattresses' : language === 'uk' ? 'Глибока чистка та сушіння матраців' : 'Глубокая чистка и сушка матрасов'}
                    </p>
                  </div>
                </div>
                <CardServiceCalculator items={mattressItems} category="mattress" />
              </div>
            </CircularRevealCard>
          </div>
        </section>
        </LazySection>

        {/* Other / Extras Calculator */}
        <LazySection minHeight="400px">
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={3}>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Package className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {t.services.other}
                    </h2>
                    <p className="text-muted-foreground text-sm">{t.services.otherDesc}</p>
                  </div>
                </div>
                <CardServiceCalculator items={extrasItems} category="extras" />
              </div>
            </CircularRevealCard>
          </div>
        </section>
        </LazySection>
      </Layout>
    </>
  );
};

export default Services;
