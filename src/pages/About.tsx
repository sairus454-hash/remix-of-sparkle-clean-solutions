import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import CleanSplash from '@/components/CleanSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import { CheckCircle2, Award, Users, Clock, Shield, ThumbsUp, Sparkles } from 'lucide-react';
import mattressBeforeAfter from '@/assets/mattress-before-after.jpg';
import sofaBeforeAfter from '@/assets/sofa-before-after.jpg';
import strollerBeforeAfter from '@/assets/stroller-before-after.jpg';


// TikTok icon component
const TikTokIcon = ({
  className
}: {
  className?: string;
}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>;
const About = () => {
  const {
    t
  } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('about');
  const values = [{
    icon: Award,
    title: t.equipment.quality,
    description: t.equipment.qualityDesc
  }, {
    icon: Shield,
    title: t.equipment.eco,
    description: t.equipment.ecoDesc
  }, {
    icon: Clock,
    title: t.equipment.modern,
    description: t.equipment.modernDesc
  }];
  return <>
      <SEO
        title="О компании MasterClean — Опыт и качество"
        description="Узнайте о команде MasterClean. Профессиональная химчистка мебели и ковров в Польше. Современное оборудование, экологичные средства, опытные специалисты."
        keywords="о нас, MasterClean, команда химчистки, профессиональная химчистка, Польша"
        canonical="/about"
        image="https://masterclean1885.pl/og-about.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: 'MasterClean',
            description: 'Профессиональная клининговая компания в Польше. Современное оборудование, экологичные средства.',
            telephone: '+48575211401',
            areaServed: ['Opole', 'Wrocław', 'Poznań', 'Zielona Góra'],
            foundingDate: '2022',
          },
        }}
      />
      {showSplash && <CleanSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Live Sparkles Icon */}
              <div className="flex justify-center mb-6 animate-fade-up">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                  animation: 'float 3s ease-in-out infinite'
                }}>
                    <Sparkles className="w-10 h-10 text-primary-foreground" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-fresh rounded-full opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full opacity-60" />
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{
              animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
            }}>
                {t.about.title}
              </h1>
              <p className="text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-fade-up" style={{ animationDelay: '0.1s', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {t.about.subtitle}
              </p>
              
              {/* Social Media Links */}
              <div className="mt-8">
                <p className="text-muted-foreground mb-4">{t.about.socialMedia}:</p>
                <div className="flex justify-center flex-wrap gap-4">
                  <CircularRevealCard index={0}>
                    <a href="https://www.tiktok.com/@oleksii764" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <TikTokIcon className="w-5 h-5" />
                      <span className="font-medium">TikTok</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={1}>
                    <a href="https://youtube.com/@alexlokteks2072?si=SNXrRysVMvjc971H" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="font-medium">YouTube</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={2}>
                    <a href="https://www.instagram.com/masterclean1885?igsh=MTN2amx2cmRka2hwMg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="font-medium">Instagram</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={3}>
                    <a href="https://www.facebook.com/profile.php?id=100057002733751" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="font-medium">Facebook</span>
                    </a>
                  </CircularRevealCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
              }}>
                  MasterClean
                </h2>
                <p className="text-xl md:text-2xl text-foreground mb-4 leading-relaxed font-medium">
                  {t.about.description}
                </p>
                <p className="mb-6 leading-relaxed font-medium text-2xl font-mono text-primary">
                  {t.about.regions}
                </p>
                <ul className="space-y-4">
                  {[t.equipment.modern, t.equipment.eco, t.equipment.quality].map((item, index) => <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-fresh flex-shrink-0" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                      <span className="text-foreground">{item}</span>
                    </li>)}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <CircularRevealCard index={0}>
                  <div className="bg-gradient-hero rounded-2xl p-8 text-center shadow-glow h-full">
                    <Users className="w-12 h-12 text-primary-foreground mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite'
                  }} />
                    <p className="font-serif text-4xl font-bold text-primary-foreground mb-2">1000+</p>
                    <p className="text-primary-foreground/80 text-sm">{t.about.clients}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={1}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card h-full">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '0.5s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-foreground mb-2">3+</p>
                    <p className="text-muted-foreground text-sm">{t.about.experience}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={2}>
                  <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card h-full">
                    <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '1s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-foreground mb-2">100%</p>
                    <p className="text-muted-foreground text-sm">{t.about.quality}</p>
                  </div>
                </CircularRevealCard>
                <CircularRevealCard index={3}>
                  <div className="bg-fresh rounded-2xl p-8 text-center shadow-glow h-full">
                    <Shield className="w-12 h-12 text-fresh-foreground mx-auto mb-4" style={{
                    animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
                    animationDelay: '1.5s'
                  }} />
                    <p className="font-serif text-4xl font-bold text-fresh-foreground mb-2">ECO</p>
                    <p className="text-fresh-foreground/80 text-sm">{t.equipment.eco}</p>
                  </div>
                </CircularRevealCard>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-10 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
              animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
            }}>
                {t.about.beforeAfter || 'До и После'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sofa Before/After */}
                <CircularRevealCard index={0}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card group">
                    <img src={sofaBeforeAfter} alt="Before and after sofa cleaning" loading="lazy" decoding="async" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 via-transparent to-fresh/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 flex">
                      <div className="flex-1 bg-destructive/80 text-destructive-foreground py-2 text-center font-semibold text-sm">
                        {t.about.before || 'До'}
                      </div>
                      <div className="flex-1 bg-fresh/80 text-fresh-foreground py-2 text-center font-semibold text-sm">
                        {t.about.after || 'После'}
                      </div>
                    </div>
                  </div>
                </CircularRevealCard>
                
                {/* Stroller Before/After */}
                <CircularRevealCard index={1}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card group">
                    <img src={strollerBeforeAfter} alt="Before and after stroller cleaning" loading="lazy" decoding="async" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 via-transparent to-fresh/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 flex">
                      <div className="flex-1 bg-destructive/80 text-destructive-foreground py-2 text-center font-semibold text-sm">
                        {t.about.before || 'До'}
                      </div>
                      <div className="flex-1 bg-fresh/80 text-fresh-foreground py-2 text-center font-semibold text-sm">
                        {t.about.after || 'После'}
                      </div>
                    </div>
                  </div>
                </CircularRevealCard>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <CircularRevealCard key={index} index={index}>
                  <div className="bg-card p-8 rounded-2xl shadow-card text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow" style={{
                  animation: 'float 3s ease-in-out infinite'
                }}>
                      <value.icon className="w-8 h-8 text-primary-foreground" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>;
};
export default About;