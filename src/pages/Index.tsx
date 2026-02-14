import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import WaterDropSplash from '@/components/WaterDropSplash';
import PriceSection from '@/components/PriceSection';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, CheckCircle2, Star, Users, Award, Droplets, Calculator, Shield, BookOpen } from 'lucide-react';
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
import QuickCalculator from '@/components/QuickCalculator';
import heroImage from '@/assets/masterclean-logo-hero.jpg';
import heroBannerImage from '@/assets/hero-banner.jpg';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isFullCalc, setIsFullCalc] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);
  const {
    t, language
  } = useLanguage();
  
  const stats = [{
    icon: Star,
    value: '3+',
    label: t.about.experience
  }, {
    icon: Users,
    value: '1000+',
    label: t.about.clients
  }, {
    icon: Award,
    value: '100%',
    label: t.about.quality
  }];
  return <>
      <SEO
        title="MasterClean — Химчистка мебели, ковров и авто в Польше"
        description="Профессиональная химчистка мебели, матрасов, ковров и салонов авто. Озонирование, уборка, мойка окон. Работаем 24/7. Звоните: +48 575 211 401"
        keywords="химчистка мебели, химчистка ковров, химчистка матрасов, химчистка авто, озонирование, уборка, Ополе, Вроцлав"
        canonical="/"
      />
      {showSplash && <WaterDropSplash onComplete={handleSplashComplete} />}
      <Layout>
      {/* Hero Banner Section */}
      <section 
        className="relative min-h-[600px] md:min-h-[700px] w-full flex items-center overflow-hidden py-12 sm:py-16 md:py-20"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
        }}
      >
        {/* Background image container with contain */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBannerImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: isMobile ? 'brightness(0.8) saturate(1.25)' : 'none',
          }}
        />
        
        {/* Gradient overlay for text readability - lighter on desktop for natural look */}
        <div className={`absolute inset-0 z-[1] ${isMobile ? 'bg-gradient-to-r from-background via-background/90 to-transparent' : 'bg-gradient-to-r from-background/60 via-background/40 to-transparent'}`} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight animate-fade-up">
              {t.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              {t.hero.subtitle}
            </p>
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/contacts">
                <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 touch-manipulation active:scale-95 transition-transform">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Icon */}
      <section className="py-6 sm:py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Link to="/blog" className="group">
              <div className="flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30">
                <div className="relative">
                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                     <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                   </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-fresh animate-ping" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                    📝 {language === 'ru' ? 'Блог чистоты' : language === 'pl' ? 'Blog czystości' : language === 'uk' ? 'Блог чистоти' : 'Cleanliness Blog'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {language === 'ru' ? 'Полезные советы и статьи' : language === 'pl' ? 'Przydatne porady i artykuły' : language === 'uk' ? 'Корисні поради та статті' : 'Useful tips & articles'}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

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

      {/* AI Service Banner - Desktop only */}
      <section className="hidden lg:block py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div 
              className="relative px-8 py-4 rounded-2xl animate-fade-up overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-fresh/20 to-primary/20 animate-pulse rounded-2xl" />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-bold bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 2s linear infinite' }}>
                  {t.hero.aiService}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-12 sm:py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            {/* Premium animated icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 flex items-center justify-center shadow-glow animate-pulse">
                  <span className="text-3xl sm:text-4xl" style={{ animation: 'float 2s ease-in-out infinite' }}>🎁</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            {/* Glassmorphism title container */}
            <div 
              className="inline-block px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 animate-fade-up"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 2s linear infinite' }}>
                  🔥 {t.promotions.title} 🔥
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="font-medium text-foreground/80">✨ {t.promotions.subtitle} ✨</span>
            </p>
            <p className="text-sm sm:text-base text-fresh font-semibold mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              💰 Экономьте до 20% на наших услугах!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Weekly Deal - Mattress 10% */}
            <CircularRevealCard index={0} slow className="h-full">
              <div 
                className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/25 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
                
                {/* Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-glow animate-pulse">
                    🛏️ Матрас
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
                    {t.promotions.weeklyTitle}
                  </h3>
                  <p className="text-foreground text-center text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                    2+ услуг: 10%
                  </p>
                  <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                    {t.promotions.weeklyDesc}
                  </p>
                </div>
              </div>
            </CircularRevealCard>

            {/* Monthly Deal - 4+ услуг: 15% */}
            <CircularRevealCard index={1} slow className="h-full">
              <div 
                className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/25 to-transparent rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-xl translate-y-1/2 translate-x-1/2" />
                
                {/* Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-cyan-500 text-white shadow-glow animate-pulse">
                    4+ услуг
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
                    4+ услуг: 15%
                  </h3>
                </div>
              </div>
            </CircularRevealCard>

            {/* VIP Deal - 6+ услуг: 20% */}
            <CircularRevealCard index={2} slow className="sm:col-span-2 lg:col-span-1 h-full">
              <div 
                className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {/* Decorative background */}
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-orange-600/20 to-teal-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                
                {/* Badge */}
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
                    6+ услуг (VIP): 20%
                  </h3>
                  <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                    {t.promotions.loyaltyDesc}
                  </p>
                  <p className="text-orange-600 text-center text-2xl sm:text-3xl font-bold mt-2">
                    -20%
                  </p>
                </div>
              </div>
            </CircularRevealCard>
          </div>

          {/* Impregnation Banner */}
          <div className="mt-8 sm:mt-12">
            <CircularRevealCard index={3} slow>
              <Link to="/impregnation">
                <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-card to-fresh/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation border border-primary/25 hover:border-primary/50 hover:scale-[1.02] cursor-pointer">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-fresh/15 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {/* Pulsing Icon */}
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow animate-pulse-slow group-hover:scale-110 transition-transform duration-500">
                        <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full animate-ping" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Text */}
                    <div className="text-center sm:text-left flex-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                        {t.impregnation.cardTitle}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {t.impregnation.subtitle}
                      </p>
                    </div>
                    
                    {/* CTA Button */}
                    <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow whitespace-nowrap">
                      {t.impregnation.cardSubtitle}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Link>
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
        <Drawer open={isCalcOpen} onOpenChange={(open) => {
          setIsCalcOpen(open);
          if (!open) setIsFullCalc(false);
        }}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <DrawerTitle className="font-serif text-lg">
                  {isFullCalc ? t.calculator.title : (t.calculator?.quickTitle || 'Быстрый расчёт')}
                </DrawerTitle>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 pb-8">
              {isFullCalc ? (
                <PriceCalculatorContent onClose={() => setIsCalcOpen(false)} />
              ) : (
                <QuickCalculator 
                  onOpenFull={() => setIsFullCalc(true)} 
                  onClose={() => setIsCalcOpen(false)} 
                />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isCalcOpen} onOpenChange={setIsCalcOpen}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
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