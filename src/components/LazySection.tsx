import { useRef, useState, useEffect, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Placeholder height to prevent layout shift */
  minHeight?: string;
  /** Root margin for IntersectionObserver */
  rootMargin?: string;
  /** CSS class for the wrapper */
  className?: string;
}

/**
 * Defers rendering of below-fold sections until they are near the viewport.
 * Reduces initial DOM size and speeds up FCP/LCP on mobile.
 */
const LazySection = ({ children, minHeight = '200px', rootMargin = '300px', className }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default LazySection;
