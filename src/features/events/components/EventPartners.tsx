import React from "react";
import { ExternalLink } from "lucide-react";
import type { Partner } from "@/types/events";

interface EventPartnersProps {
  partners: Partner[] | undefined;
}

export function EventPartners({ partners }: EventPartnersProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="space-y-3">
      {partners.map((partner, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 transition-all hover:border-[#8733C0]/20"
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 w-10 shrink-0 object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8733C0]/10 text-xs font-bold text-[#8733C0]">
              {partner.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            {partner.url ? (
              <a
                href={partner.url.startsWith("http") ? partner.url : `https://${partner.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-sm font-medium text-foreground hover:text-[#8733C0]"
              >
                {partner.name}
                <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ) : (
              <p className="text-sm font-medium text-foreground">{partner.name}</p>
            )}
            {partner.role && <p className="text-xs text-muted-foreground">{partner.role}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
