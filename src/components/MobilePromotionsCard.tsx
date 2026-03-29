import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Sparkles, Star, Award, ChevronDown, ChevronUp } from 'lucide-react';

const MobilePromotionsCard = ({ className = '' }: { className?: string }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`sm:hidden py-6 bg-gradient-section ${className}`}>
      <div className="container mx-auto px-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="relative overflow-hidden p-4 rounded-2xl shadow-card bg-card/90 border border-border/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center shadow-glow flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-base font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent truncate">
                  🔥 {t.promotions.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{t.promotions.weeklyDesc}</p>
              </div>
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        </button>

        {expanded && (
          <div className="mt-3 space-y-3 animate-fade-up">
            {/* Weekly Deal */}
            <div className="relative overflow-hidden p-4 rounded-2xl bg-card/90 border border-border/50 shadow-card">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500/15 to-transparent rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif text-sm font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                      {t.promotions.weeklyTitle}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-orange-500 to-teal-500 text-white">
                      🪑 {t.promotions.mattressBadge}
                    </span>
                  </div>
                  <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                    {t.promotions.services2plus}
                  </p>
                  <p className="text-xs text-foreground/80 mt-1">{t.promotions.weeklyDesc}</p>
                </div>
              </div>
            </div>

            {/* 4+ Services */}
            <div className="relative overflow-hidden p-4 rounded-2xl bg-card/90 border border-border/50 shadow-card">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-xl -translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif text-sm font-bold bg-gradient-to-r from-orange-400 to-cyan-500 bg-clip-text text-transparent">
                      {t.promotions.services4plus}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-orange-400 to-cyan-500 text-white">
                      {t.promotions.services4plusBadge}
                    </span>
                  </div>
                  <p className="text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {t.promotions.springDryingPromo}
                  </p>
                </div>
              </div>
            </div>

            {/* VIP Deal */}
            <div className="relative overflow-hidden p-4 rounded-2xl bg-card/90 border border-border/50 shadow-card">
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-orange-600/15 to-teal-600/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif text-sm font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                      {t.promotions.services6plus}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-orange-600 to-teal-600 text-white">
                      VIP
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80">{t.promotions.loyaltyDesc}</p>
                  <p className="text-lg font-bold text-orange-600 mt-1">-15%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MobilePromotionsCard;
