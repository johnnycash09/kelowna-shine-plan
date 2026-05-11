import { motion } from "framer-motion";
import interiorImg from "@/assets/service-interior.jpg";
import exteriorImg from "@/assets/service-exterior.jpg";
import correctionImg from "@/assets/service-correction.jpg";
import ceramicImg from "@/assets/service-ceramic.jpg";

const services = [
  {
    eyebrow: "01 · Interior",
    title: "Interior Reset.",
    benefit: "Factory-fresh cabin. Soft-touch surfaces. Showroom scent.",
    image: interiorImg,
    alt: "Detailing brush on stitched black leather seat",
  },
  {
    eyebrow: "02 · Exterior",
    title: "Exterior Detail.",
    benefit: "Hand-washed. Clay-decontaminated. Sealed for deep gloss.",
    image: exteriorImg,
    alt: "Foam cascading over glossy black paint",
  },
  {
    eyebrow: "03 · Correction",
    title: "Paint Correction.",
    benefit: "Swirls gone. Scratches lifted. True mirror finish — restored.",
    image: correctionImg,
    alt: "Dual-action polisher correcting paint",
  },
  {
    eyebrow: "04 · Protection",
    title: "Ceramic Coating.",
    benefit: "7-year protection. Easier washes. Enduring depth and shine.",
    image: ceramicImg,
    alt: "Water beading on freshly ceramic-coated black hood",
  },
];

const transition = { type: "spring" as const, duration: 0.7, bounce: 0 };

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
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={transition}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-card">
                <img
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {s.eyebrow}
                </p>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                  {s.benefit}
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground border-b border-foreground/40 pb-1 transition-colors hover:text-accent hover:border-accent"
                >
                  Book this service →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
