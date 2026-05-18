import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import {
  ALL_SERVICES,
  PHONE,
  PHONE_DISPLAY,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo";

const slug = "/auto-detailing-penticton";
const title = "Auto Detailing Penticton BC | Santos Auto Detailing";
const description =
  "Premium mobile detailing, ceramic coating, boat detailing, and paint correction in Penticton, BC. Santos Auto Detailing serves the South Okanagan.";

const PENTICTON_NEIGHBOURHOODS = [
  "Skaha Lake",
  "Naramata",
  "Kaleden",
  "Main Street",
  "Lakeshore Drive",
  "Carmi",
  "Wiltse",
  "Uplands",
];

const PentictonLocation = () => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://santosautodetailing.ca/auto-detailing-penticton" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://santosautodetailing.ca/auto-detailing-penticton" />
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(
          breadcrumbSchema([
            { name: "Home", slug: "/" },
            { name: "Penticton", slug },
          ])
        )}
      </script>
    </Helmet>

    <Navbar />

    <main className="pb-20 md:pb-0">
      <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container max-w-4xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Location · Penticton, BC
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Auto Detailing in Penticton, BC
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Santos Auto Detailing provides premium mobile detailing and ceramic coating across Penticton and the South Okanagan — Skaha, Naramata, Kaleden and the lakeshore. Mobile service to your home, marina or resort.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-display text-base font-semibold text-background hover:bg-accent"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 font-display text-base font-medium text-foreground hover:bg-secondary"
            >
              <Phone className="h-4 w-4 text-accent" /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={`sms:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 font-display text-base font-medium text-foreground hover:bg-secondary"
            >
              <MessageSquare className="h-4 w-4 text-accent" /> Text Us
            </a>
          </div>
        </div>
      </section>

      {/* Neighbourhoods */}
      <section className="border-y border-border bg-card/40 py-20 md:py-28">
        <div className="container max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Neighbourhoods served
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Mobile detailing across every Penticton neighbourhood.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            From Skaha Lake to Naramata Bench, Kaleden and Main Street, our mobile unit comes to your home or marina anywhere in the South Okanagan.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {PENTICTON_NEIGHBOURHOODS.map((n) => (
              <li
                key={n}
                className="flex items-center gap-2 rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-accent" /> {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background py-20 md:py-28">
        <div className="container max-w-5xl">
          <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Services in Penticton
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={s.slug}
                className="group rounded-md border border-border bg-card/50 p-6 transition-colors hover:border-accent/50"
              >
                <p className="font-display text-lg font-semibold text-foreground group-hover:text-accent">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreasSection />
    </main>

    <FooterSection />
    <StickyMobileCTA />
  </>
);

export default PentictonLocation;
