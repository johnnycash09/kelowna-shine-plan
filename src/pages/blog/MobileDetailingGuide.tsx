import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/seo";

const faqs = [
  {
    q: "Do I need to be home during the detail?",
    a: "No. Many customers leave us the keys and go about their day. We lock up when finished and text you photos of the result. As long as we have vehicle access and water, we can work independently.",
  },
  {
    q: "What if I live in an apartment or condo?",
    a: "We detail in apartment and condo parking stalls regularly. We need a standard outdoor water spigot within roughly 100 feet and a place to park our van. If water is not available on-site, we can arrange a nearby location or you can book our in-shop service instead.",
  },
  {
    q: "Does mobile detailing cost more than shop detailing?",
    a: "No. Our mobile and in-shop pricing is the same for equivalent services. The convenience of mobile comes at no extra charge because we are built for it — our van carries power, water tanks, and every tool we need.",
  },
  {
    q: "Can you detail in winter in Kelowna?",
    a: "Yes. We operate year-round. In cold months, we use heated water, work in covered areas where possible, and adjust product selection for lower temperatures. Interior detailing is especially popular in winter since it happens entirely inside the vehicle.",
  },
  {
    q: "How far do you travel for mobile detailing?",
    a: "We cover Kelowna, West Kelowna, Lake Country, Vernon, Penticton, Summerland and surrounding areas. Travel beyond our core zone may include a small mileage fee — contact us for a quote if you are outside the Okanagan valley.",
  },
];

