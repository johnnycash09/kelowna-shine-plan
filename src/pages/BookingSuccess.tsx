import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const BookingSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<"loading" | "paid" | "pending">("loading");

  useEffect(() => {
    if (!sessionId) { setState("pending"); return; }
    supabase.functions.invoke("verify-deposit", { body: { session_id: sessionId } })
      .then(({ data }) => setState(data?.paid ? "paid" : "pending"))
      .catch(() => setState("pending"));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Booking Confirmed | Santos Auto Detailing</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Booking Confirmed | Santos Auto Detailing" />
        <meta name="twitter:title" content="Booking Confirmed | Santos Auto Detailing" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
          {state === "loading" && (
            <><Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Confirming your deposit…</p></>
          )}
          {state !== "loading" && (
            <>
              <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-6" />
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
                {state === "paid" ? "You're booked." : "Booking received."}
              </h1>
              <p className="text-muted-foreground mb-8">
                Your Santos detail request has been received and your deposit has secured your spot.
                We'll confirm the final appointment details shortly.
              </p>
              <Link to="/"><Button size="lg" variant="outline">Back to home</Button></Link>
            </>
          )}
        </div>
      </main>
      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
};
export default BookingSuccess;
