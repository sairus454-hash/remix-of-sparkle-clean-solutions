import { useState, useEffect, useRef, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CircularRevealCardProps {
  children: ReactNode;
  index: number;
  className?: string;
  slow?: boolean; // Slower animation for marketing cards
}

const CircularRevealCard = forwardRef<HTMLDivElement, CircularRevealCardProps>(({ children, index, className, slow = false }, _ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const baseDelay = slow ? 80 : 50;
          const delay = index * baseDelay;
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '80px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index, slow]);

  // Calculate circular trajectory starting position based on index
  // Cards start from different positions around a circle
  const getInitialTransform = () => {
    const angle = (index * 60) % 360;
    const baseRadius = slow ? 40 : 25;
    const radius = isMobile ? (slow ? 20 : 15) : baseRadius;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const { x, y } = getInitialTransform();

  const duration = slow 
    ? (isMobile ? '450ms' : '550ms') 
    : (isMobile ? '350ms' : '400ms');
  
  const initialScale = slow ? 0.92 : 0.95;

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translate3d(0,0,0) scale(1)' 
          : `translate3d(${x}px,${y}px,0) scale(${initialScale})`,
        transitionDuration: duration,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionProperty: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
});

CircularRevealCard.displayName = "CircularRevealCard";

export default CircularRevealCard;
