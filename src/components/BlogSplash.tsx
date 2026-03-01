import { useState, useEffect } from 'react';
import { BookOpen, Newspaper, Pencil, FileText } from 'lucide-react';

interface BlogSplashProps {
  onComplete: () => void;
}

const BlogSplash = ({ onComplete }: BlogSplashProps) => {
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

  const floatingIcons = [
    { Icon: Newspaper, delay: 0, x: 15, y: 20 },
    { Icon: Pencil, delay: 0.15, x: 80, y: 25 },
    { Icon: FileText, delay: 0.1, x: 20, y: 70 },
    { Icon: BookOpen, delay: 0.25, x: 75, y: 65 },
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary via-fresh to-primary transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `blogFloat 2.5s ease-in-out infinite, blogPop 0.5s ease-out forwards`,
            animationDelay: `${delay}s`,
            opacity: 0,
          }}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
        </div>
      ))}

      {/* Pages flipping animation */}
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-white/30"
            style={{
              width: `${100 + i * 50}px`,
              height: `${130 + i * 50}px`,
              animation: 'blogPage 1.5s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl"
          style={{ animation: 'blogBookBounce 1.2s ease-in-out infinite' }}
        >
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
          <BookOpen className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg relative z-10" />
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
          Блог чистоты
        </p>
      </div>

      <style>{`
        @keyframes blogFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes blogPop {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes blogPage {
          0% { transform: translate(-50%, -50%) scale(0.8) rotate(-3deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.3) rotate(3deg); opacity: 0; }
        }
        @keyframes blogBookBounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BlogSplash;
