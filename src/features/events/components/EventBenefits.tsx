import React from "react";
import { Lightbulb, Users, Rocket, Award } from "lucide-react";
import type { BenefitsSection } from "@/types/events";

interface EventBenefitsProps {
  benefits: BenefitsSection | undefined;
}

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  "incubation": Lightbulb,
  "innovation": Lightbulb,
  "network": Users,
  "connect": Users,
  "eureka": Rocket,
  "compete": Rocket,
  "certificate": Award,
  "trophy": Award,
  "prize": Award,
};

function getBenefitIcon(title: string): React.ElementType {
  const lower = title.toLowerCase();
  for (const [keyword, Icon] of Object.entries(BENEFIT_ICONS)) {
    if (lower.includes(keyword)) return Icon;
  }
  return Lightbulb;
}

export function EventBenefits({ benefits }: EventBenefitsProps) {
  if (!benefits || !benefits.items || benefits.items.length === 0) return null;

  return (
    <div className="space-y-3">
      {benefits.items.map((benefit, i) => {
        const Icon = getBenefitIcon(benefit.title);
        return (
          <div
            key={i}
            className="flex gap-4 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 transition-all hover:border-[#8733C0]/20"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8733C0]/10">
              {benefit.image ? (
                <img src={benefit.image} alt="" className="h-5 w-5 object-contain" loading="lazy" />
              ) : benefit.icon ? (
                <img src={benefit.icon} alt="" className="h-5 w-5 object-contain" loading="lazy" />
              ) : (
                <Icon className="h-4 w-4 text-[#8733C0]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground">{benefit.title}</h4>
              {benefit.description && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
