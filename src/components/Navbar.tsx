import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const AUTO_SERVICES = [
  { label: "Interior Detailing", to: "/interior-detailing-kelowna" },
  { label: "Exterior Detailing", to: "/exterior-detailing-kelowna" },
  { label: "Paint Correction", to: "/paint-correction-kelowna" },
  { label: "Ceramic Coating", to: "/ceramic-coating-kelowna" },
  { label: "Paint Protection Film", to: "/ppf-kelowna" },
];

const SPECIALTY_SERVICES = [
  { label: "Boat Detailing", to: "/boat-detailing-kelowna" },
  { label: "Boat Ceramic Coating", to: "/ceramic-coating-boat-kelowna" },
  { label: "RV Detailing", to: "/rv-detailing-kelowna" },
  { label: "Aircraft Detailing", to: "/aircraft-detailing-kelowna" },
  { label: "Fleet Accounts", to: "/fleet-accounts" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <a href="/" className="font-display text-base font-semibold tracking-wide text-foreground">
          SANTOS<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="inline-flex items-center gap-1 font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                <div className="grid w-[480px] grid-cols-2 gap-8 rounded-lg border border-border bg-background p-6 shadow-elegant">
                  <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/70">
                      Auto
                    </p>
                    <ul className="space-y-2">
                      {AUTO_SERVICES.map((s) => (
                        <li key={s.to}>
                          <Link
                            to={s.to}
                            onClick={() => setServicesOpen(false)}
                            className="block font-display text-sm text-muted-foreground hover:text-accent"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/70">
                      Specialty
                    </p>
                    <ul className="space-y-2">
                      {SPECIALTY_SERVICES.map((s) => (
                        <li key={s.to}>
                          <Link
                            to={s.to}
                            onClick={() => setServicesOpen(false)}
                            className="block font-display text-sm text-muted-foreground hover:text-accent"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <a
            href="/#packages"
            className="font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Packages
          </a>
          <a
            href="/maintenance"
            className="font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Memberships
          </a>
          <a
            href="/#reviews"
            className="font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Reviews
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/book/quote"
            className="hidden rounded-full border border-border px-5 py-2.5 font-display text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent md:inline-flex"
          >
            Get a Quote
          </Link>
          <Link
            to="/book"
            className="hidden rounded-full bg-foreground px-5 py-2.5 font-display text-sm font-semibold text-background transition-all hover:bg-accent md:inline-flex"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <p className="font-display text-lg font-semibold text-foreground">Services</p>
            {[...AUTO_SERVICES, ...SPECIALTY_SERVICES].map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className="pl-3 font-display text-sm text-muted-foreground"
              >
                {s.label}
              </Link>
            ))}
            <a
              href="/#packages"
              onClick={() => setOpen(false)}
              className="font-display text-lg text-foreground"
            >
              Packages
            </a>
            <a
              href="/maintenance"
              onClick={() => setOpen(false)}
              className="font-display text-lg text-foreground"
            >
              Memberships
            </a>
            <a
              href="/#reviews"
              onClick={() => setOpen(false)}
              className="font-display text-lg text-foreground"
            >
              Reviews
            </a>
            <a
              href="/book/quote"
              onClick={() => setOpen(false)}
              className="mt-2 font-display text-base text-accent"
            >
              Get a Quote
            </a>
            <a
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-foreground py-3.5 text-center font-display text-sm font-semibold text-background"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
