import { useState } from 'react';
import { MapPin, Car, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const FreeDeliveryBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();

  const texts: Record<string, string> = {
    ru: 'Доезд до клиента — бесплатно!!!',
    uk: 'Виїзд до клієнта — безкоштовно!!!',
    pl: 'Dojazd do klienta — gratis!!!',
    en: 'Free travel to client!!!',
  };

  if (isDismissed) return null;

  return (
    <div className="fixed right-2 sm:right-4 top-[60px] sm:top-[68px] lg:top-[84px] z-40 flex items-center">
      {/* Expanded text bubble */}
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
        {/* Arrow pointing to icon */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-secondary" />
        </div>
      </div>

      {/* Main floating icon */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative group w-14 h-14 sm:w-16 sm:h-16 
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
        {/* Static accent rings instead of animate-ping */}
        <span className="absolute inset-0 rounded-full bg-fresh/20 opacity-75" />
        <span className="absolute inset-2 rounded-full bg-fresh/10 opacity-50" />
        
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center">
          <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
          {/* Small car icon */}
          <Car className="absolute -bottom-1 -right-1 w-4 h-4 text-white/90" />
        </div>

        {/* Sparkle effect */}
        <span className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-twinkle" />
        <span className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-twinkle animation-delay-300" />

        {/* FREE badge */}
        <span className="absolute -top-1 -left-1 bg-destructive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
          FREE
        </span>
      </button>
    </div>
  );
};

export default FreeDeliveryBadge;
