import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-exterior.jpg";

const ExteriorDetailing = () => (
  <ServicePageLayout
    slug="/exterior-detailing-kelowna"
    title="Exterior Detailing Kelowna | Hand Wash & Decontamination | Santos"
    metaDescription="Premium exterior detailing in Kelowna. Hand wash, clay decontamination, wheel and tire care, and a sealed gloss finish. Mobile service across the Okanagan."
    h1="Exterior Detailing in Kelowna"
    eyebrow="Exterior · Kelowna"
    serviceName="Exterior Detailing"
    serviceDescription="Hand wash, decontamination, wheels, tires, glass, and a sealed finish for vehicles in Kelowna and the Okanagan."
    intro="A meticulous, paint-safe exterior process — touchless pre-wash, two-bucket hand wash, clay decontamination, dressed wheels and a sealed deep-gloss finish."
    imageAlt="Exterior detailing with foam over luxury car in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Touchless pre-wash", body: "Foam cannon and pH-neutral pre-wash to lift grit before any contact with the paint." },
      { title: "Two-bucket hand wash", body: "Premium microfibre wash mitts and grit guards — no scratches, no swirls." },
      { title: "Clay decontamination", body: "Removes bonded fallout, rail dust, and tree sap that washing alone can't lift." },
      { title: "Wheels, tires & arches", body: "Dedicated brushes and wheel-safe chemistry — tires dressed to a satin finish." },
      { title: "Glass & exterior trim", body: "Streak-free glass, restored trim, and a polished door-jamb finish." },
      { title: "Sealed deep gloss", body: "Sealant or spray wax for slick, water-beading protection that lasts months." },
    ]}
    why={{
      heading: "A finish that holds up to Okanagan summers and winters.",
      body: "Sun, lake mineral spray, road salt, and dust all attack your paint. Our exterior detail process protects clear coat, restores depth, and primes your vehicle for ceramic coating or paint correction if you want long-term protection.",
    }}
    faqs={[
      { q: "Do you come to me?", a: "Yes — our mobile unit is fully self-contained with filtered water and power. We service Kelowna, West Kelowna, Lake Country, Vernon, Penticton and Summerland." },
      { q: "Will an exterior detail remove swirls?", a: "An exterior detail cleans and seals — it doesn't correct paint defects. For swirl removal you'll want our paint correction service." },
      { q: "How often should I detail my exterior?", a: "We recommend a full exterior detail every 2–3 months, with maintenance washes in between. Coated vehicles can stretch longer." },
      { q: "Is your wash safe for matte and PPF finishes?", a: "Yes. We adjust products and process for matte paint, satin wraps and paint protection film." },
    ]}
  />
);

export default ExteriorDetailing;
