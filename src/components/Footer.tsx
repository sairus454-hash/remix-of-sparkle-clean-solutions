import { Link } from 'react-router-dom';
import { Droplets, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">MasterClean</span>
            </Link>
            <p className="text-muted-foreground text-sm">{t.hero.subtitle}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">{t.nav.services}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  {t.services.clothing}
                </Link>
              </li>
              <li>
                <Link to="/auto" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  {t.nav.auto}
                </Link>
              </li>
              <li>
                <Link to="/ozone" className="text-muted-foreground hover:text-background text-sm transition-colors">
                  {t.nav.ozone}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">{t.nav.contacts}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {t.contacts.addressValue}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                {t.contacts.phoneValue}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                {t.contacts.emailValue}
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">{t.contacts.hours}</h4>
            <p className="font-serif text-3xl font-bold text-primary">
              {t.contacts.hoursValue}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} MasterClean. {t.footer.rights}
          </p>
          <Link to="#" className="text-muted-foreground hover:text-background text-sm transition-colors">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
