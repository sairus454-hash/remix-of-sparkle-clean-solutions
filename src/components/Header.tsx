import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Phone, Globe, ChevronDown, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [showPhone, setShowPhone] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (phoneRef.current && !phoneRef.current.contains(event.target as Node)) {
        setShowPhone(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services, highlight: 'services' as const },
    { path: '/prices', label: t.nav.prices },
    { path: '/equipment', label: t.nav.equipment },
    { path: '/cleaning', label: t.nav.cleaning, highlight: 'cleaning' as const },
    { path: '/ozone', label: t.nav.ozone, highlight: 'ozone' as const },
    { path: '/auto', label: t.nav.auto, highlight: 'auto' as const },
    { path: '/handyman', label: t.nav.handyman, highlight: 'handyman' as const },
    { path: '/reviews', label: t.nav.reviews },
    { path: '/blog', label: t.nav.blog, highlight: 'blog' as const },
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
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-card' : 'bg-card/70 backdrop-blur-sm'
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
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-fresh/60 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-primary/50 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />
                </motion.div>
                <span className="font-serif text-lg sm:text-xl font-semibold hidden sm:block bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                  MasterClean
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, index) => {
               const getHighlightClass = () => {
                 if (item.highlight === 'ozone') {
                   return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300';
                 }
                 if (item.highlight === 'cleaning') {
                   return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
                 }
                 if (item.highlight === 'services') {
                   return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
                 }
                 if (item.highlight === 'auto') {
                   return '';
                 }
                 if (item.highlight === 'handyman') {
                   return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
                 }
                 if (item.highlight === 'blog') {
                   return '';
                 }
                 return '';
               };
              
              return (
                <div key={item.path} style={getHeaderItemStyle(index + 2, headerRevealed)}>
                  <Link
                    to={item.path}
                    className={`px-2 py-1.5 rounded-md text-[14px] font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-primary bg-accent'
                        : item.highlight
                          ? getHighlightClass()
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                    title={item.highlight === 'ozone' ? item.label : undefined}
                  >
                    {item.path === '/' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    ) : item.highlight === 'ozone' ? (
                      <motion.span
                        className="relative font-extrabold text-lg leading-none tracking-tight inline-flex items-center"
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.span
                          className="absolute -inset-1.5 rounded-full bg-primary/15 blur-md"
                          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.span
                          className="absolute -inset-1 rounded-full border border-primary/20"
                          animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.2, 0.95] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span className="relative z-10">O₃</span>
                      </motion.span>
                    ) : item.path === '/reviews' ? (
                      <motion.span
                        className="relative inline-flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <span className="inline-flex items-center gap-0.5 relative">
                          <motion.span
                            className="absolute -inset-1 rounded-full bg-yellow-400/20 blur-sm"
                            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.15, 0.9] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="relative text-yellow-400 text-sm"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                            >
                              ★
                            </motion.span>
                          ))}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                      </motion.span>
                    ) : item.highlight === 'auto' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                        {item.label}
                      </span>
                    ) : item.highlight === 'blog' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                        {item.label}
                      </span>
                    ) : item.path === '/contacts' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {item.label}
                      </span>
                    ) : item.path === '/prices' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                        {item.label}
                      </span>
                    ) : item.path === '/about' ? (
                      <span className="inline-flex items-center gap-1 ml-1 whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        {item.label}
                      </span>
                    ) : item.highlight === 'services' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        {item.label}
                      </span>
                    ) : item.path === '/equipment' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        {item.label}
                      </span>
                    ) : item.highlight === 'cleaning' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                        {item.label}
                      </span>
                    ) : item.highlight === 'handyman' ? (
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        {item.label}
                      </span>
                    ) : (item as any).label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* 24/7 Badge - Now visible on all screens */}
            <div style={getHeaderItemStyle(12, headerRevealed)}>
              <motion.div
                className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gradient-hero px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-full shadow-glow"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.12 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-fresh rounded-full absolute"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-fresh rounded-full"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-primary-foreground font-bold text-[10px] sm:text-xs md:text-sm">24/7</span>
              </motion.div>
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
                    onClick={() => { setLanguage(lang.code); import('@/lib/gtm').then(m => m.gtmEvents.languageChange(lang.code)); }}
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

            {/* Phone */}
            <div ref={phoneRef} style={getHeaderItemStyle(14, headerRevealed)} className="flex items-center flex-shrink-0 relative">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-fresh/20 hover:bg-fresh/30 border border-fresh/40 text-fresh transition-colors touch-manipulation active:scale-95"
                aria-label="Show phone number"
              >
                <Phone className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>
              {showPhone && (
                <a
                  href="tel:+48575211401"
                  onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.phoneClick('header'))}
                  className="absolute top-full right-0 mt-2 px-4 py-2.5 bg-card border border-border rounded-xl shadow-lg text-primary font-bold text-sm whitespace-nowrap animate-fade-up z-50"
                >
                  +48 575 211 401
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-up">
            {/* Chat Button for Mobile */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                // Dispatch custom event to open chatbot
                window.dispatchEvent(new CustomEvent('openChatBot'));
              }}
              className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gradient-hero text-primary-foreground font-medium transition-colors active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.chatbot?.menuButton || 'Открыть чат'}</span>
            </button>
            
            {navItems.map((item) => {
              const getMobileHighlightClass = () => {
                if (item.highlight === 'cleaning') {
                  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
                }
                if (item.highlight === 'services') {
                  return '';
                }
                if (item.highlight === 'handyman') {
                  return '';
                }
                return '';
              };
              
              const mobileHighlight = getMobileHighlightClass();
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-accent'
                      : mobileHighlight
                        ? mobileHighlight
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.highlight === 'ozone' ? (
                    <span className="flex items-center gap-1.5">
                      <span className="font-bold text-base leading-none">O<sub className="text-[9px]">₃</sub></span>
                      <span>{item.label}</span>
                    </span>
                  ) : item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
