import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Try immediately, then retry after page renders
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      
      if (!scrollToHash()) {
        const timer1 = setTimeout(scrollToHash, 300);
        const timer2 = setTimeout(scrollToHash, 800);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
