import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CircularRevealCardProps {
  children: ReactNode;
  index: number;
  className?: string;
  slow?: boolean; // Slower animation for marketing cards
}

const CircularRevealCard = ({ children, index, className, slow = false }: CircularRevealCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on index - slower for marketing cards
          const baseDelay = slow ? 200 : 150;
          const delay = index * baseDelay;
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
  }, [index, slow]);

  // Calculate circular trajectory starting position based on index
  // Cards start from different positions around a circle
  const getInitialTransform = () => {
    const angle = (index * 60) % 360; // 60 degrees apart
    const baseRadius = slow ? 80 : 60; // Larger radius for marketing cards
    const radius = isMobile ? (slow ? 40 : 30) : baseRadius;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const { x, y } = getInitialTransform();

  // Duration and scale based on slow prop
  const duration = slow 
    ? (isMobile ? '1000ms' : '1200ms') 
    : (isMobile ? '800ms' : '1000ms');
  
  const initialScale = slow 
    ? (isMobile ? 0.8 : 0.75) 
    : (isMobile ? 0.9 : 0.85);
  
  const initialRotation = slow 
    ? (isMobile ? index * 5 : index * 8) 
    : (isMobile ? index * 3 : index * 5);

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
          : `translateX(${x}px) translateY(${y}px) scale(${initialScale}) rotate(${initialRotation}deg)`,
        transitionDuration: duration,
        transitionTimingFunction: slow 
          ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smoother ease-out for marketing
          : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default CircularRevealCard;
