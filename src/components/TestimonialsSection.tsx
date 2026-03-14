import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    location: "Kelowna",
    text: "Santos detailed my Tesla Model Y and the results were incredible. The ceramic coating still beads water perfectly 8 months later.",
    rating: 5,
  },
  {
    name: "Sarah L.",
    location: "West Kelowna",
    text: "The convenience of mobile detailing is unmatched. They came to my office and my car looked brand new when I left work.",
    rating: 5,
  },
  {
    name: "David K.",
    location: "Lake Country",
    text: "Best detailing service in the Okanagan. The paint correction on my black BMW was flawless — no more swirl marks.",
    rating: 5,
  },
];

const transition = { type: "spring", duration: 0.5, bounce: 0 };

const TestimonialsSection = () => {
  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            5.0 ★ average across 140+ verified reviews.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-foreground">{t.name}</span>
                <span className="font-mono text-xs text-muted-foreground">· {t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
