import React from "react";
import { ExternalLink, Calendar, CreditCard, Info } from "lucide-react";
import type { RegistrationSection, EventAction } from "@/types/events";

interface EventRegistrationProps {
  registration: RegistrationSection | undefined;
}

function renderRegistrationAction(action: EventAction, index: number) {
  if (action.type === "external" && action.url) {
    return (
      <a
        key={index}
        href={action.url.startsWith("http") ? action.url : `https://${action.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#2F0553] transition-all hover:bg-white/90"
      >
        {action.label}
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return null;
}

export function EventRegistration({ registration }: EventRegistrationProps) {
  if (!registration || !registration.enabled) return null;

  const label = registration.label ?? "Register Now";
  const deadline = registration.deadline;
  const fee = registration.fee;
  const note = registration.note;
  const actions = registration.actions ?? [];

  return (
    <section id="registration" className="scroll-mt-20">
      <div className="overflow-hidden rounded-2xl border border-[#8733C0]/20 bg-[#2F0553] p-8 md:p-10">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9B5E5]">
          {label}
        </span>

        <div className="mt-5 space-y-3">
          {deadline && (
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Calendar className="h-4 w-4 text-[#C9B5E5]" />
              <span>
                <span className="font-medium text-white">Deadline:</span> {deadline}
              </span>
            </div>
          )}

          {fee && (
            <div className="flex items-center gap-3 text-sm text-white/80">
              <CreditCard className="h-4 w-4 text-[#C9B5E5]" />
              <span>
                <span className="font-medium text-white">Fee:</span> {fee}
              </span>
            </div>
          )}

          {note && (
            <div className="flex items-start gap-3 text-sm text-white/70">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#C9B5E5]" />
              <span>{note}</span>
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map((action, i) => renderRegistrationAction(action, i))}
          </div>
        )}
      </div>
    </section>
  );
}
