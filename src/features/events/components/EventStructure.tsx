import React from "react";
import { Mic, Users, Scale, FileText, UserCheck, Clock } from "lucide-react";
import type { StructureSection } from "@/types/events";

interface EventStructureProps {
  structure: StructureSection | undefined;
}

const STRUCTURE_ICONS: Record<string, React.ElementType> = {
  "pitch": Mic,
  "session": Mic,
  "finalist": Users,
  "number": Users,
  "judg": Scale,
  "criteria": Scale,
  "deck": FileText,
  "requirements": FileText,
  "representation": UserCheck,
  "attendance": Clock,
};

function getStructureIcon(title: string): React.ElementType {
  const lower = title.toLowerCase();
  for (const [keyword, Icon] of Object.entries(STRUCTURE_ICONS)) {
    if (lower.includes(keyword)) return Icon;
  }
  return Mic;
}

export function EventStructure({ structure }: EventStructureProps) {
  if (!structure || !structure.items || structure.items.length === 0) return null;

  return (
    <div className="space-y-3">
      {structure.items.map((item, i) => {
        const Icon = getStructureIcon(item.title);
        return (
          <div
            key={i}
            className="flex gap-4 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 transition-all hover:border-[#8733C0]/20"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8733C0]/10">
              <Icon className="h-4 w-4 text-[#8733C0]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <span className="font-mono text-[10px] font-bold text-[#8733C0]/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
