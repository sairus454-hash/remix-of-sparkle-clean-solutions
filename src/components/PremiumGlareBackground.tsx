import { useEffect, useState } from 'react';

const PremiumGlareBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setMounted(true));
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dark luxurious base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />

      {/* Primary glare sweep */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.07]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, hsl(var(--primary)) 60deg, transparent 120deg)',
          animation: 'premiumRotate 12s linear infinite',
        }}
      />

      {/* Diagonal glare line */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, hsl(var(--primary) / 0.6) 45%, hsl(var(--fresh) / 0.4) 50%, transparent 65%)',
          animation: 'glareSlide 8s ease-in-out infinite',
        }}
      />

      {/* Secondary soft glare */}
      <div
        className="absolute top-0 right-0 w-full h-full opacity-[0.03]"
        style={{
          background: 'linear-gradient(225deg, transparent 40%, hsl(var(--fresh) / 0.5) 55%, transparent 70%)',
          animation: 'glareSlide 10s ease-in-out infinite reverse',
        }}
      />

      {/* Radial glow spots */}
      <div
        className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[15%] left-[10%] w-[350px] h-[350px] rounded-full opacity-[0.06] blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--fresh) / 0.4) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      {/* Subtle shimmer particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-twinkle"
          style={{
            left: `${15 + i * 18}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${2.5 + i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default PremiumGlareBackground;
