import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/seo";

const faqs = [
  {
    q: "What is the difference between a compound and a polish?",
    a: "A compound is an abrasive product designed to cut into the clear coat and remove deeper defects like heavy swirls, scratches and oxidation. A polish is finer — it refines the surface after compounding, removing the micro-marring the compound leaves behind and restoring gloss. Paint correction typically uses both: compound first, polish second.",
  },
  {
    q: "How long does paint correction take?",
    a: "A single-stage enhancement takes 3–5 hours. A full single-stage correction takes 6–10 hours. Multi-stage correction can take 1–3 days depending on vehicle size, paint hardness, and the severity of defects.",
  },
  {
    q: "Can paint correction damage my paint?",
    a: "In inexperienced hands, yes. Machine polishers generate heat and friction. If used incorrectly, they can burn through edges, leave holograms, or remove too much clear coat. At Santos, we measure paint thickness, use controlled speeds and pressures, and have years of experience on Kelowna vehicles.",
  },
  {
    q: "How much clear coat is removed during correction?",
    a: "Typically 1–3 microns per stage — a tiny fraction of the 35–150+ micron clear coat on most vehicles. We measure paint depth before starting and stay well within safe limits. The goal is maximum defect removal with minimum clear coat loss.",
  },
  {
    q: "Do I need ceramic coating after paint correction?",
    a: "Strongly recommended. Corrected paint is pristine but unprotected. Without a sealant or coating, swirls will return within weeks from normal washing. Ceramic coating is the best way to preserve the corrected finish long-term.",
  },
];

