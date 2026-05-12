import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowRight, Calendar, Percent, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { MAINTENANCE_PRICE_ID, MAINTENANCE_PRICE } from "@/lib/checkout-products";

const MaintenancePlan = () => {
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

          <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            <div className="rounded-lg border border-accent/60 bg-card p-8 shadow-elegant">
              <Sparkles className="h-7 w-7 text-accent mb-4" />
              <h2 className="font-display text-2xl font-semibold mb-1">Santos Maintenance Plan</h2>
              <p className="text-sm text-muted-foreground mb-6">Cancel anytime.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-5xl font-semibold">${MAINTENANCE_PRICE}</span>
                <span className="font-mono text-sm text-muted-foreground">/ month CAD</span>
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "Monthly full exterior wash & decontamination",
                  "Interior vacuum + wipe-down each month",
                  "Tire shine & wheel detail",
                  "Glass cleaned inside and out",
                  "10% off any one-time detail or add-on",
                  "Priority booking — first pick of weekend slots",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/checkout?price=${MAINTENANCE_PRICE_ID}&label=${encodeURIComponent("Santos Maintenance Plan — $" + MAINTENANCE_PRICE + "/month")}`}>
                <Button size="lg" className="w-full">
                  Start subscription <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-3">Billed monthly. Cancel anytime — no contract.</p>
            </div>

            <div className="space-y-6">
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
