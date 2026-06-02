import { ReactNode, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import CleaningBackground from './CleaningBackground';
import { useLanguage } from '@/i18n/LanguageContext';

// Lazy load non-critical components — not needed for initial paint
const ChatBot = lazy(() => import('./ChatBot'));
const FloatingOrderSummary = lazy(() => import('./FloatingOrderSummary'));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

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
