// Admin-only: refund the deposit for a booking and mark it Cancelled
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: { user } } = await userClient.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roleRow } = await admin.from("user_roles")
      .select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { bookingId, environment } = await req.json();
    if (!bookingId) {
      return new Response(JSON.stringify({ error: "bookingId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";

    const { data: payment } = await admin.from("payments")
      .select("stripe_payment_intent, amount, currency")
      .eq("booking_id", bookingId).eq("status", "succeeded")
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!payment?.stripe_payment_intent) {
      return new Response(JSON.stringify({ error: "No deposit payment found for this booking" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(env);
    const refund = await stripe.refunds.create({ payment_intent: payment.stripe_payment_intent });

    await admin.from("payments").insert({
      booking_id: bookingId,
      stripe_payment_intent: payment.stripe_payment_intent,
      amount: -(payment.amount),
      currency: payment.currency,
      status: "refunded",
      raw: refund as unknown as Record<string, unknown>,
    });
    await admin.from("bookings").update({ status: "Cancelled" }).eq("id", bookingId);
    await admin.from("blocked_slots").delete().eq("booking_id", bookingId);

    return new Response(JSON.stringify({ refunded: true, refund_id: refund.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("refund-deposit error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
