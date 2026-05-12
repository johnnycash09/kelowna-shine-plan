import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-correction.jpg";

const PaintCorrection = () => (
  <ServicePageLayout
    slug="/paint-correction-kelowna"
    title="Paint Correction Kelowna | Santos Auto Detailing"
    metaDescription="Restore gloss and remove swirl marks, oxidation, haze, and light defects with professional paint correction in Kelowna."
    h1="Paint Correction in Kelowna"
    eyebrow="Correction · Kelowna"
    serviceName="Paint Correction"
    serviceDescription="Single and multi-stage paint correction to remove swirls, oxidation and defects in Kelowna and the Okanagan."
    intro="Mechanical polishing that removes swirl marks, oxidation, water spots and light scratches — restoring true depth, gloss and clarity to your paint."
    imageAlt="Paint correction removing swirl marks in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Swirl mark removal", body: "Eliminates the cobweb scratches caused by improper washing and automatic car washes." },
      { title: "Gloss restoration", body: "Brings back the deep, wet-look reflection that dull, oxidized clear coat hides." },
      { title: "Oxidation correction", body: "Lifts faded, chalky paint and restores colour saturation." },
      { title: "Multi-step polishing", body: "Compound, polish and refine — each stage chosen for your specific paint and defect level." },
      { title: "One-step enhancement", body: "A faster, value-focused option that improves gloss and removes light defects in a single stage." },
      { title: "Pairs with ceramic coating", body: "The ideal first step before any ceramic coating — coatings preserve the corrected finish for years." },
    ]}
    why={{
      heading: "Polish first. Protect second. That's how a true finish is built.",
      body: "Paint correction is the only way to permanently remove defects from your clear coat. Done well, it's transformative — colour returns, reflections sharpen, and the car looks better than the day it left the dealer. We use measured, paint-safe techniques and inspect under multiple lighting conditions to guarantee real results, not hidden polish dust.",
    }}
    faqs={[
      { q: "How long does paint correction take?", a: "A one-step correction typically takes a day; a multi-stage correction can take 1–3 days depending on vehicle size and paint condition." },
      { q: "Will it remove deep scratches?", a: "Defects deeper than the clear coat can be improved but not fully removed safely. We assess and explain expected results before starting." },
      { q: "Should I get ceramic coating after?", a: "Yes — corrected paint is at its most vulnerable. Ceramic coating locks in the finish and dramatically extends how long it lasts." },
      { q: "Do you measure paint thickness?", a: "Yes. We use a paint depth gauge to ensure we polish safely and never compromise your clear coat." },
    ]}
  />
);

export default PaintCorrection;
