import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essential",
    price: "From $199",
    description: "A thorough clean for daily drivers.",
    features: [
      "Exterior hand wash & dry",
      "Interior vacuum & wipe-down",
      "Tire & rim cleaning",
      "Dashboard & console treatment",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "From $449",
    description: "Full interior & exterior restoration.",
    features: [
      "Everything in Essential",
      "Clay bar treatment",
      "One-step paint correction",
      "Leather conditioning",
      "Engine bay cleaning",
      "6-month sealant",
    ],
    highlight: true,
  },
  {
    name: "Ceramic Pro",
    price: "From $899",
    description: "The ultimate protection package.",
    features: [
      "Everything in Premium",
      "Multi-stage paint correction",
      "9H ceramic coating application",
      "5+ year paint protection",
      "Hydrophobic glass treatment",
      "Annual inspection included",
    ],
    highlight: false,
  },
];

const transition = { type: "spring" as const, duration: 0.5, bounce: 0 };

const PackagesSection = () => {
  return (
    <section id="packages" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Packages
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transparent pricing. No hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
              className={`relative rounded-lg border p-6 transition-transform active:scale-[0.98] ${
                pkg.highlight
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold text-accent-foreground">
                  MOST POPULAR
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{pkg.name}</h3>
              <p className="mt-1 font-display text-2xl font-bold text-primary tabular-nums">{pkg.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 block w-full rounded-lg py-3 text-center font-display text-sm font-semibold transition-transform active:scale-[0.98] ${
                  pkg.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
