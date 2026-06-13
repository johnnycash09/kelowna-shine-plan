import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

const PortalRedeem = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setError("Missing link token."); return; }
    (async () => {
      const { data, error } = await supabase.functions.invoke("redeem-portal-token", {
        body: {
          token,
          returnUrl: window.location.origin + "/maintenance",
          environment: getStripeEnvironment(),
        },
      });
      if (error || !data?.url) { setError(data?.error || error?.message || "Could not open portal."); return; }
      window.location.href = data.url;
    })();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Open billing portal | Santos</title>
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Open billing portal | Santos" />
        <meta name="twitter:title" content="Open billing portal | Santos" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-md text-center">
          {!error ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Opening your billing portal…</p>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl mb-3">Link not valid</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link to="/maintenance"><Button variant="outline">Request a new link</Button></Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
export default PortalRedeem;
