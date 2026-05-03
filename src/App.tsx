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
import LegacyLangRedirect from "@/components/LegacyLangRedirect";
import IdleMount from "@/components/IdleMount";
const GeoCityRedirect = lazy(() => import("@/components/GeoCityRedirect"));

// Defer non-critical global components — they don't affect FCP/LCP
const SecurityHeaders = lazy(() => import("@/components/SecurityHeaders"));
const PWAUpdatePrompt = lazy(() => import("@/components/PWAUpdatePrompt"));

// Lazy load non-critical UI (mounted only after browser is idle)
const FreeDeliveryBadge = lazy(() => import("@/components/FreeDeliveryBadge"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));

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
const FloorCleaning = lazy(() => import("./pages/FloorCleaning"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const CityPage = lazy(() => import("./pages/CityPage"));

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

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Suspense fallback={null}><SecurityHeaders /></Suspense>
                <Suspense fallback={null}><PWAUpdatePrompt /></Suspense>
                <ScrollToTop />
                <LegacyLangRedirect />

                <IdleMount timeout={2500}>
                  <Suspense fallback={null}>
                    <FreeDeliveryBadge />
                  </Suspense>
                </IdleMount>
                <IdleMount timeout={3000}>
                  <Suspense fallback={null}>
                    <CookieConsent />
                  </Suspense>
                </IdleMount>
                
                <Suspense fallback={<PageLoader />}>
                  {(() => {
                    // Define every route once and replicate it under /ru, /en, /uk
                    // so each language has its own indexable URL.
                    const ROUTES: Array<{ path: string; element: JSX.Element }> = [
                      { path: '/', element: <Index /> },
                      { path: '/about', element: <About /> },
                      { path: '/services', element: <Services /> },
                      { path: '/prices', element: <Prices /> },
                      { path: '/equipment', element: <Equipment /> },
                      { path: '/impregnation', element: <Impregnation /> },
                      { path: '/auto', element: <Auto /> },
                      { path: '/ozone', element: <Ozone /> },
                      { path: '/windows', element: <Windows /> },
                      { path: '/cleaning', element: <Cleaning /> },
                      { path: '/floor-cleaning', element: <FloorCleaning /> },
                      { path: '/blog', element: <Blog /> },
                      { path: '/blog/:id', element: <BlogArticle /> },
                      { path: '/handyman', element: <Handyman /> },
                      { path: '/reviews', element: <Reviews /> },
                      { path: '/privacy-policy', element: <PrivacyPolicy /> },
                      { path: '/terms', element: <Terms /> },
                      { path: '/contacts', element: <Contacts /> },
                      { path: '/cookies', element: <Cookies /> },
                      { path: '/sitemap', element: <Sitemap /> },
                      { path: '/city/:slug', element: <CityPage /> },
                    ];
                    const PREFIXES = ['', '/ru', '/en', '/uk'];
                    return (
                      <Routes>
                        {PREFIXES.flatMap((prefix) =>
                          ROUTES.map((r) => (
                            <Route
                              key={`${prefix}${r.path}`}
                              path={prefix + (r.path === '/' ? (prefix ? '' : '/') : r.path)}
                              element={r.element}
                            />
                          )),
                        )}
                        {/* Admin stays unprefixed */}
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
                    );
                  })()}
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
