import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Payment received | Santos Auto Detailing</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
          <CheckCircle2 className="h-14 w-14 text-accent mx-auto mb-6" />
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
            {sessionId ? "Payment received." : "All done."}
          </h1>
          <p className="text-muted-foreground mb-8">
            We'll be in touch shortly to confirm your appointment details.
          </p>
          <Link to="/"><Button size="lg" variant="outline">Back to home</Button></Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};
export default CheckoutReturn;
