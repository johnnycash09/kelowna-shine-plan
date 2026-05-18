import { Helmet } from "react-helmet-async";
import { Check, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/seo";

const denominations = [
  { amount: "$150", description: "Interior detail or exterior refresh" },
  { amount: "$300", description: "Full detail — the complete experience" },
  { amount: "$500", description: "Paint correction or premium detail" },
  { amount: "Custom Amount", description: "Perfect for ceramic coating, RV, boat or fleet packages" },
];

const features = [
  {
    title: "Any amount",
    description: "Choose a set denomination or request a custom amount for any service.",
  },
  {
    title: "Never expires",
    description: "Santos gift cards have no expiry date. Use them whenever the time is right.",
  },
  {
    title: "Any service",
    description: "Redeemable for any Santos service — detail, ceramic coating, paint correction, boat, RV, or aircraft.",
  },
];

const GiftCards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gift Cards | Santos Auto Detailing Kelowna</title>
        <meta
          name="description"
          content="Give the gift of a premium detail. Santos Auto Detailing gift cards are perfect for executives, clients, car lovers and corporate gifting across Kelowna and the Okanagan."
        />
        <link rel="canonical" href={`${SITE_URL}/gift-cards`} />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Gift Cards · Corporate Gifting
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-5">
              Give the gift of a flawless detail.
            </h1>
            <p className="text-lg text-muted-foreground">
              A Santos gift card is a premium experience — for the executive who has everything,
              the client you want to impress, or the car lover in your life. Available in any
              amount. Redeemable for any service.
            </p>
          </div>

          {/* Denominations */}
          <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {denominations.map((card) => (
              <div
                key={card.amount}
                className="rounded-lg border border-border bg-card p-8 flex flex-col items-center text-center"
              >
                <span className="font-display text-4xl font-semibold">{card.amount}</span>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                <a href="sms:+12508627491" className="mt-6 w-full">
                  <Button variant="outline" className="w-full rounded-full">
                    Order via text
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Gift cards are sent via email or as a printed card. To order, text us the amount and
            recipient details — we'll process and deliver within 24 hours.
          </p>

          {/* Corporate gifting */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="rounded-lg border border-accent/40 bg-card p-8 md:p-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
                Corporate gifting for Kelowna businesses.
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-8">
                Impress clients, reward staff, and give something people actually want. Santos gift
                cards work as client gifts, employee appreciation awards, and holiday packages. We
                can fulfill orders of any size — call or text to arrange.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+12508627491">
                  <Button className="rounded-full w-full sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (250) 862-7491
                  </Button>
                </a>
                <a href="sms:+12508627491">
                  <Button variant="outline" className="rounded-full w-full sm:w-auto">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Text Us
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6 text-center">
                <Check className="h-6 w-6 text-accent mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
};

export default GiftCards;
