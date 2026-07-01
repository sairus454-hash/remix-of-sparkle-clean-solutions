import { useRef, useState, useCallback, useEffect } from 'react';

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
  // Defer video loading until after LCP — avoids competing with hero image bandwidth.
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    const start = () => setShouldLoadVideo(true);
    // Wait for browser to be idle (after LCP) before loading video
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(start, { timeout: 3000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 2500);
    return () => clearTimeout(t);
  }, [isMobile]);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleError = useCallback(() => {
    // Video failed — fallback image stays visible
  }, []);

  const effectivePoster = poster || fallbackImage;
  const webmSrc = src.replace(/\.mp4(\?.*)?$/i, '.webm$1');

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >


      {/* Fallback image — always on mobile */}
      {fallbackImage && isMobile && (
        <img
          src={fallbackImageMobile || fallbackImage}
          alt="MasterClean — profesjonalne usługi czyszczenia"
          width={480}
          height={720}
          loading="eager"
          {...({ fetchpriority: 'high' } as any)}
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
          {shouldLoadVideo && (
            <video
              ref={videoRef}
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
            >
              <source src={webmSrc} type="video/webm" />
              <source src={src} type="video/mp4" />
            </video>
          )}
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
