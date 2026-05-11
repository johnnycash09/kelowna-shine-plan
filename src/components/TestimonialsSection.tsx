import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    vehicle: "Tesla Model Y · Kelowna",
    text: "Eight months later the ceramic still beads like day one. The finish is unreal.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    vehicle: "Range Rover Sport · West Kelowna",
    text: "They came to my office. I left work to a vehicle that looked better than the day I bought it.",
    rating: 5,
  },
  {
    name: "David K.",
    vehicle: "BMW M4 · Lake Country",
    text: "Best paint correction I've seen in the Okanagan. No swirls. Mirror finish on black.",
    rating: 5,
  },
];

const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const TestimonialsSection = () => {
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
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">Reviews</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
            5.0 ★ across 140+ verified Google reviews.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.08 }}
              className="rounded-md border border-border bg-card p-8"
            >
              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-display text-lg leading-relaxed text-foreground">"{t.text}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{t.vehicle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
