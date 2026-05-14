import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

type Result = {
  mode: string;
  paid: boolean;
  status: string;
  subscription_status: string | null;
  customer_email: string | null;
  customer_name: string | null;
};

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(!!sessionId);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-checkout", {
          body: { session_id: sessionId, environment: getStripeEnvironment() },
        });
        if (error) throw error;
        setResult(data as Result);
      } catch (e) {
        setError((e as Error).message || "Could not verify payment");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  const isSubscription = result?.mode === "subscription";
  const success = result && (result.paid || result.subscription_status === "active" || result.subscription_status === "trialing");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Payment received | Santos Auto Detailing</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
          {loading ? (
            <>
              <Loader2 className="h-10 w-10 text-muted-foreground mx-auto mb-6 animate-spin" />
              <h1 className="font-display text-2xl font-semibold mb-2">Confirming your payment…</h1>
              <p className="text-muted-foreground">One moment.</p>
            </>
          ) : error || (result && !success) ? (
            <>
              <AlertCircle className="h-14 w-14 text-destructive mx-auto mb-6" />
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
                We couldn't confirm your payment
              </h1>
              <p className="text-muted-foreground mb-8">
                {error || "If you were charged, please contact us and we'll sort it out right away."}
              </p>
              <Link to="/maintenance"><Button size="lg" variant="outline">Back to plan</Button></Link>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-6" />
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
                {isSubscription ? "Subscription active." : sessionId ? "Payment received." : "All done."}
              </h1>
              <p className="text-muted-foreground mb-8">
                {isSubscription
                  ? "Welcome to the Maintenance Plan. Check your inbox — we've sent links to schedule your monthly visit and manage your subscription."
                  : "We'll be in touch shortly to confirm your appointment details."}
              </p>
              <Link to="/"><Button size="lg" variant="outline">Back to home</Button></Link>
            </>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
export default CheckoutReturn;
