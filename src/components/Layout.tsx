import { ReactNode, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import CleaningBackground from './CleaningBackground';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import promoBannerGirl from '@/assets/promo-banner-girl.png';

// Lazy load non-critical components — not needed for initial paint
const ChatBot = lazy(() => import('./ChatBot'));
const FloatingOrderSummary = lazy(() => import('./FloatingOrderSummary'));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <a href="#main-content" className="skip-to-content">
        Przejdź do treści
      </a>
      <CleaningBackground />
      <Header />
      <main id="main-content" role="main" className="flex-1 pt-14 sm:pt-16 lg:pt-20 relative z-10">
        {/* Marquee Section */}
        <section aria-label="Informacja promocyjna" className="py-2 sm:py-2.5 mt-14 sm:mt-16 overflow-hidden shadow-sm bg-primary">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-4 sm:mx-8 text-primary-foreground font-medium text-xs sm:text-sm md:text-lg flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground/60 rounded-full" />
                  {t.hero.marquee}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner — Free Drying (all pages) */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 py-5 sm:py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 relative z-10">
            <img
              src={promoBannerGirl}
              alt="Promocja — darmowe suszenie"
              loading="eager"
              width={260}
              height={260}
              className="w-44 h-44 sm:w-64 sm:h-64 md:w-[310px] md:h-[310px] object-contain flex-shrink-0 drop-shadow-xl"
            />
            <div className="text-center sm:text-left flex-1">
              <p className="text-primary-foreground/80 text-base sm:text-lg font-semibold uppercase tracking-wider mb-1.5">
                {t.hero.bannerTag}
              </p>
              <h2 className="text-primary-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                {t.hero.bannerTitle.split('\n')[0]}
                <br />
                {t.hero.bannerTitle.split('\n')[1]} <span className="text-yellow-300">{t.hero.bannerFree}</span>
              </h2>
              <p className="text-primary-foreground/70 text-sm sm:text-base mt-2.5">
                {t.hero.bannerSub}
              </p>
            </div>
            <Link to="/services" className="flex-shrink-0">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg sm:text-xl px-8 py-4 sm:py-5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95">
                {t.hero.bannerCta}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {children}

      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingOrderSummary />
      </Suspense>
    </div>
  );
};

export default Layout;
