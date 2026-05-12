import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Signature",
    price: "$305",
    tagline: "The essential reset.",
    duration: "≈ 3–4 hrs",
    features: [
      "Hand wash & hand dry",
      "Wheels, tires & door jambs",
      "Full interior vacuum & wipe",
      "Glass clarified, dash dressed",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$549",
    tagline: "Inside out. End to end.",
    duration: "≈ 5–7 hrs",
    features: [
      "Everything in Signature",
      "Clay decontamination",
      "Single-stage paint enhancement",
      "Leather clean & condition",
      "Engine bay detail",
      "6-month sealant",
    ],
    highlight: true,
  },
  {
    name: "Ceramic Pro",
    price: "$1,299+",
    tagline: "Long-term protection. Lasting depth.",
    duration: "1–2 days",
    features: [
      "Everything in Premium",
      "Multi-stage paint correction",
      "Professional 9H ceramic coating",
      "7-year paint protection",
      "Hydrophobic glass treatment",
      "Annual maintenance check-in",
    ],
    highlight: false,
  },
];

const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const PackagesSection = () => {
  return (
    <section id="packages" className="bg-card/30 py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Packages
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Simple. Premium. No guesswork.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Transparent pricing. Custom quotes available for fleet, exotic, and oversized vehicles.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-lg border p-8 ${
                pkg.highlight
                  ? "border-accent/60 bg-background shadow-elegant"
                  : "border-border bg-background/50"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-foreground">{pkg.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                  {pkg.price}
                </span>
                <span className="font-mono text-xs text-muted-foreground">CAD</span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {pkg.duration}
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-10 block w-full rounded-full py-3.5 text-center font-display text-sm font-semibold transition-all active:scale-[0.98] ${
                  pkg.highlight
                    ? "bg-foreground text-background hover:bg-accent"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Book {pkg.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
