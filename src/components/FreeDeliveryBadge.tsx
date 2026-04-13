import { useState, useEffect } from 'react';
import { MapPin, Car, X, Phone, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/i18n/LanguageContext';

const FreeDeliveryBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const texts: Record<string, string> = {
    ru: 'Доезд до клиента — бесплатно!!!',
    uk: 'Виїзд до клієнта — безкоштовно!!!',
    pl: 'Dojazd do klienta — gratis!!!',
    en: 'Free travel to client!!!',
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: TouchEvent | MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-fab-menu]')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [mobileOpen]);

  if (isDismissed) return null;

  // Shared messenger/review icons
  const messengerIcons = (
    <>
      <a
        href="tel:+48575211401"
        onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.phoneClick('floating_badge'))}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-fresh to-secondary flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        aria-label="Zadzwoń"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
      <a 
        href="https://t.me/+48575211401" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        aria-label="Telegram"
      >
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </a>
      <a 
        href="https://wa.me/48575211401" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.whatsappClick('floating_badge'))}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <a 
        href={isMobile ? "mailto:sairus454@gmail.com" : "https://mail.google.com/mail/?view=cm&to=sairus454@gmail.com"} 
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EA4335] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        aria-label="Email"
      >
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        {!isMobile && (
          <span className="absolute right-full mr-2 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
            sairus454@gmail.com
          </span>
        )}
      </a>

      {/* Google Reviews Badge */}
      <a
        href="https://www.google.com/maps/place/MasterClean+pranie+tapicerki+i+ozonowanie/@51.0984969,16.949163,17z/data=!3m1!4b1!4m6!3m5!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.0984969!4d16.949163!16s%2Fg%2F11xm28yrtl!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center gap-0.5 sm:gap-1 bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg px-1 py-0.5 sm:px-2 sm:py-1.5 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
        aria-label="Google Reviews — 5.0 stars, 65 reviews"
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-[7px] sm:text-[10px] font-bold text-gray-800 ml-0.5">5.0</span>
          </div>
          <span className="text-[6px] sm:text-[9px] text-gray-500">65 {language === 'pl' ? 'opinii' : language === 'uk' ? 'відгуків' : language === 'ru' ? 'отзывов' : 'reviews'}</span>
        </div>
      </a>
    </>
  );

  return (
    <div className="fixed right-2 sm:right-4 top-[60px] sm:top-[68px] lg:top-[84px] z-40 flex flex-col items-center gap-2" data-fab-menu>
      {/* Desktop: original behavior */}
      {!isMobile && (
        <>
          <div className="relative">
            <div
              className={`
                absolute right-full mr-3 bg-gradient-to-r from-fresh to-secondary text-white 
                px-4 py-3 rounded-xl shadow-lg whitespace-nowrap
                transition-all duration-300 ease-out origin-right
                ${isExpanded ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4 pointer-events-none'}
              `}
            >
              <button
                onClick={() => setIsDismissed(true)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 animate-bounce" />
                <span className="font-semibold text-sm">{texts[language]}</span>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-secondary" />
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                relative group w-16 h-16 
                bg-gradient-to-br from-fresh via-secondary to-fresh
                rounded-full shadow-lg hover:shadow-xl
                flex items-center justify-center
                transition-all duration-300 ease-out
                hover:scale-110 active:scale-95
                animate-pulse-slow
                ${isExpanded ? 'ring-4 ring-fresh/30' : ''}
              `}
              aria-label="Free delivery info"
            >
              <span className="absolute inset-0 rounded-full bg-fresh/20 opacity-75" />
              <span className="absolute inset-2 rounded-full bg-fresh/10 opacity-50" />
              <div className="relative z-10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white drop-shadow-md" />
                <Car className="absolute -bottom-1 -right-1 w-4 h-4 text-white/90" />
              </div>
              <span className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-twinkle" />
              <span className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-twinkle animation-delay-300" />
              <span className="absolute -top-1 -left-1 bg-destructive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
                FREE
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            {messengerIcons}
          </div>
        </>
      )}

      {/* Mobile: collapsible FAB */}
      {isMobile && (
        <div className="flex flex-col items-center gap-2">
          {/* Expanded icons with staggered animation */}
          <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden'}`}>
            {mobileOpen && (
              <div className="flex flex-col items-center gap-2">
                {/* Each icon appears with stagger via inline delay */}
                <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
                  <a
                    href="tel:+48575211401"
                    onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.phoneClick('floating_badge'))}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-fresh to-secondary flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="Zadzwoń"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </a>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
                  <a
                    href="https://t.me/+48575211401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="Telegram"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                  <a
                    href="https://wa.me/48575211401"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => import('@/lib/gtm').then(m => m.gtmEvents.whatsappClick('floating_badge'))}
                    className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                  <a
                    href="mailto:sairus454@gmail.com"
                    className="w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="Email"
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                  <a
                    href="https://www.google.com/maps/place/MasterClean+pranie+tapicerki+i+ozonowanie/@51.0984969,16.949163,17z/data=!3m1!4b1!4m6!3m5!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.0984969!4d16.949163!16s%2Fg%2F11xm28yrtl!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg active:scale-95"
                    aria-label="Google Reviews"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <div className="flex flex-col leading-none">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-[9px] font-bold text-gray-800 ml-0.5">5.0</span>
                      </div>
                      <span className="text-[7px] text-gray-500">65 {language === 'pl' ? 'opinii' : language === 'uk' ? 'відгуків' : language === 'ru' ? 'отзывов' : 'reviews'}</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Main FAB button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(!mobileOpen);
            }}
            className={`
              relative w-14 h-14 rounded-full shadow-xl
              flex items-center justify-center
              transition-all duration-300 ease-out
              active:scale-90
              ${mobileOpen
                ? 'bg-gray-500 rotate-45 scale-95'
                : 'bg-gradient-to-br from-fresh via-secondary to-fresh'
              }
            `}
            aria-label={mobileOpen ? 'Close contacts' : 'Open contacts'}
          >
            {/* Pulsing rings — only when closed */}
            {!mobileOpen && (
              <>
                <span className="absolute inset-0 rounded-full bg-fresh/30 animate-ping" style={{ animationDuration: '2s' }} />
                <span className="absolute inset-[-4px] rounded-full border-2 border-fresh/40 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              </>
            )}
            
            {mobileOpen ? (
              <X className="relative z-10 w-7 h-7 text-white" />
            ) : (
              <Phone className="relative z-10 w-7 h-7 text-white animate-[wiggle_1.5s_ease-in-out_infinite]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FreeDeliveryBadge;
