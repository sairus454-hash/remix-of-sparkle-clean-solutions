import { useState, useCallback } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import ServicesSplash from '@/components/ServicesSplash';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Sofa, Sparkles, Armchair, Car, LayoutGrid, Baby, Wind, Wrench, Droplets, ShieldCheck, Home } from 'lucide-react';
import leatherSofaCleaning from '@/assets/leather-sofa-cleaning.jpg';
import mattressCleaningService from '@/assets/mattress-cleaning-service.jpg';
import armchairCleaning from '@/assets/armchair-cleaning.jpg';
const Services = () => {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

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

        {/* Hero */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Live Sparkles Icon */}
              <div className="flex justify-center mb-6 animate-fade-up">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.services.title}
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
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
              ))}
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
