export type PackageSlug = "interior" | "express-exterior" | "express-full" | "executive";

export interface Package {
  slug: PackageSlug;
  name: string;
  basePrice: number;
  description: string;
  included: string[];
  deposit: number;
}

export const PACKAGES: Package[] = [
  {
    slug: "interior",
    name: "Interior Detail",
    basePrice: 245,
    description: "A premium interior reset for vehicles that need a clean, fresh cabin.",
    included: [
      "Full vacuum (seats, carpets, trunk)",
      "Steam clean & shampoo carpets",
      "Leather/upholstery deep clean",
      "Dash, console & door panel detail",
      "Glass cleaned inside",
      "Air freshener",
    ],
    deposit: 50,
  },
  {
    slug: "express-exterior",
    name: "Express Exterior",
    basePrice: 110,
    description: "A clean exterior wash and refresh for a sharper finish.",
    included: [
      "Hand wash & dry",
      "Wheel & tire clean",
      "Tire shine",
      "Bug & sap spot removal",
      "Exterior windows cleaned",
    ],
    deposit: 50,
  },
  {
    slug: "express-full",
    name: "Express Full Detail",
    basePrice: 305,
    description: "Interior and exterior refresh for a clean, glossy, finished look.",
    included: [
      "Everything in Express Exterior",
      "Full interior vacuum",
      "Interior wipe down & UV protectant",
      "Glass cleaned inside & out",
      "Spray sealant for added gloss",
    ],
    deposit: 50,
  },
  {
    slug: "executive",
    name: "Executive Detail",
    basePrice: 649,
    description: "A deeper premium detail for customers who want a higher-level result.",
    included: [
      "Full interior deep clean",
      "Steam & shampoo carpets/seats",
      "Leather conditioning",
      "Hand wash, decontaminate, clay bar",
      "Spray sealant or wax",
      "Engine bay wipe",
      "Premium finish",
    ],
    deposit: 100,
  },
];

export const VEHICLE_SIZES = [
  { key: "sedan", label: "Sedan / Coupe", modifier: 0 },
  { key: "small-suv", label: "Small SUV", modifier: 25 },
  { key: "truck", label: "Truck", modifier: 50 },
  { key: "large-suv", label: "Large SUV", modifier: 75 },
  { key: "van", label: "3-row SUV / Van", modifier: 100 },
  { key: "xl", label: "XL / Oversized", modifier: -1, custom: true as const },
] as const;

export const CONDITIONS = [
  { key: "normal", label: "Normal", description: "Light dust, regular use", modifier: 0 },
  { key: "heavy", label: "Heavy", description: "Visible dirt, stains, or pet hair", modifier: 50 },
  { key: "extreme", label: "Extreme", description: "Mold, smoke, severe stains", modifier: -1, custom: true as const },
] as const;

export const ADDONS = [
  { key: "pet-hair", label: "Pet hair removal", price: 50 },
  { key: "stain", label: "Heavy stain treatment", price: 50 },
  { key: "odor", label: "Odor treatment", price: 100 },
  { key: "engine-bay", label: "Engine bay detail", price: 75 },
  { key: "ceramic-spray", label: "Ceramic spray sealant", price: 75 },
  { key: "leather", label: "Leather conditioning", price: 50 },
] as const;

export const TIME_WINDOWS = ["Morning", "Afternoon", "Evening", "Flexible"] as const;
export const SERVICE_MODES = ["Mobile (we come to you)", "Drop-off / pickup"] as const;

export const CUSTOM_QUOTE_SERVICES = [
  "Paint Correction",
  "Ceramic Coating",
  "Boat Detailing",
  "RV Detailing",
  "Aircraft Detailing",
  "Fleet Detailing",
  "Extreme Interior Condition",
  "XL / Oversized Vehicle",
  "Other",
] as const;

export const TIMELINES = ["This week", "Within 2 weeks", "This month", "Flexible"] as const;

export function getPackage(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}
