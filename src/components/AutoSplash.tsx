import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

interface AutoSplashProps {
  onComplete: () => void;
}

const AutoSplash = ({ onComplete }: AutoSplashProps) => {
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
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `autoSparkle ${1 + Math.random() * 1}s ease-in-out infinite`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Shining rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              width: '200%',
              transformOrigin: 'left center',
              transform: `rotate(${i * 45}deg)`,
              animation: `autoRay 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Central car icon */}
      <div className="relative">
        {/* Shine rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"
              style={{
                width: `${90 + i * 50}px`,
                height: `${90 + i * 50}px`,
                animation: 'autoShineRing 1.2s ease-out infinite',
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        {/* Main car container */}
        <div 
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          style={{ animation: 'autoFloat 1s ease-in-out infinite' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
          
          {/* Car icon */}
          <Car 
            className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'autoShine 1s ease-in-out infinite' }}
          />

          {/* Shine effect on car */}
          <div 
            className="absolute top-4 right-8 w-6 h-6 bg-white/80 rounded-full blur-sm"
            style={{ animation: 'autoGlint 0.8s ease-in-out infinite' }}
          />
          <div 
            className="absolute bottom-6 left-6 w-4 h-4 bg-white/60 rounded-full blur-sm"
            style={{ animation: 'autoGlint 0.8s ease-in-out infinite', animationDelay: '0.4s' }}
          />
        </div>

        {/* Water droplets flying off */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/70 rounded-full"
            style={{
              animation: 'autoDroplet 1s ease-out infinite',
              animationDelay: `${i * 0.1}s`,
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 36}deg)`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white/90 font-serif text-2xl md:text-3xl font-bold tracking-wide"
          style={{ animation: 'autoFadeIn 0.4s ease-out forwards' }}
        >
          MasterClean
        </p>
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              style={{
                animation: 'autoDot 1s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes autoSparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes autoRay {
          0%, 100% {
            opacity: 0;
            transform: rotate(var(--rotation)) scaleX(0);
          }
          50% {
            opacity: 0.6;
            transform: rotate(var(--rotation)) scaleX(1);
          }
        }

        @keyframes autoShineRing {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
          }
        }

        @keyframes autoFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes autoShine {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255,255,255,0.9));
          }
        }

        @keyframes autoGlint {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes autoDroplet {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-50px) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-120px) scale(0.3);
          }
        }

        @keyframes autoFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes autoDot {
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

export default AutoSplash;
