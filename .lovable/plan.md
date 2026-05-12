# Santos Auto Detailing — Booking System Plan

A premium, two-path booking experience: fast instant booking with deposit for standard packages, and a custom quote flow for complex jobs. Backed by Lovable Cloud + Stripe.

## Prerequisites (require user action before I build)

1. **Enable Lovable Cloud** — needed for database, auth (admin), storage (quote photos), and edge functions.
2. **Enable Lovable Payments (Stripe)** — needed for deposit checkout. I'll run the eligibility check and recommend Stripe (auto-detail services, physical service, not Paddle-eligible). Pro plan required.
3. **Admin account** — after Cloud is on, you'll sign up once with your email; I'll grant the `admin` role via SQL so only you can see the dashboard.

## Pages & Routes

- `/book` — Book Now landing. Two big cards: **Instant Booking** and **Get Custom Quote**, plus the 4 package cards.
- `/book/instant/:packageSlug` — multi-step instant booking wizard (6 steps + progress bar).
- `/book/quote` — custom quote form.
- `/book/success?session_id=...` — deposit confirmation page (verifies Stripe session, marks booking Deposit Paid).
- `/book/quote/success` — quote submitted confirmation.
- `/admin` — login + dashboard (bookings tab, quotes tab, filters, detail drawer, status changes, internal notes).

Sticky mobile "Book Now" already exists — point it at `/book`.

## Instant Booking Wizard

Single page, step state in React, progress bar at top.

1. **Vehicle size** — 6 options. XL → redirect to `/book/quote?reason=xl`.
2. **Condition** — Normal / Heavy / Extreme. Extreme → redirect to `/book/quote?reason=extreme`.
3. **Add-ons** — 6 toggleable cards.
4. **Customer details** — name, phone, email, vehicle Y/M/M, address, notes (zod-validated).
5. **Appointment** — date picker, time window, mobile vs drop-off.
6. **Review & Deposit** — live price summary, "Pay deposit & reserve" → Stripe Checkout.

Live price = package base + size modifier + condition modifier + add-ons. Deposit = $50 (Interior, Express Exterior, Express Full) or $100 (Executive).

## Custom Quote Form

Single page. Fields per spec, photo upload (Supabase Storage bucket `quote-photos`, up to ~6 files, 10MB each, image types only). On submit: insert into `quote_requests`, show success message.

## Backend (Lovable Cloud / Supabase)

### Tables

- `bookings` — id, created_at, package_slug, package_name, base_price, vehicle_size, size_modifier, condition, condition_modifier, vehicle_year/make/model, customer first/last/phone/email, address, notes, preferred_date, time_window, service_mode, estimated_total, deposit_amount, status (enum), stripe_session_id, internal_notes.
- `booking_addons` — id, booking_id (FK), addon_key, addon_label, price.
- `quote_requests` — id, created_at, name, phone, email, service_needed, asset_type, year/make/model, length_ft, main_goal, timeline, notes, photo_urls (text[]), status (enum), internal_notes.
- `payments` — id, booking_id (FK), stripe_session_id, stripe_payment_intent, amount, currency, status, raw jsonb, created_at.
- `user_roles` — standard pattern (`app_role` enum: admin, user) with `has_role()` security-definer function.

### Enums

- `booking_status`: New Booking, Deposit Paid, Pending Confirmation, Confirmed, Completed, Cancelled.
- `quote_status`: New Request, Needs Review, Quote Sent, Accepted, Declined, Completed.

### RLS

- `bookings`, `booking_addons`, `quote_requests`, `payments`: public **insert** allowed (anonymous customers booking); **select/update/delete** restricted to admins via `has_role(auth.uid(),'admin')`.
- `user_roles`: select own + admin manage.
- Storage bucket `quote-photos`: public read (so admin emails/dashboard can view), public insert via signed flow from the quote form.

### Edge Functions

- `create-deposit-checkout` — input: booking payload + computed deposit. Inserts `bookings` row (status: New Booking) + `booking_addons`, creates Stripe Checkout Session in `payment` mode, returns `url`. (`verify_jwt = false`.)
- `verify-deposit` — input: `session_id`. Retrieves session from Stripe, if `paid` updates booking → `Deposit Paid`, inserts `payments` row. Used by success page.
- `stripe-webhook` — listens for `checkout.session.completed` as a backup path. (`verify_jwt = false`.)

Stripe secret key already managed by Lovable Payments — no manual secret needed.

## Admin Dashboard (`/admin`)

- Auth: email+password sign in (Lovable Cloud). If signed-in user lacks `admin` role → "Access denied".
- Tabs: **Bookings** | **Quote Requests**.
- Table view: date, customer, package/service, total, status badge, actions.
- Filter by status (Select dropdown).
- Row click → side Sheet with full details, add-ons list, payment status, internal notes textarea (auto-save on blur), status change Select.

## Design

Reuse existing dark obsidian + electric cyan tokens. Booking cards mirror `PackagesSection` styling. Wizard steps use large tap targets, generous spacing, single-column on mobile. Sticky mobile bottom CTA shows running total + "Continue".

## Technical Notes

- Stripe Checkout in `payment` mode (one-time deposit, not subscription). Success URL: `/book/success?session_id={CHECKOUT_SESSION_ID}`. Cancel URL: back to wizard.
- Deposit recorded as a custom line item titled "Santos Detail Deposit — {Package}".
- Use `react-hook-form` + `zod` for validation across both forms.
- Photo uploads: client-side resize to ≤1600px before upload to keep storage lean.
- Add `/book` and `/admin` to `App.tsx` routes (above catch-all).
- New components in `src/components/booking/` and `src/pages/admin/`.

## Out of Scope (flag for later)

- SMS/email notifications to customer or Santos on new booking (can add via Resend connector later).
- Calendar sync (Google Calendar) — could be added via connector.
- Refund flow from admin UI.

---

**Confirm to proceed and I'll:** enable Lovable Cloud → run payments eligibility + enable Stripe → build schema, edge functions, booking UI, quote UI, and admin dashboard in that order.