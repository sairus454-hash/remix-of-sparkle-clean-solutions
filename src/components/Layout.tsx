import { ReactNode, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import CleaningBackground from './CleaningBackground';
import { useLanguage } from '@/i18n/LanguageContext';

// Lazy load ChatBot - it's heavy and not needed on initial render
const ChatBot = lazy(() => import('./ChatBot'));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <CleaningBackground />
      <Header />
      <main className="flex-1 pt-14 sm:pt-16 lg:pt-20">
        {/* Marquee Section */}
        <section className="py-2 sm:py-2.5 mt-14 sm:mt-16 overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, hsl(195 85% 42%) 0%, hsl(170 65% 45%) 25%, hsl(45 70% 55% / 0.5) 50%, hsl(170 65% 45%) 75%, hsl(195 85% 42%) 100%)' }}>
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-4 sm:mx-8 text-primary-foreground font-medium text-xs sm:text-sm md:text-lg flex items-center gap-1.5 sm:gap-2">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground/80 rounded-full animate-pulse" />
                  {t.hero.marquee}
                </span>
              ))}
            </div>
          </div>
        </section>
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Layout;
