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
import PPFKelowna from "./pages/services/PPFKelowna.tsx";
import RVDetailing from "./pages/services/RVDetailing.tsx";
import MarineCeramicCoating from "./pages/services/MarineCeramicCoating.tsx";
import FleetDetailing from "./pages/services/FleetDetailing.tsx";
import BoatDetailing from "./pages/services/BoatDetailing.tsx";
import AircraftDetailing from "./pages/services/AircraftDetailing.tsx";
import KelownaLocation from "./pages/locations/KelownaLocation.tsx";
import WestKelownaLocation from "./pages/locations/WestKelownaLocation.tsx";
import VernonLocation from "./pages/locations/VernonLocation.tsx";
import PentictonLocation from "./pages/locations/PentictonLocation.tsx";
import BookNow from "./pages/BookNow.tsx";
import InstantBooking from "./pages/InstantBooking.tsx";
import CustomQuote from "./pages/CustomQuote.tsx";
import BookingSuccess from "./pages/BookingSuccess.tsx";
import QuoteSuccess from "./pages/QuoteSuccess.tsx";
import AdminAuth from "./pages/admin/AdminAuth.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import ResetPassword from "./pages/admin/ResetPassword.tsx";
import MaintenancePlan from "./pages/MaintenancePlan.tsx";
import Checkout from "./pages/Checkout.tsx";
import CheckoutReturn from "./pages/CheckoutReturn.tsx";
import MaintenanceBooking from "./pages/MaintenanceBooking.tsx";
import PortalRedeem from "./pages/PortalRedeem.tsx";
import GiftCards from "./pages/GiftCards.tsx";
import FleetAccounts from "./pages/FleetAccounts.tsx";
import SeasonalPackages from "./pages/SeasonalPackages.tsx";
import CeramicCoatingGuide from "./pages/blog/CeramicCoatingGuide.tsx";
import PaintCorrectionGuide from "./pages/blog/PaintCorrectionGuide.tsx";
import MobileDetailingGuide from "./pages/blog/MobileDetailingGuide.tsx";
import BoatDetailingGuide from "./pages/blog/BoatDetailingGuide.tsx";
import Blog from "./pages/Blog.tsx";

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
            <Route path="/ppf-kelowna" element={<PPFKelowna />} />
            <Route path="/rv-detailing-kelowna" element={<RVDetailing />} />
            <Route path="/ceramic-coating-boat-kelowna" element={<MarineCeramicCoating />} />
            <Route path="/fleet-detailing-kelowna" element={<FleetDetailing />} />
            <Route path="/boat-detailing-kelowna" element={<BoatDetailing />} />
            <Route path="/aircraft-detailing-kelowna" element={<AircraftDetailing />} />
            <Route path="/auto-detailing-kelowna" element={<KelownaLocation />} />
            <Route path="/auto-detailing-west-kelowna" element={<WestKelownaLocation />} />
            <Route path="/auto-detailing-vernon" element={<VernonLocation />} />
            <Route path="/auto-detailing-penticton" element={<PentictonLocation />} />
            <Route path="/book" element={<BookNow />} />
            <Route path="/book/instant/:slug" element={<InstantBooking />} />
            <Route path="/book/quote" element={<CustomQuote />} />
            <Route path="/book/success" element={<BookingSuccess />} />
            <Route path="/book/quote/success" element={<QuoteSuccess />} />
            <Route path="/maintenance" element={<MaintenancePlan />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/return" element={<CheckoutReturn />} />
            <Route path="/book/maintenance" element={<MaintenanceBooking />} />
            <Route path="/maintenance/portal" element={<PortalRedeem />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/fleet-accounts" element={<FleetAccounts />} />
            <Route path="/seasonal-detailing-kelowna" element={<SeasonalPackages />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/ceramic-coating-kelowna-guide" element={<CeramicCoatingGuide />} />
            <Route path="/blog/paint-correction-kelowna" element={<PaintCorrectionGuide />} />
            <Route path="/blog/mobile-detailing-kelowna" element={<MobileDetailingGuide />} />
            <Route path="/blog/boat-detailing-kelowna" element={<BoatDetailingGuide />} />
            <Route path="/admin" element={<AdminAuth />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
