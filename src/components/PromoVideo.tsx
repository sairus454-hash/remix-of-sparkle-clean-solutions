import promoVideo from '@/assets/masterclean-promo.mp4.asset.json';
import { useLanguage } from '@/i18n/LanguageContext';

interface PromoVideoProps {
  className?: string;
}

const PromoVideo = ({ className = '' }: PromoVideoProps) => {
  const { language } = useLanguage();
  const title =
    language === 'pl'
      ? 'MasterClean 1885 — zobacz nas w akcji'
      : language === 'en'
        ? 'MasterClean 1885 — see us in action'
        : language === 'uk'
          ? 'MasterClean 1885 — подивіться нас у дії'
          : 'MasterClean 1885 — посмотрите нас в деле';

  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
            {title}
          </h2>
          <div className="relative rounded-2xl overflow-hidden shadow-glow border-2 border-border bg-muted aspect-square">
            <video
              src={promoVideo.url}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              className="w-full h-full object-cover"
              aria-label={title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideo;
