import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/seo";

const seasonalPackages = [
  {
    badge: "Fall · September–October",
    name: "Boat Winterization Detail",
    description: "Full detail, interior protection, and storage prep before Okanagan Lake season ends.",
    features: [
      "Full exterior wash and wax",
      "Gelcoat polish and oxidation treatment",
      "Interior deep clean and vinyl protection",
      "Canvas and upholstery treatment",
      "Water spot and mineral deposit removal",
      "Winter storage prep and cover consultation",
    ],
    cta: "Get a quote",
    ctaLink: "/book/quote",
  },
  {
    badge: "Spring · April–May",
    name: "Spring Commissioning Detail",
    description: "De-winterization detail to get your boat or RV season-ready and looking new.",
    features: [
      "Full exterior wash and decontamination",
      "Gelcoat or paint polish and seal",
      "Interior deep clean after storage",
      "Canvas inspection and cleaning",
      "Glass and hardware detail",
      "Seasonal ceramic maintenance wash (if coated)",
    ],
    cta: "Get a quote",
    ctaLink: "/book/quote",
  },
  {
    badge: "Fall · August–October",
    name: "Winter Ceramic Prep",
    description: "Ceramic coating installation or maintenance before Okanagan winter — protect your paint before road salt and cold hit.",
    features: [
      "Paint decontamination and clay bar",
      "Single-stage paint correction or enhancement",
      "Professional ceramic coating installation",
      "Hydrophobic glass treatment",
      "12-month wash maintenance guidance",
      "Annual check-in reminder",
    ],
    cta: "Book ceramic coating",
    ctaLink: "/book/quote",
  },
];

const SeasonalPackages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Seasonal Detailing Packages Kelowna | Boat Winterization &amp; Spring Detail | Santos</title>
        <meta
          name="description"
          content="Fall boat winterization, spring commissioning, and winter prep ceramic coating packages in Kelowna. Seasonal detailing for boats, RVs and vehicles in the Okanagan."
        />
        <link rel="canonical" href={`${SITE_URL}/seasonal-detailing-kelowna`} />
        <meta property="og:title" content="Seasonal Detailing Packages Kelowna | Boat Winterization &amp; Spring Detail | Santos" />
        <meta property="og:description" content="Fall boat winterization, spring commissioning, and winter prep ceramic coating packages in Kelowna. Seasonal detailing for boats, RVs and vehicles in the Okanagan." />
        <meta property="og:url" content={`${SITE_URL}/seasonal-detailing-kelowna`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Seasonal Detailing Packages Kelowna | Boat Winterization &amp; Spring Detail | Santos" />
        <meta name="twitter:description" content="Fall boat winterization, spring commissioning, and winter prep ceramic coating packages in Kelowna. Seasonal detailing for boats, RVs and vehicles in the Okanagan." />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Seasonal Packages · Okanagan
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-5">
              Seasonal detailing for every transition.
            </h1>
            <p className="text-lg text-muted-foreground">
              Fall winterization, spring commissioning, and winter ceramic prep — timed to the
              Okanagan calendar so your vehicles and watercraft are protected when conditions change.
            </p>
          </div>

          {/* Package cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {seasonalPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="relative flex flex-col rounded-lg border border-border bg-card p-8"
              >
                <span className="inline-block self-start rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                  {pkg.badge}
                </span>
                <h2 className="font-display text-2xl font-semibold mb-2">{pkg.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={pkg.ctaLink}>
                  <Button variant="outline" className="w-full rounded-full">
                    {pkg.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Why seasonal timing */}
          <div className="mt-24 max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
              The Okanagan calendar has a rhythm. Your detailing should too.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Boats come out of the water in October. Salt hits the roads in November. UV hammers
              your paint from May through September. Scheduling professional detailing around these
              transitions — not after the damage is done — is what separates vehicles that hold their
              value from ones that don't. We build seasonal programs around the Okanagan calendar
              because that's what actually protects your investment.
            </p>
          </div>

          {/* CTA banner */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="rounded-lg border border-accent/40 bg-card p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6">
                Ready to book your seasonal package?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/book/quote">
                  <Button className="rounded-full">
                    Get a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href={`tel:${PHONE}`}>
                  <Button variant="outline" className="rounded-full">
                    <Phone className="mr-2 h-4 w-4 text-accent" />
                    Call {PHONE_DISPLAY}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
};

export default SeasonalPackages;
