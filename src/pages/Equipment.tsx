import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ExtractorSplash from '@/components/ExtractorSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import HeroSlideshow from '@/components/HeroSlideshow';
import { Cog, Leaf, ShieldCheck, Zap, Wind, Droplets, Sparkles, Fan, FlaskConical } from 'lucide-react';
import extractorImage from '@/assets/extractor-santoemma.jpg';
import steamImage from '@/assets/steam-generator.jpg';
import vacuumImage from '@/assets/vacuum-karcher.jpg';
import ozoneImage from '@/assets/ozone-generator.jpg';
import chemicalsImage from '@/assets/cleaning-chemicals.jpg';
import dryingImage from '@/assets/drying-system.jpg';
import equipmentSetImage from '@/assets/equipment-set.jpg';

const Equipment = () => {
  const { t } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('equipment');

  const mainFeatures = [
    {
      icon: Cog,
      title: t.equipment.modern,
      description: t.equipment.modernDesc,
    },
    {
      icon: Leaf,
      title: t.equipment.eco,
      description: t.equipment.ecoDesc,
    },
    {
      icon: ShieldCheck,
      title: t.equipment.quality,
      description: t.equipment.qualityDesc,
    },
  ];

  const equipmentItems = [
    {
      icon: Droplets,
      title: t.equipment.extraction,
      description: t.equipment.extractionDesc,
      color: 'text-primary',
      image: extractorImage,
    },
    {
      icon: Wind,
      title: t.equipment.steam,
      description: t.equipment.steamDesc,
      color: 'text-fresh',
      image: steamImage,
    },
    {
      icon: Sparkles,
      title: t.equipment.vacuum,
      description: t.equipment.vacuumDesc,
      color: 'text-primary',
      image: vacuumImage,
    },
    {
      icon: Zap,
      title: t.equipment.ozone,
      description: t.equipment.ozoneDesc,
      color: 'text-fresh',
      image: ozoneImage,
    },
    {
      icon: FlaskConical,
      title: t.equipment.detergents,
      description: t.equipment.detergentsDesc,
      color: 'text-primary',
      image: chemicalsImage,
    },
    {
      icon: Fan,
      title: t.equipment.drying,
      description: t.equipment.dryingDesc,
      color: 'text-fresh',
      image: dryingImage,
    },
  ];

  return (
    <>
      <SEO
        title="Оборудование и технологии — Современная техника"
        description="Профессиональное оборудование для химчистки: экстракторы, парогенераторы, озонаторы. Экологичные средства и передовые технологии."
        keywords="оборудование химчистки, экстрактор, парогенератор, озонатор, технологии чистки"
        canonical="/equipment"
        image="https://masterclean1885.pl/og-equipment.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Оборудование и технологии MasterClean',
          description: 'Профессиональное оборудование для химчистки: экстракторы Santoemma, парогенераторы, озонаторы.',
          isPartOf: { '@type': 'WebSite', name: 'MasterClean', url: 'https://masterclean1885.pl' },
        }}
      />
      {showSplash && <ExtractorSplash onComplete={handleSplashComplete} />}
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
          <HeroSlideshow images={[
            { src: equipmentSetImage, alt: 'Профессиональное оборудование' },
            { src: extractorImage, alt: 'Экстрактор Santoemma' },
            { src: steamImage, alt: 'Парогенератор' },
            { src: vacuumImage, alt: 'Пылесос Kärcher' },
          ]} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6 animate-fade-up">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Droplets className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.equipment.title}
              </h1>
              <p className="text-lg animate-fade-up text-secondary-foreground" style={{ animationDelay: '0.1s' }}>
                {t.equipment.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="group p-8 rounded-2xl bg-gradient-card border border-border hover:shadow-card-hover transition-all duration-300 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                      <feature.icon className="w-8 h-8 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Technologies with Equipment Details */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.equipment.modern}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.equipment.modernDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {equipmentItems.map((item, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                    {item.image && (
                      <div className="mb-6 rounded-xl overflow-hidden bg-gradient-hero p-0.5 group/img" style={{ animation: `float ${3 + index * 0.3}s ease-in-out infinite` }}>
                        <div className="relative rounded-lg overflow-hidden bg-muted/30">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-48 object-contain transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-fresh/10" />
                        </div>
                      </div>
                    )}
                    {!item.image && (
                      <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                    )}
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Equipment;
