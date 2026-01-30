import { useState, useEffect } from 'react';
import { Tag, Coins, BadgePercent, Banknote } from 'lucide-react';

interface PriceSplashProps {
  onComplete: () => void;
}

const PriceSplash = ({ onComplete }: PriceSplashProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 700);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);

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
      {/* Falling coins background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${5 + i * 6.5}%`,
              top: '-50px',
              animation: `coinFall ${1 + Math.random() * 0.5}s ease-in forwards`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div 
              className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg flex items-center justify-center"
              style={{ animation: 'coinSpin 0.5s linear infinite' }}
            >
              <span className="text-yellow-700 font-bold text-sm">zł</span>
            </div>
          </div>
        ))}
      </div>

      {/* Central price tag */}
      <div className="relative">
        {/* Floating discount badges */}
        {[...Array(4)].map((_, i) => {
          const positions = [
            { x: -120, y: -60 },
            { x: 120, y: -40 },
            { x: -100, y: 60 },
            { x: 110, y: 70 },
          ];
          return (
            <div
              key={i}
              className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
              style={{
                left: `calc(50% + ${positions[i].x}px)`,
                top: `calc(50% + ${positions[i].y}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `badgePop 0.4s ease-out forwards, badgeFloat 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s, ${i * 0.1}s`,
                opacity: 0,
              }}
            >
              {i === 0 && <BadgePercent className="w-6 h-6 md:w-7 md:h-7 text-white" />}
              {i === 1 && <Coins className="w-6 h-6 md:w-7 md:h-7 text-white" />}
              {i === 2 && <Banknote className="w-6 h-6 md:w-7 md:h-7 text-white" />}
              {i === 3 && <Tag className="w-6 h-6 md:w-7 md:h-7 text-white" />}
            </div>
          );
        })}

        {/* Main price tag */}
        <div 
          className="relative"
          style={{ animation: 'tagSwing 1s ease-in-out infinite' }}
        >
          {/* Tag string */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-8 bg-white/50 rounded-full" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/30 border-2 border-white/50" />
          
          {/* Tag body */}
          <div 
            className="relative w-40 h-48 md:w-48 md:h-56 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col items-center justify-center"
            style={{ 
              clipPath: 'polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)',
            }}
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-3 rounded-xl bg-gradient-to-br from-white/30 to-transparent"
              style={{ clipPath: 'polygon(0 12%, 50% 0, 100% 12%, 100% 100%, 0 100%)' }}
            />
            
            {/* Tag hole */}
            <div className="absolute top-6 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-fresh border-2 border-white/40" />
            
            {/* Price content */}
            <div className="mt-8 text-center relative z-10">
              <Tag 
                className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg mx-auto mb-2" 
                style={{ animation: 'pulse 0.8s ease-in-out infinite' }}
              />
              <div 
                className="text-white font-bold text-2xl md:text-3xl"
                style={{ animation: 'priceFlash 0.5s ease-in-out infinite' }}
              >
                -20%
              </div>
              <div className="text-white/80 text-sm mt-1">SALE</div>
            </div>

            {/* Shine effect */}
            <div 
              className="absolute top-12 right-6 w-4 h-12 bg-white/40 rounded-full blur-sm transform rotate-12"
              style={{ animation: 'shine 1.5s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `calc(50% + ${Math.cos(i * 45 * Math.PI / 180) * 100}px)`,
              top: `calc(50% + ${Math.sin(i * 45 * Math.PI / 180) * 100}px)`,
              animation: `sparkle 0.8s ease-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
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
        @keyframes coinFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0.5;
          }
        }

        @keyframes coinSpin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        @keyframes tagSwing {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes badgePop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes badgeFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-8px);
          }
        }

        @keyframes priceFlash {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes shine {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(0);
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

export default PriceSplash;
