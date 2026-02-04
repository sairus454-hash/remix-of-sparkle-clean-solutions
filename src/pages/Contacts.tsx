import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import ContactsSplash from '@/components/ContactsSplash';
import AnimatedImage from '@/components/AnimatedImage';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import mastercleanLogo from '@/assets/masterclean-logo-contacts.jpg';
import { CalculatorItem } from '@/types/calculator';

interface LocationState {
  calculatorItems?: CalculatorItem[];
  calculatorTotal?: number;
}

const Contacts = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showSplash, setShowSplash] = useState(true);
  const formRef = useRef<ContactFormRef>(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

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
      {showSplash && <ContactsSplash onComplete={handleSplashComplete} />}
      <Layout>
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.contacts.title}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.contacts.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-8 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.contacts.title}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-4 rounded-xl bg-gradient-card border border-border animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
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
                  </div>
                ))}
              </div>
              
              {/* MasterClean Logo */}
              <div className="mt-8">
                <div className="rounded-2xl overflow-hidden shadow-glow bg-gradient-hero p-1">
                  <AnimatedImage 
                    src={mastercleanLogo} 
                    alt="MasterClean" 
                    delay={400}
                    duration={800}
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card">
              <h2 className="font-serif text-2xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.form.title}
              </h2>
              <ContactForm 
                ref={formRef}
                selectedDate={selectedDate} 
                onDateChange={setSelectedDate} 
              />
            </div>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default Contacts;
