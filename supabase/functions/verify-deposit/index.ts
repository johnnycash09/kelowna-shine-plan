import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { session_id, environment } = await req.json();
    if (!session_id) {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const bookingId = session.metadata?.booking_id;
    const paid = session.payment_status === "paid";

    if (paid && bookingId) {
      // Mark booking deposit paid
      await supabase.from("bookings")
        .update({ status: "Deposit Paid" })
        .eq("id", bookingId)
        .eq("status", "New Booking");

      // Idempotent payment row
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

      // Block the slot for this booking
      const { data: booking } = await supabase.from("bookings")
        .select("preferred_date, time_window, first_name, last_name")
        .eq("id", bookingId).maybeSingle();
      if (booking?.preferred_date && booking.time_window) {
        await supabase.from("blocked_slots").upsert({
          booking_id: bookingId,
          slot_date: booking.preferred_date,
          time_window: booking.time_window,
          reason: `${booking.first_name} ${booking.last_name}`,
        }, { onConflict: "slot_date,time_window" });
      }
    }

    return new Response(JSON.stringify({
      paid, booking_id: bookingId, payment_status: session.payment_status,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-deposit error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
