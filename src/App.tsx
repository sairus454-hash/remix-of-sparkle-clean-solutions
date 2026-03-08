import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

import SecurityHeaders from "@/components/SecurityHeaders";
import PWAUpdatePrompt from "@/components/PWAUpdatePrompt";

// Lazy load non-critical UI
const FreeDeliveryBadge = lazy(() => import("@/components/FreeDeliveryBadge"));

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Prices = lazy(() => import("./pages/Prices"));
const Equipment = lazy(() => import("./pages/Equipment"));
const Impregnation = lazy(() => import("./pages/Impregnation"));
const Auto = lazy(() => import("./pages/Auto"));
const Ozone = lazy(() => import("./pages/Ozone"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Handyman = lazy(() => import("./pages/Handyman"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Windows = lazy(() => import("./pages/Windows"));
const Cleaning = lazy(() => import("./pages/Cleaning"));
const Blog = lazy(() => import("./pages/Blog"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min cache
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Subtle loading fallback — no jarring spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center animate-page-loader">
    <div className="w-10 h-10 rounded-full bg-gradient-hero opacity-40" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SecurityHeaders />
            <PWAUpdatePrompt />
            <ScrollToTop />
            
            <Suspense fallback={null}>
              <FreeDeliveryBadge />
            </Suspense>
            
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/impregnation" element={<Impregnation />} />
                <Route path="/auto" element={<Auto />} />
                <Route path="/ozone" element={<Ozone />} />
                <Route path="/windows" element={<Windows />} />
                <Route path="/cleaning" element={<Cleaning />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/handyman" element={<Handyman />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
