import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';
import WaterDropSplash from '@/components/WaterDropSplash';
import { Button } from '@/components/ui/button';
import { Sofa, Sparkles, ArrowRight, CheckCircle2, Star, Users, Award, Armchair, Car, LayoutGrid, Droplets } from 'lucide-react';
import heroImage from '@/assets/masterclean-logo-hero.jpg';
import mattressCleaningImage from '@/assets/mattress-cleaning.jpg';
const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);
  const {
    t
  } = useLanguage();
  const services = [{
    icon: Sofa,
    title: t.services.furniture,
    description: t.services.furnitureDesc
  }, {
    icon: Sparkles,
    title: t.services.carpets,
    description: t.services.carpetsDesc
  }, {
    icon: Armchair,
    title: t.services.leather,
    description: t.services.leatherDesc
  }, {
    icon: LayoutGrid,
    title: t.services.balcony,
    description: t.services.balconyDesc
  }];
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
      <section className="relative min-h-[90vh] flex items-center bg-gradient-section overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fresh/10 rounded-full blur-3xl animate-float" style={{
            animationDelay: '3s'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              {/* Exploding Water Drop Icon */}
              <div className="flex justify-start mb-6 animate-fade-up">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    <Droplets className="w-10 h-10 text-primary-foreground" style={{
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                  </div>
                  {/* Explosion effect - multiple pinging circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-fresh/60 rounded-full animate-ping" />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-primary/70 rounded-full animate-ping" style={{
                    animationDelay: '0.2s'
                  }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-fresh rounded-full animate-ping" style={{
                    animationDelay: '0.4s'
                  }} />
                  <div className="absolute top-0 left-0 w-3 h-3 bg-primary rounded-full animate-ping" style={{
                    animationDelay: '0.6s'
                  }} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-fresh/80 rounded-full animate-ping" style={{
                    animationDelay: '0.8s'
                  }} />
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{
                animationDelay: '0.1s'
              }}>
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{
                animationDelay: '0.2s'
              }}>
                <Link to="/contacts">
                  <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow text-lg px-8 py-6">
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-accent">
                    {t.hero.secondary}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-up group" style={{
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
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-fresh/20 rounded-2xl blur-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => <div key={index} className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-card shadow-card animate-fade-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                  <stat.icon className="w-7 h-7 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
              animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
            }}>
              Акции
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Специальные предложения для наших клиентов</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Акция недели */}
            <div className="bg-card p-6 rounded-2xl shadow-card animate-fade-up group hover:shadow-glow transition-all duration-300" style={{
              animationDelay: '0.1s'
            }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                <Sparkles className="w-7 h-7 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-fresh bg-clip-text text-transparent">
                Акция недели
              </h3>
              <p className="text-muted-foreground text-center text-3xl">
                Скоро здесь появится специальное предложение!
              </p>
            </div>

            {/* Акция месяца */}
            <div className="bg-card p-6 rounded-2xl shadow-card animate-fade-up group hover:shadow-glow transition-all duration-300" style={{
              animationDelay: '0.2s'
            }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite'
              }}>
                <Star className="w-7 h-7 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-fresh bg-clip-text text-transparent">
                Акция месяца
              </h3>
              <p className="text-muted-foreground text-center text-2xl">
                Скоро здесь появится специальное предложение!
              </p>
            </div>

            {/* Акция до конца года */}
            <div className="bg-card p-6 rounded-2xl shadow-card animate-fade-up group hover:shadow-glow transition-all duration-300" style={{
              animationDelay: '0.3s'
            }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                <Award className="w-7 h-7 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-fresh bg-clip-text text-transparent">
                Акция до конца года
              </h3>
              <p className="text-muted-foreground text-center text-2xl">
                Скоро здесь появится специальное предложение!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 animate-[float_3s_ease-in-out_infinite] bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.about.title}
              </h2>
              <p className="text-muted-foreground mb-8">{t.about.description}</p>
              
              <ul className="space-y-4">
                {[t.equipment.modern, t.equipment.eco, t.equipment.quality].map((item, index) => <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-fresh" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                    <span className="text-foreground">{item}</span>
                  </li>)}
              </ul>
              
              <Link to="/about" className="inline-block mt-8">
                <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow">
                  {t.hero.secondary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="aspect-square rounded-2xl bg-gradient-hero p-1 shadow-glow overflow-hidden" style={{
                animation: 'float 5s ease-in-out infinite'
              }}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img src={heroImage} alt="MasterClean" className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110" style={{
                    animation: 'slowZoom 25s ease-in-out infinite alternate'
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-fresh/20 via-transparent to-primary/20 rounded-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-fresh/20 rounded-2xl blur-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                {t.form.title}
              </h2>
              <p className="text-muted-foreground">{t.contacts.subtitle}</p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
    </>;
};
export default Index;