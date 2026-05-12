import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-interior.jpg";

const InteriorDetailing = () => (
  <ServicePageLayout
    slug="/interior-detailing-kelowna"
    title="Interior Detailing in Kelowna | Santos Auto Detailing"
    metaDescription="Premium interior detailing in Kelowna for daily drivers, luxury vehicles, SUVs, trucks, and fleets. Mobile service and pickup/drop-off available."
    h1="Interior Detailing in Kelowna"
    eyebrow="Interior · Kelowna"
    serviceName="Interior Detailing"
    serviceDescription="Premium interior detailing for cars, SUVs, trucks and fleets in Kelowna and the Okanagan."
    intro="A meticulous reset for your cabin — vacuumed, steamed, conditioned and finished to a showroom standard. Mobile service across Kelowna and the Okanagan."
    imageAlt="Interior detailing for SUV in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Deep vacuuming", body: "Multi-stage vacuum across carpets, mats, seats, trunks and every crevice." },
      { title: "Steam cleaning", body: "Targeted steam treatment on fabric, vents, and high-touch surfaces where appropriate." },
      { title: "Leather & vinyl care", body: "pH-balanced cleaning followed by premium conditioner to protect and restore." },
      { title: "Plastics & trim", body: "Dressed to a satin OEM finish — never greasy, never plasticky." },
      { title: "Pet hair removal", body: "Specialized tools and time built in for stubborn pet hair on fabric and carpet." },
      { title: "Stain & odor treatment", body: "Spot-treatment for spills, plus enzymatic odor neutralization on request." },
    ]}
    why={{
      heading: "A cabin that feels new — every time you open the door.",
      body: "Interiors collect more than dirt. Sun, sweat, food and time degrade leather, fabric and trim. Our interior detail process restores texture, scent and finish so your cabin looks and feels like a premium environment again — not just clean.",
    }}
    faqs={[
      { q: "Do you offer mobile interior detailing in Kelowna?", a: "Yes. Our fully equipped mobile unit comes to your driveway, office, or job site anywhere in Kelowna and the Central Okanagan." },
      { q: "Can you remove pet hair?", a: "Yes — we include pet hair removal and have dedicated tools for heavy cases. Heavily affected vehicles may require an upgraded service tier." },
      { q: "Do you treat odors?", a: "Yes. We offer enzymatic odor treatment for smoke, pets and spills as an add-on to most interior packages." },
      { q: "How long does an interior detail take?", a: "Typically 2–4 hours depending on vehicle size and condition. We'll confirm a window when we book your appointment." },
    ]}
  />
);

export default InteriorDetailing;
