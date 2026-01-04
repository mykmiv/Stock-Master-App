import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Scanner from "./pages/Scanner";
import Trade from "./pages/Trade";
import Bridge from "./pages/Bridge";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import League from "./pages/League";
import SeedLessons from "./pages/SeedLessons";
import Diagnostic from "./pages/Diagnostic";
import { AppInitializer } from "./components/AppInitializer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppInitializer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
              <Route path="/trade" element={<ProtectedRoute><Trade /></ProtectedRoute>} />
              <Route path="/bridge" element={<ProtectedRoute><Bridge /></ProtectedRoute>} />
              <Route path="/league" element={<ProtectedRoute><League /></ProtectedRoute>} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/seed-lessons" element={<SeedLessons />} />
              <Route path="/diagnostic" element={<Diagnostic />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
