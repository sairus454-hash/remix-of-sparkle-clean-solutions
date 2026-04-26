import { useEffect, useState, ReactNode } from 'react';

interface IdleMountProps {
  children: ReactNode;
  /** Fallback timeout (ms) if requestIdleCallback is unavailable. Default 2000. */
  timeout?: number;
}

/**
 * Defers mounting children until the browser is idle (or after a timeout).
 * Use for non-critical UI (FAB, banners, modals) so it doesn't compete with FCP/LCP.
 */
const IdleMount = ({ children, timeout = 2000 }: IdleMountProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (!cancelled) setReady(true);
    };

    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback;
    const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
      .cancelIdleCallback;

    if (typeof ric === 'function') {
      const id = ric(mount, { timeout });
      return () => {
        cancelled = true;
        if (typeof cic === 'function') cic(id);
      };
    }

    const fallback = setTimeout(mount, timeout);
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [timeout]);

  if (!ready) return null;
  return <>{children}</>;
};

export default IdleMount;
