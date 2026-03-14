import { motion } from "framer-motion";
import { MapPin, Star, Shield } from "lucide-react";
import heroImage from "@/assets/hero-detailing.jpg";

const transition = { type: "spring" as const, duration: 0.5, bounce: 0 };

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury vehicle with ceramic coating in Kelowna's Okanagan Valley"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 backdrop-blur-sm"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">Kelowna, BC · 100% Mobile</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            The Okanagan's Premier{" "}
            <span className="text-gradient-primary">Mobile Paint Protection</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Professional detailing, ceramic coating, and paint correction — delivered to your door. 
            We bring the studio to you.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span className="font-mono text-sm text-foreground tabular-nums">5.0 ★ (140+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm text-foreground">9H Ceramic Hardness</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#packages"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98] hover:brightness-110"
            >
              View Packages
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary/50 px-8 py-4 font-display text-sm font-semibold text-foreground backdrop-blur-sm transition-transform active:scale-[0.98] hover:bg-secondary"
            >
              Book Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
