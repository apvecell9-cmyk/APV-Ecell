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
      className={`relative flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"} py-4 md:py-6`}
    >
      {/* ── Circular Portrait ──────────────────────────────────────── */}
      <motion.div
        variants={pObj}
        className="relative z-10 shrink-0"
      >
        {/* Outer ring decoration */}
        <div className={`absolute inset-0 -m-2 rounded-full border border-brand-lavender/40 ${isLeft ? "-ml-3 md:-ml-5" : "-mr-3 md:-mr-5"}`} />

        {/* Main portrait circle */}
        <div className={`relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-border bg-secondary shadow-lg ${isLeft ? "" : ""}`}>
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
        <div className="relative rounded-2xl hp-glass p-5 sm:p-6 md:p-7 hover:border-white/50 transition-all duration-500">
          {/* Background number watermark */}
          <span
            className="absolute -top-3 right-3 md:right-5 font-mono text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold leading-none text-foreground/[0.03] select-none pointer-events-none"
            aria-hidden="true"
          >
            {num}
          </span>

          {/* ── Top Row: Tag + Index ───────────────────────────────── */}
          <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft text-brand-purple border border-brand-lavender/30 text-[10px] font-mono uppercase tracking-wider font-medium">
              {leader.tag}
            </span>
            <span className="font-mono text-[10px] text-[#8733C0] font-bold tabular-nums">
              {num}
            </span>
          </div>

          {/* ── Name + Role ────────────────────────────────────────── */}
          <div className="relative z-10 mb-2 md:mb-3">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-medium text-foreground tracking-tight leading-tight">
              {leader.name}
            </h3>
            <p className="mt-1.5 text-[11px] md:text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {leader.role}
            </p>
          </div>

          {/* ── Quote ──────────────────────────────────────────────── */}
          <blockquote className="relative z-10 mb-3 md:mb-4 pl-3 border-l-2 border-[#8733C0]">
            <p className="text-sm md:text-[0.8125rem] text-muted-foreground leading-relaxed italic line-clamp-3">
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <div className="relative z-10 pt-2 border-t border-hairline flex items-center justify-between">
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