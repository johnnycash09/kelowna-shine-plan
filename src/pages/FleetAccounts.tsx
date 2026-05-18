import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-fleet.jpg";

const FleetAccounts = () => (
  <ServicePageLayout
    slug="/fleet-accounts"
    title="Fleet Accounts Kelowna | Corporate Detailing | Santos Auto Detailing"
    metaDescription="Scheduled fleet detailing accounts for dealerships, construction companies, and corporate fleets in Kelowna. Volume pricing, recurring programs, on-site service."
    h1="Fleet & Corporate Accounts"
    eyebrow="Fleet Accounts · Corporate · Kelowna"
    serviceName="Fleet Accounts"
    serviceDescription="Recurring corporate detailing accounts for dealerships, contractors, and business fleets in Kelowna and the Okanagan."
    intro="Stable, scheduled detailing for your entire fleet — dealership reconditioning, contractor vehicles, executive cars and commercial vans. One account, one contact, consistent results."
    imageAlt="Corporate fleet detailing account for business vehicles in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Dealership reconditioning", body: "Pre-delivery details, used car reconditioning, and loaner fleet maintenance. Consistent finish standards, volume pricing." },
      { title: "Construction and trades fleets", body: "Regular scheduled cleaning for work trucks, vans and equipment vehicles — minimizing downtime, on-site at your yard." },
      { title: "Executive and corporate cars", body: "Recurring programs for company vehicles, sales fleets and executive cars — always presentation-ready for client meetings." },
      { title: "Volume and contract pricing", body: "Fleet accounts are priced per vehicle with discounts based on frequency and volume. Monthly, bi-weekly or weekly programs available." },
      { title: "On-site mobile service", body: "We come to your lot, yard or office — no drop-off coordination, no downtime pulling vehicles from your operation." },
      { title: "Dedicated account contact", body: "One point of contact for scheduling, changes, invoicing and service feedback. No calling a general line every time." },
    ]}
    why={{
      heading: "Fleet accounts aren't glamorous. They're just reliable.",
      body: "Walk-in clients are great. Corporate accounts are better — they book in advance, they pay on schedule, and they don't dry up in January. A dealership needing reconditioning work, a construction company running 12 trucks, or a corporate fleet of executive vehicles all represent stable, recurring revenue that lets us grow the team and the business without chasing one-off jobs. We price fleet accounts fairly, service them consistently, and treat them as the anchors they are.",
    }}
    faqs={[
      { q: "Do you service dealerships in Kelowna?", a: "Yes. We provide pre-delivery details, used vehicle reconditioning, and loaner fleet maintenance for dealerships across the Central Okanagan." },
      { q: "Can you service vehicles at our location?", a: "Yes — our mobile unit comes to your lot, yard or office. No drop-off needed." },
      { q: "Do you offer contract pricing for fleets?", a: "Yes. Fleet accounts are priced per vehicle with volume and frequency discounts. We'll put together a custom program based on your fleet size and schedule." },
      { q: "What types of business vehicles do you detail?", a: "Work trucks, cargo vans, company cars, executive vehicles, dealership inventory, construction equipment cabs, and commercial fleets of any size." },
      { q: "How do we set up a fleet account?", a: "Call or text us with your fleet size and what you need. We'll arrange a site visit, put together a program, and get started." },
      { q: "Do you offer invoicing for corporate accounts?", a: "Yes — corporate accounts are invoiced monthly. Contact us to arrange net terms." },
    ]}
  />
);

export default FleetAccounts;
