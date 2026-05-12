import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/seo";

const ServiceAreasSection = () => {
  return (
    <section id="service-areas" className="border-y border-border bg-card/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Service Areas
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Mobile detailing across the Okanagan.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            We bring our fully equipped mobile studio to driveways, offices, marinas, and hangars throughout the Central Okanagan.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {SERVICE_AREAS.map((a) => (
            <li
              key={a}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-background/50 px-4 py-3 font-display text-sm text-foreground"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
