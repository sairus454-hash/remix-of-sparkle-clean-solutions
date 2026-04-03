import { useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
  fallbackImageMobile?: string;
  poster?: string;
  eager?: boolean;
}

const HeroVideo = ({ src = '/hero-video.mp4', fallbackImage, fallbackImageMobile, poster, eager = false }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleError = useCallback(() => {
    // Video failed — fallback image stays visible
  }, []);

  const effectivePoster = poster || fallbackImage;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >
      {/* Preload video in <head> for faster network fetch on desktop */}
      {!isMobile && createPortal(
        <link rel="preload" as="video" href={src} type="video/mp4" />,
        document.head
      )}

      {/* Fallback image — always on mobile */}
      {fallbackImage && isMobile && (
        <img
          src={fallbackImageMobile || fallbackImage}
          alt="MasterClean — profesjonalne usługi czyszczenia"
          width={480}
          height={720}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Desktop: poster visible immediately, video fades in when ready */}
      {!isMobile && (
        <>
          {effectivePoster && !videoReady && (
            <img
              src={effectivePoster}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={effectivePoster}
            aria-hidden="true"
            onCanPlay={handleCanPlay}
            onError={handleError}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: videoReady ? 1 : 0 }}
          />
        </>
      )}

      {/* Gradient fallback when no image provided */}
      {!fallbackImage && !isMobile && !videoReady && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
          }}
        />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
};

export default HeroVideo;
