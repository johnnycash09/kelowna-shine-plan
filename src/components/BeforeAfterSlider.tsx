import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import beforeImage from "@/assets/before-detail.jpg";
import afterImage from "@/assets/after-detail.jpg";

const transition = { type: "spring" as const, duration: 0.5, bounce: 0 };

// Replace the `before` / `after` image paths with your own photos.
// Each entry corresponds to one swipeable transformation card.
const transformations = [
  {
    id: "transformation-1",
    label: "Transformation #1 — Replace with your photo",
    before: beforeImage,
    after: afterImage,
    beforeAlt: "Placeholder before image — transformation 1",
    afterAlt: "Placeholder after image — transformation 1",
    caption: "Paint Correction + Ceramic Coating",
  },
  {
    id: "transformation-2",
    label: "Transformation #2 — Replace with your photo",
    before: beforeImage,
    after: afterImage,
    beforeAlt: "Placeholder before image — transformation 2",
    afterAlt: "Placeholder after image — transformation 2",
    caption: "Full Interior Detail",
  },
  {
    id: "transformation-3",
    label: "Transformation #3 — Replace with your photo",
    before: beforeImage,
    after: afterImage,
    beforeAlt: "Placeholder before image — transformation 3",
    afterAlt: "Placeholder after image — transformation 3",
    caption: "Exterior Restoration",
  },
];

type CardProps = (typeof transformations)[number];

const ComparisonCard = ({ before, after, beforeAlt, afterAlt, caption, label }: CardProps) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg border border-border touch-none"
        style={{ cursor: "ew-resize" }}
        role="slider"
        aria-label={`Before and after comparison — ${caption}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        {/* Before (full) */}
        <img
          src={before}
          alt={beforeAlt}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* After (clipped from the left) */}
        <div
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={after}
            alt={afterAlt}
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-primary"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background shadow-elegant">
            <span className="font-mono text-xs text-primary">↔</span>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-3 top-3 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
          Before
        </div>
        <div className="absolute right-3 top-3 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur-sm">
          After
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-background/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur-sm md:hidden">
          Swipe to compare
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">{caption}</p>
      <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground/60">
        {label}
      </p>
    </div>
  );
};

const BeforeAfterSlider = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Real Results, Real Vehicles
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag or swipe each photo to reveal the transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="grid gap-8 md:grid-cols-3"
        >
          {transformations.map((t) => (
            <ComparisonCard key={t.id} {...t} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/results">See More Transformations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
