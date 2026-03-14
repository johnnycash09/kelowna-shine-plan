import { useState } from "react";
import { motion } from "framer-motion";
import beforeImage from "@/assets/before-detail.jpg";
import afterImage from "@/assets/after-detail.jpg";

const transition = { type: "spring", duration: 0.5, bounce: 0 };

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);

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
            See the Difference
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag to reveal the transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-lg border border-border"
        >
          {/* Before Image */}
          <img
            src={beforeImage}
            alt="Vehicle paint before detailing with swirl marks and scratches"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* After Image (clipped) */}
          <div
            className="absolute inset-0 h-full w-full"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={afterImage}
              alt="Vehicle paint after ceramic coating with mirror finish"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-primary"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background shadow-elegant">
              <span className="font-mono text-xs text-primary">↔</span>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute left-4 top-4 rounded bg-background/80 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
            BEFORE
          </div>
          <div className="absolute right-4 top-4 rounded bg-background/80 px-2 py-1 font-mono text-xs text-primary backdrop-blur-sm">
            AFTER
          </div>

          {/* Range Input */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-col-resize opacity-0"
            aria-label="Before and after comparison slider"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
