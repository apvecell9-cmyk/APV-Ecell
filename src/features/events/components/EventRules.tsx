import React from "react";
import {
  ExternalLink,
  Calendar,
  Users,
  FileText,
  CreditCard,
  AlertTriangle,
  Ban,
  ClipboardList,
} from "lucide-react";
import type { RulesSection, RuleItem } from "@/types/events";

interface EventRulesProps {
  rules: RulesSection | undefined;
}

const RULE_ICONS: Record<string, React.ElementType> = {
  "registration deadline": Calendar,
  "mandatory": ExternalLink,
  "eureka": ExternalLink,
  "team": Users,
  "composition": Users,
  "pitch deck": FileText,
  "submission": FileText,
  "fee": CreditCard,
  "refund": Ban,
  "requirement": AlertTriangle,
  "attendance": ClipboardList,
};

function getRuleIcon(title: string): React.ElementType {
  const lower = title.toLowerCase();
  for (const [keyword, Icon] of Object.entries(RULE_ICONS)) {
    if (lower.includes(keyword)) return Icon;
  }
  return ClipboardList;
}

function renderRuleAction(action: RuleItem["action"]) {
  if (!action) return null;
  if (action.type === "external" && action.url) {
    return (
      <a
        href={action.url.startsWith("http") ? action.url : `https://${action.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#8733C0] underline underline-offset-2 hover:no-underline"
      >
        {action.label}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  return null;
}

export function EventRules({ rules }: EventRulesProps) {
  if (!rules || !rules.items || rules.items.length === 0) return null;

  return (
    <div className="space-y-3">
      {rules.items.map((rule, i) => {
        const Icon = getRuleIcon(rule.title);
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
                <h4 className="text-sm font-semibold text-foreground">{rule.title}</h4>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {rule.description}
              </p>
              {renderRuleAction(rule.action)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
