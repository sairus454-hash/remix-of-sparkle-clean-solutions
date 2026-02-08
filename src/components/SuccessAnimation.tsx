import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

interface Confetti {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  rotation: number;
}

const CONFETTI_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--fresh))',
  '#FFD700', // Gold
  '#FF6B6B', // Coral
  '#4ECDC4', // Teal
  '#A855F7', // Purple
  '#F472B6', // Pink
];

const SuccessAnimation = ({ isVisible, onComplete }: SuccessAnimationProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti particles
      const particles: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      }));
      setConfetti(particles);
      setShowCheckmark(true);

      // Clean up after animation
      const timer = setTimeout(() => {
        setConfetti([]);
        setShowCheckmark(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible && confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            animationDelay: `${particle.delay}s`,
            '--confetti-rotation': `${particle.rotation}deg`,
          } as React.CSSProperties}
        >
          <div
            className="rounded-sm"
            style={{
              width: particle.size,
              height: particle.size * 0.6,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        </div>
      ))}

      {/* Checkmark overlay */}
      {showCheckmark && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={cn(
              "bg-background/90 backdrop-blur-sm rounded-full p-8 shadow-2xl",
              "animate-success-popup"
            )}
          >
            <div className="relative">
              {/* Ripple effects */}
              <div className="absolute inset-0 rounded-full bg-fresh/20 animate-ping" />
              <div 
                className="absolute inset-0 rounded-full bg-fresh/30 animate-ping" 
                style={{ animationDelay: '0.2s' }} 
              />
              
              {/* Checkmark icon */}
              <CheckCircle2 
                className="w-24 h-24 text-fresh animate-checkmark-draw relative z-10" 
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessAnimation;
