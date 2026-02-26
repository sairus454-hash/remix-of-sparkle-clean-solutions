import { useRef } from 'react';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm, { ContactFormRef } from '@/components/ContactForm';
import HandymanPriceCalculator from '@/components/HandymanPriceCalculator';
import HandymanSplash from '@/components/HandymanSplash';
import HandymanHeroSlideshow from '@/components/HandymanHeroSlideshow';
import AnimatedImage from '@/components/AnimatedImage';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wrench, Hammer, Plug, Droplet, PaintBucket, DoorOpen, 
  Lightbulb, Tv, Frame, ShowerHead, Lock, Fan
} from 'lucide-react';
import handyman1 from '@/assets/handyman-1.jpg';
import handyman2 from '@/assets/handyman-2.jpg';
import handyman3 from '@/assets/handyman-3.jpg';
import { CalculatorItem } from '@/types/calculator';

const Handyman = () => {
  const { t } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('handyman');
  const formRef = useRef<ContactFormRef>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleSendToForm = (items: CalculatorItem[], total: number) => {
    formRef.current?.setCalculatorData(items, total);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const services = [
    { icon: Plug, name: t.handyman.electrical, desc: t.handyman.electricalDesc },
    { icon: Droplet, name: t.handyman.plumbing, desc: t.handyman.plumbingDesc },
    { icon: Hammer, name: t.handyman.carpentry, desc: t.handyman.carpentryDesc },
    { icon: PaintBucket, name: t.handyman.painting, desc: t.handyman.paintingDesc },
    { icon: DoorOpen, name: t.handyman.doors, desc: t.handyman.doorsDesc },
    { icon: Lightbulb, name: t.handyman.lighting, desc: t.handyman.lightingDesc },
    { icon: Tv, name: t.handyman.mounting, desc: t.handyman.mountingDesc },
    { icon: Frame, name: t.handyman.furniture, desc: t.handyman.furnitureDesc },
    { icon: ShowerHead, name: t.handyman.bathroom, desc: t.handyman.bathroomDesc },
    { icon: Lock, name: t.handyman.locks, desc: t.handyman.locksDesc },
    { icon: Fan, name: t.handyman.ventilation, desc: t.handyman.ventilationDesc },
    { icon: Wrench, name: t.handyman.other, desc: t.handyman.otherDesc },
  ];

  return (
    <>
      <SEO
        title="Мастер на час — Мелкий ремонт и бытовые услуги"
        description="Мастер на час: сантехника, электрика, мебель, мелкий ремонт. Быстро, качественно, с гарантией. Вызов мастера 24/7."
        keywords="мастер на час, мелкий ремонт, сантехник, электрик, сборка мебели, бытовые услуги"
        canonical="/handyman"
        image="https://masterclean1885.pl/og-handyman.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Мастер на час — бытовые услуги',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          offers: [
            { '@type': 'Offer', name: 'Сантехнические работы', price: '120', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Электромонтажные работы', price: '40', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Чистка канализации', price: '250', priceCurrency: 'PLN' },
          ],
        }}
      />
    <Layout>
      {showSplash && <HandymanSplash onComplete={handleSplashComplete} />}
      
      {/* Hero Section with animated title */}
      <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center py-20">
        <HandymanHeroSlideshow />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-left relative z-10">
            {/* Animated tool icons */}
            <div className="flex justify-start mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow animate-float">
                  <Wrench className="w-12 h-12 text-primary-foreground animate-pulse" />
                </div>
                {/* Floating small icons */}
                <div className="absolute -top-2 -right-8 animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg">
                    <Hammer className="w-5 h-5 text-yellow-900" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg">
                    <Plug className="w-5 h-5 text-yellow-900" />
                  </div>
                </div>
                <div className="absolute top-1/2 -right-12 animate-bounce" style={{ animationDelay: '0.8s' }}>
                  <div className="w-8 h-8 rounded-lg bg-yellow-300 flex items-center justify-center shadow-md">
                    <Droplet className="w-4 h-4 text-yellow-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Title with yellow underline animation */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up relative inline-block">
              <span className="relative z-10">{t.handyman.title}</span>
              <span 
                className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/60 -z-0 rounded"
                style={{ 
                  animation: 'highlightExpand 1s ease-out forwards',
                  transformOrigin: 'left'
                }}
              />
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up max-w-2xl" style={{ animationDelay: '0.1s' }}>
              {t.handyman.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">{t.handyman.servicesTitle}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.handyman.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <CircularRevealCard key={index} index={index}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400/50 h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-4 group-hover:bg-yellow-400/40 transition-colors group-hover:scale-110 duration-300">
                      <service.icon className="w-7 h-7 text-yellow-600 group-hover:text-yellow-700" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-yellow-600 transition-colors">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Photos */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Nasi Fachowcy</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: handyman1, name: 'Marek', specialty: t.handyman.electrical },
              { img: handyman2, name: 'Piotr', specialty: t.handyman.plumbing },
              { img: handyman3, name: 'Tomek', specialty: t.handyman.carpentry },
            ].map((member, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                    <AnimatedImage 
                      src={member.img} 
                      alt={member.name}
                      delay={index * 150}
                      duration={800}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
                      <h3 className="text-white font-bold text-xl">{member.name}</h3>
                      <p className="text-yellow-400">{member.specialty}</p>
                    </div>
                  </div>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.whyUs}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: '⚡', title: t.handyman.benefit1, desc: t.handyman.benefit1Desc },
                { icon: '🛠️', title: t.handyman.benefit2, desc: t.handyman.benefit2Desc },
                { icon: '💰', title: t.handyman.benefit3, desc: t.handyman.benefit3Desc },
                { icon: '✅', title: t.handyman.benefit4, desc: t.handyman.benefit4Desc },
              ].map((benefit, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="flex gap-4 p-6 bg-card rounded-xl shadow-card hover:shadow-lg transition-shadow h-full">
                    <div className="text-4xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.pricing}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>

            <CircularRevealCard index={0}>
              <HandymanPriceCalculator onSendToForm={handleSendToForm} />
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formSectionRef} className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="relative z-10">{t.handyman.orderNow}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400/40 -z-0 rounded" />
              </h2>
            </div>
            <CircularRevealCard index={0}>
              <ContactForm ref={formRef} />
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* CSS for highlight animation */}
      <style>{`
        @keyframes highlightExpand {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </Layout>
    </>
  );
};

export default Handyman;
