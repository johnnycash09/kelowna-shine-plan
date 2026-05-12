import { Phone, Mail, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Santos Auto Detailing</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              The Okanagan's premier mobile detailing service. Professional ceramic coating, paint correction, and full detailing — delivered to your door.
            </p>
          </div>

          {/* Contact (NAP) */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+12508627491" className="hover:text-primary">(250) 862-7491</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:pay@santosautodetailing.ca" className="hover:text-primary">pay@santosautodetailing.ca</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kelowna, BC, Canada</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Service Areas</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Kelowna</li>
              <li>West Kelowna</li>
              <li>Lake Country</li>
              <li>Peachland</li>
              <li>Vernon</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Santos Auto Detailing. All rights reserved. Kelowna, BC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
