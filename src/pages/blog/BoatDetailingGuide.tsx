import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Anchor } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/seo";

const faqs = [
  {
    q: "How often should I detail my boat on Okanagan Lake?",
    a: "A full exterior detail with gel coat decontamination should be done at least once per season — ideally in spring before launch. If your boat is stored in the water all summer, a mid-season wash and quick protection top-up keeps gel coat healthy. A comprehensive detail with polishing and ceramic coating every 1–2 years maintains long-term appearance and resale value.",
  },
  {
    q: "Can you detail a boat that is in the water?",
    a: "Yes, but with limitations. We can wash, decontaminate, and apply light sealants while a boat is moored or docked. Gel coat polishing and ceramic coating require the boat to be dry and stable — usually on a trailer, lift, or hardstand. We coordinate with marina operators and boatyards for haul-outs when necessary.",
  },
  {
    q: "What's the difference between boat wax and marine ceramic coating?",
    a: "Wax sits on the surface and lasts weeks to a few months. It offers minimal UV protection and zero chemical resistance. Marine ceramic coating bonds to gel coat and lasts multiple seasons. It resists UV fading, algae attachment, mineral staining, and oxidation. On Okanagan Lake, where summer UV is intense, ceramic coating is the practical long-term choice.",
  },
  {
    q: "Do you service houseboats and pontoons?",
    a: "Yes. Houseboats, pontoons, deck boats, wake boats, sailboats, and cruisers are all within our scope. Each vessel type has different surface materials and access challenges, but our mobile unit is equipped for hull sides, decks, railings, canvas, and interior spaces on virtually any freshwater craft.",
  },
  {
    q: "What do I need to prepare before a boat detail?",
    a: "Remove personal items, fishing gear, and loose equipment from decks and interior spaces. Ensure we have access to the vessel — dock, trailer, or slip — and confirm water access if we are washing in place. We handle everything else: chemicals, tools, water supply, and cleanup.",
  },
];

