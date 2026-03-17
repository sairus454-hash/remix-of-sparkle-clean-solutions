import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

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
