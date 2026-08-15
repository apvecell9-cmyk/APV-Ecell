import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { EventData } from "@/types/events";

interface TimelineCardProps {
  event: EventData;
  side: "left" | "right";
  active: boolean;
  onSelect: () => void;
}

function getStatusClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") {
    return "bg-foreground text-background";
  }
  if (lower === "upcoming") {
    return "bg-secondary text-secondary-foreground";
  }
  return "bg-secondary text-muted-foreground";
}

export function TimelineCard({ event, side, active, onSelect }: TimelineCardProps) {
  const isLeft = side === "left";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      layout
      initial={false}
      animate={{
        opacity: 1,
        scale: active ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`group relative w-full cursor-pointer rounded-xl border bg-surface p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "border-foreground shadow-soft" : "border-border hover:border-foreground/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-muted-foreground">{event.year}</span>
            <span className="text-muted-foreground/50">•</span>
            <span
              className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${getStatusClass(event.status)}`}
            >
              {event.status}
            </span>
          </div>
          <h3 className="font-serif text-lg font-normal leading-snug text-foreground">
            {event.title}
          </h3>
          <p className="text-xs text-muted-foreground">{event.subtitle}</p>
        </div>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            active
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-foreground group-hover:border-foreground"
          } ${isLeft ? "rotate-[-45deg]" : "rotate-[45deg]"}`}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}
