import { useState, useEffect } from 'react';
import { Sparkles, Sofa, Car, Armchair, Baby, LayoutGrid } from 'lucide-react';

interface ServicesSplashProps {
  onComplete: () => void;
}

const ServicesSplash = ({ onComplete }: ServicesSplashProps) => {
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

  const serviceIcons = [
    { Icon: Sparkles, delay: 0 },
    { Icon: Sofa, delay: 0.1 },
    { Icon: Car, delay: 0.2 },
    { Icon: Armchair, delay: 0.3 },
    { Icon: Baby, delay: 0.4 },
    { Icon: LayoutGrid, delay: 0.5 },
  ];

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-fresh to-primary transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${0.5 + Math.random() * 1}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Central rotating icons */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Outer rotating ring */}
        <div 
          className="absolute inset-0"
          style={{ animation: 'rotateRing 3s linear infinite' }}
        >
          {serviceIcons.map(({ Icon, delay }, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div
                key={index}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                style={{
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                  animation: `iconPop 0.5s ease-out forwards, iconFloat 2s ease-in-out infinite`,
                  animationDelay: `${delay}s, ${delay}s`,
                  opacity: 0,
                }}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
            );
          })}
        </div>

        {/* Center sparkle icon */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          style={{ animation: 'centerPulse 1s ease-in-out infinite' }}
        >
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/40 to-transparent" />
          <Sparkles 
            className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'sparkleRotate 2s ease-in-out infinite' }}
          />
          {/* Shine */}
          <div className="absolute top-3 left-4 w-5 h-5 bg-white/60 rounded-full blur-sm" />
        </div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ animation: 'rotateRing 3s linear infinite reverse' }}>
          {serviceIcons.map((_, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 100;
            const x = Math.cos(angle) * radius + 128;
            const y = Math.sin(angle) * radius + 128;
            
            return (
              <line
                key={index}
                x1="128"
                y1="128"
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="5,5"
                style={{
                  animation: 'lineDash 1s linear infinite',
                }}
              />
            );
          })}
        </svg>
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
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes rotateRing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes iconPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.05);
          }
        }

        @keyframes centerPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 30px rgba(255,255,255,0.3);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 0 50px rgba(255,255,255,0.5);
          }
        }

        @keyframes sparkleRotate {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        @keyframes lineDash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 20;
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

export default ServicesSplash;
