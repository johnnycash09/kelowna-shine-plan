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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Santos Auto Detailing",
  description:
    "Premium mobile auto detailing, ceramic coating, and paint correction for luxury vehicles in Kelowna, BC.",
  url: "https://santosautodetailing.ca",
  telephone: "+12501234567",
  email: "info@santosautodetailing.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kelowna",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Kelowna" },
    { "@type": "City", name: "West Kelowna" },
    { "@type": "City", name: "Lake Country" },
    { "@type": "City", name: "Peachland" },
  ],
  priceRange: "$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "140",
  },
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Santos Auto Detailing | Premium Mobile Detailing & Ceramic Coating Kelowna</title>
        <meta
          name="description"
          content="Kelowna's automotive surface studio. Premium mobile detailing, paint correction, and 7-year ceramic coating for luxury vehicles. 5.0★ rated. We come to you."
        />
        <link rel="canonical" href="https://santosautodetailing.ca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Santos Auto Detailing — Kelowna's Automotive Surface Studio" />
        <meta property="og:description" content="Premium mobile detailing for vehicles that deserve more." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <BeforeAfterSlider />
        <ServicesGrid />
        <PackagesSection />
        <WhyMobileSection />
        <div id="process">
          <ProcessSection />
        </div>
        <div id="reviews">
          <TestimonialsSection />
        </div>
        <FAQSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
