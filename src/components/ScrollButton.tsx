import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollButton = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      // Show scroll up button after scrolling 300px
      setShowScrollUp(scrollTop > 300);
      
      // Hide scroll down button when near the bottom
      setShowScrollDown(scrollTop + clientHeight < scrollHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2">
      {showScrollUp && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gradient-hero shadow-glow hover:opacity-90 transition-all duration-300 animate-fade-up touch-manipulation active:scale-95"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 sm:w-5 sm:h-5 text-primary-foreground" />
        </Button>
      )}
      
      {showScrollDown && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gradient-hero shadow-glow hover:opacity-90 transition-all duration-300 animate-fade-up touch-manipulation active:scale-95"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-6 h-6 sm:w-5 sm:h-5 text-primary-foreground" />
        </Button>
      )}
    </div>
  );
};

export default ScrollButton;
