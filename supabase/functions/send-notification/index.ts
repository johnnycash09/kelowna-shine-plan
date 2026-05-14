// Generic transactional email sender via Resend gateway.
import { corsHeaders } from "../_shared/stripe.ts";

const GATEWAY = "https://connector-gateway.lovable.dev/resend";

const OWNER_EMAIL = "pay@santosautodetailing.ca";
const FROM = "Santos Auto Detailing <notifications@santosautodetailing.ca>";
const REPLY_TO = "pay@santosautodetailing.ca";

type EmailKind =
  | "deposit_paid_customer"
  | "full_paid_customer"
  | "booking_owner"
  | "subscription_welcome"
  | "subscription_owner"
  | "monthly_booking_customer"
  | "monthly_booking_owner"
  | "quote_request_customer"
  | "quote_request_owner"
  | "refund_customer"
  | "portal_magic_link"
  | "maintenance_booking_link";

interface Body {
  kind: EmailKind;
  to: string;
  data: Record<string, unknown>;
}

function template(kind: EmailKind, data: Record<string, any>): { subject: string; html: string } {
  const wrap = (inner: string) =>
    `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#0b0d0f;color:#f3f4f6;padding:32px 24px;max-width:560px;margin:0 auto;border-radius:12px">
       <h1 style="font-size:22px;color:#22d3ee;margin:0 0 16px;letter-spacing:-0.01em">Santos Auto Detailing</h1>
       ${inner}
       <hr style="border:none;border-top:1px solid #1f2937;margin:28px 0" />
       <p style="font-size:12px;color:#6b7280;margin:0">Santos Auto Detailing · Kelowna, BC<br/>Reply to this email or call us anytime.</p>
     </div>`;

  const btn = (href: string, label: string) =>
    `<p><a href="${href}" style="display:inline-block;background:#22d3ee;color:#0b0d0f;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600">${label}</a></p>`;

  switch (kind) {
    case "deposit_paid_customer":
      return {
        subject: `Deposit received — ${data.package_name}`,
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>We received your <strong>$${data.deposit_amount}</strong> deposit for <strong>${data.package_name}</strong>. Your slot is reserved.</p>
          <p><strong>Date:</strong> ${data.preferred_date}<br/><strong>Window:</strong> ${data.time_window}<br/><strong>Service:</strong> ${data.service_mode}</p>
          <p><strong>Estimated total:</strong> $${data.estimated_total} (deposit applied to final balance)</p>
          <p>We'll confirm exact arrival the day before. Reply here for any changes.</p>
        `),
      };
    case "full_paid_customer":
      return {
        subject: `Booking confirmed — ${data.package_name}`,
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>Your <strong>${data.package_name}</strong> is fully paid (<strong>$${data.estimated_total}</strong>) and confirmed.</p>
          <p><strong>Date:</strong> ${data.preferred_date}<br/><strong>Window:</strong> ${data.time_window}<br/><strong>Service:</strong> ${data.service_mode}</p>
          <p>We'll confirm exact arrival the day before. Nothing more to pay on the day.</p>
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
        subject: "Welcome to the Santos Maintenance Plan",
        html: wrap(`
          <p>Hi ${data.customer_name ?? "there"},</p>
          <p>Your <strong>$199/month Maintenance Plan</strong> is active. Schedule this month's visit whenever you're ready — no charge, it's covered by your subscription.</p>
          ${btn(data.book_url, "Schedule this month's visit")}
          <p>You also get <strong>10% off</strong> any add-on or one-time service. Need to update billing or cancel?</p>
          ${btn(data.portal_url ?? "https://santosautodetailing.ca/maintenance", "Manage your subscription")}
        `),
      };
    case "subscription_owner":
      return {
        subject: "New maintenance plan subscriber",
        html: wrap(`
          <p>New subscriber: <strong>${data.customer_email}</strong>${data.customer_name ? ` (${data.customer_name})` : ""}.</p>
          <p>They've received a magic link to schedule their first monthly visit.</p>
        `),
      };
    case "monthly_booking_customer":
      return {
        subject: "Maintenance visit scheduled",
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>Your monthly maintenance visit is scheduled for <strong>${data.preferred_date}</strong> (${data.time_window}). No charge — covered by your subscription.</p>
          <p>We'll confirm exact arrival the day before.</p>
        `),
      };
    case "monthly_booking_owner":
      return {
        subject: "Maintenance visit booked",
        html: wrap(`
          <p>Subscriber <strong>${data.first_name} ${data.last_name}</strong> (${data.email}) booked their monthly visit:</p>
          <p><strong>${data.preferred_date}</strong> · ${data.time_window}<br/>${data.address ?? ""}</p>
        `),
      };
    case "quote_request_customer":
      return {
        subject: "We received your quote request",
        html: wrap(`
          <p>Hi ${data.name},</p>
          <p>Thanks for sending over the details on your <strong>${data.service_needed}</strong> request. We'll review and get back to you within 1 business day with a tailored quote.</p>
          ${data.notes ? `<p><strong>Your notes:</strong> ${data.notes}</p>` : ""}
        `),
      };
    case "quote_request_owner":
      return {
        subject: `New quote request — ${data.service_needed}`,
        html: wrap(`
          <p><strong>${data.name}</strong> · ${data.email} · ${data.phone}</p>
          <p><strong>Service:</strong> ${data.service_needed}<br/>
             <strong>Asset:</strong> ${data.asset_type ?? ""} ${data.vehicle_year ?? ""} ${data.vehicle_make ?? ""} ${data.vehicle_model ?? ""}<br/>
             ${data.length_ft ? `<strong>Length:</strong> ${data.length_ft} ft<br/>` : ""}
             ${data.timeline ? `<strong>Timeline:</strong> ${data.timeline}<br/>` : ""}
             ${data.main_goal ? `<strong>Goal:</strong> ${data.main_goal}<br/>` : ""}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
          ${data.photo_count ? `<p><strong>${data.photo_count}</strong> photo(s) attached in admin dashboard.</p>` : ""}
        `),
      };
    case "refund_customer":
      return {
        subject: `Refund processed — ${data.package_name}`,
        html: wrap(`
          <p>Hi ${data.first_name},</p>
          <p>We've cancelled your <strong>${data.package_name}</strong> booking and refunded <strong>$${data.refund_amount}</strong> back to your card. It should appear in 5–10 business days.</p>
          <p>Want to rebook? Reply here or visit santosautodetailing.ca.</p>
        `),
      };
    case "portal_magic_link":
      return {
        subject: "Manage your Santos Maintenance subscription",
        html: wrap(`
          <p>Hi ${data.customer_name ?? "there"},</p>
          <p>Click below to manage your subscription, update your card, or cancel. This link expires in 30 minutes.</p>
          ${btn(data.url, "Open billing portal")}
          <p style="font-size:12px;color:#9ca3af">If you didn't request this, ignore this email.</p>
        `),
      };
    case "maintenance_booking_link":
      return {
        subject: "Schedule your maintenance visit",
        html: wrap(`
          <p>Hi ${data.customer_name ?? "there"},</p>
          <p>Click below to pick a date and time for your monthly Santos detail. This link expires in 24 hours.</p>
          ${btn(data.url, "Schedule visit")}
          <p style="font-size:12px;color:#9ca3af">If you didn't request this, ignore this email.</p>
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
      body: JSON.stringify({
        from: FROM,
        reply_to: REPLY_TO,
        to: recipients,
        subject: tpl.subject,
        html: tpl.html,
      }),
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
