import { useState, useEffect, useRef } from 'react';
import SeoPageLongText from '@/components/SeoPageLongText';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import ContactsSplash from '@/components/ContactsSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import PremiumGlareBackground from '@/components/PremiumGlareBackground';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

import { CalculatorItem } from '@/types/calculator';
import contactsMapPreview from '@/assets/contacts-map-preview.jpg';
import PageFaqSection from '@/components/PageFaqSection';
import { getSeoMeta, buildFaqJsonLd } from '@/lib/pageSeo';

interface LocationState {
  calculatorItems?: CalculatorItem[];
  calculatorTotal?: number;
}

const Contacts = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { showSplash, handleSplashComplete } = useSplash('contacts');
  const formRef = useRef<ContactFormRef>(null);

  // Handle incoming calculator data from navigation
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.calculatorItems && state?.calculatorTotal) {
      // Wait for splash to complete and form to be ready
      const timer = setTimeout(() => {
        formRef.current?.setCalculatorData(state.calculatorItems!, state.calculatorTotal!);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const contactInfo = [
    { icon: Phone, label: t.contacts.phone, value: t.contacts.phoneValue, isHours: false },
    { icon: Mail, label: t.contacts.email, value: t.contacts.emailValue, isHours: false },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.hoursValue, isHours: true },
  ];

  const seoMeta = getSeoMeta('contacts', language);

  return (
    <>
      <SEO
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        canonical="/contacts"
        image="https://masterclean1885.com/og-contacts.jpg"
        breadcrumbs={[{ name: t.nav.contacts, path: '/contacts' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'LocalBusiness',
              '@id': 'https://masterclean1885.com/#localbusiness',
              name: 'MasterClean 1885',
              image: 'https://masterclean1885.com/og-contacts.jpg',
              url: 'https://masterclean1885.com/contacts',
              telephone: '+48575211401',
              email: 'sairus454@gmail.com',
              priceRange: '160-2000 PLN',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Trawowa 14',
                addressLocality: 'Wrocław',
                addressRegion: 'dolnośląskie',
                postalCode: '54-614',
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.0984969,
                longitude: 16.949163,
              },
              hasMap: 'https://www.google.com/maps/place/MasterClean+1885+Pranie+tapicerki+i+ozonowanie,+zlota+rączka/@51.0984969,16.949163,17z',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
              },
              areaServed: [
                { '@type': 'City', name: 'Wrocław' },
                { '@type': 'City', name: 'Opole' },
                { '@type': 'City', name: 'Poznań' },
                { '@type': 'City', name: 'Zielona Góra' },
              ],
            },
          },
          buildFaqJsonLd('contacts', language),
        ]}
      />
      {showSplash && <ContactsSplash onComplete={handleSplashComplete} />}
      <Layout>
      <PremiumGlareBackground />
      {/* Hero */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live Phone Icon */}
            <div className="flex justify-center mb-6 animate-fade-up">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Phone className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.contacts.title}
            </h1>
            <p className="text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fade-up" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {t.contacts.subtitle}
            </p>
          </div>
        </div>
      </section>

      

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 [&>*:first-child]:order-2 [&>*:last-child]:order-1 lg:[&>*:first-child]:order-1 lg:[&>*:last-child]:order-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-8 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.contacts.title}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const isPhone = item.icon === Phone;
                  const isAddress = item.icon === MapPin;
                  const isEmail = item.icon === Mail;
                  const Wrapper = isPhone || isAddress || isEmail ? 'a' : 'div';
                  const wrapperProps = isPhone
                    ? { href: 'tel:+48575211401' }
                    : isAddress
                      ? { href: 'https://maps.app.goo.gl/uvzboZg432I31j3ZX', target: '_blank', rel: 'noopener noreferrer' }
                      : isEmail
                        ? { href: 'https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com', target: '_blank', rel: 'noopener noreferrer' }
                        : {};

                  return (
                    <CircularRevealCard key={index} index={index}>
                      <Wrapper {...wrapperProps} className={`flex gap-4 p-4 rounded-xl bg-gradient-card border border-border ${isPhone || isAddress || isEmail ? 'hover:border-primary/50 transition-colors cursor-pointer' : ''}`}>
                        <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                          <item.icon className="w-5 h-5 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          {item.isHours ? (
                            <p className="font-serif text-4xl font-bold text-primary">{item.value}</p>
                          ) : (
                            <p className="font-medium text-foreground whitespace-pre-line">{item.value}</p>
                          )}
                        </div>
                      </Wrapper>
                    </CircularRevealCard>
                  );
                })}
              </div>
            </div>


            {/* Form */}
            <CircularRevealCard index={0}>
              <div className="p-8 rounded-2xl h-full">
                <h2 className="font-serif text-2xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                  {language === 'ru' ? 'Общая заявка' : language === 'pl' ? 'Formularz zamówienia' : language === 'uk' ? 'Загальна заявка' : 'Order Form'}
                </h2>
                <ContactForm 
                  ref={formRef}
                  selectedDate={selectedDate} 
                  onDateChange={setSelectedDate} 
                />
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>
      <PageFaqSection page="contacts" />
      <SeoPageLongText variant="contacts" />
      </Layout>
    </>
  );
};

export default Contacts;
