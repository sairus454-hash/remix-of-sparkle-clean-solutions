import { useRef, useEffect, useState } from 'react';

interface HeroVideoProps {
  src?: string;
}

const HeroVideo = ({ src = '/hero-video.mp4' }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '80vh', maxWidth: 'none', padding: 0 }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Fallback gradient while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
          }}
        />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background/75" />
    </div>
  );
};

export default HeroVideo;
