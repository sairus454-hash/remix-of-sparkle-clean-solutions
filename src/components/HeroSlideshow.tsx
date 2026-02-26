import { useState, useEffect } from 'react';

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  interval?: number;
  objectFit?: 'cover' | 'contain';
}

const HeroSlideshow = ({ images, interval = 5000, objectFit = 'cover' }: HeroSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(210 40% 96%) 50%, hsl(var(--background)) 100%)' }}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/55" />
    </div>
  );
};

export default HeroSlideshow;