const PaintCorrectionGuide = () => {
  const canonical = `${SITE_URL}/blog/paint-correction-kelowna`;

  return (
    <>
      <Helmet>
        <title>Paint Correction Kelowna — What It Is &amp; What It Costs | Santos</title>
        <meta
          name="description"
          content="What is paint correction in Kelowna, how much does it cost, and do you need it before ceramic coating? Full guide from Santos Auto Detailing."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Paint Correction Kelowna — What It Is &amp; What It Costs | Santos" />
        <meta
          property="og:description"
          content="What is paint correction in Kelowna, how much does it cost, and do you need it before ceramic coating? Full guide from Santos Auto Detailing."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="Paint Correction Kelowna — What It Is &amp; What It Costs | Santos" />
        <meta name="twitter:description" content="What is paint correction in Kelowna, how much does it cost, and do you need it before ceramic coating? Full guide from Santos Auto Detailing." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Paint Correction in Kelowna — What It Is, What It Costs, and When You Need It",
            description:
              "What is paint correction in Kelowna, how much does it cost, and do you need it before ceramic coating? Full guide from Santos Auto Detailing.",
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
              Paint Correction · Kelowna Guide
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
              Paint Correction in Kelowna — What It Is, What It Costs, and When You Need It
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              If your vehicle looks dull, hazy, or covered in fine scratches under direct sunlight, paint correction is the only solution that actually fixes it. Not a wax. Not a glaze. Not a ceramic coating. Machine polishing that physically removes defects from your clear coat and restores the gloss your paint was designed to have. This guide explains what paint correction really is, what it costs in Kelowna, and why almost every ceramic coating installation should start with it.
            </p>
          </div>
        </section>

        {/* What Is Paint Correction */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Is Paint Correction?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Paint correction is the mechanical removal of paint defects using machine polishers, abrasive compounds, and fine polishes. Your vehicle's clear coat — the transparent layer on top of the colour — accumulates swirl marks, light scratches, water spots, oxidation, and etching over time. These are not dirt. They are physical damage to the surface. Washing does not remove them. Waxing does not remove them. Only polishing does.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The process works by using a dual-action or rotary polisher to work an abrasive compound into the clear coat at controlled speed and pressure. The compound levels the surface by removing a microscopic layer of clear coat — taking the defect with it. A finer polish then refines the surface, removing the micro-scratches the compound introduced and restoring deep gloss. The result is paint that reflects light cleanly instead of scattering it, producing the mirror-like finish you see on show cars and freshly detailed exotics.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <strong>Compounds vs polishes:</strong> A compound is aggressive — it cuts fast and deep, removing heavy defects but leaving fine marring behind. A polish is gentle — it refines and jewels the finish, restoring clarity and gloss. Most paint correction jobs require both. Using only a compound leaves the paint hazy. Using only a polish on damaged paint achieves nothing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <strong>Single-stage vs multi-stage:</strong> A single-stage correction uses one combination of pad and product to improve the paint in one pass. It removes 50–70% of defects and is ideal for daily drivers that need a meaningful improvement without the cost of full correction. Multi-stage correction uses multiple compound and polish stages — often 2 to 4 — to remove 90–95%+ of defects. This is the standard for show cars, exotics, and any vehicle receiving a premium ceramic coating.
            </p>
          </div>
        </section>

        {/* Do I Need It Before Ceramic Coating */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Do I Need Paint Correction Before Ceramic Coating?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Yes. This is the single most common and most expensive mistake vehicle owners make. Ceramic coating does not hide defects. It does not fill them. It bonds to the surface exactly as it exists and locks that condition in semi-permanently. If your paint is covered in swirl marks and you apply a ceramic coating over it, those swirls are now preserved under a hard, glossy layer that makes them more visible, not less.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Think of it like laminating a crumpled piece of paper. The laminate is clear and protective, but the wrinkles underneath are still there — and now they are permanent. The only way to fix them is to remove the laminate, flatten the paper, and then laminate again. With ceramic coating, that means polishing off the coating first — a significantly more expensive process than doing the correction before installation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A professional ceramic coating installation should always begin with paint correction. How much correction depends on the paint condition and the customer's goals, but skipping it entirely is never the right call. At Santos Auto Detailing, we assess every vehicle under high-intensity LED lighting before quoting a ceramic coating package — because the correction phase is where most of the visual transformation happens.
            </p>
          </div>
        </section>

        {/* Single Stage vs Multi-Stage */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Single Stage vs Multi-Stage Paint Correction
            </h2>

            <div className="mt-8 rounded-md border border-border bg-card/50 p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">Single Stage Correction</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                One polishing stage using a medium-cut compound or one-step polish. Removes 50–70% of defects — the ones that are most visible under direct sunlight. Improves gloss significantly. Ideal for daily drivers, lease returns, and vehicles where the owner wants a meaningful improvement without investing in full correction. Takes 3–6 hours depending on vehicle size.
              </p>
            </div>

            <div className="mt-6 rounded-md border border-border bg-card/50 p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">Multi-Stage Correction</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Two to four polishing stages: heavy compound, medium compound, fine polish, and jewelling polish. Removes 90–95%+ of defects including deep swirls, water spots, oxidation, and etching. Produces a show-car finish with true depth and clarity. Required for exotic vehicles, concours-level results, and any premium ceramic coating installation where the finish must be flawless before protection. Takes 1–3 days.
              </p>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Santos, we recommend single-stage enhancement for vehicles with light to moderate swirling and multi-stage correction for anything being prepared for a multi-year ceramic coating, any vehicle with significant defect accumulation, or owners who want the absolute best result possible.
            </p>
          </div>
        </section>

        {/* Cost */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Does Paint Correction Cost in Kelowna?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Paint correction pricing varies by vehicle size, paint condition, and the number of stages required. In Kelowna, market rates are roughly:
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Single-stage enhancement: $300–$600
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Full single-stage correction: $500–$900
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  Multi-stage correction: $900–$1,800+
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Santos Auto Detailing, our paint correction packages start at $499 for a single-stage enhancement and $999 for full multi-stage correction. We always pair paint correction with a ceramic coating or at minimum a premium sealant — because corrected paint without protection is a finish that will not last.
            </p>
          </div>
        </section>

        {/* How Long Does It Last */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How Long Does Paint Correction Last?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Paint correction is not a permanent treatment. It removes defects by removing clear coat — and once that clear coat is gone, it does not grow back. What determines how long the corrected finish lasts is what you do after the correction.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Without any protection, corrected paint will re-swirl within weeks. Normal washing, even with a clean mitt, introduces fine scratches. Automatic car washes reintroduce heavy swirling almost immediately. Environmental contaminants etch the surface. The correction is undone faster than it was done.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              This is why we never recommend paint correction without a protective layer on top. Ceramic coating is the best option — it adds a hard, sacrificial barrier that takes the abuse instead of your clear coat. Paint correction without ceramic coating or at minimum a high-quality sealant is half a job. At Santos, we correct and protect in the same visit because separating them makes no sense.
            </p>
          </div>
        </section>

        {/* Revivify Certified */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Certified Process</p>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Revivify Certified Paint Correction at Santos
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our paint correction process uses professional-grade tools and products — not the consumer compounds sold at auto parts stores that burn through edges and leave holograms.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Rupes BigFoot dual-action polishers</strong> — industry-standard machines with precise orbit control and minimal heat generation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Flex forced-rotation polishers</strong> — for cutting through harder clear coats where dual-action machines struggle
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Rupes iBrid Nano HR81M</strong> — compact polisher for tight panels, A-pillars, door jambs, and areas standard polishers cannot reach
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Professional compounds and polishes</strong> — formulated for controlled cutting and finishing on modern clear coats
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Paint depth gauge on every vehicle</strong> — we measure before we cut, and we stay within safe parameters
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              As a certified Revivify applicator, our paint correction standards are held to the same professional level as our ceramic coating installations. The finish we create is the foundation the coating bonds to — so it has to be right.
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
              Book paint correction in Kelowna
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Single and multi-stage correction. Certified Revivify process. Mobile and in-shop across the Okanagan.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/book/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-display text-base font-semibold text-background transition-all hover:bg-accent active:scale-[0.98]"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-10 py-4 font-display text-base font-medium text-foreground transition-all hover:bg-secondary"
              >
                <Phone className="h-4 w-4 text-accent" />
                Call Us
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

export default PaintCorrectionGuide;
