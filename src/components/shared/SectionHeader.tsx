import React from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  size?: "md" | "lg";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  size = "lg",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 ${className}`}
    >
      <div className="space-y-2">
        <span className="eyebrow">{eyebrow}</span>
        <h2
          className={`font-serif tracking-tight text-foreground ${
            size === "lg" ? "text-3xl md:text-5xl" : "text-3xl md:text-4xl"
          }`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}
