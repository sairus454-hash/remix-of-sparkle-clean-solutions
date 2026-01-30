import { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';

interface WaterDropSplashProps {
  onComplete: () => void;
}

const WaterDropSplash = ({ onComplete }: WaterDropSplashProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading at 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Complete at 3 seconds
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-fresh to-primary transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Central water drop */}
      <div className="relative">
        {/* Ripple effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/40"
              style={{
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                animation: 'ripple 2s ease-out infinite',
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Main drop container */}
        <div 
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          style={{ animation: 'dropBounce 1s ease-in-out infinite' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          
          {/* Drop icon */}
          <Droplets 
            className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'pulse 1s ease-in-out infinite' }}
          />

          {/* Shine effect */}
          <div 
            className="absolute top-4 left-6 w-6 h-6 bg-white/60 rounded-full blur-sm"
            style={{ animation: 'shine 2s ease-in-out infinite' }}
          />
        </div>

        {/* Splash drops */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/60 rounded-full"
            style={{
              animation: 'splashDrop 1.5s ease-out infinite',
              animationDelay: `${i * 0.25}s`,
              transformOrigin: 'center',
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 60}deg) translateY(-80px)`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white/90 font-serif text-2xl md:text-3xl font-bold tracking-wide"
          style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
        >
          MasterClean
        </p>
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              style={{
                animation: 'dotPulse 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes dropBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }

        @keyframes splashDrop {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-60px) scale(1);
          }
          50% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-120px) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-160px) scale(0.3);
          }
        }

        @keyframes shine {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default WaterDropSplash;
