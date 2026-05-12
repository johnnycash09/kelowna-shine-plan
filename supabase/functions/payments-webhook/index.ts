// Stripe webhook for subscription lifecycle (maintenance plan)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { verifyWebhook, type StripeEnv } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function db() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function fetchCustomer(customerId: string, env: StripeEnv) {
  try {
    const r = await fetch(`https://connector-gateway.lovable.dev/stripe/v1/customers/${customerId}`, {
      headers: {
        "X-Connection-Api-Key": Deno.env.get(env === "sandbox" ? "STRIPE_SANDBOX_API_KEY" : "STRIPE_LIVE_API_KEY")!,
        "Lovable-API-Key": Deno.env.get("LOVABLE_API_KEY")!,
      },
    });
    if (r.ok) return await r.json();
  } catch (e) { console.error("customer fetch failed", e); }
  return null;
}

async function upsertSubscription(sub: any, env: StripeEnv): Promise<{ isNew: boolean; email: string; name: string | null }> {
  const item = sub.items?.data?.[0];
  const priceId = item?.price?.lookup_key
    || item?.price?.metadata?.lovable_external_id
    || item?.price?.id;
  const productId = item?.price?.product;
  const periodStart = item?.current_period_start ?? sub.current_period_start;
  const periodEnd = item?.current_period_end ?? sub.current_period_end;

  let email = sub.metadata?.customer_email ?? "";
  let name = sub.metadata?.customer_name ?? null;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
  if (customerId) {
    const c = await fetchCustomer(customerId, env);
    if (c) { email = email || c.email || ""; name = name || c.name || null; }
  }

  // Detect if this row already exists
  const { data: existing } = await db().from("subscriptions")
    .select("id").eq("stripe_subscription_id", sub.id).maybeSingle();

  await db().from("subscriptions").upsert({
    stripe_subscription_id: sub.id,
    stripe_customer_id: customerId,
    customer_email: email,
    customer_name: name,
    product_id: productId,
    price_id: priceId,
    status: sub.status,
    current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: sub.cancel_at_period_end || false,
    environment: env,
    updated_at: new Date().toISOString(),
  }, { onConflict: "stripe_subscription_id" });

  return { isNew: !existing, email, name };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const result = await upsertSubscription(event.data.object, env);
        if (event.type === "customer.subscription.created" && result.isNew && result.email) {
          // Fire welcome + owner emails
          const origin = "https://santosautodetailing.ca";
          db().functions.invoke("send-notification", {
            body: {
              kind: "subscription_welcome", to: result.email,
              data: { customer_name: result.name, book_url: `${origin}/book/maintenance?email=${encodeURIComponent(result.email)}` },
            },
          }).catch((e) => console.error(e));
          db().functions.invoke("send-notification", {
            body: { kind: "subscription_owner", to: result.email, data: { customer_email: result.email, customer_name: result.name } },
          }).catch((e) => console.error(e));
        }
        break;
      }
      case "customer.subscription.deleted":
        await db().from("subscriptions").update({
          status: "canceled", updated_at: new Date().toISOString(),
        }).eq("stripe_subscription_id", event.data.object.id).eq("environment", env);
        break;
      default:
        console.log("Unhandled event:", event.type);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("webhook error", e);
    return new Response("Webhook error", { status: 400 });
  }
});
