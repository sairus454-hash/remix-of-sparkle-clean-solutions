import { useLanguage } from '@/i18n/LanguageContext';
import CircularRevealCard from '@/components/CircularRevealCard';
import { Sparkles, Star, Award } from 'lucide-react';

const PromotionsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="promotions" className="py-12 sm:py-20 bg-gradient-section content-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 flex items-center justify-center shadow-glow animate-pulse">
                <span className="text-3xl sm:text-4xl" style={{ animation: 'float 2s ease-in-out infinite' }}>🎁</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-orange-500 opacity-60" />
            </div>
          </div>
          <div className="inline-block px-6 sm:px-10 py-4 sm:py-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 animate-fade-up bg-card/90 border border-border/50 shadow-card">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 2s linear infinite' }}>
                🔥 {t.promotions.title} 🔥
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="font-medium text-foreground/80">✨ {t.promotions.subtitle} ✨</span>
          </p>
          <p className="text-sm sm:text-base text-fresh font-semibold mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            💰 {t.promotions.saveUpTo}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* 2+ Services */}
          <CircularRevealCard index={0} slow className="h-full">
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02] bg-card/90 border border-border/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/25 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-glow animate-pulse">
                  {t.promotions.services2plusBadge}
                </span>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                  {t.promotions.services2plus}
                </h3>
                <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                  <p className="text-foreground text-center text-sm sm:text-base font-semibold leading-relaxed bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent animate-pulse">
                    {t.promotions.springDryingPromo}
                  </p>
                  <p className="text-foreground text-center text-xs sm:text-sm font-bold leading-relaxed bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                    🎉 {t.promotions.dryingFreeSpring}
                  </p>
                </div>
              </div>
            </div>
          </CircularRevealCard>

          {/* 4+ Services */}
          <CircularRevealCard index={1} slow className="h-full">
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02] bg-card/90 border border-border/50">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/25 to-transparent rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-xl translate-y-1/2 translate-x-1/2" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-cyan-500 text-white shadow-glow animate-pulse">
                  {t.promotions.services4plusBadge}
                </span>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-400 to-cyan-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 to-cyan-500 bg-clip-text text-transparent">
                  {t.promotions.services4plus}
                </h3>
              </div>
            </div>
          </CircularRevealCard>

          {/* VIP Deal */}
          <CircularRevealCard index={2} slow className="sm:col-span-2 lg:col-span-1 h-full">
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-card group hover:shadow-glow transition-all duration-500 touch-manipulation h-full hover:scale-[1.02] bg-card/90 border border-border/50">
              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-orange-600/20 to-teal-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-600 to-teal-600 text-white shadow-glow animate-pulse">
                  VIP
                </span>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-orange-600 to-teal-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                  {t.promotions.services6plus}
                </h3>
                <p className="text-foreground text-center text-base sm:text-lg leading-relaxed font-medium">
                  {t.promotions.loyaltyDesc}
                </p>
                <p className="text-orange-600 text-center text-2xl sm:text-3xl font-bold mt-2">
                  -15%
                </p>
              </div>
            </div>
          </CircularRevealCard>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
