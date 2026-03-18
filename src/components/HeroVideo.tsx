import { useRef, useEffect, useState, useCallback } from 'react';

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
  poster?: string;
}

const HeroVideo = ({ src = '/hero-video.mp4', fallbackImage, poster }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'playing' | 'error'>('loading');

  const handleCanPlay = useCallback(() => {
    setStatus('playing');
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleError = useCallback(() => {
    setStatus('error');
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Lazy-load: only start loading when visible
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
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >
      {/* Video element — hidden on error */}
      {status !== 'error' && (
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
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: status === 'playing' ? 1 : 0 }}
        />
      )}

      {/* Fallback image on error */}
      {status === 'error' && fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Loading gradient placeholder */}
      {status === 'loading' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
          }}
        />
      )}

      {/* Error gradient fallback (no fallback image provided) */}
      {status === 'error' && !fallbackImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--background)) 50%, hsl(var(--primary) / 0.1) 100%)',
          }}
        />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
};

export default HeroVideo;
