import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import OzonePriceCalculator from '@/components/OzonePriceCalculator';
import { Wind, CheckCircle2, Car, Home, Building2, Wrench } from 'lucide-react';
import ozoneRoom from '@/assets/ozone-room.jpg';
import ozoneCar from '@/assets/ozone-car.jpg';
import ozoneOffice from '@/assets/ozone-office.jpg';

const Ozone = () => {
  const { t } = useLanguage();

  const benefits = [
    t.ozone.benefit1,
    t.ozone.benefit2,
    t.ozone.benefit3,
    t.ozone.benefit4,
  ];

  const applications = [
    { icon: Car, title: t.ozone.app1 },
    { icon: Home, title: t.ozone.app2 },
    { icon: Building2, title: t.ozone.app3 },
    { icon: Wrench, title: t.ozone.app4 },
  ];

  const galleryImages = [
    { src: ozoneRoom, alt: 'Озонирование квартиры' },
    { src: ozoneCar, alt: 'Озонирование автомобиля' },
    { src: ozoneOffice, alt: 'Озонирование офиса' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated fresh air icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Wind className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-fresh/70 animate-ping" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.ozone.title}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.ozone.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-card">
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

      {/* What is Ozonation */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <Wind className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.ozone.what}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.ozone.whatDesc}
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border shadow-card">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                {t.ozone.benefits}
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
            {t.ozone.applications}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-gradient-card border border-border text-center hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <app.icon className="w-7 h-7 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h3 className="font-medium text-foreground">{app.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <OzonePriceCalculator />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.form.title}
              </h2>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ozone;
