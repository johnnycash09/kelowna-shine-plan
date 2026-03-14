import { motion } from "framer-motion";
import { Droplets, Paintbrush, Shield, Car } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Interior Detailing",
    description: "Deep vacuum, steam cleaning, leather conditioning, and odor elimination.",
    spec: "Duration: 3–4 hrs",
  },
  {
    icon: Paintbrush,
    title: "Exterior Detailing",
    description: "Hand wash, clay bar, polish, and sealant for a showroom finish.",
    spec: "Duration: 4–5 hrs",
  },
  {
    icon: Shield,
    title: "Ceramic Coating",
    description: "Professional-grade 9H ceramic protection against UV, chemicals, and scratches.",
    spec: "Protection: 5+ years",
  },
  {
    icon: Car,
    title: "Paint Correction",
    description: "Multi-stage machine polish to remove swirl marks, scratches, and oxidation.",
    spec: "Stages: 1–3 step",
  },
];

const transition = { type: "spring", duration: 0.5, bounce: 0 };

const ServicesGrid = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            Precision detailing for every surface, every time.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
              className="group rounded-lg border border-border bg-card p-6 transition-transform active:scale-[0.98] hover:border-primary/30"
            >
              <service.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              <p className="mt-4 font-mono text-xs text-primary tabular-nums">{service.spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
