import { useRef, useEffect, useState, useCallback } from 'react';

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
  /** Smaller image for mobile screens (< 768px) to reduce LCP */
  fallbackImageMobile?: string;
  poster?: string;
  /** Skip lazy-loading for above-fold hero — improves LCP */
  eager?: boolean;
}

const HeroVideo = ({ src = '/hero-video.mp4', fallbackImage, fallbackImageMobile, poster, eager = false }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  // Skip video entirely on mobile to save ~18MB and fix LCP
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleError = useCallback(() => {
    // Video failed — fallback image stays visible
  }, []);

  useEffect(() => {
    if (isMobile) return; // No video on mobile
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (eager) {
      video.src = src;
      video.load();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = src;
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, [src, eager, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >
      {/* Fallback image — only on mobile (desktop loads video directly) */}
      {fallbackImage && isMobile && (
        <img
          src={fallbackImageMobile || fallbackImage}
          alt="MasterClean — profesjonalne usługi czyszczenia"
          width={480}
          height={720}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding={eager ? 'sync' : 'async'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )

      {/* Video element — only on desktop, fades in on top of fallback image */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          onCanPlay={handleCanPlay}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}

      {/* Gradient fallback when no image provided */}
      {!fallbackImage && !videoReady && (
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
