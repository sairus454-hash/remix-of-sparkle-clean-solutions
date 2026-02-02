import { Link } from 'react-router-dom';
import { Droplets, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-8 sm:py-12 pb-safe">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Droplets className="w-6 h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                {/* Живые капли */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-fresh/80 rounded-full animate-ping" />
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
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
                <Link to="/services" className="text-muted-foreground hover:text-background text-sm transition-colors touch-manipulation inline-block py-1">
                  {t.services.clothing}
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
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} MasterClean. {t.footer.rights}
          </p>
          <Link to="#" className="text-muted-foreground hover:text-background text-xs sm:text-sm transition-colors touch-manipulation py-1">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
