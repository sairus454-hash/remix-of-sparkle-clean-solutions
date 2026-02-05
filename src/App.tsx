import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollButton from "@/components/ScrollButton";
import FreeDeliveryBadge from "@/components/FreeDeliveryBadge";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Prices from "./pages/Prices";
import Equipment from "./pages/Equipment";
import Auto from "./pages/Auto";
import Ozone from "./pages/Ozone";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import Handyman from "./pages/Handyman";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
 import Windows from "./pages/Windows";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ScrollButton />
            <FreeDeliveryBadge />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/auto" element={<Auto />} />
              <Route path="/ozone" element={<Ozone />} />
               <Route path="/windows" element={<Windows />} />
              <Route path="/handyman" element={<Handyman />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contacts" element={<Contacts />} />
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
