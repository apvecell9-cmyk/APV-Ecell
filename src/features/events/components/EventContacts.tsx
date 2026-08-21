import React from "react";
import { Phone, Mail, ExternalLink, Globe, Instagram, Linkedin } from "lucide-react";
import type { ContactsSection, ContactLink } from "@/types/events";

interface EventContactsProps {
  contacts: ContactsSection | undefined;
}

const LINK_ICONS: Record<string, React.ElementType> = {
  website: Globe,
  instagram: Instagram,
  linkedin: Linkedin,
  email: Mail,
};

function renderContactLink(link: ContactLink, index: number) {
  if (!link.url) return null;

  const isExternal = link.type === "website" || link.type === "instagram" || link.type === "linkedin";
  const href = isExternal && !link.url.startsWith("http") ? `https://${link.url}` : link.url;
  const Icon = LINK_ICONS[link.type ?? ""] ?? ExternalLink;

  return (
    <a
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/20 bg-[#8733C0]/5 px-3 py-1.5 text-xs font-medium text-[#6A1FAF] transition-all hover:bg-[#8733C0]/10"
    >
      <Icon className="h-3 w-3" />
      {link.label}
      {isExternal && <ExternalLink className="h-2.5 w-2.5" />}
    </a>
  );
}

export function EventContacts({ contacts }: EventContactsProps) {
  if (!contacts) return null;

  const people = contacts.people ?? [];
  const links = contacts.links ?? [];

  if (people.length === 0 && links.length === 0) return null;

  return (
    <div className="space-y-4">
      {people.length > 0 && (
        <div className="space-y-3">
          {people.map((person, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-[#8733C0]/10 bg-white/5 p-4 transition-all hover:border-[#8733C0]/20"
            >
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8733C0]/10 text-xs font-bold text-[#8733C0]">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{person.name}</p>
                {person.role && <p className="text-xs text-muted-foreground">{person.role}</p>}
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {person.phone && (
                    <a
                      href={`tel:${person.phone}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[#8733C0]"
                    >
                      <Phone className="h-3 w-3" />
                      {person.phone}
                    </a>
                  )}
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[#8733C0]"
                    >
                      <Mail className="h-3 w-3" />
                      {person.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link, i) => renderContactLink(link, i))}
        </div>
      )}
    </div>
  );
}
