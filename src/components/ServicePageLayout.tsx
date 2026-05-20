import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import {
  ALL_SERVICES,
  SITE_URL,
  PHONE,
  PHONE_DISPLAY,
  localBusinessSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export interface ServicePageProps {
  slug: string;
  title: string;        // SEO <title>
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;        // 1-2 sentence intro
  serviceName: string;  // schema service name
  serviceDescription: string;
  bullets: { title: string; body: string }[];
  why: { heading: string; body: string };
  faqs: { q: string; a: string }[];
  imageAlt: string;
  heroImage?: string;
}

const ServicePageLayout = (p: ServicePageProps) => {
  const canonical = `${SITE_URL}${p.slug}`;
  const related = ALL_SERVICES.filter((s) => s.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{p.title}</title>
        <meta name="description" content={p.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={p.title} />
        <meta property="og:description" content={p.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema(p.serviceName, p.serviceDescription, p.slug))}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(p.faqs))}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", slug: "/" },
              { name: p.serviceName, slug: p.slug },
            ])
          )}
        </script>
      </Helmet>

      <Navbar />

      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
          {p.heroImage && (
            <div className="absolute inset-0">
              <img
                src={p.heroImage}
                alt={p.imageAlt}
                className="h-full w-full object-cover opacity-30"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            </div>
          )}
          <div className="container relative z-10 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Link to="/" className="hover:text-accent">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-accent">{p.serviceName}</span>
            </nav>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {p.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              {p.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {p.intro}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-display text-base font-semibold text-background transition-all hover:bg-accent active:scale-[0.98]"
              >
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-8 py-4 font-display text-base font-medium text-foreground backdrop-blur-md hover:bg-secondary"
              >
                <Phone className="h-4 w-4 text-accent" />
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={`sms:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-8 py-4 font-display text-base font-medium text-foreground backdrop-blur-md hover:bg-secondary"
              >
                <MessageSquare className="h-4 w-4 text-accent" />
                Text Us
              </a>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-background py-20 md:py-28">
          <div className="container max-w-5xl">
            <h2 className="mb-12 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              What's included
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {p.bullets.map((b) => (
                <div key={b.title} className="rounded-md border border-border bg-card/50 p-6">
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="border-y border-border bg-card/40 py-20 md:py-28">
          <div className="container max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">Why it matters</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {p.why.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.why.body}</p>
          </div>
        </section>

        <ServiceAreasSection />

        {/* Related services */}
        <section className="bg-background py-20 md:py-28">
          <div className="container max-w-5xl">
            <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Related services
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={r.slug}
                  className="group rounded-md border border-border bg-card/50 p-6 transition-colors hover:border-accent/50"
                >
                  <p className="font-display text-lg font-semibold text-foreground group-hover:text-accent">{r.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-20 md:py-28">
          <div className="container max-w-3xl">
            <h2 className="mb-12 text-center font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently asked
            </h2>
            <div className="space-y-5">
              {p.faqs.map((f) => (
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
        <section className="bg-card/40 py-20 md:py-28">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Ready to book your {p.serviceName.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Premium results, mobile convenience, and a team that treats every vehicle like its own.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-display text-base font-semibold text-background hover:bg-accent"
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-10 py-4 font-display text-base font-medium text-foreground hover:bg-secondary"
              >
                <Phone className="h-4 w-4 text-accent" />
                {PHONE_DISPLAY}
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

export default ServicePageLayout;
