import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import InteriorDetailing from "./pages/services/InteriorDetailing.tsx";
import ExteriorDetailing from "./pages/services/ExteriorDetailing.tsx";
import CeramicCoating from "./pages/services/CeramicCoating.tsx";
import PaintCorrection from "./pages/services/PaintCorrection.tsx";
import FleetDetailing from "./pages/services/FleetDetailing.tsx";
import BoatDetailing from "./pages/services/BoatDetailing.tsx";
import AircraftDetailing from "./pages/services/AircraftDetailing.tsx";
import KelownaLocation from "./pages/locations/KelownaLocation.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mobile-detailing-kelowna" element={<Index />} />
            <Route path="/interior-detailing-kelowna" element={<InteriorDetailing />} />
            <Route path="/exterior-detailing-kelowna" element={<ExteriorDetailing />} />
            <Route path="/ceramic-coating-kelowna" element={<CeramicCoating />} />
            <Route path="/paint-correction-kelowna" element={<PaintCorrection />} />
            <Route path="/fleet-detailing-kelowna" element={<FleetDetailing />} />
            <Route path="/boat-detailing-kelowna" element={<BoatDetailing />} />
            <Route path="/aircraft-detailing-kelowna" element={<AircraftDetailing />} />
            <Route path="/auto-detailing-kelowna" element={<KelownaLocation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
