import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import { Sofa, Sparkles, Armchair, Car, LayoutGrid, Baby } from 'lucide-react';
import leatherSofaCleaning from '@/assets/leather-sofa-cleaning.jpg';
import mattressCleaningService from '@/assets/mattress-cleaning-service.jpg';
import armchairCleaning from '@/assets/armchair-cleaning.jpg';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Sparkles, title: t.services.carpets, description: t.services.carpetsDesc },
    { icon: Sofa, title: t.services.furniture, description: t.services.furnitureDesc },
    { icon: Armchair, title: t.services.leather, description: t.services.leatherDesc },
    { icon: LayoutGrid, title: t.services.balcony, description: t.services.balconyDesc },
    { icon: Car, title: t.nav.auto, description: t.auto.subtitle },
    { icon: Baby, title: t.services.stroller, description: t.services.strollerDesc },
  ];

  const galleryImages = [
    { src: leatherSofaCleaning, alt: 'Чистка кожаного дивана' },
    { src: mattressCleaningService, alt: 'Чистка матраса' },
    { src: armchairCleaning, alt: 'Чистка кресла' },
  ];

  return (
    <Layout>
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
                className="group rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up bg-gradient-hero p-1"
                style={{ animationDelay: `${index * 0.1}s`, animation: `float ${4 + index * 0.5}s ease-in-out infinite` }}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ animation: `slowZoom ${18 + index * 2}s ease-in-out infinite alternate` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-fresh/20 group-hover:opacity-50 transition-opacity duration-300" />
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
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
