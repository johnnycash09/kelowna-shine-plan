// Lightweight session verification for the /checkout/return page.
// Used by subscription (embedded) checkout to confirm activation status.
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { session_id, environment } = await req.json();
    if (!session_id || typeof session_id !== "string") {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const env: StripeEnv = environment === "live" ? "live" : "sandbox";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription", "customer"],
    });

    const mode = session.mode; // "payment" | "subscription" | "setup"
    const paid = session.payment_status === "paid" || session.payment_status === "no_payment_required";
    const sub = typeof session.subscription === "object" ? session.subscription : null;
    const customerEmail =
      session.customer_details?.email ||
      (typeof session.customer === "object" && session.customer && "email" in session.customer
        ? (session.customer as any).email : null);

    return new Response(JSON.stringify({
      mode,
      paid,
      status: session.status, // "open" | "complete" | "expired"
      payment_status: session.payment_status,
      subscription_status: sub?.status ?? null,
      customer_email: customerEmail,
      customer_name: session.customer_details?.name ?? session.metadata?.customer_name ?? null,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-checkout error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
