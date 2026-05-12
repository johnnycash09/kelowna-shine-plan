import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/hero-detailing.jpg";

const AircraftDetailing = () => (
  <ServicePageLayout
    slug="/aircraft-detailing-kelowna"
    title="Aircraft Detailing Kelowna | Private Jet Detailing | Santos"
    metaDescription="Premium aircraft and private jet detailing in Kelowna and the Okanagan, including paint polishing, interior care, and luxury aviation detailing."
    h1="Aircraft Detailing in Kelowna"
    eyebrow="Aviation · Okanagan"
    serviceName="Aircraft Detailing"
    serviceDescription="Aircraft and private jet detailing — exterior polishing, interior care and luxury aviation presentation in Kelowna and the Okanagan."
    intro="Discreet, careful, premium detailing for private aviation — exterior polishing, interior leather and cabin care, and the kind of attention to detail aviation owners expect."
    imageAlt="Aircraft detailing for private jet in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Private jet detailing", body: "Full-service exterior and interior detailing programs for private jets and turboprops." },
      { title: "Aircraft exterior polishing", body: "Paint-safe polishing to restore gloss on painted aircraft surfaces." },
      { title: "Interior detailing", body: "Leather, fabric, carpet and cabin surfaces cleaned and conditioned to luxury standards." },
      { title: "Paint correction-style polishing", body: "Defect removal and gloss enhancement using techniques adapted from automotive paint correction." },
      { title: "Aviation-grade presentation", body: "The fit-and-finish standard your aircraft was built to — restored." },
      { title: "Careful, professional service", body: "Hangar-friendly scheduling and respect for your aircraft, your hangar and your time." },
    ]}
    why={{
      heading: "Aircraft deserve more than a hangar wash.",
      body: "Private aviation is an investment in time, image and capability. The detailing standard should match. Our aircraft program borrows the best techniques from luxury automotive detailing — paint-safe processes, premium chemistry and a genuine eye for finish — applied with the discretion and care aviation owners expect.",
    }}
    faqs={[
      { q: "Do you detail at YLW?", a: "Yes — we work with hangar tenants at Kelowna International Airport (YLW) and other Okanagan airfields by appointment." },
      { q: "What aircraft do you service?", a: "Private jets, turboprops, light aircraft, and helicopters. Reach out with your aircraft type for a tailored quote." },
      { q: "Are you familiar with aircraft paint?", a: "Yes. We use processes and products adapted from luxury automotive paint correction, applied carefully to aviation surfaces." },
      { q: "How do I request a quote?", a: "Call, text, or use our quote form. We'll arrange a hangar visit to assess and prepare a custom program." },
    ]}
  />
);

export default AircraftDetailing;
