import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Zap, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { PACKAGES } from "@/lib/booking-config";
import { PACKAGE_PRICE_IDS } from "@/lib/checkout-products";

const BookNow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Mobile Detailing in Kelowna | Santos Auto Detailing</title>
        <meta name="description" content="Book your detail in under 60 seconds. Pay a small deposit to reserve your appointment. Mobile detailing across Kelowna and the Okanagan." />
        <link rel="canonical" href="https://santosautodetailing.ca/book" />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Book Now</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-5">
              Reserve your detail in under 60 seconds.
            </h1>
            <p className="text-lg text-muted-foreground mb-3">
              Premium detailing for daily drivers, luxury vehicles, boats, RVs, fleets, and aircraft.
            </p>
            <p className="text-sm text-muted-foreground">
              Mobile service available across Kelowna and the Okanagan. Deposit goes toward your final total.
            </p>
          </div>

          {/* Two paths */}
          <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 flex flex-col">
              <Zap className="h-7 w-7 text-accent mb-4" />
              <h2 className="font-display text-2xl font-semibold mb-2">Instant Booking</h2>
              <p className="text-muted-foreground text-sm mb-5 flex-1">
                Standard interior, exterior or full details. Pick a package, choose your vehicle, pay a deposit, done.
              </p>
              <a href="#packages" className="inline-flex">
                <Button size="lg" className="w-full sm:w-auto">
                  Choose a package <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 flex flex-col">
              <Sparkles className="h-7 w-7 text-accent mb-4" />
              <h2 className="font-display text-2xl font-semibold mb-2">Get a Custom Quote</h2>
              <p className="text-muted-foreground text-sm mb-5 flex-1">
                Paint correction, ceramic coating, boats, RVs, aircraft, fleets, or anything oversized. We'll review and reply with the right package.
              </p>
              <Link to="/book/quote" className="inline-flex">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Request custom quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Packages */}
          <div id="packages" className="mt-24 scroll-mt-24">
            <div className="text-center mb-10">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">Standard Packages</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">Pick a package to start</h2>
              <p className="text-muted-foreground mt-3 text-sm">Pricing adjusts based on vehicle size and condition.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {PACKAGES.map((pkg) => (
                <div key={pkg.slug} className="rounded-lg border border-border bg-card p-6 flex flex-col hover:border-accent/60 transition">
                  <h3 className="font-display text-xl font-semibold mb-1">{pkg.name}</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Starting</p>
                  <div className="mb-4">
                    <span className="font-display text-3xl font-semibold">${pkg.basePrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <ul className="space-y-2 text-sm mb-6 flex-1">
                    {pkg.included.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/book/instant/${pkg.slug}`}>
                    <Button className="w-full">Book with ${pkg.deposit} deposit</Button>
                  </Link>
                  <Link to={`/checkout?price=${PACKAGE_PRICE_IDS[pkg.slug]}&label=${encodeURIComponent(pkg.name + " — $" + pkg.basePrice)}`}>
                    <Button className="w-full mt-2" variant="outline">Pay full ${pkg.basePrice}</Button>
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-3">Sedan-size base price. Taxes calculated at checkout.</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
              Not sure what you need?{" "}
              <Link to="/book/quote" className="text-accent underline underline-offset-4">Choose custom quote</Link>{" "}
              and we'll recommend the right package.
            </p>
          </div>

          {/* Maintenance plan upsell */}
          <div className="mt-20 max-w-5xl mx-auto rounded-lg border border-accent/40 bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2">New — Subscribe & save</p>
              <h3 className="font-display text-2xl font-semibold mb-2">Santos Maintenance Plan — $199 / month</h3>
              <p className="text-sm text-muted-foreground">Monthly full detail + 10% off any one-time service. Cancel anytime.</p>
            </div>
            <Link to="/maintenance">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default BookNow;
