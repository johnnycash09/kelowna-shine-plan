import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SANDBOX_API_KEY") || Deno.env.get("STRIPE_API_KEY");
    const stripe = new Stripe(stripeKey!, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const bookingId = session.metadata?.booking_id;
    const paid = session.payment_status === "paid";

    if (paid && bookingId) {
      await supabase.from("bookings")
        .update({ status: "Deposit Paid" })
        .eq("id", bookingId)
        .eq("status", "New Booking");

      // Idempotent insert
      const { data: existing } = await supabase.from("payments")
        .select("id").eq("stripe_session_id", session.id).maybeSingle();
      if (!existing) {
        await supabase.from("payments").insert({
          booking_id: bookingId,
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          amount: session.amount_total ?? 0,
          currency: session.currency ?? "cad",
          status: "succeeded",
          raw: session as unknown as Record<string, unknown>,
        });
      }
    }

    return new Response(JSON.stringify({
      paid,
      booking_id: bookingId,
      payment_status: session.payment_status,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-deposit error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
