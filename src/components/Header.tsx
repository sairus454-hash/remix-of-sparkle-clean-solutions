import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Phone, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const languages: { code: Language; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'uk', label: 'UA' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/prices', label: t.nav.prices },
    { path: '/equipment', label: t.nav.equipment },
    { path: '/auto', label: t.nav.auto },
    { path: '/ozone', label: t.nav.ozone },
     { path: '/windows', label: t.nav.windows },
    { path: '/handyman', label: t.nav.handyman },
    { path: '/reviews', label: t.nav.reviews },
    { path: '/contacts', label: t.nav.contacts },
  ];

  const currentLang = languages.find(l => l.code === language);

  const isMobile = useIsMobile();

  // Header reveal animation state
  const [headerRevealed, setHeaderRevealed] = useState(false);
  
  useEffect(() => {
    // Trigger header animation on mount
    const timer = setTimeout(() => {
      setHeaderRevealed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate circular trajectory for header elements
  const getHeaderItemStyle = (index: number, isRevealed: boolean) => {
    const angle = (index * 45) % 360;
    const radius = isMobile ? 20 : 40;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed 
        ? 'translateX(0) translateY(0) scale(1)' 
        : `translateX(${x}px) translateY(${y}px) scale(${isMobile ? 0.9 : 0.85})`,
      transitionDuration: isMobile ? '600ms' : '800ms',
      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      transitionProperty: 'opacity, transform',
      transitionDelay: `${index * 80}ms`,
    };
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Left Section: Mobile Menu Button + Logo */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button - Larger with green accent */}
            <div style={getHeaderItemStyle(0, headerRevealed)}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-11 h-11 sm:w-10 sm:h-10 bg-fresh/20 hover:bg-fresh/30 border border-fresh/40 rounded-xl touch-manipulation active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-fresh" />
                ) : (
                  <Menu className="w-6 h-6 text-fresh" />
                )}
              </Button>
            </div>

            {/* Logo */}
            <div style={getHeaderItemStyle(1, headerRevealed)}>
              <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  </div>
                  {/* Живые капли вокруг логотипа */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-fresh/80 rounded-full animate-ping" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-primary/70 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 -right-1.5 w-1 h-1 bg-fresh rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                <span className="font-serif text-lg sm:text-xl font-semibold hidden sm:block bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  MasterClean
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <div key={item.path} style={getHeaderItemStyle(index + 2, headerRevealed)}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 24/7 Badge - Now visible on all screens */}
            <div style={getHeaderItemStyle(12, headerRevealed)}>
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gradient-hero px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-full shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="relative">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-fresh rounded-full animate-ping absolute" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-fresh rounded-full" />
                </div>
                <span className="text-primary-foreground font-bold text-[10px] sm:text-xs md:text-sm">24/7</span>
              </div>
            </div>

            {/* Language Switcher - Dropdown on mobile, inline on desktop */}
            {/* Mobile Language Dropdown */}
            <div style={getHeaderItemStyle(13, headerRevealed)}>
              <div className="lg:hidden relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 bg-muted rounded-lg text-sm font-medium touch-manipulation active:scale-95 min-w-[52px] justify-center"
                >
                  <Globe className="w-4 h-4 text-fresh" />
                  <span className="text-foreground">{currentLang?.label}</span>
                  <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[80px] animate-fade-up z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors ${
                          language === lang.code
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Language Switcher - inline buttons */}
            <div style={getHeaderItemStyle(13, headerRevealed)}>
              <div className="hidden lg:flex items-center bg-muted rounded-lg p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-colors min-w-[32px] ${
                      language === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone - Simplified on mobile, lowered position */}
            <div style={getHeaderItemStyle(14, headerRevealed)} className="mt-1 sm:mt-2">
              <a 
                href="tel:+48575211401" 
                className="flex items-center gap-1 sm:gap-2 text-primary font-bold text-sm sm:text-base hover:text-fresh transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">+48 575 211 401</span>
              </a>
            </div>

            {/* Messenger Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div style={getHeaderItemStyle(15, headerRevealed)}>
                <a 
                  href="https://t.me/+48575211401" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
              <div style={getHeaderItemStyle(16, headerRevealed)}>
                <a 
                  href="https://wa.me/48575211401" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
