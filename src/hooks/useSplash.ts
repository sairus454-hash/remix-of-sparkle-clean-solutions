import { useState, useCallback } from 'react';

/**
 * Shows splash only once per session per page key.
 * After first visit, splash is skipped for faster navigation.
 */
export const useSplash = (pageKey: string) => {
  const storageKey = `splash_seen_${pageKey}`;
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !sessionStorage.getItem(storageKey);
    } catch {
      return true;
    }
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    try {
      sessionStorage.setItem(storageKey, '1');
    } catch {
      // ignore
    }
  }, [storageKey]);

  return { showSplash, handleSplashComplete };
};
