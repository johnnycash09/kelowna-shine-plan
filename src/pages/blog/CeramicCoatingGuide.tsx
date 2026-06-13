import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/seo";

const faqs = [
  {
    q: "How long does ceramic coating take in Kelowna?",
    a: "A full ceramic coating installation takes 1 to 2 days depending on paint condition and package. Paint correction is the most time-intensive phase — a vehicle with heavy swirling may need 4-6 hours of polishing before the coating goes on.",
  },
  {
    q: "Can I wash my car after ceramic coating?",
    a: "You need to avoid water for 24-48 hours after installation. After that, hand wash only with a pH-neutral shampoo. No automatic car washes — the brushes cause swirl marks that degrade the coating over time.",
  },
  {
    q: "Does ceramic coating prevent rock chips?",
    a: "No. Ceramic coating protects against UV, chemicals, and environmental contamination. It does not protect against physical impact. For rock chip protection, paint protection film (PPF) is the right product — and the two can be combined.",
  },
  {
    q: "Is ceramic coating worth it on a used vehicle?",
    a: "Yes, provided paint correction is done first. Ceramic coating on corrected paint restores the vehicle's appearance significantly and then protects that restored finish. On a vehicle with heavily neglected paint, the paint correction phase may cost more than the coating itself — but the result is usually worth it.",
  },
  {
    q: "Do you coat boats and RVs with ceramic?",
    a: "Yes. We offer ceramic coating for boats, gel coat surfaces, RVs, aircraft and fleet vehicles. Each substrate uses different chemistry and prep — contact us for a quote specific to your vessel or motorhome.",
  },
];

const steps = [
  "Decontamination wash — iron fallout remover, clay bar, full wash to strip all surface contamination",
  "Paint correction — machine polishing to remove swirl marks, scratches and oxidation. This is the most time-intensive step and cannot be skipped — ceramic coating seals in whatever is underneath permanently",
  "Paint prep wipe — IPA wipe-down to strip all polish oils and residue so the coating bonds correctly",
  "Ceramic coating application — applied panel by panel in a controlled environment, levelled before cure",
  "Cure time — vehicle cannot get wet for 24-48 hours minimum depending on the product",
  "Final inspection — coating checked under high-intensity lighting for high spots or missed areas",
];

