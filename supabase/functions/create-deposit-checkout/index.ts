import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders, createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

interface AddonInput { key: string; label: string; price: number }
interface BookingInput {
  package_slug: string; package_name: string; base_price: number;
  vehicle_size: string; size_modifier: number;
  condition: string; condition_modifier: number;
  vehicle_year?: string; vehicle_make?: string; vehicle_model?: string;
  first_name: string; last_name: string; phone: string; email: string;
  address?: string; notes?: string;
  preferred_date?: string; time_window?: string; service_mode?: string;
  estimated_total: number; deposit_amount: number;
  addons: AddonInput[]; origin: string; environment?: StripeEnv;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body: BookingInput = await req.json();
    const required = ["package_slug","package_name","first_name","last_name","phone","email"] as const;
    for (const f of required) {
      if (!body[f as keyof BookingInput]) {
        return new Response(JSON.stringify({ error: `Missing field: ${f}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (!body.deposit_amount || body.deposit_amount < 50) {
      return new Response(JSON.stringify({ error: "Invalid deposit" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const env: StripeEnv = body.environment === "live" ? "live" : "sandbox";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Pre-check slot still available
    if (body.preferred_date && body.time_window) {
      const { data: blocked } = await supabase.from("blocked_slots")
        .select("id").eq("slot_date", body.preferred_date).eq("time_window", body.time_window).maybeSingle();
      if (blocked) {
        return new Response(JSON.stringify({ error: "That date and time window is already booked. Please choose another." }), {
          status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: booking, error: bookingErr } = await supabase
      .from("bookings").insert({
        package_slug: body.package_slug, package_name: body.package_name,
        base_price: body.base_price,
        vehicle_size: body.vehicle_size, size_modifier: body.size_modifier,
        condition: body.condition, condition_modifier: body.condition_modifier,
        vehicle_year: body.vehicle_year, vehicle_make: body.vehicle_make, vehicle_model: body.vehicle_model,
        first_name: body.first_name, last_name: body.last_name,
        phone: body.phone, email: body.email,
        address: body.address, notes: body.notes,
        preferred_date: body.preferred_date || null,
        time_window: body.time_window, service_mode: body.service_mode,
        estimated_total: body.estimated_total, deposit_amount: body.deposit_amount,
        status: "New Booking",
      }).select().single();
    if (bookingErr) throw bookingErr;

    if (body.addons?.length) {
      await supabase.from("booking_addons").insert(
        body.addons.map((a) => ({
          booking_id: booking.id, addon_key: a.key, addon_label: a.label, price: a.price,
        })),
      );
    }

    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "cad",
          product_data: {
            name: `Santos Detail Deposit — ${body.package_name}`,
            description: `Reserves your appointment. Applied to final total of $${body.estimated_total}.`,
          },
          unit_amount: body.deposit_amount * 100,
        },
        quantity: 1,
      }],
      customer_email: body.email,
      success_url: `${body.origin}/book/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`,
      cancel_url: `${body.origin}/book/instant/${body.package_slug}?cancelled=1`,
      metadata: { booking_id: booking.id, package: body.package_name, type: "deposit" },
    });

    await supabase.from("bookings").update({ stripe_session_id: session.id }).eq("id", booking.id);

    return new Response(JSON.stringify({ url: session.url, booking_id: booking.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-deposit-checkout error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
