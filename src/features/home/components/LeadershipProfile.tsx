import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, ArrowUpRight } from "lucide-react";
import type { Leader } from "@/features/home/data/leaders";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Alternating entrance animations ──────────────────────────────── */
const profileVariantsLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const profileVariantsRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const rmProfile = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease, delay: 0.15 },
  },
};

const rmPortrait = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const capsuleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease, delay: 0.1 },
  },
};

const rmCapsule = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

interface LeadershipProfileProps {
  leader: Leader;
  index: number;
  side: "left" | "right";
}

export function LeadershipProfile({ leader, index, side }: LeadershipProfileProps) {
  const reducedMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  const pVar = reducedMotion
    ? rmProfile
    : side === "left"
      ? profileVariantsLeft
      : profileVariantsRight;
  const pObj = reducedMotion ? rmPortrait : portraitVariants;
  const cObj = reducedMotion ? rmCapsule : capsuleVariants;

  const isLeft = side === "left";

  return (
    <motion.div
      variants={pVar}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"} py-8 md:py-12`}
    >
      {/* ── Circular Portrait ──────────────────────────────────────── */}
      <motion.div
        variants={pObj}
        className="relative z-10 shrink-0"
      >
        {/* Outer ring decoration */}
        <div className={`absolute inset-0 -m-3 rounded-full border border-brand-lavender/40 ${isLeft ? "-ml-4 md:-ml-6" : "-mr-4 md:-mr-6"}`} />

        {/* Main portrait circle */}
        <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-border bg-secondary shadow-lg ${isLeft ? "" : ""}`}>
          <img
            src={leader.image}
            alt={leader.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* ── Connector Line ─────────────────────────────────────────── */}
      <div className={`hidden md:block relative z-0 w-8 lg:w-12 h-px bg-border shrink-0 ${isLeft ? "-mx-1" : "-mx-1"}`} />

      {/* ── Profile Capsule ────────────────────────────────────────── */}
      <motion.div
        variants={cObj}
        className={`relative flex-1 min-w-0 ${isLeft ? "" : ""}`}
      >
        <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-7 md:p-8 lg:p-9 shadow-soft hover:border-primary/20 hover:shadow-[0_0_20px_4px_rgba(47,5,83,0.25)] transition-all duration-500">
          {/* Background number watermark */}
          <span
            className="absolute -top-4 right-4 md:right-6 font-mono text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
            aria-hidden="true"
          >
            {num}
          </span>

          {/* ── Top Row: Tag + Index ───────────────────────────────── */}
          <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft text-brand-purple border border-brand-lavender/30 text-[10px] font-mono uppercase tracking-wider font-medium">
              {leader.tag}
            </span>
            <span className="font-mono text-[10px] text-[#8733C0] font-bold tabular-nums">
              {num}
            </span>
          </div>

          {/* ── Name + Role ────────────────────────────────────────── */}
          <div className="relative z-10 mb-3 md:mb-4">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-medium text-foreground tracking-tight leading-tight">
              {leader.name}
            </h3>
            <p className="mt-1.5 text-[11px] md:text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {leader.role}
            </p>
          </div>

          {/* ── Quote ──────────────────────────────────────────────── */}
          <blockquote className="relative z-10 mb-5 md:mb-6 pl-3 border-l-2 border-[#8733C0]">
            <p className="text-sm md:text-[0.8125rem] text-muted-foreground leading-relaxed italic line-clamp-3">
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <div className="relative z-10 pt-3 border-t border-hairline flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#8733C0] font-bold uppercase tracking-[0.15em]">
              APV E-Cell
            </span>
            {leader.linkedin ? (
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-brand-purple transition-colors duration-300"
              >
                <Linkedin className="w-3 h-3" />
                <span className="hidden sm:inline">Profile</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            ) : (
              <span className="text-[9px] font-mono text-[#8733C0] font-bold uppercase tracking-wider">
                Leadership
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}