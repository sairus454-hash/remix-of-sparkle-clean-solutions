 import { useState, useRef } from 'react';
import SEO from '@/components/SEO';
 import { useLanguage } from '@/i18n/LanguageContext';
 import Layout from '@/components/Layout';
 import ContactForm, { ContactFormRef } from '@/components/ContactForm';
 import WindowsPriceCalculator from '@/components/WindowsPriceCalculator';
 import AnimatedImage from '@/components/AnimatedImage';
 import CircularRevealCard from '@/components/CircularRevealCard';
 import { Sparkles, CheckCircle2, Home, Sun, Eye, ShieldCheck } from 'lucide-react';
 import windowCleaning1 from '@/assets/window-cleaning-1.jpg';
 import windowCleaning2 from '@/assets/window-cleaning-2.jpg';
 import windowCleaning3 from '@/assets/window-cleaning-3.jpg';
 import { CalculatorItem } from '@/types/calculator';
 
 const Windows = () => {
   const { t } = useLanguage();
   const formRef = useRef<ContactFormRef>(null);
   const formSectionRef = useRef<HTMLDivElement>(null);
 
   const handleSendToForm = (items: CalculatorItem[], total: number) => {
     formRef.current?.setCalculatorData(items, total);
     formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   };
 
   const benefits = [
     { icon: Sun, text: t.windows?.benefit1 || 'Больше света в доме' },
     { icon: Eye, text: t.windows?.benefit2 || 'Чистый и ухоженный вид' },
     { icon: ShieldCheck, text: t.windows?.benefit3 || 'Продление срока службы окон' },
     { icon: Home, text: t.windows?.benefit4 || 'Комфортная атмосфера' },
   ];
 
   const galleryImages = [
     { src: windowCleaning1, alt: t.windows?.gallery1 || 'Мойка окон' },
     { src: windowCleaning2, alt: t.windows?.gallery2 || 'До и после мойки' },
     { src: windowCleaning3, alt: t.windows?.gallery3 || 'Профессиональная мойка' },
   ];
 
   return (
     <>
      <SEO
        title="Мойка окон — Профессиональная чистка окон"
        description="Профессиональная мойка окон любой сложности. Чистые окна — больше света и комфорта в вашем доме. Быстро, качественно, доступно."
        keywords="мойка окон, чистка окон, мытьё окон, профессиональная мойка, Польша"
        canonical="/windows"
        image="https://masterclean1885.pl/og-windows.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Мойка окон',
          provider: { '@type': 'LocalBusiness', name: 'MasterClean', telephone: '+48575211401' },
          areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
          offers: [
            { '@type': 'Offer', name: 'Одностворчатое окно', price: '40', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Двухстворчатое окно', price: '50', priceCurrency: 'PLN' },
            { '@type': 'Offer', name: 'Трёхстворчатое окно', price: '80', priceCurrency: 'PLN' },
          ],
        }}
      />
     <Layout>
       {/* Hero */}
        <section className="py-20 bg-gradient-section relative overflow-hidden">
          {/* Floating water drop decorations */}
          <div className="absolute top-16 left-8 opacity-10 pointer-events-none hidden lg:block">
            <Sparkles className="w-14 h-14 text-primary" style={{ animation: 'float 5s ease-in-out infinite' }} />
          </div>
          <div className="absolute top-32 right-12 opacity-10 pointer-events-none hidden lg:block">
            <Sun className="w-10 h-10 text-fresh" style={{ animation: 'float 4s ease-in-out infinite, pulse 2s ease-in-out infinite' }} />
          </div>
          <div className="absolute bottom-10 left-20 opacity-10 pointer-events-none hidden lg:block">
            <Eye className="w-12 h-12 text-primary" style={{ animation: 'float 6s ease-in-out infinite' }} />
          </div>
          <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center">
             {/* Animated window icon */}
             <div className="flex justify-center mb-6">
               <div className="relative">
                 <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                   <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                 </div>
                 <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                 <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary opacity-60" />
               </div>
             </div>
             
             <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
               {t.windows?.title || 'Мойка окон'}
             </h1>
             <p className="text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fade-up" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
               {t.windows?.subtitle || 'Профессиональная мойка окон для дома и офиса'}
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
 
       {/* Why Clean Windows */}
       <section className="py-20 bg-gradient-section">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <CircularRevealCard index={0}>
               <div>
                 <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                   <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                 </div>
                 <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                   {t.windows?.why || 'Зачем мыть окна?'}
                 </h2>
                 <p className="text-muted-foreground leading-relaxed">
                   {t.windows?.whyDesc || 'Чистые окна пропускают больше света, создают приятную атмосферу и продлевают срок службы стеклопакетов. Профессиональная мойка удаляет въевшуюся грязь, пыль и разводы, которые сложно убрать самостоятельно.'}
                 </p>
               </div>
             </CircularRevealCard>
             
             <CircularRevealCard index={1}>
               <div className="bg-card p-8 rounded-2xl border border-border shadow-card h-full">
                 <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                   {t.windows?.benefitsTitle || 'Преимущества чистых окон'}
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
 
       {/* How We Work */}
       <section className="py-20 bg-card">
         <div className="container mx-auto px-4">
           <h2 className="font-serif text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
             {t.windows?.howTitle || 'Как мы работаем'}
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
             {[
               { step: '1', title: t.windows?.step1 || 'Оценка', desc: t.windows?.step1Desc || 'Осматриваем окна и определяем объём работ' },
               { step: '2', title: t.windows?.step2 || 'Мойка', desc: t.windows?.step2Desc || 'Используем профессиональные средства и инструменты' },
               { step: '3', title: t.windows?.step3 || 'Результат', desc: t.windows?.step3Desc || 'Идеально чистые окна без разводов' },
             ].map((item, index) => (
               <CircularRevealCard key={index} index={index}>
                 <div className="group p-6 rounded-2xl bg-gradient-card border border-border text-center hover:shadow-card-hover transition-all duration-300 h-full">
                   <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                     <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                   </div>
                   <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                   <p className="text-sm text-muted-foreground">{item.desc}</p>
                 </div>
               </CircularRevealCard>
             ))}
           </div>
         </div>
       </section>
 
       {/* Pricing */}
       <section className="py-20 bg-gradient-section">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <CircularRevealCard index={0}>
               <WindowsPriceCalculator onSendToForm={handleSendToForm} />
             </CircularRevealCard>
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
     </>
   );
 };
 
 export default Windows;