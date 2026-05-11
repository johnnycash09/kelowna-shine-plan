import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Book online", body: "Pick a package. Pick a date. Two-minute booking." },
  { n: "02", title: "We come to you", body: "Fully self-contained mobile studio. Water, power, premium products." },
  { n: "03", title: "Drive away renewed", body: "Your vehicle returned in showroom condition. Photos delivered." },
];

const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const ProcessSection = () => {
  return (
    <section className="bg-card/30 py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">Process</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Three steps. Zero friction.
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
              className="relative"
            >
              <div className="font-display text-7xl font-semibold leading-none text-accent/70">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 max-w-xs text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
