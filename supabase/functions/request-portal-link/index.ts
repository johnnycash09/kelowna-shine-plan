// Customer-facing: send a magic link to manage subscription.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { email, origin, environment } = await req.json();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: sub } = await supabase.from("subscriptions")
      .select("id, customer_name, stripe_customer_id")
      .eq("customer_email", email)
      .eq("environment", env)
      .order("created_at", { ascending: false })
      .limit(1).maybeSingle();

    // Always respond success-ish to avoid email enumeration
    if (!sub?.stripe_customer_id) {
      return new Response(JSON.stringify({ sent: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const expires_at = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    await supabase.from("magic_links").insert({
      token, purpose: "portal", email, subscription_id: sub.id, expires_at,
    });
    const url = `${origin}/maintenance/portal?token=${token}`;

    await supabase.functions.invoke("send-notification", {
      body: { kind: "portal_magic_link", to: email, data: { customer_name: sub.customer_name, url } },
    }).catch((e) => console.error("portal email failed", e));

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("request-portal-link error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
