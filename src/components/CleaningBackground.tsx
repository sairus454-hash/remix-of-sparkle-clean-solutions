import { useEffect, useState } from 'react';

const CleaningBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting to not block initial render
    // Safari < 16.4 doesn't support requestIdleCallback
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
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none will-change-auto">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-accent/30 to-fresh/10" />
      
      {/* Simplified animated gradient orbs - reduced from 3 to 2 */}
      <div 
        className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(var(--fresh) / 0.4) 0%, transparent 70%)',
          animationDuration: '8s',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />

      {/* Reduced bubble patterns from 6 to 3 */}
      <div className="absolute inset-0">
        {[0, 2, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}
      </div>

      {/* Clean wave pattern at bottom */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-32 sm:h-48 opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path 
          fill="hsl(var(--primary))"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path 
          fill="hsl(var(--fresh))"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Reduced sparkle effects from 8 to 4 */}
      {[0, 2, 5, 7].map((i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary/40 rounded-full animate-twinkle"
          style={{
            left: `${15 + i * 10}%`,
            top: `${10 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CleaningBackground;
