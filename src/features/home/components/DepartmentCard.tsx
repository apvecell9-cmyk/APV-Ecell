import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DeptCardProps } from "@/types/team";
import { DepartmentModal } from "./DepartmentModal";

/* ──────────────────────────────────────────────────────────────────────
 * DepartmentCard — Editorial department card with scroll animation
 *
 * Features:
 * - Compact card with improved typography hierarchy
 * - Department-specific visual (bottom-left)
 * - Scroll-triggered entrance animation
 * - Preserved hover → head photo interaction
 * - Graceful image error handling
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Internal content stagger ──────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: 0.1 },
  },
};

/* ── Reduced-motion fallbacks ──────────────────────────────────────── */
const rmItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

const rmImage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

interface DepartmentCardExtendedProps extends DeptCardProps {
  index: number;
}

export function DepartmentCard({
  id,
  department,
  subtitle,
  description,
  headName,
  headRole,
  linkedin,
  members,
  index,
}: DepartmentCardExtendedProps) {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const iVar = reducedMotion ? rmItem : itemVariants;
  const iObj = reducedMotion ? rmImage : imageVariants;

  const initials = headName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div
        className="group relative rounded-xl hp-glass hover:bg-white/30 transition-all duration-500 overflow-hidden p-6 md:p-7 flex flex-col min-h-[360px] lg:min-h-[380px] hover:border-white/50 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
        }}
        role="button"
        aria-label={`View ${department} team`}
      >
        {/* Background subtle watermark letter */}
        <div className="absolute -right-4 -bottom-6 font-mono font-bold text-8xl text-foreground/[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
          {department.slice(0, 2).toUpperCase()}
        </div>

        {/* ── Top Section: Category + Title + Description ─────────── */}
        <div className="relative z-10 space-y-3 flex-1">
          <motion.div
            variants={iVar}
            className="text-[1.4rem] md:text-[1.55rem] font-serif text-foreground font-medium tracking-tight leading-tight"
          >
            {department}
          </motion.div>

          <motion.h3
            variants={iVar}
            className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#8733C0]/10 text-[#8733C0] border border-[#8733C0]/15 text-[10px] font-mono uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8733C0] inline-block" />
            {subtitle}
          </motion.h3>
          
          <motion.p
            variants={iVar}
            className="text-[0.8125rem] text-muted-foreground leading-relaxed line-clamp-2"
          >
            {description}
          </motion.p>
        </div>

        {/* ── Department Visual — Bottom Left ─────────────────────── */}
        <motion.div
          variants={iObj}
          className="relative z-10 mt-4"
        >
          {!logoError ? (
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden opacity-50 group-hover:opacity-30 transition-opacity duration-500">
              <img
                src={`/team/${id}/department-logo.png`}
                alt=""
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : null}
        </motion.div>

        {/* ── Footer — Department Head ────────────────────────────── */}
        <motion.div
          variants={iVar}
          className="relative z-10 mt-auto pt-4 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground"
        >
          <span className="font-mono uppercase tracking-wider text-[#6A1FAF] font-medium">Department Head</span>
          <span className="font-medium text-[#8733C0] font-bold">{headName}</span>
        </motion.div>

        {/* ── Hover Overlay — Head Photo ──────────────────────────── */}
        <div
          className={`absolute inset-0 z-20 overflow-hidden rounded-xl transition-all duration-500 flex flex-col justify-between ${
            isHovered
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {/* Background photo covering full card */}
          {!imageError ? (
            <img
              src={`/team/${id}/head.jpg`}
              alt={headName}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-secondary flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground">{initials}</span>
            </div>
          )}

          {/* Gradient dark overlay for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

          {/* Content container inside hover overlay */}
          <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
            {/* Top section */}
            <div className="flex items-center justify-between" />
            
            {/* Bottom section */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white font-serif tracking-tight">
                  {headName}
                </h4>
                <p className="text-xs text-slate-300 font-mono mt-0.5">{headRole}</p>
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 mt-2 text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline transition-colors"
                  >
                    LinkedIn Profile →
                  </a>
                )}
              </div>

              {/* Members list */}
              {members && members.length > 0 && (
                <div className="pt-3 border-t border-white/15">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-300 mb-2">
                    Key Members ({members.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {members.map((m, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-white/10 backdrop-blur-sm border border-white/10 text-slate-100 font-medium"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <DepartmentModal
          id={id}
          department={department}
          headName={headName}
          headRole={headRole}
          members={members}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
