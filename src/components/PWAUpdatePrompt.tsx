import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PWAUpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      // Check for updates every 60 seconds
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

  useEffect(() => {
    if (needRefresh) {
      setShowPrompt(true);
    }
  }, [needRefresh]);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] sm:left-auto sm:right-4 sm:w-80 animate-in slide-in-from-bottom-4">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <RefreshCw className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Доступно обновление</p>
          <p className="text-xs text-muted-foreground">Нажмите для загрузки новой версии</p>
        </div>
        <Button
          size="sm"
          onClick={() => updateServiceWorker(true)}
          className="flex-shrink-0 h-8"
        >
          Обновить
        </Button>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
