import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-detailing.jpg";

const transition = { type: "spring" as const, duration: 0.8, bounce: 0 };

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium vehicle detailing by Santos Auto Detailing in Kelowna"
          className="h-full w-full object-cover opacity-90"
          loading="eager"
          width={1440}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      <div className="container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            Kelowna · Mobile · By Appointment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Kelowna's<br />
            <span className="text-gradient-primary">Automotive Surface Studio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.35 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Premium mobile detailing for vehicles that deserve more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.5 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-display text-base font-semibold text-background transition-all active:scale-[0.98] hover:bg-accent"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-8 py-4 font-display text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.7 }}
            className="mt-12 flex items-center gap-3"
          >
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              5.0 · Trusted by Kelowna vehicle owners
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
