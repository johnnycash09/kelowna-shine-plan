import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-correction.jpg";

const PPFKelowna = () => (
  <ServicePageLayout
    slug="/ppf-kelowna"
    title="Paint Protection Film Kelowna | PPF Installation | Santos Auto Detailing"
    metaDescription="Professional paint protection film installation in Kelowna. Self-healing PPF for hoods, bumpers, full wraps and high-impact zones. Santos Auto Detailing."
    h1="Paint Protection Film in Kelowna"
    eyebrow="PPF · Paint Protection · Kelowna"
    serviceName="Paint Protection Film"
    serviceDescription="Paint protection film installation for vehicles in Kelowna and the Okanagan — full-front, partial, and full-body PPF programs."
    intro="A virtually invisible urethane film that shields your paint from rock chips, road debris, bug acids and abrasion — with self-healing properties that keep it looking flawless."
    imageAlt="Paint protection film installation on hood in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Rock chip and impact protection", body: "Thick urethane film absorbs impacts from gravel, road debris and chips that would scar bare paint." },
      { title: "Self-healing topcoat", body: "Light surface scratches disappear with heat — the film's elastomeric topcoat flows back to a smooth finish." },
      { title: "Full-front packages", body: "Hood, fenders, mirrors, bumper and A-pillars — the high-impact zones that take the most punishment on BC roads." },
      { title: "Full-body PPF", body: "Complete vehicle coverage for maximum long-term protection on exotics, luxury vehicles and new trucks." },
      { title: "Ceramic coating over PPF", body: "We apply professional ceramic coating on top of PPF for a hydrophobic, high-gloss finish that stays cleaner longer." },
      { title: "Paint correction prep", body: "Defects are corrected before film goes down — PPF magnifies whatever is underneath, so prep is non-negotiable." },
    ]}
    why={{
      heading: "PPF is the only protection that stops chips before they happen.",
      body: "Ceramic coating protects your paint from chemicals and UV. PPF protects it from the physical impact that ceramic can't stop — rocks, gravel, parking lot debris and road grime at highway speed. On BC highways and Okanagan roads, chips happen fast. The right answer for a vehicle you care about is PPF first, ceramic on top — the combination gives you physical impact protection, chemical resistance, gloss enhancement and self-cleaning properties in one system. We do both, and we do the prep correctly.",
    }}
    faqs={[
      { q: "Do you offer PPF installation in Kelowna?", a: "Yes — Santos Auto Detailing installs paint protection film for vehicles in Kelowna and across the Central Okanagan." },
      { q: "What areas does PPF cover?", a: "We offer partial coverage (full-front: hood, fenders, bumper, mirrors, A-pillars) and full-body wraps depending on your vehicle and goals." },
      { q: "Can you ceramic coat over PPF?", a: "Yes. Applying a professional ceramic coating over PPF adds hydrophobic properties and gloss enhancement on top of the physical protection the film provides." },
      { q: "Does PPF need paint correction first?", a: "Yes — PPF is optically clear and will magnify any swirls or defects underneath. We always perform paint correction prep before film installation." },
      { q: "How long does PPF last?", a: "Quality paint protection film lasts 7–10+ years with proper care. We'll recommend the right tier and coverage for your vehicle." },
      { q: "Is PPF worth it on a new vehicle?", a: "Especially on a new vehicle. Protecting paint before it gets chipped is far more cost-effective than correcting or respraying later." },
    ]}
  />
);

export default PPFKelowna;
