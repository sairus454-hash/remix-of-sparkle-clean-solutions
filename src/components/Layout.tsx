import { ReactNode, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import CleaningBackground from './CleaningBackground';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
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

        {/* Google Reviews Badge — fixed bottom-right */}
        <a
          href="https://www.google.com/maps/place/MasterClean/@51.953761,19.1343692,6z"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-4 sm:right-6 z-40 flex items-center gap-2.5 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          aria-label="Google Reviews — 5.0 stars, 65 reviews"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm font-bold text-gray-800 ml-1">5.0</span>
            </div>
            <span className="text-xs text-gray-500 leading-tight">65 {language === 'pl' ? 'opinii' : language === 'uk' ? 'відгуків' : language === 'ru' ? 'отзывов' : 'reviews'} Google</span>
          </div>
        </a>
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
