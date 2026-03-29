import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CircularRevealCard from '@/components/CircularRevealCard';
import CardServiceCalculator from '@/components/CardServiceCalculator';
import PromotionsSection from '@/components/PromotionsSection';
import { Sparkles, Sofa, Armchair } from 'lucide-react';
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
import calcArmchair from '@/assets/calc-armchair.jpg';
import calcPillow from '@/assets/calc-pillow.jpg';
import calcSofa2 from '@/assets/calc-sofa2.jpg';
import calcSofa3 from '@/assets/calc-sofa3.jpg';
import calcSofaCorner from '@/assets/calc-sofa-corner.jpg';
import calcSofaCornerLarge from '@/assets/calc-sofa-corner-large.jpg';
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
    { id: 'pouf', name: t.prices.items.pouf, price: 40, image: calcPouf },
    { id: 'chair', name: t.prices.items.chair, price: 40, image: calcChair },
    { id: 'armchair', name: t.prices.items.armchair, price: 70, image: calcArmchair },
    { id: 'pillow', name: t.prices.items.pillow, price: 15, image: calcPillow },
    { id: 'sofa2', name: t.prices.items.sofa2, price: 140, image: calcSofa2 },
    { id: 'sofa3', name: t.prices.items.sofa3, price: 170, image: calcSofa3 },
    { id: 'sofaCorner', name: t.prices.items.sofaCorner, price: 200, image: calcSofaCorner },
    { id: 'sofaCornerLarge', name: t.prices.items.sofaCornerLarge, price: 250, image: calcSofaCornerLarge },
    { id: 'mattressSingle', name: t.prices.items.mattressSingle, price: 140, image: calcMattressSingle },
    { id: 'mattressDouble', name: t.prices.items.mattressDouble, price: 180, image: calcMattressDouble },
    { id: 'mattressSingleDry2', name: t.prices.items.mattressSingleDry2 || 'Матрас односп. с двух сторон', price: 220, image: calcMattressSingle },
    { id: 'mattressDoubleDry2', name: t.prices.items.mattressDoubleDry2 || 'Матрас двусп. с двух сторон', price: 280, image: calcMattressDouble },
    { id: 'bedHeadboard', name: t.prices.items.bedHeadboard, price: 100, image: calcHeadboard },
    { id: 'bedFrame', name: t.prices.items.bedFrame, price: 100, image: calcBedframe },
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
    { id: 'leatherPouf', name: t.prices.items.leatherPouf, price: 55, image: calcLeatherPouf },
    { id: 'leatherChair', name: t.prices.items.leatherChair, price: 50, image: calcLeatherChair },
    { id: 'leatherArmchair', name: t.prices.items.leatherArmchair, price: 90, image: calcLeatherArmchair },
    { id: 'leatherSofa2', name: t.prices.items.leatherSofa2, price: 180, image: calcLeatherSofa2 },
    { id: 'leatherSofa3', name: t.prices.items.leatherSofa3, price: 220, image: calcLeatherSofa3 },
    { id: 'leatherSofaCorner', name: t.prices.items.leatherSofaCorner, price: 270, image: calcLeatherCorner },
  ];

  return (
    <>
      <SEO
        title="Pranie tapicerki meblowej i skórzanej — Cennik usług"
        description="Profesjonalne pranie tapicerki meblowej i skórzanej z dojazdem do klienta. Czyszczenie kanap, foteli, sof, materacy. Kalkulator kosztów online. Wrocław, Opole."
        keywords="pranie tapicerki meblowej, pranie tapicerki skórzanej, czyszczenie mebli, pranie kanapy, pranie sofy, czyszczenie fotela, pranie materaca, czyszczenie tapicerki, czyszczenie skóry, pranie tapicerki cennik, pranie tapicerki z dojazdem, czyszczenie mebli Wrocław, Opole, Poznań"
        canonical="/services"
        image="https://masterclean1885.pl/og-services.png"
        breadcrumbs={[{ name: t.nav.services, path: '/services' }]}
         jsonLd={{
           '@context': 'https://schema.org',
           '@type': 'Service',
           serviceType: 'Pranie tapicerki meblowej',
           name: 'Pranie tapicerki meblowej i skórzanej',
           description: 'Profesjonalne pranie tapicerki meblowej i skórzanej z dojazdem do klienta. Czyszczenie kanap, foteli, sof, materacy.',
           url: 'https://masterclean1885.pl/services',
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
             { '@type': 'Offer', name: 'Pranie kanapy 2-osobowej', price: '150', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie kanapy 3-osobowej', price: '180', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie narożnika', price: '250', priceCurrency: 'PLN' },
             { '@type': 'Offer', name: 'Pranie materaca', price: '100', priceCurrency: 'PLN' },
           ],
         }}
      />
      <Layout>
         {/* Hero */}
         <section className="relative min-h-[calc(100vh-120px)] overflow-hidden">
           <div className="absolute inset-0">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                  style={{
                    backgroundImage: `url(${slide})`,
                    opacity: currentSlide === index ? 1 : 0,
                  }}
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
                 <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
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

        <PromotionsSection />

        {/* Furniture Calculator */}
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
                <CardServiceCalculator category="furniture" items={[...furnitureItems, ...extrasItems]} />
              </div>
            </CircularRevealCard>
          </div>
        </section>

        {/* Leather Calculator */}
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
                <CardServiceCalculator category="leather" items={leatherItems} />
              </div>
            </CircularRevealCard>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
