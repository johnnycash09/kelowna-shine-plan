import { Link } from "react-router-dom";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { PHONE } from "@/lib/seo";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 gap-px border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <a
        href={`tel:${PHONE}`}
        className="flex items-center justify-center gap-2 py-3 font-display text-xs font-semibold text-foreground"
      >
        <Phone className="h-4 w-4 text-accent" />
        Call
      </a>
      <a
        href={`sms:${PHONE}`}
        className="flex items-center justify-center gap-2 border-x border-border py-3 font-display text-xs font-semibold text-foreground"
      >
        <MessageSquare className="h-4 w-4 text-accent" />
        Text
      </a>
      <a
        href="/book"
        className="flex items-center justify-center gap-2 bg-foreground py-3 font-display text-xs font-semibold text-background"
      >
        <Calendar className="h-4 w-4" />
        Book
      </a>
    </div>
  );
};

export default StickyMobileCTA;
