import { useState, useEffect } from 'react';
import { Sparkles, Home, Brush } from 'lucide-react';

interface CleaningSplashProps {
  onComplete: () => void;
}

const CleaningSplash = ({ onComplete }: CleaningSplashProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1700);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${20 + Math.random() * 40}px`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              animation: `bubbleRise ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 1}s`,
            }}
          >
            <Sparkles 
              className="text-white/40" 
              size={8 + Math.random() * 12} 
              style={{ animation: `twinkle ${0.5 + Math.random()}s ease-in-out infinite` }}
            />
          </div>
        ))}
      </div>

      {/* Central animation */}
      <div className="relative">
        {/* Clean ripples */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/30"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
                animation: 'cleanRipple 2s ease-out infinite',
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Main icon container */}
        <div 
          className="relative w-36 h-36 md:w-44 md:h-44"
          style={{ animation: 'cleanPulse 1s ease-in-out infinite' }}
        >
          {/* Glowing background */}
          <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm shadow-2xl flex items-center justify-center">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
            
            {/* House icon */}
            <Home 
              className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg relative z-10" 
              style={{ animation: 'houseShine 2s ease-in-out infinite' }}
            />
            
            {/* Shine effect */}
            <div className="absolute top-4 left-6 w-6 h-6 bg-white/60 rounded-full blur-sm" />
          </div>

          {/* Orbiting cleaning tools */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/25 flex items-center justify-center"
              style={{
                animation: `orbit ${3}s linear infinite`,
                animationDelay: `${i * 1}s`,
                transformOrigin: '90px 90px',
                left: 'calc(50% - 24px)',
                top: 'calc(50% - 90px)',
              }}
            >
              <Brush 
                className="w-6 h-6 md:w-7 md:h-7 text-white" 
                style={{ 
                  animation: `orbitCounter ${3}s linear infinite`, 
                  animationDelay: `${i * 1}s`,
                  transform: `rotate(${i * 45}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Spray effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5) * (Math.PI / 180);
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/60 rounded-full"
                style={{
                  animation: 'sprayOut 1.5s ease-out infinite',
                  animationDelay: `${i * 0.08}s`,
                  transform: `rotate(${i * 22.5}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            );
          })}
        </div>

        {/* Wiping motion */}
        <div 
          className="absolute top-1/2 left-1/2 w-40 h-4 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
          style={{
            animation: 'wipeMotion 2s ease-in-out infinite',
            transform: 'translate(-50%, 80px)',
          }}
        />
      </div>

      {/* MasterClean text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white/95 font-serif text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg"
          style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
        >
          MasterClean
        </p>
        <p 
          className="text-white/70 text-sm md:text-base mt-2"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards', opacity: 0 }}
        >
          Профессиональная уборка
        </p>
        <div className="flex justify-center gap-1.5 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-white rounded-full"
              style={{
                animation: 'dotPulse 0.8s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(-10px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }

        @keyframes cleanRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes cleanPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes houseShine {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255,255,255,0.9));
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(90px);
          }
          to {
            transform: rotate(360deg) translateX(90px);
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
            transform: translateX(40px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(120px) scale(0);
            opacity: 0;
          }
        }

        @keyframes wipeMotion {
          0%, 100% {
            transform: translate(-50%, 80px) scaleX(0.3);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, 80px) scaleX(1);
            opacity: 1;
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

export default CleaningSplash;
