import { motion } from "framer-motion";

const points = [
  { n: "01", title: "We come to you", body: "Home, office, dealership, marina. Your driveway becomes the studio." },
  { n: "02", title: "Premium products only", body: "Gyeon, CarPro, Rupes. The same systems used on flagship vehicles." },
  { n: "03", title: "Trusted by high-end clients", body: "Daily-driven Teslas, weekend Porsches, work trucks, RVs and boats." },
  { n: "04", title: "Obsessive attention", body: "We finish every panel, every stitch, every vent — or it isn't done." },
];

const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const WhyMobileSection = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">Why Santos</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
            The difference is in what we don't compromise.
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-md bg-border md:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{p.n}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMobileSection;
