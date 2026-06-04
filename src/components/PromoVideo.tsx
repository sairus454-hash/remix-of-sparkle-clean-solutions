import { useEffect, useRef } from 'react';
import promoVideo from '@/assets/masterclean-promo.mp4.asset.json';
import { useLanguage } from '@/i18n/LanguageContext';

interface PromoVideoProps {
  className?: string;
}

const PromoVideo = ({ className = '' }: PromoVideoProps) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const title =
    language === 'pl'
      ? 'MasterClean 1885 — zobacz nas w akcji'
      : language === 'en'
        ? 'MasterClean 1885 — see us in action'
        : language === 'uk'
          ? 'MasterClean 1885 — подивіться нас у дії'
          : 'MasterClean 1885 — посмотрите нас в деле';

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Retry once on user interaction
          const retry = () => {
            v.muted = true;
            v.play().catch(() => {});
            document.removeEventListener('touchstart', retry);
            document.removeEventListener('click', retry);
          };
          document.addEventListener('touchstart', retry, { once: true, passive: true });
          document.addEventListener('click', retry, { once: true });
        });
      }
    };
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
            {title}
          </h2>
          <div className="relative rounded-2xl overflow-hidden shadow-glow border-2 border-border bg-muted aspect-square">
            <video
              ref={videoRef}
              src={promoVideo.url}
              autoPlay
              loop
              muted
              playsInline
              {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none"
              aria-label={title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideo;