const CeramicCoatingGuide = () => {
  const canonical = `${SITE_URL}/blog/ceramic-coating-kelowna-guide`;

  return (
    <>
      <Helmet>
        <title>Ceramic Coating Kelowna — The Complete Guide (2025) | Santos</title>
        <meta
          name="description"
          content="Everything Kelowna drivers need to know about ceramic coating — cost, process, how long it lasts, and why Okanagan UV makes it essential. By Santos Auto Detailing."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Ceramic Coating Kelowna — The Complete Guide (2025) | Santos" />
        <meta
          property="og:description"
          content="Everything Kelowna drivers need to know about ceramic coating — cost, process, how long it lasts, and why Okanagan UV makes it essential. By Santos Auto Detailing."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="Ceramic Coating Kelowna — The Complete Guide (2025) | Santos" />
        <meta name="twitter:description" content="Everything Kelowna drivers need to know about ceramic coating — cost, process, how long it lasts, and why Okanagan UV makes it essential. By Santos Auto Detailing." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Ceramic Coating in Kelowna, BC — The Complete Guide",
            description:
              "Everything Kelowna drivers need to know about ceramic coating — cost, process, how long it lasts, and why Okanagan UV makes it essential.",
            url: canonical,
            author: { "@type": "Organization", name: "Santos Auto Detailing" },
            publisher: { "@type": "Organization", name: "Santos Auto Detailing" },
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="bg-background pb-20 md:pb-0">
        {/* Hero */}
        <section className="border-b border-border bg-background pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Ceramic Coating · Kelowna Guide
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
              Ceramic Coating in Kelowna, BC — The Complete Guide
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Kelowna gets more sun than almost anywhere in BC. Between May and September, UV index regularly hits 8 or above — the kind of exposure that fades paint, oxidizes clear coat, and ages an unprotected vehicle years faster than it should. Ceramic coating is the most effective thing you can do to stop that. This guide covers everything Kelowna vehicle owners need to know — what ceramic coating is, how it works, what it costs, and what separates a proper installation from a wasted $1,500.
            </p>
          </div>
        </section>

        {/* What Is Ceramic Coating */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Is Ceramic Coating?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ceramic coating is a liquid polymer — typically silica or silicon dioxide-based — that bonds chemically to your vehicle's clear coat. Unlike wax or spray sealants that sit on top of the paint and wash away within weeks, a properly applied ceramic coating bonds at a molecular level and becomes part of the surface. The result is a semi-permanent protective layer that is harder than your clear coat, highly hydrophobic, and resistant to UV, chemical etching, bird droppings, road salt, and environmental contamination. It does not prevent rock chips or deep scratches — that is what paint protection film is for. But for protection against the elements, nothing available to consumers or professionals comes close.
            </p>
          </div>
        </section>

        {/* Why Kelowna */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why Ceramic Coating Makes Sense in Kelowna Specifically
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The Okanagan sun is the main reason. Kelowna averages over 2,000 hours of sunshine per year — among the highest in Canada. UV radiation is the leading cause of paint oxidation, colour fade and clear coat failure. Vehicles parked outside in Kelowna age visually faster than vehicles in Vancouver simply because of sun exposure. Ceramic coating applies a UV-resistant barrier that dramatically slows this process. Beyond UV, Kelowna's four-season climate brings road salt in winter, tree sap in spring, bug acids and mineral-heavy irrigation water in summer, and organic debris in fall. All of these are chemical threats to unprotected paint. A ceramic coating resists all of them. For a vehicle you intend to keep, protect, or resell at strong value, ceramic coating in Kelowna is not a luxury — it is practical protection.
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              The Ceramic Coating Process — What Happens on the Day
            </h2>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How Long */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How Long Does Ceramic Coating Last in Kelowna?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Product tier determines durability. Consumer-grade coatings sold at auto parts stores last 6 to 12 months. Professional-grade entry coatings last 2 to 3 years. Premium multi-layer professional systems last 5 to 7 years. At Santos Auto Detailing, we install Revivify ceramic coatings — a professional-certified system with multi-year protection backed by certification. Durability also depends on maintenance: hand washing only, no automatic car washes, and an annual ceramic maintenance wash to top up hydrophobic properties. A properly maintained coating installed by a certified applicator will reach its full rated lifespan.
            </p>
          </div>
        </section>

        {/* Cost */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Does Ceramic Coating Cost in Kelowna?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cost depends on vehicle size, paint condition, and product tier. In Kelowna, expect to pay:
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Entry-level professional ceramic (1-2 year): $599–$899
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Mid-tier professional ceramic (3-5 year): $899–$1,499
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Premium multi-layer system with paint correction: $1,499–$2,500+
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Santos, our ceramic coating packages start at $899 for a single-stage ceramic with paint enhancement, and $1,499 for full multi-stage paint correction plus premium ceramic. Boat, RV and aircraft ceramic coating is quoted separately based on size and surface type.
            </p>
          </div>
        </section>

        {/* Revivify */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Certified Applicator</p>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Revivify Certified — What That Means For You
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Santos Auto Detailing is a certified Revivify applicator. Revivify is a professional-grade ceramic coating system that requires certification to purchase and install. Certification means the applicator has been trained on surface prep, application technique, cure conditions and product layering — the variables that determine whether a coating lasts 1 year or 7. Not every detailer in Kelowna who offers ceramic coating is using a certified professional product or has been trained on application. That gap is where most coating failures happen.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-md border border-border bg-card/50 p-6 open:border-accent/40"
                >
                  <summary className="cursor-pointer list-none font-display text-base font-semibold text-foreground">
                    {f.q}
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card/40 py-20 md:py-28">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Ready to protect your vehicle?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Certified Revivify applicator. Kelowna-based. Mobile and in-shop ceramic coating across the Okanagan.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/book/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-display text-base font-semibold text-background transition-all hover:bg-accent active:scale-[0.98]"
              >
                Get a Ceramic Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-10 py-4 font-display text-base font-medium text-foreground transition-all hover:bg-secondary"
              >
                <Phone className="h-4 w-4 text-accent" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </>
  );
};

export default CeramicCoatingGuide;
