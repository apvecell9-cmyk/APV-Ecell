import React from "react";
import { motion } from "framer-motion";

export function FounderVision() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        scale: 1.01,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      className="
        relative overflow-hidden
        rounded-[1rem_3rem_1rem_3rem]
        border border-white/25
        bg-white/10
        p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        backdrop-blur-md
        sm:p-10
      "
    >
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--about-muted)]">
        Founder Vision
      </p>

      <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed italic text-[var(--about-text)] md:text-xl">
        “To foster love and understanding among the various communities in India and to contribute
        to the development of self-reliance among youth through education.”
      </p>

      <p className="mt-6 font-mono text-xs text-[var(--about-muted)]">
        — Fr. C. Rodrigues
      </p>
    </motion.div>
  );
}