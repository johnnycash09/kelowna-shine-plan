import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Checkout = () => {
  const [params] = useSearchParams();
  const priceId = params.get("price");
  const label = params.get("label") || "Santos Auto Detailing";
  const returnUrl = `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout | Santos Auto Detailing</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PaymentTestModeBanner />
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <Link to="/book" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">{label}</p>

          {priceId ? (
            <div className="rounded-lg border border-border bg-card p-2 sm:p-4">
              <StripeEmbeddedCheckout priceId={priceId} returnUrl={returnUrl} />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Missing product. Please choose a package.</p>
              <Link to="/book"><Button>Browse packages</Button></Link>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
export default Checkout;
