import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-boat.jpg";

const MarineCeramicCoating = () => (
  <ServicePageLayout
    bookingHref="/book/quote"
    bookingLabel="Get a Quote"
    slug="/ceramic-coating-boat-kelowna"
    title="Boat Ceramic Coating Kelowna | Marine Ceramic Coating | Santos"
    metaDescription="Professional ceramic coating for boats and watercraft in Kelowna. Gel coat protection, hydrophobic finish and UV defence for Okanagan Lake vessels."
    h1="Boat Ceramic Coating in Kelowna"
    eyebrow="Marine Ceramic · Okanagan Lake"
    serviceName="Boat Ceramic Coating"
    serviceDescription="Professional ceramic coating for boats, gel coat and marine surfaces in Kelowna and the Okanagan — UV protection, hydrophobic finish and oxidation defence."
    intro="A professional-grade ceramic system applied to gel coat, painted topsides and marine surfaces — delivering years of UV protection, hydrophobic self-cleaning and a deep restored gloss on Okanagan Lake."
    imageAlt="Ceramic coating applied to boat gel coat in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Gel coat ceramic protection", body: "Purpose-formulated ceramic chemistry bonds to gel coat surfaces and provides a sacrificial, UV-resistant protective layer." },
      { title: "UV and oxidation defence", body: "Okanagan sun is intense. Ceramic coating dramatically slows gel coat oxidation, colour fade and chalking." },
      { title: "Hydrophobic self-cleaning surface", body: "Water beads and sheets off the hull — mineral deposits, algae and lake grime have far less to grip." },
      { title: "Oxidation removal prep", body: "Gel coat is compounded, polished and fully decontaminated before coating — what goes under the ceramic is permanent." },
      { title: "Topsides and hull application", body: "Full exterior coverage from waterline to gunwale — topsides, bow and transom included in full programs." },
      { title: "Multi-year durability", body: "A quality marine ceramic system protects for 2–5 years with proper maintenance — dramatically outperforming wax and spray sealants." },
    ]}
    why={{
      heading: "Wax washes off. Ceramic stays for seasons.",
      body: "A traditional marine wax lasts weeks on the water. A professional ceramic coating bonds chemically to your gel coat and stays for years — through full Okanagan summers, UV exposure, mineral-rich lake water and winter storage. The result is a boat that stays cleaner between washes, looks better on the water, and holds its resale value longer. We prep the gel coat correctly before coating — oxidation removed, surface polished, chemistry properly applied — so the finish is worth protecting.",
    }}
    faqs={[
      { q: "Can you ceramic coat a boat's gel coat?", a: "Yes. We use ceramic systems specifically compatible with marine gel coat and fibreglass surfaces." },
      { q: "Do you detail and coat boats in Kelowna?", a: "Yes — we work at private docks, marina slips and storage yards across Kelowna, West Kelowna, Lake Country, Vernon, Penticton and Summerland." },
      { q: "Does the gel coat need polishing before ceramic coating?", a: "Yes. Any oxidation, water spots and surface defects need to be removed first. Ceramic coating is permanent and will lock in whatever is underneath." },
      { q: "How long does marine ceramic coating last?", a: "A properly applied marine ceramic system lasts 2–5 years depending on the product tier, how the vessel is used, and maintenance routine." },
      { q: "Is ceramic coating better than marine wax?", a: "Significantly. Traditional marine wax lasts weeks. Professional ceramic coating bonds to the surface and lasts seasons — providing far better UV protection, hydrophobics and oxidation resistance." },
      { q: "Do you also coat RVs and vehicles?", a: "Yes. We offer ceramic coating for vehicles, RVs, aircraft and marine — one team across all asset types." },
    ]}
  />
);

export default MarineCeramicCoating;
