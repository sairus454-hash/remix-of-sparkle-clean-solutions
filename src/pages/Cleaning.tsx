import { useState, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Slider } from '@/components/ui/slider';
import { Sparkles, CheckCircle2, Home, Clock, Shield, Leaf, Users } from 'lucide-react';
import cleaningTeam1 from '@/assets/cleaning-team-work-1.jpg';
import cleaningTeam2 from '@/assets/cleaning-team-work-2.jpg';
import cleaningTeam3 from '@/assets/cleaning-team-work-3.jpg';

const Cleaning = () => {
  const { t } = useLanguage();
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  // Slider state
  const [area, setArea] = useState(50);
  const pricePerMeter = 6;
  const totalPrice = area * pricePerMeter;

  const handleSendToForm = () => {
    const cleaningData = [
      { id: 'cleaning-area', name: `${t.cleaning?.service || 'Уборка'} ${area} м²`, price: totalPrice, quantity: 1 }
    ];
    formRef.current?.setCalculatorData(cleaningData, totalPrice);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const benefits = [
    { icon: Clock, text: t.cleaning?.benefit1 || 'Экономия вашего времени' },
    { icon: Shield, text: t.cleaning?.benefit2 || 'Профессиональные средства' },
    { icon: Leaf, text: t.cleaning?.benefit3 || 'Экологичная уборка' },
    { icon: Users, text: t.cleaning?.benefit4 || 'Опытная команда' },
  ];

  const cleaningTypes = [
    { title: t.cleaning?.type1 || 'Генеральная уборка', desc: t.cleaning?.type1Desc || 'Полная уборка всех помещений от пола до потолка' },
    { title: t.cleaning?.type2 || 'Поддерживающая уборка', desc: t.cleaning?.type2Desc || 'Регулярная уборка для поддержания чистоты' },
    { title: t.cleaning?.type3 || 'Уборка после ремонта', desc: t.cleaning?.type3Desc || 'Удаление строительной пыли и грязи' },
    { title: t.cleaning?.type4 || 'Уборка офисов', desc: t.cleaning?.type4Desc || 'Профессиональная уборка офисных помещений' },
  ];

  const whatWeDo = [
    t.cleaning?.do1 || 'Мытьё полов и плинтусов',
    t.cleaning?.do2 || 'Уборка пыли со всех поверхностей',
    t.cleaning?.do3 || 'Мытьё зеркал и стёкол',
    t.cleaning?.do4 || 'Уборка кухни и санузлов',
    t.cleaning?.do5 || 'Вынос мусора',
    t.cleaning?.do6 || 'Уход за мебелью и техникой',
  ];

  const galleryImages = [
    { src: cleaningTeam1, alt: t.cleaning?.gallery1 || 'Команда клинеров' },
    { src: cleaningTeam2, alt: t.cleaning?.gallery2 || 'Уборка кухни' },
    { src: cleaningTeam3, alt: t.cleaning?.gallery3 || 'Уборка комнат' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.cleaning?.title || 'Уборка помещений'}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.cleaning?.subtitle || 'Профессиональная уборка квартир, домов и офисов'}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <CircularRevealCard key={index} index={index}>
                <div 
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
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Price Calculator with Slider */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <CircularRevealCard index={0}>
              <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
                <h3 className="font-serif text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent">
                  {t.cleaning?.calculatorTitle || 'Рассчитайте стоимость уборки'}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-foreground mb-2">
                      {t.cleaning?.area || 'Площадь'}: <strong className="text-primary">{area} м²</strong>
                    </label>
                    <Slider
                      value={[area]}
                      onValueChange={(value) => setArea(value[0])}
                      min={20}
                      max={300}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>20 м²</span>
                      <span>300 м²</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {t.cleaning?.pricePerMeter || 'Цена за м²'}: <strong className="text-foreground">6 PLN</strong>
                  </p>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-serif text-3xl font-bold text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent">
                      {t.cleaning?.total || 'Итого'}: {totalPrice} PLN
                    </h4>
                  </div>
                  
                  <button
                    onClick={handleSendToForm}
                    className="w-full py-3 px-6 bg-gradient-hero text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-glow"
                  >
                    {t.cleaning?.order || 'Заказать уборку'}
                  </button>
                </div>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t.calculator?.minOrder}
                </p>
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <CircularRevealCard index={0}>
              <div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Home className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                  {t.cleaning?.whatTitle || 'Что мы убираем'}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.cleaning?.whatDesc || 'Наша команда профессиональных клинеров выполнит полный комплекс уборочных работ для вашего дома или офиса. Используем только проверенные и безопасные средства.'}
                </p>
                <ul className="space-y-3">
                  {whatWeDo.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CircularRevealCard>
            
            <CircularRevealCard index={1}>
              <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card h-full">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                  {t.cleaning?.benefitsTitle || 'Почему выбирают нас'}
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-fresh" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                      </div>
                      <span className="text-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Types of Cleaning */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
            {t.cleaning?.typesTitle || 'Виды уборки'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cleaningTypes.map((type, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group p-6 rounded-2xl bg-card border border-border text-center hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formSectionRef} className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                {t.form.title}
              </h2>
            </div>
            <CircularRevealCard index={0}>
              <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
                <ContactForm ref={formRef} />
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cleaning;
