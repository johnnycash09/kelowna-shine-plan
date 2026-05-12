// Verifies the booking checkout session, marks paid status, blocks slot, sends emails.
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
    const paymentType = session.metadata?.type === "full_payment" ? "full" : "deposit";
    const paid = session.payment_status === "paid";

    if (paid && bookingId) {
      const newStatus = paymentType === "full" ? "Confirmed" : "Deposit Paid";
      await supabase.from("bookings")
        .update({ status: newStatus })
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

      const { data: booking } = await supabase.from("bookings")
        .select("*").eq("id", bookingId).maybeSingle();
      if (booking?.preferred_date && booking.time_window) {
        await supabase.from("blocked_slots").upsert({
          booking_id: bookingId,
          slot_date: booking.preferred_date,
          time_window: booking.time_window,
          reason: `${booking.first_name} ${booking.last_name}`,
        }, { onConflict: "slot_date,time_window" });
      }

      // Fire emails (best-effort, do not fail the verify if email errors)
      if (booking) {
        const paidAmount = (session.amount_total ?? 0) / 100;
        const fireAndForget = (kind: string, to: string, data: any) =>
          supabase.functions.invoke("send-notification", { body: { kind, to, data } })
            .catch((e) => console.error(`email ${kind} failed`, e));

        const customerKind = paymentType === "full" ? "full_paid_customer" : "deposit_paid_customer";
        await Promise.all([
          fireAndForget(customerKind, booking.email, booking),
          fireAndForget("booking_owner", booking.email, {
            ...booking, payment_type: paymentType, paid_amount: paidAmount,
          }),
        ]);
      }
    }

    return new Response(JSON.stringify({
      paid, booking_id: bookingId, payment_type: paymentType, payment_status: session.payment_status,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-deposit error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
