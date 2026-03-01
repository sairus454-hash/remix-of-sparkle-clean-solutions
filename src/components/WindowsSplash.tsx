import { useState, useEffect } from 'react';
import { Sun, Sparkles, Eye, Home } from 'lucide-react';

interface WindowsSplashProps {
  onComplete: () => void;
}

const WindowsSplash = ({ onComplete }: WindowsSplashProps) => {
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
      {/* Sun rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-yellow-300/50 to-transparent origin-left"
            style={{
              width: '45%',
              transform: `rotate(${i * 30}deg)`,
              animation: 'winRay 2s ease-out infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `winSparkle 1.5s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <Sparkles className="w-5 h-5 text-white/50" />
        </div>
      ))}

      {/* Central window frame */}
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-white/30"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              animation: 'winPulse 1.5s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl border-2 border-white/40"
          style={{ animation: 'winShine 1.5s ease-in-out infinite' }}
        >
          {/* Window cross */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-0.5 bg-white/40" />
            <div className="absolute h-full w-0.5 bg-white/40" />
          </div>
          <Sun className="w-12 h-12 md:w-16 md:h-16 text-yellow-200 drop-shadow-lg relative z-10" style={{ animation: 'winSunSpin 4s linear infinite' }} />
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
        <p
          className="text-white/95 font-serif text-2xl md:text-3xl font-bold tracking-wide"
          style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
        >
          MasterClean
        </p>
        <p
          className="text-white/70 text-sm mt-2"
          style={{ animation: 'fadeInUp 0.4s ease-out 0.1s forwards', opacity: 0 }}
        >
          Мойка окон
        </p>
      </div>

      <style>{`
        @keyframes winRay {
          0% { opacity: 0; transform: rotate(var(--r)) scaleX(0); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: rotate(var(--r)) scaleX(1); }
        }
        @keyframes winSparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes winPulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        @keyframes winShine {
          0%, 100% { box-shadow: 0 0 30px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 60px rgba(255,255,255,0.4); }
        }
        @keyframes winSunSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WindowsSplash;
