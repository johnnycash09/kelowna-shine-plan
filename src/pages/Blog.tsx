import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE_URL } from "@/lib/seo";

const posts = [
  {
    title: "Ceramic Coating in Kelowna — The Complete Guide",
    excerpt:
      "Everything Kelowna drivers need to know about ceramic coating — cost, process, how long it lasts, and why Okanagan UV makes it essential.",
    href: "/blog/ceramic-coating-kelowna-guide",
    tag: "Ceramic Coating",
  },
  {
    title: "Paint Correction in Kelowna — What It Is & What It Costs",
    excerpt:
      "Machine polishing, single vs multi-stage correction, and why you need it before ceramic coating.",
    href: "/blog/paint-correction-kelowna",
    tag: "Paint Correction",
  },
  {
    title: "Mobile Detailing in Kelowna — How It Works",
    excerpt:
      "What to expect when you book mobile detailing, what you need at home, and why Santos brings its own power.",
    href: "/blog/mobile-detailing-kelowna",
    tag: "Mobile Detailing",
  },
  {
    title: "Boat Detailing in Kelowna — Okanagan Lake Guide",
    excerpt:
      "Why Okanagan Lake is hard on gel coat, what a professional boat detail includes, and when to book ceramic coating for your vessel.",
    href: "/blog/boat-detailing-kelowna",
    tag: "Marine",
  },
];

const Blog = () => {
  const canonical = `${SITE_URL}/blog`;

  return (
    <>
      <Helmet>
        <title>Detailing Tips &amp; Guides for Kelowna Drivers | Santos Blog</title>
        <meta
          name="description"
          content="Expert detailing guides for Kelowna and Okanagan vehicle owners — ceramic coating, paint correction, mobile detailing, boat care and more."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Detailing Tips &amp; Guides for Kelowna Drivers | Santos Blog" />
        <meta
          property="og:description"
          content="Expert detailing guides for Kelowna and Okanagan vehicle owners — ceramic coating, paint correction, mobile detailing, boat care and more."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Detailing Tips &amp; Guides for Kelowna Drivers | Santos Blog" />
        <meta
          name="twitter:description"
          content="Expert detailing guides for Kelowna and Okanagan vehicle owners — ceramic coating, paint correction, mobile detailing, boat care and more."
        />
      </Helmet>

      <Navbar />

      <main className="bg-background pb-20 md:pb-0">
        {/* Hero */}
        <section className="border-b border-border bg-background pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container max-w-3xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Santos Blog
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
              Detailing Tips & Guides for Kelowna Drivers
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Expert guides written by the Santos team — covering ceramic coating, paint correction, mobile detailing, boat care, and everything Kelowna vehicle owners need to know.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.href}
                  to={post.href}
                  className="group flex flex-col rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-accent/40 hover:bg-card"
                >
                  <span className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">
                    {post.tag}
                  </span>
                  <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground group-hover:text-accent">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </>
  );
};

export default Blog;
