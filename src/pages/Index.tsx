import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import WaterDropSplash from '@/components/WaterDropSplash';
import PriceSection from '@/components/PriceSection';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, CheckCircle2, Star, Users, Award, Droplets, Calculator } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import PriceCalculatorContent from '@/components/PriceCalculatorContent';
import heroImage from '@/assets/masterclean-logo-hero.jpg';
import mattressCleaningImage from '@/assets/mattress-cleaning.jpg';
const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);
  const {
    t
  } = useLanguage();
  
  const stats = [{
    icon: Star,
    value: '3+',
    label: t.about.experience
  }, {
    icon: Users,
    value: '5000+',
    label: t.about.clients
  }, {
    icon: Award,
    value: '100%',
    label: t.about.quality
  }];
  return <>
      {showSplash && <WaterDropSplash onComplete={handleSplashComplete} />}
      <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-gradient-section overflow-hidden py-8 sm:py-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-fresh/10 rounded-full blur-3xl animate-float" style={{
            animationDelay: '3s'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              {/* Exploding Water Drop Icon */}
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6 animate-fade-up">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>
                  {/* Explosion effect - multiple pinging circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-fresh/60 rounded-full animate-ping" />
                  <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-primary/70 rounded-full animate-ping" style={{
                    animationDelay: '0.2s'
                  }} />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-fresh rounded-full animate-ping" style={{
                    animationDelay: '0.4s'
                  }} />
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full animate-ping" style={{
                    animationDelay: '0.6s'
                  }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-fresh/80 rounded-full animate-ping" style={{
                    animationDelay: '0.8s'
                  }} />
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] leading-tight" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.hero.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-up leading-relaxed" style={{
                animationDelay: '0.1s'
              }}>
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up justify-center lg:justify-start" style={{
                animationDelay: '0.2s'
              }}>
                <Link to="/contacts" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 touch-manipulation active:scale-95 transition-transform">
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/services" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-primary text-primary hover:bg-accent touch-manipulation active:scale-95 transition-transform">
                    {t.hero.secondary}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-up group order-first lg:order-last" style={{
              animationDelay: '0.3s'
            }}>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-hero p-1 shadow-glow overflow-hidden" style={{
                animation: 'float 4s ease-in-out infinite'
              }}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img src={mattressCleaningImage} alt="Professional mattress cleaning" className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110" style={{
                    animation: 'slowZoom 20s ease-in-out infinite alternate'
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-fresh/20 rounded-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-fresh/20 rounded-2xl blur-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => <div key={index} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card shadow-card animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow flex-shrink-0" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-tight">{stat.label}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-12 sm:py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
              animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
            }}>
              Акции
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">Специальные предложения для наших клиентов</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Акция недели */}
            <CircularRevealCard index={0} slow className="h-full">
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/15 via-card to-teal-500/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full border border-orange-500/25 hover:border-orange-500/50 hover:scale-[1.02]">
                {/* Декоративный фон */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/25 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
                
                {/* Бейдж */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-glow animate-pulse">
                    -10%
                  </span>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                    Акция недели
                  </h3>
                  <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                    Химчистка матрасов со скидкой
                  </p>
                  <p className="text-orange-500 text-center text-2xl sm:text-3xl font-bold mt-2">
                    10%
                  </p>
                </div>
              </div>
            </CircularRevealCard>

            {/* Акция месяца */}
            <CircularRevealCard index={1} slow className="h-full">
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-400/15 via-card to-cyan-500/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full border border-orange-400/25 hover:border-orange-500/50 hover:scale-[1.02]">
                {/* Декоративный фон */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/25 to-transparent rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-xl translate-y-1/2 translate-x-1/2" />
                
                {/* Бейдж */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-cyan-500 text-white shadow-glow animate-pulse">
                    -15%
                  </span>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-400 to-cyan-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 to-cyan-500 bg-clip-text text-transparent">
                    Акция месяца
                  </h3>
                  <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                    Закажи химчистку и получи скидку на вторую услугу
                  </p>
                  <p className="text-orange-500 text-center text-2xl sm:text-3xl font-bold mt-2">
                    15%
                  </p>
                </div>
              </div>
            </CircularRevealCard>

            {/* Акция до конца года */}
            <CircularRevealCard index={2} slow className="sm:col-span-2 lg:col-span-1 h-full">
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-600/15 via-card to-teal-600/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full border border-orange-600/25 hover:border-orange-600/50 hover:scale-[1.02]">
                {/* Декоративный фон */}
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-orange-600/20 to-teal-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                
                {/* Бейдж */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-600 to-teal-600 text-white shadow-glow animate-pulse">
                    VIP
                  </span>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-600 to-teal-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                    Для постоянных клиентов
                  </h3>
                  <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                    Скидки до конца года
                  </p>
                  <p className="text-orange-600 text-center text-2xl sm:text-3xl font-bold mt-2">
                    до 15%
                  </p>
                </div>
              </div>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Calculator Trigger */}
      <section className="py-6 sm:py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <CircularRevealCard index={0}>
              <Card 
                className="shadow-card cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setIsCalcOpen(true)}
              >
                <CardContent className="py-5 sm:py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                        <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-semibold">{t.calculator.title}</h2>
                        <p className="text-sm text-muted-foreground">{t.calculator.selectItems}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      {t.calculator.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CircularRevealCard>
          </div>
        </div>
      </section>

      {/* Calculator Modal/Drawer */}
      {isMobile ? (
        <Drawer open={isCalcOpen} onOpenChange={setIsCalcOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <DrawerTitle className="font-serif text-lg">
                  {t.calculator.title}
                </DrawerTitle>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 pb-8">
              <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <DialogTitle className="font-serif text-xl">
                  {t.calculator.title}
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 py-4">
              <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Price Section */}
      <PriceSection />

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 animate-[float_3s_ease-in-out_infinite] bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.about.title}
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">{t.about.description}</p>
              
              <ul className="space-y-3 sm:space-y-4 text-left max-w-md mx-auto lg:mx-0">
                {[t.equipment.modern, t.equipment.eco, t.equipment.quality].map((item, index) => <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0 mt-0.5" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>)}
              </ul>
              
              <Link to="/about" className="inline-block mt-6 sm:mt-8">
                <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow touch-manipulation active:scale-95 transition-transform px-6 py-5 sm:py-4">
                  {t.hero.secondary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="relative group order-1 lg:order-2">
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-hero p-1 shadow-glow overflow-hidden" style={{
                animation: 'float 5s ease-in-out infinite'
              }}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img src={heroImage} alt="MasterClean" className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110" style={{
                    animation: 'slowZoom 25s ease-in-out infinite alternate'
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-fresh/20 via-transparent to-primary/20 rounded-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-fresh/20 rounded-2xl blur-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.form.title}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">{t.contacts.subtitle}</p>
            </div>
            
            <div className="bg-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
    </>;
};
export default Index;