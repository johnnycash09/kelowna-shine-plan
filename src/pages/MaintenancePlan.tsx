import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Calendar, Percent, ShieldCheck, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { MAINTENANCE_PRICE_ID } from "@/lib/checkout-products";

const MaintenancePlan = () => {
  const [manageEmail, setManageEmail] = useState("");
  const [opening, setOpening] = useState(false);
  const [manageSent, setManageSent] = useState(false);
  const openPortal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(manageEmail)) return toast.error("Enter the email you subscribed with.");
    setOpening(true);
    const { error } = await supabase.functions.invoke("request-portal-link", {
      body: { email: manageEmail, origin: window.location.origin, environment: getStripeEnvironment() },
    });
    setOpening(false);
    if (error) return toast.error(error.message);
    setManageSent(true);
  };
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Monthly Maintenance Plan | Santos Auto Detailing Kelowna</title>
        <meta name="description" content="Keep your vehicle showroom-clean year-round. Full exterior + interior refresh every month, plus 10% off any one-time service." />
        <link rel="canonical" href="https://santosautodetailing.ca/maintenance" />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Maintenance Plan</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-5">
              Stay showroom-clean all year.
            </h1>
            <p className="text-lg text-muted-foreground">
              A monthly subscription that keeps your vehicle protected, fresh, and looking new — for less than the cost of detailing it twice a year.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {/* Silver */}
            <div className="relative flex flex-col rounded-lg border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-semibold mb-1">Silver</h2>
              <p className="text-sm text-muted-foreground mb-6">Monthly protection, zero hassle.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-5xl font-semibold">$149</span>
                <span className="font-mono text-sm text-muted-foreground">/ month CAD</span>
              </div>
              <ul className="space-y-3 text-sm mb-8 flex-1">
                {[
                  "Monthly interior detail",
                  "Exterior wash & tire shine",
                  "Priority booking — first pick of slots",
                  "10% off any add-on service",
                  "Cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* TODO: create separate Stripe price IDs for Silver, Gold, Platinum tiers */}
              <Link to={`/checkout?price=${MAINTENANCE_PRICE_ID}&label=${encodeURIComponent("Silver Maintenance Plan — $149/month")}&plan=maintenance`}>
                <Button size="lg" variant="outline" className="w-full">
                  Start subscription <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Gold */}
            <div className="relative flex flex-col rounded-lg border border-accent/60 bg-card p-8 shadow-elegant">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-foreground">
                Most Popular
              </div>
              <h2 className="font-display text-2xl font-semibold mb-1">Gold</h2>
              <p className="text-sm text-muted-foreground mb-6">Full detail on a six-week rotation.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-5xl font-semibold">$249</span>
                <span className="font-mono text-sm text-muted-foreground">/ month CAD</span>
              </div>
              <ul className="space-y-3 text-sm mb-8 flex-1">
                {[
                  "Full detail every 6 weeks (interior + exterior)",
                  "Annual paint decontamination & clay bar",
                  "10% off all add-on services",
                  "Priority scheduling",
                  "Annual vehicle inspection report",
                  "Cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* TODO: create separate Stripe price IDs for Silver, Gold, Platinum tiers */}
              <Link to={`/checkout?price=${MAINTENANCE_PRICE_ID}&label=${encodeURIComponent("Gold Maintenance Plan — $249/month")}&plan=maintenance`}>
                <Button size="lg" className="w-full">
                  Start subscription <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Platinum */}
            <div className="relative flex flex-col rounded-lg border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-semibold mb-1">Platinum</h2>
              <p className="text-sm text-muted-foreground mb-6">White-glove. Multi-vehicle eligible.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-5xl font-semibold">$499</span>
                <span className="font-mono text-sm text-muted-foreground">/ month CAD</span>
              </div>
              <ul className="space-y-3 text-sm mb-8 flex-1">
                {[
                  "Monthly full detail — every vehicle on plan",
                  "Quarterly ceramic coating maintenance wash",
                  "Fleet and multi-vehicle eligible",
                  "Dedicated scheduling contact",
                  "15% off all one-time services",
                  "Annual paint correction credit ($150 value)",
                  "Cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* TODO: create separate Stripe price IDs for Silver, Gold, Platinum tiers */}
              <Link to={`/checkout?price=${MAINTENANCE_PRICE_ID}&label=${encodeURIComponent("Platinum Maintenance Plan — $499/month")}&plan=maintenance`}>
                <Button size="lg" variant="outline" className="w-full">
                  Start subscription <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Not sure which tier fits?{" "}
            <a href="sms:+12508627491" className="text-accent underline underline-offset-4">Text us</a> and we'll recommend the right plan for your vehicle and schedule.
          </p>

          {/* Benefit cards */}
          <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="rounded-lg border border-border bg-card p-6">
              <Calendar className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-display text-lg font-semibold mb-1">Booked automatically</h3>
              <p className="text-sm text-muted-foreground">We schedule your appointment each month — no need to call.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Percent className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-display text-lg font-semibold mb-1">Member-only pricing</h3>
              <p className="text-sm text-muted-foreground">10% off paint correction, ceramic coating, and any add-on service.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <ShieldCheck className="h-6 w-6 text-accent mb-3" />
              <h3 className="font-display text-lg font-semibold mb-1">Always protected</h3>
              <p className="text-sm text-muted-foreground">Consistent wash routine prevents swirls, fading, and contamination buildup.</p>
            </div>
          </div>

          {/* Subscriber sections */}
          <div id="schedule" className="mt-20 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto scroll-mt-24">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold mb-2">Already a subscriber?</h3>
              <p className="text-sm text-muted-foreground mb-4">Schedule this month's visit.</p>
              <Link to="/book/maintenance">
                <Button variant="outline" className="w-full">Book my monthly visit <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
            <div id="manage" className="rounded-lg border border-border bg-card p-6 scroll-mt-24">
              <h3 className="font-display text-xl font-semibold mb-2">Manage subscription</h3>
              <p className="text-sm text-muted-foreground mb-4">Update card, cancel, or view invoices.</p>
              {manageSent ? (
                <div className="rounded border border-accent/40 bg-accent/5 p-3 text-sm">
                  If <strong>{manageEmail}</strong> has a subscription, you'll receive a secure link in your inbox shortly. The link expires in 30 minutes.
                </div>
              ) : (
                <form onSubmit={openPortal} className="space-y-3">
                  <Input type="email" required placeholder="Email used at signup" value={manageEmail} onChange={(e) => setManageEmail(e.target.value)} />
                  <Button type="submit" variant="outline" className="w-full" disabled={opening}>
                    {opening && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Email me a secure link
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            Prefer a one-time service?{" "}
            <Link to="/book" className="text-accent underline underline-offset-4">Browse single packages</Link>.
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};
export default MaintenancePlan;
