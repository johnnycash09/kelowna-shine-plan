import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import WhyMobileSection from "@/components/WhyMobileSection";
import PackagesSection from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Santos Auto Detailing",
  description: "Professional mobile auto detailing, ceramic coating, and paint correction in Kelowna, BC.",
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
  ],
  priceRange: "$$-$$$",
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
        <title>Santos Auto Detailing | Mobile Detailing & Ceramic Coating Kelowna BC</title>
        <meta
          name="description"
          content="Kelowna's premier mobile auto detailing service. Professional ceramic coating, paint correction, interior & exterior detailing. 5.0★ rated. We come to you."
        />
        <link rel="canonical" href="https://santosautodetailing.ca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <ServicesGrid />
        <BeforeAfterSlider />
        <WhyMobileSection />
        <PackagesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
