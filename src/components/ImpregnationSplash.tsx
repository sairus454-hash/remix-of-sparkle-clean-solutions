import { useState, useEffect } from 'react';
import { Shield, Droplets, SprayCan } from 'lucide-react';

interface ImpregnationSplashProps {
  onComplete: () => void;
}

const ImpregnationSplash = ({ onComplete }: ImpregnationSplashProps) => {
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
      {/* Water drops falling */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-white/40 rounded-full"
          style={{
            left: `${10 + i * 9}%`,
            animation: 'impDrop 2s ease-in infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      {/* Shield barrier effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-4 border-dashed border-white/20"
          style={{ animation: 'impBarrier 3s linear infinite' }}
        />
      </div>

      {/* Central shield */}
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/30"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              animation: 'impPulse 1.5s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl"
          style={{ animation: 'impShield 1.5s ease-in-out infinite' }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          <Shield className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg relative z-10" />
          {/* Spray effect */}
          <div
            className="absolute -top-3 -right-3 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center"
            style={{ animation: 'impSpray 0.8s ease-out infinite' }}
          >
            <SprayCan className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Repelled droplets */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              animation: 'impRepel 1.5s ease-out infinite',
              animationDelay: `${i * 0.25}s`,
              transform: `rotate(${i * 60}deg)`,
            }}
          >
            <Droplets className="w-4 h-4 text-white/60" />
          </div>
        ))}
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
          Импрегнация
        </p>
      </div>

      <style>{`
        @keyframes impDrop {
          0% { top: -5%; opacity: 1; }
          70% { opacity: 1; }
          100% { top: 55%; opacity: 0; transform: scale(0.5); }
        }
        @keyframes impBarrier {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes impPulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        @keyframes impShield {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes impSpray {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes impRepel {
          0% { opacity: 1; transform: rotate(var(--r)) translateX(60px) scale(1); }
          100% { opacity: 0; transform: rotate(var(--r)) translateX(130px) scale(0.4); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ImpregnationSplash;