const MobileDetailingGuide = () => {
  const canonical = `${SITE_URL}/blog/mobile-detailing-kelowna`;

  return (
    <>
      <Helmet>
        <title>Mobile Detailing Kelowna — How It Works & What to Expect | Santos</title>
        <meta
          name="description"
          content="How mobile detailing works in Kelowna, what you need at home, what's included, and how Santos comes fully equipped to your driveway. Book today."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Mobile Detailing Kelowna — How It Works & What to Expect | Santos" />
        <meta
          property="og:description"
          content="How mobile detailing works in Kelowna, what you need at home, what's included, and how Santos comes fully equipped to your driveway. Book today."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Mobile Detailing in Kelowna — How It Works and What to Expect",
            description:
              "How mobile detailing works in Kelowna, what you need at home, what's included, and how Santos comes fully equipped to your driveway.",
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
              Mobile Detailing · Kelowna Guide
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
              Mobile Detailing in Kelowna — How It Works and What to Expect
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              You do not need to drive anywhere. You do not need to arrange a ride home from a shop. You do not need to clear your schedule for a full day. Mobile detailing means a professional detailer comes to your home, workplace, marina, storage yard, or hangar with everything required to restore and protect your vehicle on-site. This guide covers exactly how it works in Kelowna, what you need to provide, and what separates a proper mobile detail from someone with a bucket and a dream.
            </p>
          </div>
        </section>

        {/* What Is Mobile Detailing */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Is Mobile Detailing?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Mobile detailing is the full range of professional vehicle detailing services — exterior washing, clay bar decontamination, paint correction, ceramic coating, interior deep cleaning, leather conditioning, engine bay cleaning — performed at your location instead of at a fixed shop. A proper mobile detailing operation carries its own power, water, equipment, chemicals, and protection products. The detailer sets up at your address, works through the service booked, and leaves your vehicle finished without you ever turning a key.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              In Kelowna, mobile detailing is especially practical. The Okanagan has hot, dry summers and cold, salted winters. Vehicles need consistent protection, but busy schedules, family commitments, and the simple inconvenience of dropping a car off for a day make shop-based detailing a barrier. Mobile detailing removes that barrier entirely. You book a time, we arrive, and your vehicle is detailed while you work, relax, or sleep.
            </p>
          </div>
        </section>

        {/* What Do You Need at Home */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What Do You Need at Your Home for Mobile Detailing?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Very little. A professional mobile detailer should carry everything required to work independently. At Santos Auto Detailing, our mobile setup is built around self-sufficiency — because half-equipped mobile detailing is just a detailer borrowing your hose and hoping for the best.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Power:</strong> We generate our own. Our F-150 work truck runs Pro Power Onboard — a built-in generator system that supplies clean, stable power to our polishers, vacuums, extractors, and lighting. You do not need an outdoor outlet. You do not need to run an extension cord through a window.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Water:</strong> We need access to a standard outdoor water spigot. Our system connects to your tap and pressurizes the water through our own hoses and spray equipment. If you do not have outdoor water access, contact us — we can often work from a nearby source or arrange an in-shop alternative.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-muted-foreground sm:text-lg">
                  <strong>Space:</strong> Enough room for our truck and your vehicle. A standard driveway, double stall, or parking stall works. Shade is helpful in summer but not required.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              That is it. We bring every tool, every chemical, every pad, every microfibre towel, every extension cord, and every light. You provide the vehicle, the water tap, and a place to work. We handle the rest.
            </p>
          </div>
        </section>

        {/* Mobile vs Shop */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What's Included in a Mobile Detail vs a Shop Detail?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              At Santos, the service is identical. A mobile detail from us includes everything an in-shop detail does — because we bring the shop with us. The only difference is location.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our mobile van and truck are equipped with a full arsenal: dual-action and rotary polishers, paint depth gauges, steam cleaners, hot water extractors, ozone generators, LED inspection lights, and a full range of professional chemicals and coatings. We perform single and multi-stage paint correction, ceramic coating application, interior deep cleaning, leather restoration, engine bay detailing, and full boat and RV detailing — all at your location.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The convenience advantage is obvious. You save the drive to a shop, the wait, the need for a second vehicle or ride, and the return trip. For busy professionals, parents, fleet managers, and anyone who values time, mobile detailing is the practical choice. For businesses with multiple vehicles, we can detail several cars at your workplace in a single visit.
            </p>
          </div>
        </section>

        {/* Boats, RVs, Aircraft */}
        <section className="border-y border-border bg-card/40 py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Mobile Detailing for Boats, RVs and Aircraft in Kelowna
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Large vehicles and vessels are where mobile detailing becomes essential. You cannot drive a boat to a detail shop. You do not want to move an RV out of storage just for a wash. And aircraft detailing at a hangar is far more efficient than trying to relocate a plane.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We come to marinas on Okanagan Lake for boat detailing — washing, decontamination, gel coat restoration, and ceramic coating. We detail RVs in storage yards, campgrounds, and residential driveways across the Okanagan. We work at Kelowna International Airport and private airstrips for aircraft exterior and interior detailing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Each of these requires different chemistry, tools, and techniques. Gel coat on boats oxidizes differently than automotive clear coat. RV roofs need specific cleaners that will not degrade rubber or fibreglass. Aircraft have delicate surfaces and strict product requirements. We carry the right products and training for each.
            </p>
          </div>
        </section>

        {/* How to Book */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How to Book Mobile Detailing in Kelowna
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Booking is simple. Use our online booking system to select your service, choose a date and time that works for you, and enter your address. We confirm the appointment, arrive at the scheduled time with everything required, and complete the service on-site. Payment is handled digitally — no cash, no invoices to chase.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              For specialty services — boats, RVs, aircraft, fleet accounts, or multi-vehicle bookings — we recommend requesting a custom quote. These jobs vary significantly in scope and we want to allocate the right time, equipment, and team for your specific job.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Same-day and next-day bookings are sometimes available depending on schedule. For ceramic coating and paint correction, we recommend booking at least a few days in advance so we can confirm weather conditions and allocate the full time required.
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
              Book mobile detailing in Kelowna
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Fully equipped mobile unit. Pro Power Onboard. We come to your home, workplace, marina, or hangar across the Okanagan.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-display text-base font-semibold text-background transition-all hover:bg-accent active:scale-[0.98]"
              >
                Book Now
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

export default MobileDetailingGuide;
