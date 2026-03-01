import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdatePrompt = () => {
  useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('SW registration error:', error);
    },
  });

  return null;
};

export default PWAUpdatePrompt;
