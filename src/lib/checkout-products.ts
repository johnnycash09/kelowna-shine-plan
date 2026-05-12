import type { PackageSlug } from "./booking-config";

// Maps a package slug to its full-price Stripe lookup_key.
export const PACKAGE_PRICE_IDS: Record<PackageSlug, string> = {
  "interior": "pkg_interior_full",
  "express-exterior": "pkg_express_exterior_full",
  "express-full": "pkg_express_full_full",
  "executive": "pkg_executive_full",
};

export const MAINTENANCE_PRICE_ID = "plan_maintenance_monthly";
export const MAINTENANCE_PRICE = 199;
