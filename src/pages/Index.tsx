import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServicesGrid from "@/components/ServicesGrid";
import PackagesSection from "@/components/PackagesSection";
import WhyMobileSection from "@/components/WhyMobileSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { localBusinessSchema, faqSchema, SITE_URL } from "@/lib/seo";

const HOMEPAGE_FAQS = [
  { q: "Do you offer mobile detailing in Kelowna?", a: "Yes — our fully equipped mobile unit comes to your home, office or job site anywhere in Kelowna and the Central Okanagan, with filtered water and self-contained power." },
  { q: "What areas do you serve?", a: "Kelowna, West Kelowna, Lake Country, Vernon, Penticton, Summerland, Lower Mission, Peachland and the surrounding Okanagan." },
  { q: "Do you provide ceramic coating in-shop?", a: "Yes. Ceramic coating installation is performed in a controlled in-shop environment to ensure proper cure and a flawless finish." },
  { q: "What is paint correction?", a: "Paint correction is a multi-stage machine polishing process that removes swirl marks, oxidation and light defects from your clear coat — restoring true gloss and depth." },
  { q: "How long does ceramic coating last?", a: "Professional ceramic coatings typically last 2–7+ years depending on the system and care. We recommend the right tier based on your vehicle and use." },
  { q: "Do you detail boats and aircraft?", a: "Yes. We offer marine detailing for boats and watercraft on Okanagan Lake, plus discreet aircraft and private jet detailing programs." },
  { q: "Do you offer same-day service?", a: "Same-day appointments are sometimes available based on schedule. Call or text us and we'll confirm availability quickly." },
  { q: "Are you insured?", a: "Yes — Santos Auto Detailing is fully insured for mobile, in-shop, fleet and marine work." },
  { q: "Do you provide pickup and drop-off?", a: "Yes. Pickup and drop-off is available within our service area for ceramic coating, paint correction and other in-shop services." },
  { q: "What's the difference between professional ceramic coating and a spray ceramic?", a: "Professional ceramic coatings are SiO2-based systems that bond to your clear coat for years of protection. Spray ceramics are short-term toppers — useful for maintenance, but not a substitute for a real coating system." },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Santos Auto Detailing | Mobile Detailing in Kelowna</title>
        <meta
          name="description"
          content="Premium mobile detailing, ceramic coating, and paint correction in Kelowna and the Okanagan. Expert care at your location."
        />
        <link rel="canonical" href={SITE_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Santos Auto Detailing | Premium Mobile Detailing in Kelowna" />
        <meta property="og:description" content="Premium mobile detailing, ceramic coating and paint correction in Kelowna and the Okanagan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(HOMEPAGE_FAQS))}</script>
      </Helmet>

      <Navbar />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <TrustStrip />
        <BeforeAfterSlider />
        <ServicesGrid />
        <PackagesSection />
        <WhyMobileSection />
        <ServiceAreasSection />
        <div id="process">
          <ProcessSection />
        </div>
        <div id="reviews">
          <TestimonialsSection />
        </div>
        <FAQSection faqs={HOMEPAGE_FAQS} />
        <FinalCTASection />
      </main>
      <FooterSection />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
