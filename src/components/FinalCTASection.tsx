import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import ceramicImg from "@/assets/cta-background.jpg";
import { PHONE, PHONE_DISPLAY } from "@/lib/seo";

const transition = { type: "spring" as const, duration: 0.7, bounce: 0 };

const FinalCTASection = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="absolute inset-0">
        <img
          src={ceramicImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
        className="container relative z-10 text-center"
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Ready when you are
        </p>
        <h2 className="mx-auto max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground text-balance sm:text-6xl md:text-7xl">
          Ready to bring your vehicle back to a premium finish?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Book your Santos detail today. Limited appointments each week — we'll confirm within 2 hours.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/book"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-display text-base font-semibold text-background transition-all active:scale-[0.98] hover:bg-accent"
          >
            Book Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-10 py-4 font-display text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary"
          >
            <Phone className="h-4 w-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`sms:${PHONE}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-10 py-4 font-display text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary"
          >
            <MessageSquare className="h-4 w-4 text-accent" />
            Text Us
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
