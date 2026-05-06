import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import heroBannerDesktop from "@/assets/hero-banner.jpg?url";
import heroBannerMobile from "@/assets/hero-banner-mobile.webp?url";
import heroHouseCleaning from "@/assets/hero-house-cleaning.jpg?url";
import autoCleaning1 from "@/assets/auto-cleaning-1.jpg?url";
import handyman1 from "@/assets/handyman-1.jpg?url";
import ozoneRoom from "@/assets/ozone-room.jpg?url";
import windowCleaning1 from "@/assets/window-cleaning-1.jpg?url";
import aboutHeroPhoto from "@/assets/about-hero-photo.jpg?url";

// Force light theme — remove any dark class that browser/OS might add
document.documentElement.classList.remove('dark');

// Preload the hero (LCP) image as early as possible — route-aware so each top-level page
// starts fetching its real LCP candidate before React hydrates.
(function preloadHeroLCP() {
  try {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const path = window.location.pathname.replace(/^\/(ru|en|uk)(?=\/|$)/, '') || '/';
    let href: string;
    let type = 'image/jpeg';
    if (path.startsWith('/cleaning')) { href = heroHouseCleaning; }
    else if (path.startsWith('/auto')) { href = autoCleaning1; }
    else if (path.startsWith('/handyman')) { href = handyman1; }
    else if (path.startsWith('/ozone')) { href = ozoneRoom; }
    else if (path.startsWith('/windows')) { href = windowCleaning1; }
    else if (path.startsWith('/about')) { href = aboutHeroPhoto; }
    else {
      href = isMobile ? heroBannerMobile : heroBannerDesktop;
      type = isMobile ? 'image/webp' : 'image/jpeg';
    }
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    (link as any).fetchPriority = 'high';
    link.type = type;
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
