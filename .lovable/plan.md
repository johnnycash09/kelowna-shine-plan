# Santos Auto Detailing — SEO & Conversion Overhaul Plan

## Goal
Rank locally for high-intent Kelowna/Okanagan detailing searches and convert visitors into bookings, quotes, calls, and texts. Keep the existing premium dark visual system intact.

## Scope Summary
- Rewrite homepage SEO (title, description, H1, hero copy, FAQs, CTAs)
- Add 8 new SEO-optimized pages (7 services + 1 location)
- Add schema (LocalBusiness on all pages, Service schema per service page, FAQPage on FAQs, BreadcrumbList)
- Add sticky mobile CTA (Call / Text / Book)
- Add service-area footer links and internal cross-linking between services
- Add sitemap + update robots.txt
- Audit checklist delivered at the end

## New Routes
```
/                              Home (rewritten)
/mobile-detailing-kelowna      (alias landing — same as home content focus)
/interior-detailing-kelowna
/exterior-detailing-kelowna
/ceramic-coating-kelowna
/paint-correction-kelowna
/fleet-detailing-kelowna
/boat-detailing-kelowna
/aircraft-detailing-kelowna
/auto-detailing-kelowna        Kelowna location page
```

Note: RV detailing will be folded into Fleet/Boat copy and mentioned across pages (no separate page unless requested) to keep scope tight. Tell me if you want a dedicated `/rv-detailing-kelowna` page.

## Page Structure (each service page)
Reusable `<ServicePage>` component with:
1. SEO `<Helmet>` — unique title, meta, canonical, OG, Service + LocalBusiness + Breadcrumb JSON-LD
2. Hero with H1, subheadline, dual CTA (Book / Quote), trust microcopy
3. What's included (bullet list from your spec)
4. Process / why-it-matters (premium tone)
5. Service-area mention (Kelowna + Okanagan towns)
6. Cross-links to 3 related services
7. Mini-FAQ (3–5 Qs) with FAQPage schema
8. Final CTA band

## Homepage Changes
- Title: "Santos Auto Detailing | Mobile Detailing, Ceramic Coating & Paint Correction in Kelowna"
- Meta: per spec
- H1: "Premium Mobile Detailing in Kelowna" (replace current stylized H1)
- Sub: "Luxury mobile and in-shop detailing for vehicles, boats, fleets, RVs, and aircraft across the Okanagan."
- Update ServicesGrid to include all 8 services as cards linking to new pages
- New "Service Areas" section listing Kelowna, West Kelowna, Lake Country, Vernon, Penticton, Summerland, Lower Mission, Okanagan
- Expand FAQ to the 10 Qs from spec; add FAQPage schema
- Final CTA copy update

## Global Additions
- `StickyMobileCTA` component (visible <md): Call, Text, Book buttons fixed bottom
- Phone `tel:+12508627491`, SMS `sms:+12508627491` everywhere
- Footer: service area column + service links column + clickable phone
- Update `index.html` `<title>` and meta defaults
- New `scripts/generate-sitemap.ts` listing all routes; postbuild hook
- Update `public/robots.txt` to reference sitemap

## Schema
- LocalBusiness (already present, expand `areaServed`, add `geo`, `openingHours`)
- Service schema per service page (`@type: Service`, `provider`, `areaServed`, `serviceType`)
- FAQPage schema on home + each service page
- BreadcrumbList on inner pages

## Files to Create
- `src/components/ServicePageLayout.tsx` (reusable layout)
- `src/components/StickyMobileCTA.tsx`
- `src/components/ServiceAreasSection.tsx`
- `src/lib/seo.ts` (schema builders)
- `src/pages/services/InteriorDetailing.tsx`
- `src/pages/services/ExteriorDetailing.tsx`
- `src/pages/services/CeramicCoating.tsx`
- `src/pages/services/PaintCorrection.tsx`
- `src/pages/services/FleetDetailing.tsx`
- `src/pages/services/BoatDetailing.tsx`
- `src/pages/services/AircraftDetailing.tsx`
- `src/pages/locations/KelownaLocation.tsx`
- `scripts/generate-sitemap.ts`

## Files to Edit
- `src/App.tsx` — register all new routes
- `src/pages/Index.tsx` — updated H1/meta/FAQ/schema
- `src/components/HeroSection.tsx` — new H1 + sub copy
- `src/components/ServicesGrid.tsx` — 8 cards w/ links
- `src/components/FAQSection.tsx` — 10 Qs + schema
- `src/components/FinalCTASection.tsx` — new copy + Call/Text buttons
- `src/components/FooterSection.tsx` — service area + service nav links
- `src/components/Navbar.tsx` — add Services dropdown / link
- `index.html` — title + meta defaults
- `public/robots.txt` — add Sitemap directive
- `package.json` + `tsconfig.node.json` — postbuild script + tsx

## Final Deliverable
After implementation, I'll output the SEO audit checklist (title, meta, H1, target keywords, internal links, schema, conversion improvements) for every page.

## Confirm / Adjust Before I Build
- OK to proceed with no separate `/rv-detailing-kelowna` (RV mentioned within Fleet/Boat)?
- Use the existing phone `+1 250-862-7491` and email `pay@santosautodetailing.ca` from current schema?
- Sticky mobile CTA: Call + Text + Book Now (3 buttons) — confirm.