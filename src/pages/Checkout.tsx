import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const [params] = useSearchParams();
  const priceId = params.get("price");
  const label = params.get("label") || "Santos Auto Detailing";
  const returnUrl = `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Checkout | Santos Auto Detailing</title><meta name="robots" content="noindex" /></Helmet>
      <PaymentTestModeBanner />
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Link to="/maintenance" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">{label}</p>

          {!priceId ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Missing product. Please choose a package.</p>
              <Link to="/maintenance"><Button>Back to plan</Button></Link>
            </div>
          ) : !started ? (
            <form onSubmit={start} className="max-w-md space-y-4 rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">A few details so we can set up your subscription.</p>
              <div className="space-y-2"><Label>Full name</Label><Input required value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <Button type="submit" className="w-full">Continue to payment</Button>
            </form>
          ) : (
            <div className="rounded-lg border border-border bg-card p-2 sm:p-4">
              <StripeEmbeddedCheckout priceId={priceId} customerEmail={email} customerName={name} returnUrl={returnUrl} />
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
export default Checkout;
