import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Phone, Mail, MapPin, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import fixlyBadge from '@/assets/fixly-top-executor-2025.webp';
import olawaPartnerBadge from '@/assets/partner-olawa-badge.jpg';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { t, language } = useLanguage();
  const googleMapsProfileUrl = 'https://www.google.com/maps/place/MasterClean+1885+Pranie+tapicerki+i+ozonowanie,+zlota+r%C4%85czka/@51.0984969,16.949163,17z/data=!3m1!4b1!4m6!3m5!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.0984969!4d16.949163!16s%2Fg%2F11xm28yrtl!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D';

  return (
    <footer ref={ref} role="contentinfo" className="bg-foreground text-background py-8 sm:py-12 pb-safe">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Droplets className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                {/* Accent dots */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-fresh/60 rounded-full" />
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-primary/50 rounded-full" />
              </div>
              <span className="font-serif text-xl font-semibold bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                MasterClean
              </span>
            </Link>
            <p className="text-background/80 text-sm leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex flex-col gap-2 mt-3">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-fresh transition-colors group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span>{language === 'ru' ? 'Блог чистоты' : language === 'pl' ? 'Blog czystości' : language === 'uk' ? 'Блог чистоти' : 'Cleanliness Blog'}</span>
              </Link>
              <Link to="/#promotions" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-fresh transition-colors group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span>{language === 'ru' ? 'Акции' : language === 'pl' ? 'Promocje' : language === 'uk' ? 'Акції' : 'Promotions'}</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Usługi">
            <p className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.nav.services}</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/handyman" className="text-background/80 hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.handyman}
                </Link>
              </li>
              <li>
                <Link to="/auto" className="text-background/80 hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.auto}
                </Link>
              </li>
              <li>
                <Link to="/ozone" className="text-background/80 hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.ozone}
                </Link>
              </li>
              <li>
                <Link to="/windows" className="text-background/80 hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.windows}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.services.furniture}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <p className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.nav.contacts}</p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href={googleMapsProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-background/80 hover:text-background transition-colors touch-manipulation py-1">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{t.contacts.addressValue}</span>
                </a>
              </li>
              <li>
                <a
                  href={googleMapsProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MasterClean 1885 Google Maps"
                  className="group block overflow-hidden rounded-lg border border-primary/30 bg-background/10 transition-all hover:border-primary/60 hover:bg-background/15"
                >
                  <div className="relative h-24 w-full overflow-hidden bg-muted/20">
                    <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(hsl(var(--background)/0.14)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--background)/0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-primary/25" />
                    <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-fresh/25" />
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-foreground/80 px-2 py-0.5 text-[10px] font-semibold text-background">MasterClean 1885</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+48575211401" onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.phoneClick('footer'))} className="flex items-center gap-2 text-sm text-background/80 hover:text-background transition-colors touch-manipulation py-1">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  {t.contacts.phoneValue}
                </a>
              </li>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-background/80 hover:text-background transition-colors touch-manipulation py-1">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  {t.contacts.emailValue}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <p className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.contacts.hours}</p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              {t.contacts.hoursValue}
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-muted-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-background/80 text-xs sm:text-sm text-center sm:text-left">
            <p>© {new Date().getFullYear()} MasterClean. {t.footer.rights}</p>
            <p className="mt-1">NIP: 8943280388</p>
          </div>

          {/* Fixly Top Wykonawca Badge */}
          <a href="https://fixly.pl" target="_blank" rel="noopener noreferrer" className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg animate-pulse hover:scale-105 transition-transform">
              <img src={fixlyBadge} alt="MasterClean — Top Wykonawca 2025 Fixly.pl" className="w-full h-full object-cover" />
            </div>
          </a>

          {/* Olawa City Cooperation Badge */}
          <Link to="/city/olawa" className="relative group" aria-label={
            language === 'pl' ? 'Współpraca z Administracją Miasta Oława' :
            language === 'ru' ? 'Сотрудничество с администрацией города Олава' :
            language === 'uk' ? 'Співпраця з адміністрацією міста Олава' :
            'Cooperation with the City Administration of Oława'
          }>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg ring-2 ring-primary/30 hover:scale-105 transition-transform bg-white">
              <img
                src={olawaPartnerBadge}
                alt={
                  language === 'pl' ? 'Współpraca z Administracją Miasta Oława' :
                  language === 'ru' ? 'Сотрудничество с администрацией города Олава' :
                  language === 'uk' ? 'Співпраця з адміністрацією міста Олава' :
                  'Cooperation with the City Administration of Oława'
                }
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Oferteo Best 2026 Badge */}
          {(() => {
            const oferteoLabel =
              language === 'ru' ? 'Oferteo — Лучшие 2026 — химчистка диванов'
              : language === 'uk' ? 'Oferteo — Найкращі 2026 — хімчистка диванів'
              : language === 'en' ? 'Oferteo — Best of 2026 — sofa cleaning'
              : 'Oferteo — Najlepsi 2026 — pranie kanap';
            return (
              <a
                href="https://www.oferteo.pl/pranie-kanap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={oferteoLabel}
                className="hover:scale-105 transition-transform shrink-0"
              >
                <img
                  src="https://www.oferteo.pl/images/buttons/badge-best-current-2026.png"
                  alt={oferteoLabel}
                  loading="lazy"
                  width={192}
                  height={70}
                  className="w-28 sm:w-40 md:w-48 h-auto drop-shadow-md"
                />
              </a>
            );
          })()}

          {/* Euro Quality Standard Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/30 bg-primary/5">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold text-fresh bg-foreground rounded px-0.5">EU</span>
            </div>
            <div className="text-[10px] sm:text-xs leading-tight">
              <p className="font-semibold text-background">Euro Standard</p>
              <p className="text-background/80">ISO 9001 · Certified Quality</p>
            </div>
          </div>

           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
             <Link to="/privacy-policy" className="text-background/80 hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
               {t.footer.privacy}
             </Link>
             <Link to="/terms" className="text-background/80 hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
               {t.footer.terms}
             </Link>
             <Link to="/cookies" className="text-background/80 hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
                {language === 'ru' ? 'Политика Cookie' : language === 'pl' ? 'Polityka Cookies' : language === 'uk' ? 'Політика Cookie' : 'Cookie Policy'}
              </Link>
              <Link to="/sitemap" className="text-background/80 hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
                Sitemap
              </Link>
          </div>
        </div>

        {/* Warranty Info */}
        <div className="mt-6 pt-6 border-t border-background/10">
          <p className="text-sm text-background/70 text-center font-medium">
            {language === 'ru'
              ? 'Гарантия на качество выполненных услуг — 7 дней'
              : language === 'uk'
              ? 'Гарантія на якість виконаних послуг — 7 днів'
              : language === 'en'
              ? '7-day quality guarantee on all services'
              : 'Gwarancja jakości wykonanych usług — 7 dni'}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-background/10">
          <p className="text-xs text-background/50 text-center italic max-w-3xl mx-auto">
            {language === 'ru'
              ? 'К сожалению, мы не можем гарантировать, что каждое отдельное пятно будет выведено, а также не гарантируем, что каждый неприятный запах исчезнет.'
              : language === 'uk'
              ? 'На жаль, ми не можемо гарантувати, що кожна окрема пляма зійде, а також не гарантуємо, що кожен неприємний запах зникне.'
              : language === 'en'
              ? 'Unfortunately, we cannot guarantee that every individual stain will be removed, nor do we guarantee that every unpleasant odor will disappear.'
              : 'Niestety nie możemy gwarantować, że każda poszczególna plama zejdzie, oraz nie gwarantujemy, że każdy nieprzyjemny zapach zniknie.'}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
