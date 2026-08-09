import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { leaders } from "@/features/home/data/leaders";
import { Quote, Linkedin, ArrowUpRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * LeadershipSection — Editorial two-column layout
 *
 * Left side: heading + description
 * Right side: two compact profile cards emerging from bottom-right
 * Uses framer-motion whileInView for scroll-triggered animation.
 * Only this component is modified; data lives in leaders.ts.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Heading animation ─────────────────────────────────────────────── */
const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.4, ease },
  },
};

const eyebrowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.1 },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.2 },
  },
};

/* ── Card entrance — both emerge from bottom-right ──────────────────── */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    x: 40,
    scale: 0.96,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease,
      delay: i * 0.15 + 0.2,
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 40,
    x: 20,
    scale: 0.97,
    transition: { duration: 0.5, ease, delay: i * 0.1 },
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

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease, delay: 0.05 },
  },
};

/* ── Reduced-motion fallbacks ──────────────────────────────────────── */
const rmHeading = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const rmEyebrow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const rmTitle = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.05 } },
};

const rmDescription = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
};

const rmCard = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.1 + 0.1, staggerChildren: 0.04, delayChildren: 0.15 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

const rmItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function LeadershipSection() {
  const reducedMotion = useReducedMotion();

  const hVar = reducedMotion ? rmHeading : headingVariants;
  const eVar = reducedMotion ? rmEyebrow : eyebrowVariants;
  const tVar = reducedMotion ? rmTitle : titleVariants;
  const dVar = reducedMotion ? rmDescription : descriptionVariants;
  const cVar = reducedMotion ? rmCard : cardVariants;
  const iVar = reducedMotion ? rmItem : itemVariants;
  const pObj = reducedMotion ? rmItem : portraitVariants;
  const qObj = reducedMotion ? rmItem : quoteVariants;

  return (
    <section
      className="py-16 lg:py-20 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden"
      id="leadership"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Two-column editorial layout ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: Heading ──────────────────────────────── */}
          <motion.div
            variants={hVar}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            <motion.span
              variants={eVar}
              className="eyebrow block"
            >
              Visionary Guidance & Strategy
            </motion.span>
            
            <motion.h2
              variants={tVar}
              className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground"
            >
              Our Leadership
            </motion.h2>
            
            <motion.p
              variants={dVar}
              className="text-muted-foreground text-sm leading-relaxed max-w-md"
            >
              Meet the dedicated leaders driving academic excellence, strategic vision, and empowering student founders across APV E-Cell.
            </motion.p>
          </motion.div>

          {/* ── RIGHT COLUMN: Profile Cards ───────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {leaders.map((leader, i) => {
              const num = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cVar}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={
                    reducedMotion ? undefined : { y: -4, transition: { duration: 0.3, ease } }
                  }
                  className="group relative bg-surface border border-border rounded-xl p-5 flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-primary/40 hover:shadow-xl cursor-default"
                >
                  {/* ── Oversized background number ──────────────────── */}
                  <motion.span
                    variants={iVar}
                    className="absolute -top-3 -right-2 font-mono text-[4rem] sm:text-[5rem] font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {num}
                  </motion.span>

                  {/* ── Top: tag + number ────────────────────────────── */}
                  <motion.div
                    variants={iVar}
                    className="flex items-center justify-between relative z-10 mb-4"
                  >
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary text-foreground/80 border border-border text-[10px] font-mono uppercase tracking-wider font-medium">
                      {leader.tag}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                      {num}
                    </span>
                  </motion.div>

                  {/* ── Portrait (square aspect ratio) ────────────────── */}
                  <motion.div variants={iVar} className="relative z-10 mb-4 flex justify-center">
                    <motion.div
                      variants={pObj}
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg overflow-hidden border border-border bg-secondary"
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
                  <motion.div variants={iVar} className="relative z-10 mb-3 text-center">
                    <h3 className="text-base sm:text-lg font-serif font-medium text-foreground tracking-tight leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">
                      {leader.role}
                    </p>
                  </motion.div>

                  {/* ── Quote ────────────────────────────────────────── */}
                  <motion.blockquote
                    variants={qObj}
                    className="relative z-10 mb-4 pl-3 border-l-2 border-border group-hover:border-accent/50 transition-colors duration-500"
                  >
                    <Quote className="w-4 h-4 text-foreground/10 absolute -top-0.5 -left-2" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-3">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </motion.blockquote>

                  {/* ── Footer ───────────────────────────────────────── */}
                  <motion.div
                    variants={iVar}
                    className="relative z-10 pt-3 border-t border-hairline flex items-center justify-between mt-auto"
                  >
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
                      APV E-Cell
                    </span>
                    {leader.linkedin ? (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-accent transition-colors duration-300"
                      >
                        <Linkedin className="w-3 h-3" />
                        <span className="hidden sm:inline">Profile</span>
                        <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                        Leadership
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
