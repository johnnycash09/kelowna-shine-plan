import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ALL_SERVICES } from "@/lib/seo";
import interiorImg from "@/assets/service-interior.jpg";
import exteriorImg from "@/assets/service-exterior.jpg";
import correctionImg from "@/assets/service-correction.jpg";
import ceramicImg from "@/assets/service-ceramic.jpg";
import heroImg from "@/assets/hero-detailing.jpg";

const imageMap: Record<string, string> = {
  "/interior-detailing-kelowna": interiorImg,
  "/exterior-detailing-kelowna": exteriorImg,
  "/paint-correction-kelowna": correctionImg,
  "/ceramic-coating-kelowna": ceramicImg,
  "/fleet-detailing-kelowna": exteriorImg,
  "/boat-detailing-kelowna": heroImg,
  "/aircraft-detailing-kelowna": heroImg,
};

const altMap: Record<string, string> = {
  "/interior-detailing-kelowna": "Interior detailing for SUV in Kelowna",
  "/exterior-detailing-kelowna": "Exterior detailing for luxury car in Kelowna",
  "/paint-correction-kelowna": "Paint correction removing swirl marks in Kelowna",
  "/ceramic-coating-kelowna": "Ceramic coating application on luxury vehicle in Kelowna",
  "/fleet-detailing-kelowna": "Fleet detailing for company vehicles in Kelowna",
  "/boat-detailing-kelowna": "Boat detailing and polishing in the Okanagan",
  "/aircraft-detailing-kelowna": "Aircraft detailing for private jet in Kelowna",
};

const transition = { type: "spring" as const, duration: 0.6, bounce: 0 };

const ServicesGrid = () => {
  return (
    <section id="services" className="bg-background py-24 md:py-36">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="mb-16 max-w-2xl md:mb-24"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Services
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
            Built for vehicles that deserve more.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            From daily drivers to private jets — premium detailing, paint correction, and ceramic coating across Kelowna and the Okanagan.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...transition, delay: i * 0.05 }}
            >
              <Link
                to={s.slug}
                className="group block h-full overflow-hidden rounded-lg border border-border bg-card/50 transition-colors hover:border-accent/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-card">
                  <img
                    src={imageMap[s.slug]}
                    alt={altMap[s.slug]}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
