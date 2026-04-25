import { useState, useEffect, useRef } from 'react';
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
    { icon: MapPin, label: t.contacts.address, value: t.contacts.addressValue, isHours: false },
    { icon: Phone, label: t.contacts.phone, value: t.contacts.phoneValue, isHours: false },
    { icon: Mail, label: t.contacts.email, value: t.contacts.emailValue, isHours: false },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.hoursValue, isHours: true },
  ];

  return (
    <>
      <SEO
        title="Kontakt MasterClean — Zamów pranie tapicerki"
        description="Skontaktuj się z MasterClean: tel. +48 575 211 401. Zamów pranie tapicerki, czyszczenie mebli, dywanów lub sprzątanie. Pracujemy 24/7. Wrocław, Opole, Poznań."
        keywords="kontakt MasterClean, zamów pranie tapicerki, kontakt firma sprzątająca, zamów czyszczenie mebli, zamów chemczystkę mebli, zamów sprzątanie Wrocław, telefon MasterClean, czyszczenie tapicerki kontakt, Opole"
        canonical="/contacts"
        image="https://masterclean1885.com/og-contacts.png"
        breadcrumbs={[{ name: t.nav.contacts, path: '/contacts' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          mainEntity: {
            '@type': 'LocalBusiness',
            '@id': 'https://masterclean1885.com/#localbusiness',
            name: 'MasterClean 1885',
            image: 'https://masterclean1885.com/og-contacts.png',
            url: 'https://masterclean1885.com/contacts',
            telephone: '+48575211401',
            email: 'sairus454@gmail.com',
            priceRange: '160-2000 PLN',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Smolec',
              addressLocality: 'Wrocław',
              addressRegion: 'dolnośląskie',
              postalCode: '55-080',
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
        }}
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
              
              {/* Google Maps Preview — clickable */}
              <div className="mt-8">
                <CircularRevealCard index={4}>
                  <a
                    href="https://www.google.com/maps/place/MasterClean+1885+Pranie+tapicerki+i+ozonowanie,+zlota+rączka/@51.0984969,16.949163,17z/data=!3m1!4b1!4m6!3m5!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.0984969!4d16.949163!16s%2Fg%2F11xm28yrtl!18m1!1e1?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={language === 'pl' ? 'Otwórz w Google Maps' : language === 'en' ? 'Open in Google Maps' : language === 'uk' ? 'Відкрити в Google Maps' : 'Открыть в Google Maps'}
                    className="group relative block rounded-2xl overflow-hidden shadow-glow border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-muted">
                      <iframe
                        src="https://maps.google.com/maps?q=51.0984969,16.949163&hl=pl&z=17&output=embed"
                        title="MasterClean — Google Maps"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between gap-2 text-background">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                            <MapPin className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm sm:text-base truncate">MasterClean 1885</p>
                            <p className="text-xs sm:text-sm opacity-90 truncate">
                              {language === 'pl' ? 'Wrocław — kliknij, aby otworzyć trasę' : language === 'en' ? 'Wrocław — tap to open directions' : language === 'uk' ? 'Вроцлав — натисніть, щоб відкрити маршрут' : 'Вроцлав — нажмите для маршрута'}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 flex-shrink-0 opacity-90 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                </CircularRevealCard>
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
      </Layout>
    </>
  );
};

export default Contacts;
