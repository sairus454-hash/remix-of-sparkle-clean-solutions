import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import promoVideoMp4 from '@/assets/masterclean-promo.mp4.asset.json';
import promoVideoWebm from '@/assets/masterclean-promo.webm.asset.json';
import promoPoster from '@/assets/masterclean-promo-poster.jpg.asset.json';
import { useLanguage } from '@/i18n/LanguageContext';

interface PromoVideoProps {
  className?: string;
}

const PromoVideo = ({ className = '' }: PromoVideoProps) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  const title =
    language === 'pl'
      ? 'MasterClean 1885 — zobacz nas w akcji'
      : language === 'en'
        ? 'MasterClean 1885 — see us in action'
        : language === 'uk'
          ? 'MasterClean 1885 — подивіться нас у дії'
          : 'MasterClean 1885 — посмотрите нас в деле';

  const tapLabel =
    language === 'pl'
      ? 'Dotknij, aby odtworzyć'
      : language === 'en'
        ? 'Tap to play'
        : language === 'uk'
          ? 'Натисніть, щоб відтворити'
          : 'Нажмите для воспроизведения';

  const tryPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.then === 'function') {
      p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    tryPlay();

    const onFirstInteract = () => {
      tryPlay();
    };
    document.addEventListener('touchstart', onFirstInteract, { once: true, passive: true });
    document.addEventListener('click', onFirstInteract, { once: true });

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('touchstart', onFirstInteract);
      document.removeEventListener('click', onFirstInteract);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const handleManualPlay = () => {
    tryPlay();
  };

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
              autoPlay
              loop
              muted
              playsInline
              {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
              preload="auto"
              disablePictureInPicture
              onPlaying={() => setNeedsTap(false)}
              onPause={() => {
                if (videoRef.current && !videoRef.current.ended) setNeedsTap(true);
              }}
              className="w-full h-full object-cover"
              aria-label={title}
            >
              <source src={promoVideoWebm.url} type="video/webm" />
              <source src={promoVideoMp4.url} type="video/mp4" />
            </video>
            {needsTap && (
              <button
                type="button"
                onClick={handleManualPlay}
                aria-label={tapLabel}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/40 backdrop-blur-sm transition-opacity hover:bg-foreground/50 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                  <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <p className="text-background font-semibold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  {tapLabel}
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideo;
