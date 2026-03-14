import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "We Come to You",
    description: "No drop-offs. No waiting rooms. We detail at your home, office, or wherever your vehicle is.",
  },
  {
    icon: Clock,
    title: "Save Your Time",
    description: "Go about your day while we bring your vehicle back to showroom condition.",
  },
  {
    icon: Sparkles,
    title: "Studio-Grade Results",
    description: "Full mobile setup with filtered water, professional lighting, and premium products.",
  },
];

const transition = { type: "spring" as const, duration: 0.5, bounce: 0 };

const WhyMobileSection = () => {
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
            The Mobile Advantage
          </h2>
          <p className="mt-4 text-muted-foreground">
            100% mobile — serving Kelowna, West Kelowna, and Lake Country.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMobileSection;
