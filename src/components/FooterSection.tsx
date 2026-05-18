import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ALL_SERVICES, SERVICE_AREAS, PHONE, PHONE_DISPLAY, EMAIL } from "@/lib/seo";

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Santos Auto Detailing</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Kelowna's premium mobile detailing studio. Ceramic coating, paint correction, and full detailing for vehicles, boats, fleets and aircraft across the Okanagan.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {ALL_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={s.slug} className="text-muted-foreground hover:text-accent">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/gift-cards" className="text-muted-foreground hover:text-accent">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Service Areas</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICE_AREAS.map((a) => (
                <li key={a}>
                  <Link to="/auto-detailing-kelowna" className="text-muted-foreground hover:text-accent">
                    Detailing in {a}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <a href={`tel:${PHONE}`} className="hover:text-accent">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MessageSquare className="h-4 w-4 text-accent" />
                <a href={`sms:${PHONE}`} className="hover:text-accent">Text Santos</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <a href={`mailto:${EMAIL}`} className="hover:text-accent break-all">{EMAIL}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <Link to="/auto-detailing-kelowna" className="hover:text-accent">Kelowna, BC, Canada</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Santos Auto Detailing. All rights reserved. Mobile detailing in Kelowna, BC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
