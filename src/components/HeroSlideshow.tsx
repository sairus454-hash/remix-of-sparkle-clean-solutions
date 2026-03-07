import { useState, useEffect, useCallback } from 'react';

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  interval?: number;
  objectFit?: 'cover' | 'contain';
}

const HeroSlideshow = ({ images, interval = 5000, objectFit = 'cover' }: HeroSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = images[nextIndex].src;
    }
  }, [currentIndex, images, loadedImages]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {images.map((img, index) => {
        const isLoaded = loadedImages.has(index);
        const isActive = index === currentIndex;

        return (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding={index === 0 ? 'sync' : 'async'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              onLoad={() => handleImageLoad(index)}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                objectFit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
              style={{
                filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
                transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
              }}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/55" />
    </div>
  );
};

export default HeroSlideshow;
