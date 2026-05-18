export const SITE_URL = "https://kelowna-shine-plan.lovable.app";
export const PHONE = "+12508627491";
export const PHONE_DISPLAY = "(250) 862-7491";
export const EMAIL = "pay@santosautodetailing.ca";

export const SERVICE_AREAS = [
  "Kelowna",
  "West Kelowna",
  "Lake Country",
  "Vernon",
  "Penticton",
  "Summerland",
  "Lower Mission",
  "Peachland",
];

export const KELOWNA_NEIGHBOURHOODS = [
  "Downtown Kelowna",
  "Lower Mission",
  "Upper Mission",
  "Glenmore",
  "Rutland",
  "Black Mountain",
  "West Kelowna",
  "Lake Country",
];

export const ALL_SERVICES = [
  { slug: "/interior-detailing-kelowna", title: "Interior Detailing", short: "Deep cabin reset" },
  { slug: "/exterior-detailing-kelowna", title: "Exterior Detailing", short: "Hand wash & seal" },
  { slug: "/paint-correction-kelowna", title: "Paint Correction", short: "Restore true gloss" },
  { slug: "/ceramic-coating-kelowna", title: "Ceramic Coating", short: "Long-term protection" },
  { slug: "/ppf-kelowna", title: "Paint Protection Film", short: "Rock chip defence" },
  { slug: "/rv-detailing-kelowna", title: "RV Detailing", short: "Motorhome & trailer care" },
  { slug: "/fleet-detailing-kelowna", title: "Fleet Detailing", short: "Business vehicles" },
  { slug: "/boat-detailing-kelowna", title: "Boat Detailing", short: "Marine care" },
  { slug: "/aircraft-detailing-kelowna", title: "Aircraft Detailing", short: "Private aviation" },
];

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: "Santos Auto Detailing",
  description:
    "Premium mobile auto detailing, ceramic coating, paint correction, boat, fleet and aircraft detailing in Kelowna and the Okanagan.",
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  image: `${SITE_URL}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kelowna",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.888,
    longitude: -119.496,
  },
  areaServed: SERVICE_AREAS.map((s) => ({ "@type": "City", name: s })),
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "140",
  },
};

export const serviceSchema = (name: string, description: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: name,
  url: `${SITE_URL}${slug}`,
  provider: { "@type": "AutoDetailing", name: "Santos Auto Detailing", telephone: PHONE, url: SITE_URL },
  areaServed: SERVICE_AREAS.map((s) => ({ "@type": "City", name: s })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; slug: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.slug}`,
  })),
});
