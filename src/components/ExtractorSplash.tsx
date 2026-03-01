import { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';

interface ExtractorSplashProps {
  onComplete: () => void;
}

const ExtractorSplash = ({ onComplete }: ExtractorSplashProps) => {
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
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/15"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${5 + i * 8}%`,
              bottom: `-50px`,
              animation: `bubbleRise ${1.5 + i * 0.2}s ease-out forwards`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Central extractor machine */}
      <div className="relative">
        {/* Water spray effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/80 rounded-full"
              style={{
                animation: 'sprayDrop 0.8s ease-out infinite',
                animationDelay: `${i * 0.15}s`,
                left: `${(i - 2) * 20}px`,
              }}
            />
          ))}
        </div>

        {/* Extractor body */}
        <div 
          className="relative w-36 h-44 md:w-44 md:h-52"
          style={{ animation: 'extractorVibrate 0.15s ease-in-out infinite' }}
        >
          {/* Tank */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm shadow-2xl border-2 border-white/40">
            {/* Water level animation */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-fresh/40 rounded-b-xl overflow-hidden"
              style={{ 
                height: '60%',
                animation: 'waterLevel 1s ease-in-out infinite'
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-2 bg-white/40"
                style={{ animation: 'waterWave 0.5s ease-in-out infinite' }}
              />
            </div>
            
            {/* Droplet icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Droplets 
                className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" 
                style={{ animation: 'pulse 0.5s ease-in-out infinite' }}
              />
            </div>
            
            {/* Shine */}
            <div className="absolute top-3 left-4 w-4 h-8 bg-white/50 rounded-full blur-sm transform -rotate-12" />
          </div>

          {/* Hose */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-lg"
            style={{ animation: 'hoseWiggle 0.3s ease-in-out infinite' }}
          />

          {/* Wheels */}
          <div className="absolute bottom-0 left-4 w-8 h-8 bg-gray-600 rounded-full border-4 border-gray-400 shadow-lg" style={{ animation: 'wheelSpin 0.5s linear infinite' }} />
          <div className="absolute bottom-0 right-4 w-8 h-8 bg-gray-600 rounded-full border-4 border-gray-400 shadow-lg" style={{ animation: 'wheelSpin 0.5s linear infinite reverse' }} />
        </div>

        {/* Cleaning sparkles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full"
            style={{
              animation: 'sparkle 0.8s ease-out infinite',
              animationDelay: `${i * 0.1}s`,
              left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 80}%`,
              top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 80}%`,
              transform: 'translate(-50%, -50%)',
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
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translateY(-100px) scale(1);
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes extractorVibrate {
          0%, 100% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
          50% {
            transform: translateX(1px) rotate(0.5deg);
          }
        }

        @keyframes waterLevel {
          0%, 100% {
            height: 55%;
          }
          50% {
            height: 65%;
          }
        }

        @keyframes waterWave {
          0%, 100% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
        }

        @keyframes hoseWiggle {
          0%, 100% {
            transform: translateX(-50%) rotate(-3deg);
          }
          50% {
            transform: translateX(-50%) rotate(3deg);
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sprayDrop {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
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

export default ExtractorSplash;
