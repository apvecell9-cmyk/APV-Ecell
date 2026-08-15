import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DepartmentCard } from "./DepartmentCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { departments } from "@/features/home/data/departments";

/* ──────────────────────────────────────────────────────────────────────
 * TeamSection — Department cards grid with scroll-triggered animation
 *
 * Uses framer-motion whileInView for viewport-based reveals.
 * Cards stagger in from bottom with elegant easing.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Card entrance — staggered from bottom ─────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
      delay: i * 0.07,
    },
  }),
};

/* ── Reduced-motion fallback ───────────────────────────────────────── */
const rmCard = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function TeamSection() {
  const reducedMotion = useReducedMotion();
  const cVar = reducedMotion ? rmCard : cardVariants;

  return (
    <section className="py-24 px-6 lg:px-12 relative" style={{ backgroundColor: 'var(--homepage-lavender)' }} id="team">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Departments"
          title="Our Teams & Departments"
          description="Hover over any department card to view the Department Head and key team members driving our initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              custom={i}
              variants={cVar}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <DepartmentCard {...dept} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
