import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CircularRevealCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const CircularRevealCard = ({ children, index, className }: CircularRevealCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on index
          const delay = index * 150;
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
  }, [index]);

  // Calculate circular trajectory starting position based on index
  // Cards start from different positions around a circle
  const getInitialTransform = () => {
    const angle = (index * 60) % 360; // 60 degrees apart
    const radius = isMobile ? 30 : 60; // Smaller radius on mobile
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const { x, y } = getInitialTransform();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateX(0) translateY(0) scale(1) rotate(0deg)' 
          : `translateX(${x}px) translateY(${y}px) scale(${isMobile ? 0.9 : 0.85}) rotate(${isMobile ? index * 3 : index * 5}deg)`,
        transitionDuration: isMobile ? '800ms' : '1000ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default CircularRevealCard;
