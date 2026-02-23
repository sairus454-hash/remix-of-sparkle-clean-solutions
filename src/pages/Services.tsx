import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import ServicesSplash from '@/components/ServicesSplash';
import HeroSlideshow from '@/components/HeroSlideshow';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Sofa, Sparkles, Armchair, Car, LayoutGrid, Baby, Wind, Wrench, Droplets, ShieldCheck, Home } from 'lucide-react';
import leatherSofaCleaning from '@/assets/leather-sofa-cleaning.jpg';
import mattressCleaningService from '@/assets/mattress-cleaning-service.jpg';
import armchairCleaning from '@/assets/armchair-cleaning.jpg';
const Services = () => {
  const { t } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('services');

  const services = [
    { icon: Home, title: t.nav.cleaning, description: t.cleaning?.subtitle || 'Профессиональная уборка помещений' },
    { icon: Sparkles, title: t.services.carpets, description: t.services.carpetsDesc },
    { icon: Sofa, title: t.services.furniture, description: t.services.furnitureDesc },
    { icon: Armchair, title: t.services.leather, description: t.services.leatherDesc },
    { icon: LayoutGrid, title: t.services.balcony, description: t.services.balconyDesc },
    { icon: Car, title: t.nav.auto, description: t.auto.subtitle },
    { icon: Baby, title: t.services.stroller, description: t.services.strollerDesc },
    { icon: Droplets, title: t.nav.windows, description: t.windows.subtitle },
    { icon: Wind, title: t.nav.ozone, description: t.ozone.subtitle },
    { icon: Wrench, title: t.nav.handyman, description: t.handyman.subtitle },
  ];

  const galleryImages = [
    { src: leatherSofaCleaning, alt: 'Чистка кожаного дивана' },
    { src: mattressCleaningService, alt: 'Чистка матраса' },
    { src: armchairCleaning, alt: 'Чистка кресла' },
  ];

  return (
    <>
      <SEO
        title="Услуги химчистки — Мебель, ковры, авто, озонирование"
        description="Полный спектр клининговых услуг: химчистка мебели, ковров, матрасов, кожаных изделий, салонов авто, озонирование, мойка окон, уборка."
        keywords="услуги химчистки, чистка мебели, чистка ковров, химчистка авто, озонирование, мойка окон"
        canonical="/services"
        image="https://masterclean1885.pl/og-services.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Cleaning Services',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Клининговые услуги',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Химчистка мебели' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Химчистка ковров' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Химчистка авто' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Озонирование' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Мойка окон' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Уборка помещений' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Импрегнация' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Мастер на час' } },
            ],
          },
        }}
      />
      {showSplash && <ServicesSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Impregnation Card */}
        <section className="py-12 bg-gradient-section">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={0}>
              <a 
                href="/impregnation" 
                className="group block max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-hero border border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <ShieldCheck className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-primary-foreground">{t.impregnation.cardTitle}</h3>
                      <p className="text-primary-foreground/80 text-sm">{t.impregnation.cardSubtitle}</p>
                    </div>
                  </div>
                  <div className="text-primary-foreground group-hover:translate-x-2 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </a>
            </CircularRevealCard>
          </div>
        </section>

        {/* Hero with Background Photo Slideshow */}
        <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
          <HeroSlideshow images={galleryImages} />
          <div className="container mx-auto px-4 relative z-10">
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.services.title}
              </h1>
              <p className="text-lg animate-fade-up text-secondary-foreground" style={{ animationDelay: '0.1s' }}>
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <CircularRevealCard key={index} index={index}>
                  <ServiceCard {...service} />
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
