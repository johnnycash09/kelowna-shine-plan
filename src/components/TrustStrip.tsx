import { motion } from "framer-motion";

const marques = ["PORSCHE", "TESLA", "BMW", "MERCEDES", "AUDI", "LEXUS"];

const TrustStrip = () => {
  return (
    <section className="border-y border-border bg-card/50 py-10">
      <div className="container">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by owners of
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16"
        >
          {marques.map((m) => (
            <span
              key={m}
              className="font-display text-sm font-medium tracking-[0.25em] text-muted-foreground/70 md:text-base"
            >
              {m}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
