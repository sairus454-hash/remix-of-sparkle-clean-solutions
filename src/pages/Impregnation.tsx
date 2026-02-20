import { useState, useCallback } from 'react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CircularRevealCard from '@/components/CircularRevealCard';
import AnimatedImage from '@/components/AnimatedImage';
import { Shield, Droplets, Clock, Leaf, SprayCan, CheckCircle } from 'lucide-react';
import impregnationWaterBeading from '@/assets/impregnation-water-beading.jpg';
import impregnationCoffeeSpill from '@/assets/impregnation-coffee-spill.jpg';
import impregnationBeforeAfter from '@/assets/impregnation-before-after.jpg';

const Impregnation = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Droplets,
      title: t.impregnation.hydrophobic,
      description: t.impregnation.hydrophobicDesc,
    },
    {
      icon: Shield,
      title: t.impregnation.protection,
      description: t.impregnation.protectionDesc,
    },
    {
      icon: Clock,
      title: t.impregnation.lifespan,
      description: t.impregnation.lifespanDesc,
    },
    {
      icon: Leaf,
      title: t.impregnation.eco,
      description: t.impregnation.ecoDesc,
    },
  ];

  const examples = [
    {
      image: impregnationWaterBeading,
      title: t.impregnation.example1Title,
      description: t.impregnation.example1Desc,
    },
    {
      image: impregnationCoffeeSpill,
      title: t.impregnation.example2Title,
      description: t.impregnation.example2Desc,
    },
    {
      image: impregnationBeforeAfter,
      title: t.impregnation.example3Title,
      description: t.impregnation.example3Desc,
    },
  ];

  const steps = [
    {
      number: '01',
      title: t.impregnation.step1,
      description: t.impregnation.step1Desc,
    },
    {
      number: '02',
      title: t.impregnation.step2,
      description: t.impregnation.step2Desc,
    },
    {
      number: '03',
      title: t.impregnation.step3,
      description: t.impregnation.step3Desc,
    },
  ];

  return (
    <>
      <SEO
        title="Импрегнация мебели и тканей — Защита от загрязнений"
        description="Профессиональная импрегнация мебели, ковров и тканей. Защита от воды, грязи и пятен. Гидрофобное покрытие продлевает срок службы."
        keywords="импрегнация, защита мебели, гидрофобное покрытие, защита ткани, импрегнация ковров"
        canonical="/impregnation"
        image="https://masterclean1885.pl/og-impregnation.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Импрегнация мебели и тканей',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          offers: { '@type': 'Offer', name: 'Импрегнация (защита на 1 год)', price: '80', priceCurrency: 'PLN' },
        }}
      />
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated Icon */}
            <div className="flex justify-center mb-6 animate-fade-up">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Shield className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.impregnation.title}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.impregnation.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* What is Impregnation */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CircularRevealCard index={0}>
            <div className="max-w-4xl mx-auto bg-gradient-card p-8 md:p-12 rounded-2xl border border-border shadow-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <SprayCan className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">{t.impregnation.what}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t.impregnation.whatDesc}</p>
                </div>
              </div>
            </div>
          </CircularRevealCard>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.impregnation.benefitsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group p-8 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <benefit.icon className="w-8 h-8 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Composition Types */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CircularRevealCard index={0}>
            <div className="max-w-4xl mx-auto bg-gradient-card p-8 md:p-12 rounded-2xl border border-border shadow-card">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">{t.impregnation.compositionsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.impregnation.compositionsDesc}</p>
            </div>
          </CircularRevealCard>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.impregnation.howTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group p-8 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all duration-300 h-full text-center">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Gallery */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.impregnation.examplesTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.impregnation.examplesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {examples.map((example, index) => (
              <CircularRevealCard key={index} index={index}>
                <div className="group rounded-2xl bg-gradient-card border border-border overflow-hidden hover:shadow-card-hover transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <AnimatedImage
                      src={example.image}
                      alt={example.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      delay={index * 100}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{example.title}</h3>
                    <p className="text-muted-foreground text-sm">{example.description}</p>
                  </div>
                </div>
              </CircularRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Duration */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <CircularRevealCard index={0}>
            <div className="max-w-4xl mx-auto bg-gradient-card p-8 md:p-12 rounded-2xl border border-border shadow-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">{t.impregnation.durationTitle}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t.impregnation.durationDesc}</p>
                </div>
              </div>
            </div>
          </CircularRevealCard>
        </div>
      </section>

      {/* Note */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <CircularRevealCard index={0}>
            <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl border border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-fresh/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-fresh" />
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed">{t.impregnation.note}</p>
                </div>
              </div>
            </div>
          </CircularRevealCard>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default Impregnation;