const BoatDetailingGuide = () => {
  const canonical = `${SITE_URL}/blog/boat-detailing-kelowna`;

  return (
    <>
      <Helmet>
        <title>Boat Detailing Kelowna — Okanagan Lake Guide | Santos</title>
        <meta
          name="description"
          content="Professional boat detailing in Kelowna for Okanagan Lake watercraft. Gel coat polishing, ceramic coating, winterization and spring commissioning. Santos Auto Detailing."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Boat Detailing Kelowna — Okanagan Lake Guide | Santos" />
        <meta
          property="og:description"
          content="Professional boat detailing in Kelowna for Okanagan Lake watercraft. Gel coat polishing, ceramic coating, winterization and spring commissioning."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="Boat Detailing Kelowna — Okanagan Lake Guide | Santos" />
        <meta name="twitter:description" content="Professional boat detailing in Kelowna for Okanagan Lake watercraft. Gel coat polishing, ceramic coating, winterization and spring commissioning." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Boat Detailing in Kelowna — Everything Okanagan Lake Owners Need to Know",
            description:
              "Professional boat detailing in Kelowna for Okanagan Lake watercraft. Gel coat polishing, ceramic coating, winterization and spring commissioning.",
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
              Boat Detailing · Kelowna Guide
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
              Boat Detailing in Kelowna — Everything Okanagan Lake Owners Need to Know
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Okanagan Lake is one of the most beautiful places in Canada to own a boat. It is also one of the harshest environments for gel coat. Intense summer UV, mineral-rich water, algae blooms, and a short but punishing season all conspire to dull, stain, and oxidize your hull. Professional boat detailing is not about making a boat look pretty for a day — it is about preserving the gel coat, protecting the finish, and maintaining the value of a significant investment. This guide covers what Kelowna boat owners need to know.
            </p>
          </div>
        </section>

        {/* Why Okanagan Lake is hard on gel coat */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Why Okanagan Lake Is Hard on Boat Gel Coat
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Okanagan Lake sits at the bottom of a valley that funnels sunlight. Kelowna averages over 2,000 hours of sunshine annually — among the highest in Canada. UV radiation is the single largest cause of gel coat oxidation and colour fade. A boat stored on a mooring or lift with no protection will show chalking and dulling within a single season.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The water itself is mineral-rich. Calcium and other dissolved minerals leave hard, crusty deposits on hull surfaces that etch gel coat if left untreated. Algae blooms in warm months coat hulls in green and brown slime that bonds aggressively to unprotected surfaces. And the season is short but intense — boats see concentrated use for three to four months, then sit idle for eight, accumulating environmental damage without regular care.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Unlike automotive clear coat, gel coat is porous. It absorbs stains, holds oxidation, and does not respond well to quick fixes. A proper boat detail addresses the gel coat at a surface level — decontaminating, polishing, and sealing — to protect against these specific threats.
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What's Included in a Professional Boat Detail
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A professional boat detail from Santos Auto Detailing covers every surface that matters — hull, deck, rails, canvas, glass, interior, and mechanical spaces. Here is what a comprehensive detail includes:
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Exterior wash and decontamination</strong> — hull, deck, and rails washed with marine-safe cleaners. Iron fallout remover and clay bar treatment to strip bonded contamination from gel coat
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Gel coat polishing</strong> — oxidation removal and gloss restoration using marine-grade compounds and polishes appropriate for gel coat hardness
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Metal and rail polishing</strong> — stainless steel and aluminium rails, cleats, and hardware polished to remove oxidation and water spots
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Canvas and vinyl cleaning</strong> — Bimini tops, covers, and vinyl seating cleaned and UV-protected
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Glass and isinglass restoration</strong> — windows, windscreens, and clear curtains polished and sealed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Interior deep clean</strong> — carpets, upholstery, compartments, and galley areas vacuumed, cleaned, and deodorized
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Gel coat polishing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Gel Coat Polishing and Oxidation Removal
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Oxidation is the dull, chalky, faded appearance that develops on gel coat exposed to UV and environmental contaminants. It is not dirt — it is the physical breakdown of the gel coat surface. Washing will not remove it. Waxing over it just seals in the chalk. The only solution is mechanical polishing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Gel coat is harder than automotive clear coat and requires different compounds, pads, and techniques. Automotive polishers and products can leave holograms, burn through thin areas, or simply fail to cut hard oxidation. We use marine-specific compounds and forced-rotation polishers designed for the density of gel coat surfaces.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The result is a deep, wet-looking gloss that returns colour saturation and reflectivity. On a well-maintained boat, a single-stage enhancement may be sufficient. On heavily oxidized craft, multi-stage correction is required — compounding out the oxidation, then polishing to refine the finish.
            </p>
          </div>
        </section>

        {/* Ceramic coating for boats */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Ceramic Coating for Boats — Is It Worth It?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Yes. Unequivocally. Marine ceramic coating is one of the best investments a boat owner on Okanagan Lake can make. Here is why.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Traditional boat wax lasts weeks to a few months. On Okanagan Lake, where summer UV is extreme and water minerals are aggressive, wax degrades even faster. Reapplying wax every month is expensive, time-consuming, and ultimately ineffective. Ceramic coating bonds to gel coat and lasts multiple seasons. It resists UV, prevents algae and mineral attachment, and makes washing dramatically easier.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The hydrophobic properties of ceramic coating mean water beads and sheets off rather than drying into hard water spots. Algae and scum line wash off with light pressure instead of scrubbing. And the UV resistance prevents the oxidation that would otherwise return within a season.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Santos Auto Detailing, we use marine-grade ceramic coatings designed for gel coat and marine substrates — not automotive products repackaged for boats. The chemistry is different. The prep is different. The durability on a boat that lives in water is different. We are certified applicators and we install the product correctly.
            </p>
          </div>
        </section>

        {/* Fall winterization */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Fall Winterization Detailing
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Winterization detailing is the process of thoroughly cleaning, protecting, and preparing a boat for months of storage. A boat put away dirty will be harder to clean in spring and may suffer permanent staining from contaminants left in contact with gel coat, metal, and upholstery over winter.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our winterization detail includes a full exterior wash and decontamination, gel coat protection application, metal polishing and sealant, canvas cleaning and waterproofing treatment, interior deep clean and moisture control, and compartment organization. We remove algae, scum line, water spots, and organic matter that would otherwise etch or stain over the off-season.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              For boats stored outdoors, this detail is especially important. UV continues to degrade gel coat even in cooler months. Rain, snow, and freeze-thaw cycles push contaminants deeper into porous surfaces. A proper winterization detail is preventative maintenance that pays for itself in spring.
            </p>
          </div>
        </section>

        {/* Spring commissioning */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Spring Commissioning Packages
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Spring commissioning is the first detail of the season — the one that sets the condition of your boat for the entire summer. After months in storage, even a covered boat accumulates dust, moisture, and potential mildew. A boat stored outdoors will have environmental contamination, pollen, bird droppings, and water spotting.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our spring commissioning packages start with a full assessment of gel coat condition. If oxidation has developed over winter, we polish it out before applying protection. We clean and treat all surfaces — hull, deck, rails, canvas, glass, and interior — so your boat launches in showroom condition.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              For boats that received ceramic coating in a previous season, spring commissioning includes a maintenance wash and ceramic top-up to restore hydrophobic properties and ensure full-season performance. For unprotected boats, spring is the ideal time to invest in ceramic coating before the intense summer UV begins.
            </p>
          </div>
        </section>

        {/* Service areas */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3">
              <Anchor className="h-6 w-6 text-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Okanagan Coverage</p>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Where We Service — Marinas and Locations Across the Okanagan
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We come to your boat. Our mobile unit services marinas, private docks, boatyards, and storage facilities across the Okanagan Valley. We regularly work at:
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Kelowna marinas</strong> — Downtown Kelowna yacht club, private docks on the lakefront, and residential moorings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>West Kelowna and Peachland</strong> — Westside boat launches, private docks, and lift-access vessels
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Vernon and Lake Country</strong> — Kalamalka Lake and Wood Lake access points
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Penticton and Summerland</strong> — Okanagan Lake south end marinas and storage yards
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Storage yards and boatyards</strong> — We detail boats on trailers, hardstands, and in covered storage before and after the season
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              If your location is not listed, contact us. We travel throughout the Okanagan for boat detailing and can arrange access with marina operators and property managers.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
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
              Book boat detailing in Kelowna
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Mobile boat detailing across Okanagan Lake. Gel coat restoration, ceramic coating, and seasonal packages.
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

export default BoatDetailingGuide;
