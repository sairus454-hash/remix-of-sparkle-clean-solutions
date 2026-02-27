import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/i18n/LanguageContext';

import autoBa1 from '@/assets/auto-ba-1.jpg';
import autoBa2 from '@/assets/auto-ba-2.jpg';
import autoBa3 from '@/assets/auto-ba-3.jpg';
import autoBa4 from '@/assets/auto-ba-4.jpg';
import autoBa5 from '@/assets/auto-ba-5.jpg';
import autoBa6 from '@/assets/auto-ba-6.jpg';
import autoBa7 from '@/assets/auto-ba-7.jpg';
import autoBa8 from '@/assets/auto-ba-8.jpg';

const slideImages = [autoBa1, autoBa2, autoBa3, autoBa4, autoBa5, autoBa6, autoBa7, autoBa8];
const slideKeys = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7', 'slide8'] as const;

const Auto3DCarousel = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const total = slideImages.length;
  const slides = slideImages.map((src, i) => ({ src, alt: (t.auto as any)[slideKeys[i]] || slideKeys[i] }));

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-scroll
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const getCardStyle = (index: number) => {
    const diff = ((index - current) % total + total) % total;
    const normalizedDiff = diff > total / 2 ? diff - total : diff;

    const absD = Math.abs(normalizedDiff);
    const maxVisible = isMobile ? 1 : 2;

    if (absD > maxVisible) {
      return {
        opacity: 0,
        transform: `translateX(${normalizedDiff > 0 ? 100 : -100}%) scale(0.6) rotateY(${normalizedDiff > 0 ? -45 : 45}deg)`,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    const translateX = normalizedDiff * (isMobile ? 70 : 55);
    const scale = 1 - absD * 0.15;
    const rotateY = normalizedDiff * -12;
    const zIndex = 10 - absD;
    const opacity = 1 - absD * 0.3;

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      pointerEvents: absD === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-section overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
            style={{ animation: 'shimmer 3s linear infinite' }}
          >
            {t.auto.carouselTitle}
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-sm sm:text-base" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {t.auto.carouselSubtitle}
          </p>
        </div>

        <div
          className="relative mx-auto"
          style={{ perspective: '1200px', height: isMobile ? '260px' : '360px', maxWidth: '900px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
              diff > 0 ? next() : prev();
            }
            setTouchStart(null);
          }}
        >
          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="absolute transition-all duration-500 ease-out rounded-xl sm:rounded-2xl overflow-hidden shadow-card-hover border-2 border-border"
                style={{
                  width: isMobile ? '75%' : '55%',
                  height: '100%',
                  left: '50%',
                  marginLeft: isMobile ? '-37.5%' : '-27.5%',
                  ...getCardStyle(index),
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay label for active */}
                {((index - current) % total + total) % total === 0 && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-medium text-center">
                      {slide.alt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-card flex items-center justify-center hover:bg-card transition-colors touch-manipulation"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-card flex items-center justify-center hover:bg-card transition-colors touch-manipulation"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                index === current
                  ? 'bg-primary scale-125 shadow-glow'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Auto3DCarousel;
