// Token-gated booking creation for maintenance subscribers (no Stripe charge).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/stripe.ts";

interface Body {
  token: string;
  first_name: string; last_name: string; phone: string;
  vehicle_year?: string; vehicle_make?: string; vehicle_model?: string;
  address?: string; notes?: string;
  preferred_date: string; time_window: string; service_mode: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body: Body = await req.json();
    const required = ["token","first_name","last_name","phone","preferred_date","time_window","service_mode"] as const;
    for (const f of required) {
      if (!body[f as keyof Body]) {
        return new Response(JSON.stringify({ error: `Missing field: ${f}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: link } = await supabase.from("magic_links")
      .select("*").eq("token", body.token).eq("purpose", "maintenance_booking").maybeSingle();
    if (!link) return new Response(JSON.stringify({ error: "Invalid link" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    if (link.used_at) return new Response(JSON.stringify({ error: "Link already used" }), {
      status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    if (new Date(link.expires_at).getTime() < Date.now()) return new Response(JSON.stringify({ error: "Link expired" }), {
      status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    // Slot check
    const { data: blocked } = await supabase.from("blocked_slots")
      .select("id").eq("slot_date", body.preferred_date).eq("time_window", body.time_window).maybeSingle();
    if (blocked) return new Response(JSON.stringify({ error: "That slot just got booked. Pick another." }), {
      status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    const { data: booking, error: bookingErr } = await supabase
      .from("bookings").insert({
        package_slug: "maintenance",
        package_name: "Monthly Maintenance Visit",
        base_price: 0,
        vehicle_size: "—",
        size_modifier: 0,
        condition: "—",
        condition_modifier: 0,
        vehicle_year: body.vehicle_year,
        vehicle_make: body.vehicle_make,
        vehicle_model: body.vehicle_model,
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        email: link.email,
        address: body.address,
        notes: body.notes,
        preferred_date: body.preferred_date,
        time_window: body.time_window,
        service_mode: body.service_mode,
        estimated_total: 0,
        deposit_amount: 0,
        payment_type: "subscription",
        subscription_id: link.subscription_id,
        status: "Confirmed",
      }).select().single();
    if (bookingErr) throw bookingErr;

    await supabase.from("blocked_slots").upsert({
      booking_id: booking.id,
      slot_date: body.preferred_date,
      time_window: body.time_window,
      reason: `${body.first_name} ${body.last_name} (subscription)`,
    }, { onConflict: "slot_date,time_window" });

    await supabase.from("magic_links").update({ used_at: new Date().toISOString() }).eq("id", link.id);

    // Fire-and-forget emails
    supabase.functions.invoke("send-notification", {
      body: { kind: "monthly_booking_customer", to: link.email, data: { ...booking } },
    }).catch((e) => console.error(e));
    supabase.functions.invoke("send-notification", {
      body: { kind: "monthly_booking_owner", to: link.email, data: { ...booking } },
    }).catch((e) => console.error(e));

    return new Response(JSON.stringify({ booking_id: booking.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-maintenance-booking error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
