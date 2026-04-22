import { useEffect } from 'react';

const PWAUpdatePrompt = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;

    let updateInterval: ReturnType<typeof setInterval> | undefined;

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          updateInterval = setInterval(() => {
            registration.update();
          }, 60 * 1000);
        })
        .catch((error) => {
          console.error('SW registration error:', error);
        });
    });

    return () => {
      if (updateInterval) clearInterval(updateInterval);
    };
  }, []);

  return null;
};

export default PWAUpdatePrompt;
