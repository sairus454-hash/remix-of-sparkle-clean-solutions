import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useLanguage();

  return (
    <footer ref={ref} className="bg-foreground text-background py-8 sm:py-12 pb-safe">
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
            <p className="text-muted-foreground text-sm leading-relaxed">{t.hero.subtitle}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.nav.services}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/handyman" className="text-muted-foreground hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.handyman}
                </Link>
              </li>
              <li>
                <Link to="/auto" className="text-muted-foreground hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.auto}
                </Link>
              </li>
              <li>
                <Link to="/ozone" className="text-muted-foreground hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.nav.ozone}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.nav.contacts}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{t.contacts.addressValue}</span>
              </li>
              <li>
                <a href="tel:+48575211401" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-background transition-colors touch-manipulation py-1">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  {t.contacts.phoneValue}
                </a>
              </li>
              <li>
                <a href="mailto:masterclean@email.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-background transition-colors touch-manipulation py-1">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  {t.contacts.emailValue}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.contacts.hours}</h4>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              {t.contacts.hoursValue}
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-muted-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
            <p>© {new Date().getFullYear()} MasterClean. {t.footer.rights}</p>
            <p className="mt-1">NIP: 8943280388</p>
          </div>

          {/* Euro Quality Standard Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/30 bg-primary/5">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold text-fresh bg-foreground rounded px-0.5">EU</span>
            </div>
            <div className="text-[10px] sm:text-xs leading-tight">
              <p className="font-semibold text-background">Euro Standard</p>
              <p className="text-muted-foreground">ISO 9001 · Certified Quality</p>
            </div>
          </div>

          <Link to="#" className="text-muted-foreground hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
