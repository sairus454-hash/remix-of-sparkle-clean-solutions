import { useState, useEffect } from 'react';
import autoCleaning1 from '@/assets/auto-cleaning-1.jpg';
import autoCleaning2 from '@/assets/auto-cleaning-2.jpg';
import autoCleaning3 from '@/assets/auto-cleaning-3.jpg';

const images = [autoCleaning1, autoCleaning2, autoCleaning3];

const AutoHeroSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Auto cleaning ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        />
      ))}
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/55" />
    </div>
  );
};

export default AutoHeroSlideshow;
