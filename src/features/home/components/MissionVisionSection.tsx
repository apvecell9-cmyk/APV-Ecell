import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Target, Check } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * MissionVisionSection — Compact editorial two-card layout
 *
 * Vision & Mission section with scroll-triggered animations.
 * Uses framer-motion whileInView for viewport-based reveals.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Heading animation ─────────────────────────────────────────────── */
const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

/* ── Card entrance — staggered from bottom ─────────────────────────── */
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 40,
    scale: 0.97,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease,
      delay: i * 0.12 + 0.2,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  }),
};

/* ── Inner content stagger ─────────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease },
  },
};

/* ── Reduced-motion fallbacks ──────────────────────────────────────── */
const rmHeading = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const rmCard = {
  hidden: (i: number) => ({ opacity: 0 }),
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.1 + 0.1, staggerChildren: 0.04, delayChildren: 0.1 },
  }),
};

const rmItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

const rmIcon = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

export function MissionVisionSection() {
  const reducedMotion = useReducedMotion();

  const hVar = reducedMotion ? rmHeading : headingVariants;
  const cVar = reducedMotion ? rmCard : cardVariants;
  const iVar = reducedMotion ? rmItem : itemVariants;
  const iObj = reducedMotion ? rmIcon : iconVariants;

  const cards = [
    {
      num: "01",
      title: "Our Vision",
      statement: "A transformative mindset for every student.",
      icon: Compass,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      iconBorder: "border-primary/20",
      accentColor: "text-accent",
      bullets: [
        "Champion entrepreneurship as a life skill.",
        "Build a community where creativity and resilience thrive.",
        "Create lasting social and economic impact.",
      ],
      tags: ["ENTREPRENEURSHIP", "CREATIVITY", "IMPACT"],
      footer: "FUTURE FOCUSED",
    },
    {
      num: "02",
      title: "Our Mission",
      statement: "Turn ideas into real-world innovation.",
      icon: Target,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      iconBorder: "border-accent/20",
      accentColor: "text-primary",
      bullets: [
        "Give students hands-on entrepreneurial experience.",
        "Develop ethical, strategic future leaders.",
        "Create an ecosystem where experimentation and learning are encouraged.",
      ],
      tags: ["ACTION", "EXPERIENCE", "INNOVATION"],
      footer: "ACTION DRIVEN",
    },
  ];

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-12 bg-surface border-t border-border relative overflow-hidden">
      {/* Subtle grid pattern background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Heading ──────────────────────────────────────── */}
        <motion.div
          variants={hVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 lg:mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
            Vision & Mission
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-accent/60 rounded-full" />
        </motion.div>

        {/* ── Two Cards with Connector ─────────────────────────────── */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {cards.map((card, i) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cVar}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.3, ease } }
                  }
                  className="group relative rounded-2xl border border-border bg-background/80 backdrop-blur-md p-6 md:p-8 shadow-soft hover:shadow-lg hover:border-primary/30 transition-all duration-500 flex flex-col overflow-hidden"
                >
                  {/* Warm accent glow on hover */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700 pointer-events-none" />

                  <div className="space-y-5 relative z-10 flex-1">
                    {/* ── Icon + Number Row ─────────────────────────── */}
                    <motion.div
                      variants={iVar}
                      className="flex items-start justify-between"
                    >
                      <motion.div
                        variants={iObj}
                        className={`w-11 h-11 rounded-xl ${card.iconBg} border ${card.iconBorder} flex items-center justify-center ${card.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                      >
                        <Icon className="w-5.5 h-5.5" />
                      </motion.div>
                      <span className="font-mono text-[10px] text-muted-foreground/50 tabular-nums mt-1">
                        {card.num}
                      </span>
                    </motion.div>

                    {/* ── Title: "OUR VISION" / "OUR MISSION" ──────── */}
                    <motion.div variants={iVar}>
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground tracking-tight leading-tight">
                        {card.title}
                      </h3>
                    </motion.div>

                    {/* ── Main Statement (Bold & Prominent) ─────────── */}
                    <motion.p
                      variants={iVar}
                      className="text-base md:text-lg font-medium text-foreground/90 leading-snug"
                    >
                      {card.statement}
                    </motion.p>

                    {/* ── Supporting Bullet Points ──────────────────── */}
                    <motion.ul
                      variants={iVar}
                      className="space-y-3 pt-1"
                    >
                      {card.bullets.map((bullet, j) => (
                        <motion.li
                          key={j}
                          variants={iVar}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                        >
                          <Check
                            className={`w-4 h-4 ${card.accentColor} shrink-0 mt-0.5`}
                            strokeWidth={2.5}
                          />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* ── Footer: Tags + Label ────────────────────────── */}
                  <motion.div
                    variants={iVar}
                    className="mt-6 pt-4 border-t border-hairline flex items-center justify-between relative z-10"
                  >
                    <div className="flex gap-1.5 flex-wrap">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                      {card.footer}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Subtle Connector (Desktop Only) ────────────────────── */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              <div className="w-8 h-px bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
