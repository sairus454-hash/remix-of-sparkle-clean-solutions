import { useState, useEffect } from 'react';
import { Star, MessageCircle, ThumbsUp, Heart } from 'lucide-react';

interface ReviewsSplashProps {
  onComplete: () => void;
}

const ReviewsSplash = ({ onComplete }: ReviewsSplashProps) => {
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
      {/* Floating stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `starFloat ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <Star 
              className="text-yellow-300 fill-yellow-300" 
              size={12 + Math.random() * 12} 
              style={{ animation: `twinkle ${0.5 + Math.random()}s ease-in-out infinite` }}
            />
          </div>
        ))}
      </div>

      {/* Central review animation */}
      <div className="relative">
        {/* Floating speech bubbles */}
        {[...Array(5)].map((_, i) => {
          const positions = [
            { x: -130, y: -80, rotate: -10 },
            { x: 130, y: -60, rotate: 10 },
            { x: -110, y: 60, rotate: -5 },
            { x: 120, y: 80, rotate: 8 },
            { x: 0, y: -120, rotate: 0 },
          ];
          const icons = [Star, ThumbsUp, Heart, MessageCircle, Star];
          const Icon = icons[i];
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${positions[i].x}px)`,
                top: `calc(50% + ${positions[i].y}px)`,
                transform: `translate(-50%, -50%) rotate(${positions[i].rotate}deg)`,
                animation: `bubblePop 0.5s ease-out forwards, bubbleFloat 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s, ${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                <Icon className={`w-6 h-6 ${i === 0 || i === 4 ? 'text-yellow-300 fill-yellow-300' : 'text-white'}`} />
                {/* Speech bubble tail */}
                <div 
                  className="absolute w-3 h-3 bg-white/20 transform rotate-45"
                  style={{
                    bottom: '-6px',
                    left: '50%',
                    marginLeft: '-6px',
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Main star rating display */}
        <div 
          className="relative"
          style={{ animation: 'ratingPulse 1s ease-in-out infinite' }}
        >
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/20 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
            
            {/* 5 stars */}
            <div className="flex gap-1 mb-2 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className="w-6 h-6 md:w-7 md:h-7 text-yellow-300 fill-yellow-300 drop-shadow-lg" 
                  style={{ 
                    animation: `starPop 0.3s ease-out forwards`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                    transform: 'scale(0)',
                  }}
                />
              ))}
            </div>
            
            {/* Rating number */}
            <div 
              className="text-white font-bold text-3xl md:text-4xl drop-shadow-lg relative z-10"
              style={{ animation: 'numberPop 0.5s ease-out forwards', animationDelay: '0.3s', opacity: 0 }}
            >
              5.0
            </div>

            {/* Shine */}
            <div className="absolute top-4 left-6 w-6 h-6 bg-white/50 rounded-full blur-sm" />
          </div>

          {/* Circular progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
            />
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset="289"
              style={{ animation: 'progressFill 0.8s ease-out forwards' }}
            />
          </svg>
        </div>

        {/* Radiating hearts */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4"
            style={{
              left: '50%',
              top: '50%',
              animation: 'heartBurst 1s ease-out infinite',
              animationDelay: `${i * 0.15}s`,
              transform: `rotate(${i * 60}deg)`,
            }}
          >
            <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
          </div>
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
        @keyframes starFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(10deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes bubblePop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes bubbleFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-8px);
          }
        }

        @keyframes ratingPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes starPop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes numberPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progressFill {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes heartBurst {
          0% {
            transform: rotate(var(--rotation)) translateX(70px) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translateX(130px) scale(0);
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

export default ReviewsSplash;
