// Generic transactional email sender via Resend gateway.
// Used for booking confirmations, owner notifications, subscription welcome.
import { corsHeaders } from "../_shared/stripe.ts";

const GATEWAY = "https://connector-gateway.lovable.dev/resend";

// Update OWNER_EMAIL to Santos's real inbox.
const OWNER_EMAIL = "santos@santosautodetailing.ca";
// Resend default sandbox sender (replace with your verified domain once added in Resend).
const FROM = "Santos Auto Detailing <onboarding@resend.dev>";

type EmailKind =
  | "deposit_paid_customer"
  | "full_paid_customer"
  | "booking_owner"
  | "subscription_welcome"
  | "subscription_owner"
  | "monthly_booking_customer"
  | "monthly_booking_owner";

interface Body {
  kind: EmailKind;
  to: string;
  data: Record<string, unknown>;
}

function template(kind: EmailKind, data: Record<string, any>): { subject: string; html: string } {
  const wrap = (inner: string) =>
    `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#0b0d0f;color:#f3f4f6;padding:32px 24px;max-width:560px;margin:0 auto;border-radius:12px">
       <h1 style="font-size:22px;color:#22d3ee;margin:0 0 16px">Santos Auto Detailing</h1>
       ${inner}
       <hr style="border:none;border-top:1px solid #1f2937;margin:28px 0" />
       <p style="font-size:12px;color:#6b7280">Santos Auto Detailing · Kelowna, BC · santosautodetailing.ca</p>
     </div>`;

  switch (kind) {
    case "deposit_paid_customer":
      return {
        subject: `Deposit received — ${data.package_name}`,
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>We received your <strong>$${data.deposit_amount}</strong> deposit for <strong>${data.package_name}</strong>. Your slot is reserved.</p>
          <p><strong>Date:</strong> ${data.preferred_date}<br/><strong>Window:</strong> ${data.time_window}<br/><strong>Service:</strong> ${data.service_mode}</p>
          <p><strong>Estimated total:</strong> $${data.estimated_total} (deposit applied)</p>
          <p>We'll confirm the exact arrival time the day before. Reply to this email for any changes.</p>
        `),
      };
    case "full_paid_customer":
      return {
        subject: `Booking confirmed — ${data.package_name}`,
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>Thanks — your <strong>${data.package_name}</strong> is fully paid (<strong>$${data.estimated_total}</strong>) and confirmed.</p>
          <p><strong>Date:</strong> ${data.preferred_date}<br/><strong>Window:</strong> ${data.time_window}<br/><strong>Service:</strong> ${data.service_mode}</p>
          <p>We'll confirm the exact arrival time the day before.</p>
        `),
      };
    case "booking_owner":
      return {
        subject: `New ${data.payment_type === "full" ? "FULL-PAY" : "deposit"} booking — ${data.package_name}`,
        html: wrap(`
          <p><strong>${data.first_name} ${data.last_name}</strong> just booked.</p>
          <p><strong>Package:</strong> ${data.package_name}<br/>
             <strong>Total:</strong> $${data.estimated_total}<br/>
             <strong>Paid now:</strong> $${data.paid_amount} (${data.payment_type})<br/>
             <strong>Vehicle:</strong> ${data.vehicle_year ?? ""} ${data.vehicle_make ?? ""} ${data.vehicle_model ?? ""}<br/>
             <strong>Date / window:</strong> ${data.preferred_date} · ${data.time_window}<br/>
             <strong>Address:</strong> ${data.address ?? "n/a"}<br/>
             <strong>Phone:</strong> ${data.phone}<br/>
             <strong>Email:</strong> ${data.email}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        `),
      };
    case "subscription_welcome":
      return {
        subject: "Welcome to the Maintenance Plan",
        html: wrap(`
          <p>Hi ${data.customer_name ?? "there"},</p>
          <p>Your <strong>$199/month Maintenance Plan</strong> is active. You can now book your monthly visit anytime.</p>
          <p><a href="${data.book_url}" style="display:inline-block;background:#22d3ee;color:#0b0d0f;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Schedule this month's visit</a></p>
          <p>You'll get 10% off any add-on or one-time service. Cancel anytime via the customer portal link in this confirmation.</p>
          <p><a href="${data.portal_url ?? "#"}" style="color:#22d3ee">Manage subscription</a></p>
        `),
      };
    case "subscription_owner":
      return {
        subject: "New maintenance plan subscriber",
        html: wrap(`
          <p>New subscriber: <strong>${data.customer_email}</strong>${data.customer_name ? ` (${data.customer_name})` : ""}.</p>
          <p>They'll book monthly visits via the customer link.</p>
        `),
      };
    case "monthly_booking_customer":
      return {
        subject: "Maintenance visit scheduled",
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>Your monthly maintenance visit is scheduled for <strong>${data.preferred_date}</strong> (${data.time_window}). No charge — covered by your subscription.</p>
        `),
      };
    case "monthly_booking_owner":
      return {
        subject: "Maintenance visit booked",
        html: wrap(`
          <p>Subscriber <strong>${data.first_name} ${data.last_name}</strong> (${data.email}) booked their monthly visit for <strong>${data.preferred_date}</strong> · ${data.time_window} · ${data.address ?? ""}.</p>
        `),
      };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = (await req.json()) as Body;
    if (!body.kind || !body.to) {
      return new Response(JSON.stringify({ error: "kind and to required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const tpl = template(body.kind, body.data ?? {});
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!lovableKey || !resendKey) {
      console.error("Missing email keys");
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const recipients = body.kind.endsWith("_owner") ? [OWNER_EMAIL] : [body.to];
    const r = await fetch(`${GATEWAY}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({ from: FROM, to: recipients, subject: tpl.subject, html: tpl.html }),
    });
    const text = await r.text();
    if (!r.ok) {
      console.error("Resend failed", r.status, text);
      return new Response(JSON.stringify({ error: text }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-notification error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
