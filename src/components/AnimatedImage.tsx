import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
}

const AnimatedImage = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  delay = 0,
  duration = 700
}: AnimatedImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("overflow-hidden", containerClassName)}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          className,
          "transition-all ease-out",
          isVisible && isLoaded
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionProperty: 'opacity, transform',
        }}
      />
    </div>
  );
};

export default AnimatedImage;
