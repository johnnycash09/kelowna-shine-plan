import ServicePageLayout from "@/components/ServicePageLayout";
import img from "@/assets/service-exterior.jpg";

const FleetDetailing = () => (
  <ServicePageLayout
    slug="/fleet-detailing-kelowna"
    title="Fleet Detailing Kelowna | Santos Auto Detailing"
    metaDescription="Reliable fleet detailing in Kelowna and the Okanagan for business vehicles, work trucks, dealership vehicles, and company fleets."
    h1="Fleet Detailing in Kelowna"
    eyebrow="Fleet · Kelowna"
    serviceName="Fleet Detailing"
    serviceDescription="On-site fleet detailing for businesses, dealerships, work trucks and commercial vehicles in Kelowna and the Okanagan."
    intro="Consistent, scheduled, on-site detailing for your fleet — work trucks, sales vehicles, company cars and dealership inventory. Your brand, always presentation-ready."
    imageAlt="Fleet detailing for company vehicles in Kelowna"
    heroImage={img}
    bullets={[
      { title: "Flexible scheduling", body: "Recurring weekly, bi-weekly or monthly programs built around your operations." },
      { title: "Mobile service", body: "We come to your yard, lot or office — minimal downtime, no juggling drop-offs." },
      { title: "Brand presentation", body: "Vehicles look the part of your brand every time they hit the road." },
      { title: "Work trucks", body: "Heavy-duty cleaning for trades, contractors and service vehicles." },
      { title: "Sales & dealership", body: "Lot-ready presentation and reconditioning for retail-quality finishes." },
      { title: "Company cars & commercial", body: "Executive vehicles, vans, and commercial vans kept consistently clean." },
    ]}
    why={{
      heading: "Clean fleets win business.",
      body: "A clean vehicle is a moving billboard. Whether you're running a trades crew, a dealership lot, or an executive fleet, consistent professional detailing protects your asset value, lifts staff pride, and signals quality to every customer who sees the vehicle on the road.",
    }}
    faqs={[
      { q: "Do you work with dealerships?", a: "Yes. We provide reconditioning and lot-ready detailing for dealerships across the Central Okanagan." },
      { q: "Can you service vehicles overnight?", a: "Depending on volume and access, we can schedule after-hours and overnight programs to keep your fleet running by day." },
      { q: "Do you offer volume pricing?", a: "Yes. Fleet programs are priced per vehicle with discounts based on volume and frequency. Reach out for a custom quote." },
      { q: "Are you insured?", a: "Yes — fully insured for commercial and fleet work." },
    ]}
  />
);

export default FleetDetailing;
