import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SQUARE_BOOK_URL =
  "https://app.squareup.com/appointments/book/x1rm8kityedh45/LYPG9JNDGAE21/start";

const BookNow = () => {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Mobile Detailing in Kelowna | Santos Auto Detailing</title>
        <meta
          name="description"
          content="Book your detail with Santos Auto Detailing. Text a photo for a custom quote or book online instantly. Mobile detailing across Kelowna and the Okanagan."
        />
        <link rel="canonical" href="https://santosautodetailing.ca/book" />
        <meta property="og:title" content="Book Mobile Detailing in Kelowna | Santos Auto Detailing" />
        <meta
          property="og:description"
          content="Book your detail with Santos Auto Detailing. Text a photo for a custom quote or book online instantly."
        />
        <meta property="og:url" content="https://santosautodetailing.ca/book" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Book Mobile Detailing in Kelowna | Santos Auto Detailing" />
        <meta
          name="twitter:description"
          content="Book your detail with Santos Auto Detailing. Text a photo for a custom quote or book online instantly."
        />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Book Now
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-5">
              Two easy ways to book.
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick the path that fits. We reply fast — usually within the hour.
            </p>
          </div>

          {/* Two paths */}
          <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 flex flex-col">
              <MessageSquare className="h-7 w-7 text-accent mb-4" />
              <h2 className="font-display text-2xl font-semibold mb-2">
                Not sure what you need?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                Send a photo and we'll recommend the right package and exact price, usually within the hour.
              </p>
              <a href="sms:2508627491" className="inline-flex">
                <Button size="lg" className="w-full sm:w-auto min-h-12">
                  Text a Photo
                </Button>
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 flex flex-col">
              <Calendar className="h-7 w-7 text-accent mb-4" />
              <h2 className="font-display text-2xl font-semibold mb-2">
                Know what you want?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                Pick your service and time online and we'll see you at your door.
              </p>
              <a
                href={SQUARE_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-h-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Book Online
                </Button>
              </a>
            </div>
          </div>

          {/* Quote form */}
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
                Quick Quote
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">
                Tell us about your vehicle
              </h2>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="font-display text-xl sm:text-2xl">
                    Got it — text a photo to{" "}
                    <a href="sms:2508627491" className="text-accent underline underline-offset-4">
                      (250) 862-7491
                    </a>{" "}
                    to speed things up. We usually reply within the hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="vehicle">Vehicle (year / make / model)</Label>
                    <Input
                      id="vehicle"
                      name="vehicle"
                      placeholder="e.g. 2022 Ford F-150"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">What do you want done?</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger id="service" className="mt-2">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-detail">Full Detail</SelectItem>
                        <SelectItem value="ceramic-coating">Ceramic Coating</SelectItem>
                        <SelectItem value="paint-correction">Paint Correction</SelectItem>
                        <SelectItem value="interior-odor">Interior & Odor Removal</SelectItem>
                        <SelectItem value="rv-marine">RV & Marine</SelectItem>
                        <SelectItem value="not-sure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="photo">Photo (optional)</Label>
                    <Input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full min-h-12">
                    Send Quote Request
                  </Button>
                </form>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              ★★★★★ 5.0 Google Reviews · Licensed &amp; Insured · We Come To You
            </p>
          </div>
        </section>
      </main>

      <FooterSection />
      <StickyMobileCTA />
    </div>
  );
};

export default BookNow;
