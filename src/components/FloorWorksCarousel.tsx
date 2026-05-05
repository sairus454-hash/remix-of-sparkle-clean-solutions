import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Slide {
  src: string;
  label: string;
}

interface Props {
  slides: Slide[];
}

const FloorWorksCarousel = ({ slides }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const total = slides.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, isHovered]);

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
    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex: 10 - absD,
      opacity: 1 - absD * 0.3,
      pointerEvents: absD === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <div
      className="relative mx-auto"
      style={{ perspective: '1200px', height: isMobile ? '320px' : '380px', maxWidth: '900px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
        setTouchStart(null);
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-out rounded-xl sm:rounded-2xl overflow-hidden shadow-card-hover border-2 border-border bg-muted"
            style={{
              width: isMobile ? '85%' : '55%',
              height: '100%',
              left: '50%',
              marginLeft: isMobile ? '-42.5%' : '-27.5%',
              ...getCardStyle(index),
            }}
          >
            <img src={slide.src} alt={slide.label} className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`} loading="lazy" />
            {((index - current) % total + total) % total === 0 && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                <p className="text-white text-xs sm:text-sm font-medium text-center">{slide.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-card flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-card flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-primary scale-125 shadow-glow' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FloorWorksCarousel;
