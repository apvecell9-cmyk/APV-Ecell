import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { leaders } from "@/features/home/data/leaders";
import { Quote, Linkedin, ArrowUpRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * LeadershipSection — Editorial capsule-reveal design
 *
 * Two leadership profiles animate in from capsule forms when the
 * section scrolls into view. Uses framer-motion whileInView.
 * Only this component is modified; data lives in leaders.ts.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Heading animation ─────────────────────────────────────────────── */
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

/* ── Card capsule → editorial formation ────────────────────────────── */
const cardVariants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -80 : 80,
    y: 40,
    scale: 0.88,
    rotate: side === "left" ? -3 : 3,
    borderRadius: "999px",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    borderRadius: "1rem",
    transition: {
      duration: 1,
      ease,
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -30 : 30,
    y: 20,
    scale: 0.95,
    borderRadius: "999px",
    transition: { duration: 0.5, ease },
  }),
};

/* ── Inner content stagger ─────────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.8, borderRadius: "999px" },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: "0.75rem",
    transition: { duration: 0.7, ease },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, y: 10, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease, delay: 0.1 },
  },
};

/* ── Reduced-motion fallbacks ──────────────────────────────────────── */
const rmHeading = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};
const rmCard = {
  hidden: (side: "left" | "right") => ({ opacity: 0 }),
  visible: {
    opacity: 1,
    borderRadius: "1rem",
    transition: { duration: 0.4, staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: (side: "left" | "right") => ({ opacity: 0, transition: { duration: 0.3 } }),
};
const rmItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function LeadershipSection() {
  const reducedMotion = useReducedMotion();

  const hVar = reducedMotion ? rmHeading : headingVariants;
  const cVar = reducedMotion ? rmCard : cardVariants;
  const iVar = reducedMotion ? rmItem : itemVariants;
  const pObj = reducedMotion ? rmItem : portraitVariants;
  const qObj = reducedMotion ? rmItem : quoteVariants;

  return (
    <section
      className="py-24 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden"
      id="leadership"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* ── Heading ─────────────────────────────────────────────── */}
        <motion.div
          variants={hVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeader
            eyebrow="Visionary Guidance & Strategy"
            title="Our Leadership"
            description="Meet the dedicated leaders driving academic excellence, strategic vision, and empowering student founders across APV E-Cell."
          />
        </motion.div>

        {/* ── Two-column editorial grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8 lg:gap-12">
          {leaders.map((leader, i) => {
            const side = i === 0 ? "left" : "right";
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={i}
                custom={side}
                variants={cVar}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={
                  reducedMotion ? undefined : { y: -4, transition: { duration: 0.3, ease } }
                }
                className="group relative bg-surface border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-primary/40 hover:shadow-xl cursor-default"
              >
                {/* ── Oversized background number ──────────────────── */}
                <motion.span
                  variants={iVar}
                  className="absolute -top-4 -right-2 sm:-top-6 sm:-right-3 font-mono text-[5rem] sm:text-[7rem] font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {num}
                </motion.span>

                {/* ── Top: tag + number ────────────────────────────── */}
                <motion.div
                  variants={iVar}
                  className="flex items-center justify-between relative z-10 mb-6"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground/80 border border-border text-[11px] font-mono uppercase tracking-wider font-medium">
                    {leader.tag}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">
                    {num}
                  </span>
                </motion.div>

                {/* ── Portrait ─────────────────────────────────────── */}
                <motion.div variants={iVar} className="relative z-10 mb-6">
                  <motion.div
                    variants={pObj}
                    className="w-full aspect-[4/3] sm:aspect-[3/2] rounded-xl overflow-hidden border border-border bg-secondary"
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>

                {/* ── Name + Role ──────────────────────────────────── */}
                <motion.div variants={iVar} className="relative z-10 mb-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-foreground tracking-tight leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-1.5 uppercase tracking-wider">
                    {leader.role}
                  </p>
                </motion.div>

                {/* ── Quote ────────────────────────────────────────── */}
                <motion.blockquote
                  variants={qObj}
                  className="relative z-10 mb-6 pl-4 border-l-2 border-border group-hover:border-accent/50 transition-colors duration-500"
                >
                  <Quote className="w-5 h-5 text-foreground/10 absolute -top-0.5 -left-2.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{leader.quote}&rdquo;
                  </p>
                </motion.blockquote>

                {/* ── Footer ───────────────────────────────────────── */}
                <motion.div
                  variants={iVar}
                  className="relative z-10 pt-4 border-t border-hairline flex items-center justify-between"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
                    APV E-Cell
                  </span>
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Profile</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                      Leadership
                    </span>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
