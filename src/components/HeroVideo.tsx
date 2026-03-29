import { useRef, useEffect, useState, useCallback } from 'react';

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
  poster?: string;
  /** Skip lazy-loading for above-fold hero — improves LCP */
  eager?: boolean;
}

const HeroVideo = ({ src = '/hero-video.mp4', fallbackImage, poster, eager = false }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleError = useCallback(() => {
    // Video failed — fallback image stays visible
  }, []);

  useEffect(() => {
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
  }, [src, eager]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >
      {/* Fallback image — always rendered as LCP candidate */}
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt="MasterClean — profesjonalne usługi czyszczenia"
          width={1920}
          height={1080}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding={eager ? 'sync' : 'async'}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 0 : 1 }}
        />
      )}

      {/* Video element — fades in on top of fallback image */}
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
