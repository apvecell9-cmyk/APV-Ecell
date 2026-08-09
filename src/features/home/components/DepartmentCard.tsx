import React, { useState } from "react";
import type { DeptCardProps } from "@/types/team";
import { DepartmentModal } from "./DepartmentModal";

export function DepartmentCard({
  id,
  department,
  subtitle,
  description,
  headName,
  headRole,
  linkedin,
  members,
}: DeptCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = headName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div
        className="group relative rounded-xl border border-border bg-surface hover:bg-background transition-all duration-500 overflow-hidden p-8 flex flex-col justify-between min-h-[420px] shadow-soft hover:shadow-lg hover:border-primary/30 cursor-pointer"
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

        {/* Top Department Label */}
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-foreground text-xs font-mono font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {department}
          </div>
          <h3 className="text-2xl font-serif text-foreground font-normal tracking-tight">
            {subtitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Middle/Bottom: By default shows quick stats */}
        <div className="relative z-10 mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-wider">Department Head</span>
          <span className="font-medium text-foreground">{headName}</span>
        </div>

        {/* Hover overlay covering the FULL card with photo */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />

          {/* Content container inside hover overlay */}
          <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
            {/* Top section */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wide uppercase text-amber-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {department}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-[10px] font-mono uppercase text-amber-300 tracking-wider animate-pulse">
                Click for team →
              </span>
            </div>

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
