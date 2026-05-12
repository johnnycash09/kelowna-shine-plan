// Admin-only: cancel a subscription at period end (or immediately).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: { user } } = await userClient.auth.getUser(token);
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    const admin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roleRow } = await admin.from("user_roles")
      .select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    const { subscriptionId, immediate, environment } = await req.json();
    if (!subscriptionId) return new Response(JSON.stringify({ error: "subscriptionId required" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";
    const stripe = createStripeClient(env);

    let result;
    if (immediate) {
      result = await stripe.subscriptions.cancel(subscriptionId);
    } else {
      result = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    }
    return new Response(JSON.stringify({ canceled: true, status: result.status, cancel_at_period_end: result.cancel_at_period_end }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("cancel-subscription error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
