import { Star } from "lucide-react";

const TrustStrip = () => {
  const items = [
    { type: "stars", label: "5.0" },
    { type: "text", label: "Google Reviews" },
    { type: "text", label: "Licensed & Insured" },
    { type: "text", label: "Revivify & Graphene Certified" },
    { type: "text", label: "We Come To You" },
  ];

  return (
    <section className="border-y border-border bg-card/50 py-4">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground md:gap-x-5 md:text-base">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {item.type === "stars" ? (
                <>
                  <span className="flex">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent md:h-4 md:w-4" />
                    ))}
                  </span>
                  <span className="font-semibold text-foreground">{item.label}</span>
                </>
              ) : (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {i < items.length - 1 && (
                <span className="ml-2 hidden text-muted-foreground/40 md:ml-4 sm:inline">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
