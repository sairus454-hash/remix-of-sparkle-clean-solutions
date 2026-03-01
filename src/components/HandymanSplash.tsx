import { useState, useEffect } from 'react';
import { Wrench, Hammer } from 'lucide-react';

interface HandymanSplashProps {
  onComplete: () => void;
}

const HandymanSplash = ({ onComplete }: HandymanSplashProps) => {
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-yellow-500 via-yellow-400 to-orange-500 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background gear patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-4 border-white/20"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `handymanGear ${3 + i}s linear infinite`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          />
        ))}
      </div>

      {/* Flying tools */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `handymanToolFloat ${2 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {i % 2 === 0 ? '🔧' : '🔨'}
          </div>
        ))}
      </div>

      {/* Central tool icons */}
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/50"
              style={{
                width: `${100 + i * 60}px`,
                height: `${100 + i * 60}px`,
                animation: 'handymanPulse 1.2s ease-out infinite',
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        {/* Main container with tools */}
        <div 
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          style={{ animation: 'handymanBounce 0.8s ease-in-out infinite' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 to-transparent" />
          
          {/* Wrench icon */}
          <Wrench 
            className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'handymanSpin 1.5s ease-in-out infinite' }}
          />

          {/* Hammer orbiting */}
          <div 
            className="absolute"
            style={{ animation: 'handymanOrbit 2s linear infinite' }}
          >
            <Hammer className="w-8 h-8 text-white/80" />
          </div>
        </div>

        {/* Sparks flying off */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              animation: 'handymanSpark 1s ease-out infinite',
              animationDelay: `${i * 0.08}s`,
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p 
          className="text-white font-serif text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg"
          style={{ animation: 'handymanFadeIn 0.4s ease-out forwards' }}
        >
          MasterClean
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              style={{
                animation: 'handymanDot 1s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes handymanGear {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes handymanToolFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(15deg);
            opacity: 0.6;
          }
        }

        @keyframes handymanPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes handymanBounce {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(-3deg);
          }
          75% {
            transform: scale(1.05) rotate(3deg);
          }
        }

        @keyframes handymanSpin {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        @keyframes handymanOrbit {
          0% {
            transform: rotate(0deg) translateX(80px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(80px) rotate(-360deg);
          }
        }

        @keyframes handymanSpark {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-40px) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-100px) scale(0.3);
          }
        }

        @keyframes handymanFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes handymanDot {
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

export default HandymanSplash;
