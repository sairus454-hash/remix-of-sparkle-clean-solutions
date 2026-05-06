import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import heroBannerDesktop from "@/assets/hero-banner.jpg?url";
import heroBannerMobile from "@/assets/hero-banner-mobile.webp?url";

// Force light theme — remove any dark class that browser/OS might add
document.documentElement.classList.remove('dark');

// Preload the hero (LCP) image as early as possible — only the variant the device will actually use.
// Starting the fetch from <head> at module-eval time (before React hydrates) cuts seconds off LCP on slow links.
(function preloadHeroLCP() {
  try {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const href = isMobile ? heroBannerMobile : heroBannerDesktop;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    (link as any).fetchPriority = 'high';
    if (isMobile) link.type = 'image/webp';
    document.head.appendChild(link);
  } catch {}
})();

// Defer non-critical animation CSS — loaded after first paint
const loadDeferredStyles = () => import("./styles/animations.css");
if (document.readyState === 'complete') {
  loadDeferredStyles();
} else {
  window.addEventListener('load', loadDeferredStyles, { once: true });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
