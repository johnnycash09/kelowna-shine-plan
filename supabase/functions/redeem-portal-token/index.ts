// Validates a portal magic-link token and returns the Stripe billing portal URL.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token, returnUrl, environment } = await req.json();
    if (!token) return new Response(JSON.stringify({ error: "token required" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: link } = await supabase.from("magic_links")
      .select("*").eq("token", token).eq("purpose", "portal").maybeSingle();
    if (!link) return new Response(JSON.stringify({ error: "Invalid link" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    if (link.used_at) return new Response(JSON.stringify({ error: "Link already used. Request a new one." }), {
      status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    if (new Date(link.expires_at).getTime() < Date.now()) return new Response(JSON.stringify({ error: "Link expired. Request a new one." }), {
      status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    const { data: sub } = await supabase.from("subscriptions")
      .select("stripe_customer_id").eq("id", link.subscription_id).maybeSingle();
    if (!sub?.stripe_customer_id) return new Response(JSON.stringify({ error: "Subscription not found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    const stripe = createStripeClient(env);
    const portal = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      ...(returnUrl && { return_url: returnUrl }),
    });
    await supabase.from("magic_links").update({ used_at: new Date().toISOString() }).eq("id", link.id);

    return new Response(JSON.stringify({ url: portal.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("redeem-portal-token error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
