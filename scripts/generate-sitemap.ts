// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://santosautodetailing.ca";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/auto-detailing-kelowna", changefreq: "weekly", priority: "0.9" },
  { path: "/auto-detailing-west-kelowna", changefreq: "monthly", priority: "0.8" },
  { path: "/auto-detailing-vernon", changefreq: "monthly", priority: "0.7" },
  { path: "/auto-detailing-penticton", changefreq: "monthly", priority: "0.7" },
  { path: "/mobile-detailing-kelowna", changefreq: "weekly", priority: "0.9" },
  { path: "/interior-detailing-kelowna", changefreq: "monthly", priority: "0.8" },
  { path: "/exterior-detailing-kelowna", changefreq: "monthly", priority: "0.8" },
  { path: "/ceramic-coating-kelowna", changefreq: "monthly", priority: "0.9" },
  { path: "/paint-correction-kelowna", changefreq: "monthly", priority: "0.9" },
  { path: "/ppf-kelowna", changefreq: "monthly", priority: "0.9" },
  { path: "/rv-detailing-kelowna", changefreq: "monthly", priority: "0.8" },
  { path: "/ceramic-coating-boat-kelowna", changefreq: "monthly", priority: "0.8" },
  { path: "/fleet-detailing-kelowna", changefreq: "monthly", priority: "0.7" },
  { path: "/boat-detailing-kelowna", changefreq: "monthly", priority: "0.7" },
  { path: "/aircraft-detailing-kelowna", changefreq: "monthly", priority: "0.7" },
  { path: "/maintenance", changefreq: "monthly", priority: "0.8" },
  { path: "/book", changefreq: "monthly", priority: "0.7" },
  { path: "/book/quote", changefreq: "monthly", priority: "0.6" },
  { path: "/gift-cards", changefreq: "monthly", priority: "0.7" },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
