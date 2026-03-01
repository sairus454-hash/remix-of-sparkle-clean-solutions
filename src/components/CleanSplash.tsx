import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Star } from 'lucide-react';

interface CleanSplashProps {
  onComplete: () => void;
}

const CleanSplash = ({ onComplete }: CleanSplashProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-fresh to-primary transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${1 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <Star 
              className="text-white/30" 
              size={8 + Math.random() * 16} 
              style={{ animation: `twinkle ${0.5 + Math.random()}s ease-in-out infinite` }}
            />
          </div>
        ))}
      </div>

      {/* Central cleaning animation */}
      <div className="relative">
        {/* Expanding clean circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/30"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                animation: 'cleanRipple 1.5s ease-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Main sparkle container */}
        <div 
          className="relative w-32 h-32 md:w-40 md:h-40"
          style={{ animation: 'cleanPulse 0.8s ease-in-out infinite' }}
        >
          {/* Glowing orb */}
          <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm shadow-2xl flex items-center justify-center">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
            <Sparkles 
              className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg relative z-10" 
              style={{ animation: 'sparkleRotate 1s ease-in-out infinite' }}
            />
            {/* Shine */}
            <div className="absolute top-4 left-6 w-6 h-6 bg-white/60 rounded-full blur-sm" />
          </div>

          {/* Orbiting checkmarks */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/25 flex items-center justify-center"
              style={{
                animation: `orbit ${2}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                transformOrigin: '80px 80px',
                left: 'calc(50% - 20px)',
                top: 'calc(50% - 80px)',
              }}
            >
              <CheckCircle2 
                className="w-5 h-5 md:w-6 md:h-6 text-white" 
                style={{ animation: `orbitCounter ${2}s linear infinite`, animationDelay: `${i * 0.5}s` }}
              />
            </div>
          ))}
        </div>

        {/* Cleaning spray effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            return (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white/60 rounded-full"
                style={{
                  animation: 'sprayOut 0.8s ease-out infinite',
                  animationDelay: `${i * 0.05}s`,
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* MasterClean text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white/95 font-serif text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg"
          style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
        >
          MasterClean
        </p>
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              style={{
                animation: 'dotPulse 0.6s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes cleanRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes cleanPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes sparkleRotate {
          0%, 100% {
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(15deg) scale(1.1);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(80px);
          }
          to {
            transform: rotate(360deg) translateX(80px);
          }
        }

        @keyframes orbitCounter {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes sprayOut {
          0% {
            transform: translateX(30px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100px) scale(0);
            opacity: 0;
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
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CleanSplash;
