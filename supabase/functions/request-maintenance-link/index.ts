// Issues a magic link to schedule the next monthly maintenance visit.
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
      .select("id, customer_name, status")
      .eq("customer_email", email)
      .eq("environment", env)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1).maybeSingle();
    if (!sub) {
      // Don't leak whether email exists
      return new Response(JSON.stringify({ sent: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await supabase.from("magic_links").insert({
      token, purpose: "maintenance_booking", email, subscription_id: sub.id, expires_at,
    });
    const url = `${origin}/book/maintenance?token=${token}`;
    await supabase.functions.invoke("send-notification", {
      body: { kind: "maintenance_booking_link", to: email, data: { customer_name: sub.customer_name, url } },
    }).catch((e) => console.error("maintenance link email failed", e));
    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("request-maintenance-link error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
