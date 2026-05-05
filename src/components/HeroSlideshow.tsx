import { useState, useEffect, useCallback } from 'react';

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  interval?: number;
  objectFit?: 'cover' | 'contain';
}

const HeroSlideshow = ({ images, interval = 5000, objectFit = 'cover' }: HeroSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // First image is considered loaded immediately so it paints without blur
  // → improves LCP (no expensive filter:blur(20px) on the largest image).
  const [loadedImages, setLoadedImages] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Preload next image when current changes (idle, low priority)
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.decoding = 'async';
      img.src = images[nextIndex].src;
    }
  }, [currentIndex, images, loadedImages]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
        contain: 'layout paint',
      }}
    >
      {images.map((img, index) => {
        const isLoaded = loadedImages.has(index);
        const isActive = index === currentIndex;
        const isFirst = index === 0;

        return (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={isFirst ? 'eager' : 'lazy'}
              decoding={isFirst ? 'sync' : 'async'}
              fetchPriority={isFirst ? 'high' : 'low'}
              onLoad={() => handleImageLoad(index)}
              className={`absolute inset-0 w-full h-full ${
                objectFit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
              style={
                isFirst
                  ? undefined
                  : {
                      transition: 'filter 200ms ease-out, transform 200ms ease-out',
                      filter: isLoaded ? 'blur(0px)' : 'blur(12px)',
                      transform: isLoaded ? 'scale(1)' : 'scale(1.03)',
                    }
              }
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/55" />
    </div>
  );
};

export default HeroSlideshow;
