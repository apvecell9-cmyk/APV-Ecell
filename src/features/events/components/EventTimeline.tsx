import React from "react";
import { Check, Clock, Circle, Globe, ClipboardEdit, Presentation, Trophy } from "lucide-react";
import type { TimelineSection } from "@/types/events";

interface EventTimelineProps {
  timeline: TimelineSection | undefined;
}

const TIMELINE_ICONS: Record<string, React.ElementType> = {
  "launch": Globe,
  "website": Globe,
  "registration": ClipboardEdit,
  "deadline": ClipboardEdit,
  "orientation": Presentation,
  "online": Presentation,
  "event": Trophy,
  "day": Trophy,
  "pitchnova": Trophy,
  "competition": Trophy,
};

function getTimelineIcon(title: string): React.ElementType {
  const lower = title.toLowerCase();
  for (const [keyword, Icon] of Object.entries(TIMELINE_ICONS)) {
    if (lower.includes(keyword)) return Icon;
  }
  return Circle;
}

function getStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return { bg: "bg-[#8733C0]", text: "text-white", border: "border-[#8733C0]" };
    case "active":
      return { bg: "bg-[#2F0553]", text: "text-white", border: "border-[#2F0553]" };
    default:
      return { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
  }
}

function getStatusLabel(status?: string) {
  switch (status?.toLowerCase()) {
    case "completed": return "Completed";
    case "active": return "In Progress";
    case "upcoming": return "Upcoming";
    default: return null;
  }
}

export function EventTimeline({ timeline }: EventTimelineProps) {
  if (!timeline || !timeline.items || timeline.items.length === 0) return null;

  const items = timeline.items;

  return (
    <div className="relative ml-3 border-l-2 border-[#8733C0]/20 pl-6">
      {items.map((item, i) => {
        const Icon = getTimelineIcon(item.title);
        const colors = getStatusColor(item.status);
        const isLast = i === items.length - 1;
        const label = getStatusLabel(item.status);

        return (
          <div key={i} className={`relative ${!isLast ? "pb-6" : ""}`}>
            {/* Node */}
            <div
              className={`absolute -left-[31px] flex h-8 w-8 items-center justify-center rounded-full border-2 ${colors.bg} ${colors.border}`}
            >
              <Icon className={`h-4 w-4 ${colors.text}`} />
            </div>

            {/* Content */}
            <div className="rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 transition-all hover:border-[#8733C0]/20">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                {item.date}
              </p>
              <h4 className="mt-1 text-sm font-semibold text-foreground">{item.title}</h4>
              {item.description && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              )}
              {label && (
                <span className="mt-2 inline-block rounded-full bg-[#8733C0]/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#8733C0]">
                  {label}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
