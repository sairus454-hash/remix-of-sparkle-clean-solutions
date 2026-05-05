import { useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

/**
 * Silent auto-update for the PWA / cached app shell.
 * - Registers the service worker
 * - Polls for new versions every 60s
 * - When a new version is available, applies it immediately (skipWaiting)
 * - Reloads the tab once the new SW takes control, but only when the user is idle
 *   (no recent input, tab visible, no open dialog) so the update is unnoticeable.
 */
const PWAUpdatePrompt = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    if (typeof window === 'undefined') return;

    let reloaded = false;
    let lastInteraction = Date.now();
    const markInteraction = () => {
      lastInteraction = Date.now();
    };
    ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach((ev) =>
      window.addEventListener(ev, markInteraction, { passive: true })
    );

    const canReloadSilently = () => {
      if (reloaded) return false;
      if (document.visibilityState !== 'visible') return true; // tab hidden — safe
      // user idle for >= 3s and no modal/dialog open
      const idleMs = Date.now() - lastInteraction;
      const hasOpenDialog = !!document.querySelector(
        '[role="dialog"][data-state="open"], [data-state="open"][role="alertdialog"]'
      );
      return idleMs >= 3000 && !hasOpenDialog;
    };

    const performReload = () => {
      if (reloaded) return;
      reloaded = true;
      // Soft reload — no cache bypass, browser keeps scroll position on most browsers
      window.location.reload();
    };

    const tryReload = () => {
      if (canReloadSilently()) {
        performReload();
      } else {
        // try again shortly
        setTimeout(tryReload, 2000);
      }
    };

    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        // Apply update without prompting
        try {
          updateSW(true);
        } catch {
          /* noop */
        }
      },
      onRegisteredSW(_swUrl, registration) {
        if (!registration) return;
        // Poll for updates every 60s
        setInterval(() => {
          registration.update().catch(() => {});
        }, 60 * 1000);
        // Also check when tab becomes visible again
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch(() => {});
          }
        });
      },
    });

    // When the new SW takes control, reload silently
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', tryReload);
    }

    return () => {
      ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach((ev) =>
        window.removeEventListener(ev, markInteraction)
      );
    };
  }, []);

  return null;
};

export default PWAUpdatePrompt;
