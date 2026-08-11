import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { leaders } from "@/features/home/data/leaders";
import { LeadershipProfile } from "./LeadershipProfile";

/* ──────────────────────────────────────────────────────────────────────
 * LeadershipSection — Editorial alternating capsule layout
 *
 * Each leadership member is presented as a large horizontal capsule
 * with an intersecting circular portrait. Profiles alternate sides
 * (left/right) and enter from alternating directions on scroll.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Section header animations ─────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const rmHeader = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function LeadershipSection() {
  const reducedMotion = useReducedMotion();
  const hVar = reducedMotion ? rmHeader : headerVariants;

  return (
    <section
      className="py-16 lg:py-24 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden"
      id="leadership"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ──────────────────────────────────────── */}
        <motion.div
          variants={hVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <span className="eyebrow block text-muted-foreground/80">
            Visionary Guidance & Strategy
          </span>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
            Our Leadership
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            Meet the dedicated leaders driving academic excellence, strategic vision, and
            empowering student founders across APV E-Cell.
          </p>
        </motion.div>

        {/* ── Leadership Profiles ──────────────────────────────────── */}
        <div className="relative">
          {/* Vertical center line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />

          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {leaders.map((leader, i) => (
              <LeadershipProfile
                key={i}
                leader={leader}
                index={i}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
