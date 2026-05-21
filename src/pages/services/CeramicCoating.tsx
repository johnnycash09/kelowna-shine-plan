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
      { title: "Revivify certified applicator", body: "We are certified to install Revivify professional ceramic coating — a certification that requires formal training on prep, application and cure. Not available to uncertified installers." },
      { title: "Victoria Car Care certified", body: "Certified installer for Victoria Car Care ceramic and graphene products — professional-grade chemistry with multi-year durability ratings." },
      { title: "Multi-stage paint correction prep", body: "Ceramic coating permanently seals whatever is underneath. We always correct paint first — swirls, scratches and oxidation removed before a single drop of coating goes on." },
      { title: "Kelowna UV is the threat", body: "2,000+ hours of annual sun exposure is the main reason Okanagan vehicles fade faster. Ceramic coating applies a UV-resistant barrier that wax and spray sealants cannot match." },
      { title: "Boats, RVs and aircraft", body: "We coat gel coat, fibreglass, painted aluminium and aircraft surfaces — not just cars. One certified team for every asset type." },
      { title: "Mobile and in-shop", body: "Powered by the Ford F-150's built-in 7.2kW Pro Power Onboard — we bring the power to you. No generator noise, no extension cords from your garage." },
    ]}
    why={{
      heading: "Certification is what separates a coating that lasts from one that fails in 18 months.",
      body: "Any detailer can buy a bottle of ceramic coating from a trade supplier and call themselves a ceramic coating installer. Certified applicators are different — we've been trained on surface chemistry, prep protocols, application technique, layering and cure conditions. These variables determine whether a coating lasts 2 years or 7. Santos Auto Detailing holds Revivify certification and Victoria Car Care certification — two programs that require demonstrated competency before a detailer can install their professional-grade products. When you book ceramic coating with Santos, you are getting a certified installation, not someone who watched a YouTube tutorial.",
    }}
    faqs={[
      { q: "How long does ceramic coating last?", a: "Professional coatings typically last 2–7+ years depending on the system and care. We'll recommend the right tier for your vehicle and use case." },
      { q: "Do you offer ceramic coating in-shop?", a: "Yes. Coating installation is performed in a controlled environment to ensure proper cure and a flawless finish." },
      { q: "Is paint correction required first?", a: "For a true coating result, yes. Coatings amplify whatever is underneath — we always recommend at least a single-stage correction before installation." },
      { q: "How do I maintain a ceramic-coated car?", a: "Use pH-neutral shampoo, avoid automatic brush washes, and we recommend an annual maintenance inspection." },
      { q: "What's the difference between professional ceramic and a spray ceramic?", a: "Professional coatings are SiO2-based systems that cross-link to your clear coat for years of protection. Spray ceramics are short-term toppers — useful for maintenance but not a substitute for a real coating." },
      { q: "Are you a certified ceramic coating installer in Kelowna?", a: "Yes. Santos Auto Detailing is a certified Revivify applicator and certified Victoria Car Care installer — professional certifications that require training and demonstrated competency. Not all detailers offering ceramic coating in Kelowna hold these certifications." },
      { q: "Do you offer ceramic coating for boats and RVs?", a: "Yes. We coat boats (gel coat and painted topsides), RVs (fibreglass and painted panels), aircraft, and fleet vehicles in addition to standard automotive ceramic coating." },
    ]}
  />
);

export default CeramicCoating;
