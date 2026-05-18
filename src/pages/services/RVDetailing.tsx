import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-fleet.jpg";

const RVDetailing = () => (
  <ServicePageLayout
    slug="/rv-detailing-kelowna"
    title="RV Detailing Kelowna | Motorhome & Trailer Detailing | Santos"
    metaDescription="Professional RV, motorhome and travel trailer detailing in Kelowna and the Okanagan. Oxidation removal, roof cleaning, interior detail and ceramic coating."
    h1="RV Detailing in Kelowna"
    eyebrow="RV & Motorhome · Okanagan"
    serviceName="RV Detailing"
    serviceDescription="Full-service RV and motorhome detailing in Kelowna — exterior wash, oxidation removal, roof treatment, interior cleaning and ceramic coating."
    intro="Comprehensive detailing for motorhomes, Class A coaches, fifth wheels and travel trailers — exterior oxidation removal, roof and awning treatment, and interior deep cleaning across the Okanagan."
    imageAlt="RV and motorhome detailing in Kelowna Okanagan"
    heroImage={img}
    bullets={[
      { title: "Exterior wash and decontamination", body: "Safe, thorough wash of the full exterior including slide-out panels, wheel wells and undercarriage trim." },
      { title: "Oxidation removal and polishing", body: "Multi-stage compounding to lift heavy oxidation from fibreglass and gel coat panels — restoring colour and gloss." },
      { title: "Roof treatment", body: "Rubber, fibreglass and TPO roof cleaning, conditioning and sealant application to protect against UV degradation and leaks." },
      { title: "Awning cleaning", body: "Vinyl and acrylic awning deep clean to remove mildew, road film and oxidation." },
      { title: "Interior detailing", body: "Full cabin deep clean — flooring, upholstery, cabinetry, kitchen surfaces, bathroom and sleeping areas." },
      { title: "Ceramic coating for RVs", body: "Multi-year ceramic protection for fibreglass and painted panels — dramatically reduces cleaning time and protects from Okanagan UV." },
    ]}
    why={{
      heading: "An RV is a significant investment. The Okanagan sun will age it fast.",
      body: "Fibreglass and gel coat oxidize quickly under strong UV exposure. Roof membranes crack without conditioning. Mildew takes hold in awnings and seams. Regular professional RV detailing protects your investment, keeps resale value strong, and makes the exterior look the way it did when you drove it off the lot. Ceramic coating on an RV is one of the best value-per-dollar services we offer — far less cleaning, far better protection season after season.",
    }}
    faqs={[
      { q: "Do you detail RVs on-site in Kelowna?", a: "Yes. We bring our mobile unit to your storage site, campground, driveway or lot anywhere in Kelowna and the Central Okanagan." },
      { q: "Can you remove heavy oxidation from an RV?", a: "Yes. Multi-stage compounding and polishing restores even heavily oxidized fibreglass and gel coat in most cases." },
      { q: "Do you clean RV roofs?", a: "Yes — rubber, fibreglass and TPO roof surfaces are cleaned, conditioned and sealed as part of our full RV detail program." },
      { q: "Do you offer ceramic coating for RVs?", a: "Yes. Ceramic coating is one of the most practical upgrades for an RV — it dramatically cuts down cleaning time and protects gel coat and paint from UV degradation for years." },
      { q: "How long does a full RV detail take?", a: "Depending on size and condition, a full exterior and interior RV detail typically takes a full day. Large Class A coaches may require two days." },
      { q: "Do you also detail travel trailers and fifth wheels?", a: "Yes — we detail all towable RVs including travel trailers, fifth wheels, toy haulers and slide-outs." },
    ]}
  />
);

export default RVDetailing;
