import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-ceramic.jpg";
import revivifyLogo from "@/assets/revivify-logo.png";

const CeramicCoating = () => (
  <ServicePageLayout
    bookingHref="/book/quote"
    bookingLabel="Get a Quote"
    partner={{
      name: "Revivify",
      logo: revivifyLogo,
      href: "https://revivifycoatings.com",
      blurb:
        "We're an authorized Revivify installer — a globally recognized professional ceramic coating system engineered for exceptional gloss, hydrophobics and multi-year durability. Every coating we install is backed by Revivify's professional-grade chemistry and our certified application process.",
    }}
    slug="/ceramic-coating-kelowna"
    title="Ceramic Coating Kelowna | Santos Auto Detailing"
    metaDescription="Protect your vehicle with professional ceramic coating in Kelowna. Premium gloss, long-term protection, and expert installation by Santos Auto Detailing."
    h1="Ceramic Coating in Kelowna"
    eyebrow="Protection · Kelowna"
    serviceName="Ceramic Coating"
    serviceDescription="Professional ceramic coating installation with paint correction prep for vehicles in Kelowna and the Okanagan."
    intro="Kelowna gets over 2,000 hours of sun per year — among the highest in Canada. That UV load fades paint, oxidizes clear coat, and ages an unprotected vehicle fast. Santos Auto Detailing is a certified Revivify applicator and certified Victoria Car Care installer — two professional certifications that most Kelowna detailers don't hold. We install ceramic coating on vehicles, boats, RVs and aircraft across the Okanagan."
    imageAlt="Ceramic coating application on luxury vehicle in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Long-term paint protection", body: "Multi-year durability against UV, road salt, bug acids, bird droppings and sap." },
      { title: "Gloss enhancement", body: "Adds depth, reflectivity and a candy-like wet look to corrected paint." },
      { title: "Hydrophobic surface", body: "Water beads and sheets off — easier washes and less dirt clinging to the body." },
      { title: "Chemical resistance", body: "A sacrificial layer that protects clear coat from harsh chemicals and contaminants." },
      { title: "UV protection", body: "Slows oxidation and fade in the strong Okanagan sun." },
      { title: "Paint correction included", body: "Single or multi-stage correction is performed before coating — coatings lock in what's underneath." },
    ]}
    why={{
      heading: "Coatings are only as good as the prep underneath them.",
      body: "A ceramic coating is permanent until polished off. Apply it over swirls, defects or contamination and you lock those in. We perform proper paint decontamination and correction first, then install premium professional ceramic systems — so what you get is a flawless, protected, deep-gloss finish that lasts. Spray-on \"ceramic\" products are not a substitute. They're a maintenance topper, not a coating system.",
    }}
    faqs={[
      { q: "How long does ceramic coating last?", a: "Professional coatings typically last 2–7+ years depending on the system and care. We'll recommend the right tier for your vehicle and use case." },
      { q: "Do you offer ceramic coating in-shop?", a: "Yes. Coating installation is performed in a controlled environment to ensure proper cure and a flawless finish." },
      { q: "Is paint correction required first?", a: "For a true coating result, yes. Coatings amplify whatever is underneath — we always recommend at least a single-stage correction before installation." },
      { q: "How do I maintain a ceramic-coated car?", a: "Use pH-neutral shampoo, avoid automatic brush washes, and we recommend an annual maintenance inspection." },
      { q: "What's the difference between professional ceramic and a spray ceramic?", a: "Professional coatings are SiO2-based systems that cross-link to your clear coat for years of protection. Spray ceramics are short-term toppers — useful for maintenance but not a substitute for a real coating." },
    ]}
  />
);

export default CeramicCoating;
