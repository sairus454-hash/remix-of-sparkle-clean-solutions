import { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

interface OzoneSplashProps {
  onComplete: () => void;
}

const OzoneSplash = ({ onComplete }: OzoneSplashProps) => {
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-fresh via-primary to-fresh transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `ozoneFloat ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Swirling air currents */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              top: `${15 + i * 15}%`,
              animation: `ozoneWave ${1.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              transform: `rotate(${-5 + i * 2}deg)`,
            }}
          />
        ))}
      </div>

      {/* Central ozone icon */}
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50"
              style={{
                width: `${80 + i * 60}px`,
                height: `${80 + i * 60}px`,
                animation: 'ozonePulse 1.5s ease-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Main container */}
        <div 
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          style={{ animation: 'ozoneBreath 1s ease-in-out infinite' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
          
          {/* Wind icon */}
          <Wind 
            className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'ozoneSpin 2s linear infinite' }}
          />

          {/* Shine effect */}
          <div 
            className="absolute top-3 left-5 w-5 h-5 bg-white/70 rounded-full blur-sm"
            style={{ animation: 'ozoneShine 1s ease-in-out infinite' }}
          />
        </div>

        {/* Floating particles around icon */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/50 rounded-full"
            style={{
              animation: 'ozoneOrbit 2s linear infinite',
              animationDelay: `${i * 0.25}s`,
              transformOrigin: 'center',
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 45}deg) translateY(-70px)`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white/90 font-serif text-2xl md:text-3xl font-bold tracking-wide"
          style={{ animation: 'ozoneFadeIn 0.4s ease-out forwards' }}
        >
          MasterClean
        </p>
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              style={{
                animation: 'ozoneDot 1s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ozoneFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes ozoneWave {
          0%, 100% {
            transform: translateX(-100%) scaleX(0.5);
            opacity: 0;
          }
          50% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0.5);
            opacity: 0;
          }
        }

        @keyframes ozonePulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes ozoneBreath {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes ozoneSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes ozoneShine {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes ozoneOrbit {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-70px) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: rotate(var(--rotation)) translateY(-90px) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-110px) scale(0.3);
          }
        }

        @keyframes ozoneFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ozoneDot {
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

export default OzoneSplash;
