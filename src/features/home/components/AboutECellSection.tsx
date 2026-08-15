import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Rocket, Users2, Lightbulb } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * AboutECellSection — Homepage introduction to APV E-Cell
 *
 * Short editorial intro that sits right after the hero: what E-Cell is,
 * and the three pillars it runs on. Kept visually light so it doesn't
 * compete with the Vision & Mission section that follows.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    icon: Lightbulb,
    title: "Nurture Ideas",
    text: "Workshops and mentorship that turn raw curiosity into real ventures.",
  },
  {
    icon: Rocket,
    title: "Flagship Events",
    text: "Pitchnova and other competitions that put student ideas on stage.",
  },
  {
    icon: Users2,
    title: "A Driven Community",
    text: "A student-run cell building resilience, creativity and ethical leadership.",
  },
];

export function AboutECellSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface px-6 py-20 lg:px-12 lg:py-28">
      {/* Soft decorative glow, consistent with other homepage sections */}
      <div className="pointer-events-none absolute -top-24 right-0 -z-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-widest text-[#8733C0]">
            <Sparkles className="h-3.5 w-3.5" />
            About Us
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
            About APV E-Cell
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-[#8733C0]" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            APV E-Cell (Agnel Polytechnic Vashi Entrepreneurship Cell) is a passionate
            student-driven initiative focused on nurturing entrepreneurial mindsets across all
            disciplines. We believe true entrepreneurship isn&apos;t just about starting
            companies — it&apos;s about fostering creativity, building resilience, and striving
            for meaningful social change.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : i * 0.1, ease }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-background p-6 shadow-soft transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8733C0]/10">
                <pillar.icon className="h-5 w-5 text-[#8733C0]" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-serif text-lg tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
