import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/hero-detailing.jpg";

const BoatDetailing = () => (
  <ServicePageLayout
    slug="/boat-detailing-kelowna"
    title="Boat Detailing Kelowna | Santos Auto Detailing"
    metaDescription="Professional boat detailing in Kelowna and the Okanagan, including wash, wax, oxidation removal, polishing, and interior cleaning."
    h1="Boat Detailing in Kelowna"
    eyebrow="Marine · Okanagan"
    serviceName="Boat Detailing"
    serviceDescription="Wash, polish, oxidation removal, and interior detailing for boats and watercraft on Okanagan Lake and beyond."
    intro="Marine-grade detailing for boats, wakeboats, cruisers and personal watercraft on Okanagan Lake — from spring de-winterization to mid-season polish to end-of-season storage prep."
    imageAlt="Boat detailing and polishing in the Okanagan"
    heroImage={img}
    bullets={[
      { title: "Wash and wax", body: "Hand wash and marine-grade wax sealant for the hull, deck and topsides." },
      { title: "Gelcoat polishing", body: "Restores depth and gloss to faded gelcoat finishes." },
      { title: "Oxidation removal", body: "Multi-stage compounding and polishing to lift heavy oxidation and chalking." },
      { title: "Interior cleaning", body: "Vinyl seating, carpet, helm and storage compartments — cleaned and protected." },
      { title: "Water spot removal", body: "Hard-water deposits removed from glass, paint and gelcoat." },
      { title: "Seasonal maintenance", body: "Spring prep, mid-season detailing and winter storage protection programs." },
    ]}
    why={{
      heading: "Lake life is hard on boats. We make them look new again.",
      body: "Sun, mineral-rich lake water, dock contact and storage all degrade gelcoat and vinyl fast. Regular professional marine detailing protects resale value, makes your time on the water more enjoyable, and keeps your boat looking like the investment it is.",
    }}
    faqs={[
      { q: "Where do you detail boats?", a: "On-site at marinas, private docks and home storage across Kelowna, West Kelowna, Lake Country, Vernon, Penticton and Summerland." },
      { q: "Do you also handle RVs?", a: "Yes — we offer RV detailing including wash, wax, oxidation removal and interior care. Ask us for a quote." },
      { q: "Can you remove heavy oxidation?", a: "Yes. Multi-stage compounding and gelcoat polishing restore even badly oxidized finishes in most cases." },
      { q: "Do you offer seasonal packages?", a: "Yes. Spring commissioning, mid-season detail and winterization storage prep are available individually or as a season package." },
    ]}
  />
);

export default BoatDetailing;
