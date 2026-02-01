import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/i18n/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-14 sm:pt-16 lg:pt-20">
        {/* Marquee Section */}
        <section className="py-1.5 sm:py-2 mt-14 sm:mt-16 bg-gradient-to-r from-primary via-fresh to-primary overflow-hidden">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-4 sm:mx-8 text-primary-foreground font-medium text-sm sm:text-lg flex items-center gap-1.5 sm:gap-2">
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
    </div>
  );
};

export default Layout;
