import { useState, useEffect } from 'react';
import splashLogo from '@/assets/masterclean-splash-logo.jpg';

interface SiteSplashProps {
  onComplete: () => void;
}

const SiteSplash = ({ onComplete }: SiteSplashProps) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 1500);
    const completeTimer = setTimeout(() => onComplete(), 1750);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-primary/30"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              animation: `splashRing 1.8s ease-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <img
        src={splashLogo}
        alt="MasterClean"
        className="relative z-10 w-80 md:w-96 object-contain drop-shadow-xl"
        style={{ animation: 'splashLogoIn 0.6s ease-out forwards' }}
      />

      {/* Shimmer line */}
      <div
        className="absolute bottom-24 w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ animation: 'splashShimmer 1.5s ease-in-out infinite' }}
      />

      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes splashRing {
          0% { transform: scale(0.7); opacity: 0.6; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes splashShimmer {
          0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
          50% { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default SiteSplash;
