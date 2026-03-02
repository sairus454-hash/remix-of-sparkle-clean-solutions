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
    <div className="fixed right-2 sm:right-4 top-[60px] sm:top-[68px] lg:top-[84px] z-40 flex flex-col items-center gap-2">
      {/* Expanded text bubble */}
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
          <span className="absolute inset-0 rounded-full bg-fresh/20 opacity-75" />
          <span className="absolute inset-2 rounded-full bg-fresh/10 opacity-50" />
          <div className="relative z-10 flex items-center justify-center">
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
            <Car className="absolute -bottom-1 -right-1 w-4 h-4 text-white/90" />
          </div>
          <span className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-twinkle" />
          <span className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-twinkle animation-delay-300" />
          <span className="absolute -top-1 -left-1 bg-destructive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
            FREE
          </span>
        </button>
      </div>

      {/* Messenger icons below */}
      <div className="flex flex-col items-center gap-1.5">
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
      </div>
    </div>
  );
};

export default FreeDeliveryBadge;
