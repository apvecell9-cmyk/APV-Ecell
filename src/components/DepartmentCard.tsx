import React from "react";

export interface DeptMember {
  name: string;
  role: string;
}

export interface DeptCardProps {
  id: string;
  department: string;
  subtitle: string;
  description: string;
  headName: string;
  headRole: string;
  headPhoto: string;
  linkedin?: string;
  members: DeptMember[];
  bgClass?: string;
}

export function DepartmentCard({
  department,
  subtitle,
  description,
  headName,
  headRole,
  headPhoto,
  linkedin,
  members,
}: DeptCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-surface hover:bg-background transition-all duration-500 overflow-hidden p-8 flex flex-col justify-between min-h-[420px] shadow-soft hover:shadow-lg hover:border-primary/30">
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

      {/* Middle/Bottom: By default shows quick stats, ON HOVER slides up to reveal Head + Members */}
      <div className="relative z-10 mt-8 pt-6 border-t border-hairline">
        {/* Default idle state preview */}
        <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:opacity-0 transition-opacity duration-300">
          <span className="font-mono uppercase tracking-wider">Department Head</span>
          <span className="font-medium text-foreground">{headName}</span>
        </div>

        {/* Hover drawer overlaying or replacing smooth */}
        <div className="absolute inset-0 top-6 bg-surface/95 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto flex flex-col justify-between">
          <div className="flex items-start gap-3.5">
            <img
              src={headPhoto}
              alt={headName}
              className="w-14 h-14 rounded-lg object-cover border border-border shrink-0 shadow-sm"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-medium text-sm text-foreground">{headName}</h4>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{headRole}</p>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-1 text-[11px] text-primary hover:underline"
                >
                  LinkedIn Profile →
                </a>
              )}
            </div>
          </div>

          {/* Members list */}
          <div className="mt-4 pt-3 border-t border-hairline/80">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Key Members ({members.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {members.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-secondary text-secondary-foreground"
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
