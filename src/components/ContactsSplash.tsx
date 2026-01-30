import { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Send, Headphones } from 'lucide-react';

interface ContactsSplashProps {
  onComplete: () => void;
}

const ContactsSplash = ({ onComplete }: ContactsSplashProps) => {
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

  const floatingIcons = [
    { Icon: Phone, delay: 0, x: 15, y: 20 },
    { Icon: Mail, delay: 0.1, x: 80, y: 15 },
    { Icon: MessageCircle, delay: 0.2, x: 25, y: 70 },
    { Icon: MapPin, delay: 0.3, x: 75, y: 75 },
    { Icon: Send, delay: 0.15, x: 10, y: 45 },
    { Icon: Headphones, delay: 0.25, x: 85, y: 45 },
  ];

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-fresh to-primary transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Floating contact icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `contactFloat 2s ease-in-out infinite, contactPop 0.5s ease-out forwards`,
            animationDelay: `${delay}s`,
            opacity: 0,
          }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
        </div>
      ))}

      {/* Connection lines radiating from center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-white/40 to-transparent origin-left"
            style={{
              width: '40%',
              transform: `rotate(${i * 45}deg)`,
              animation: 'lineGrow 1s ease-out forwards',
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Central phone ring animation */}
      <div className="relative">
        {/* Pulse rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/30"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              animation: 'contactRipple 1.5s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Main phone icon */}
        <div 
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl"
          style={{ animation: 'phoneRing 0.5s ease-in-out infinite' }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          <Phone 
            className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg relative z-10" 
            style={{ animation: 'phoneVibrate 0.1s linear infinite' }}
          />
          {/* Notification dot */}
          <div 
            className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            style={{ animation: 'notificationPop 0.5s ease-out forwards' }}
          >
            <span className="text-xs font-bold text-yellow-900">!</span>
          </div>
        </div>

        {/* Flying messages */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center"
            style={{
              animation: 'messageFly 1.5s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 90}deg) translateX(80px)`,
            }}
          >
            <Send className="w-4 h-4 text-primary" style={{ transform: `rotate(${-i * 90 + 45}deg)` }} />
          </div>
        ))}
      </div>

      {/* Branding */}
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
          Свяжитесь с нами
        </p>
      </div>

      <style>{`
        @keyframes contactFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes contactPop {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes contactRipple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }

        @keyframes phoneRing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes phoneVibrate {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        @keyframes notificationPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        @keyframes messageFly {
          0% { opacity: 1; transform: rotate(var(--rotation)) translateX(60px) scale(1); }
          100% { opacity: 0; transform: rotate(var(--rotation)) translateX(150px) scale(0.5); }
        }

        @keyframes lineGrow {
          0% { transform: rotate(var(--rotation)) scaleX(0); opacity: 0; }
          100% { transform: rotate(var(--rotation)) scaleX(1); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactsSplash;
