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
        <section aria-label="Informacja promocyjna" className="py-2 sm:py-2.5 mt-14 sm:mt-16 overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, hsl(195 85% 42%) 0%, hsl(170 65% 45%) 25%, hsl(45 70% 55% / 0.5) 50%, hsl(170 65% 45%) 75%, hsl(195 85% 42%) 100%)' }}>
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-4 sm:mx-8 text-primary-foreground font-medium text-xs sm:text-sm md:text-lg flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground/80 rounded-full" />
                  {t.hero.marquee}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner — Free Drying (all pages) */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="container mx-auto px-4 py-5 sm:py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 relative z-10">
            <img
              src={promoBannerGirl}
              alt="Promocja — darmowe suszenie"
              loading="eager"
              width={260}
              height={260}
              className="w-44 h-44 sm:w-64 sm:h-64 md:w-[310px] md:h-[310px] object-contain flex-shrink-0 drop-shadow-2xl animate-bounce-slow"
            />
            <div className="text-center sm:text-left flex-1">
              <p className="text-white/90 text-base sm:text-lg font-semibold uppercase tracking-wider mb-1.5 drop-shadow">
                ⚡ Takiego jeszcze nie było!
              </p>
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                🎉 Suszenie mebli i materacy
                <br />
                do końca wiosny — <span className="text-yellow-300 animate-pulse">BEZPŁATNIE!!!</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-2.5 drop-shadow">
                Skorzystaj z promocji • MasterClean Wrocław
              </p>
            </div>
            <Link to="/contacts" className="flex-shrink-0">
              <Button className="bg-white text-blue-700 hover:bg-yellow-300 hover:text-blue-800 font-bold text-lg sm:text-xl px-8 py-4 sm:py-5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95">
                {language === 'ru' ? 'Заказать' : language === 'pl' ? 'Zamów teraz' : language === 'uk' ? 'Замовити' : 'Order now'}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-2 left-[10%] w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping opacity-75" />
          <div className="absolute bottom-3 right-[15%] w-3.5 h-3.5 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-4 right-[30%] w-2.5 h-2.5 bg-yellow-200 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }} />
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
