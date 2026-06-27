import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthProvider } from "@/context/HealthContext";
import AppNavbar from "@/components/AppNavbar";
import HomePage from "./pages/HomePage";
import HealthEntryPage from "./pages/HealthEntryPage";
import ResultsPage from "./pages/ResultsPage";
import FitnessPage from "./pages/FitnessPage";
import DietChartPage from "./pages/DietChartPage";
import FoodGuidePage from "./pages/FoodGuidePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HealthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entry" element={<HealthEntryPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/fitness" element={<FitnessPage />} />
            <Route path="/diet-chart" element={<DietChartPage />} />
            <Route path="/food-guide" element={<FoodGuidePage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HealthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
