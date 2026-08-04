import React from "react";
import { Building2, Mail, MapPin, type LucideIcon } from "lucide-react";
import { CONTACT_EMAILS, CAMPUS_LOCATION, INCUBATION_PARTNER } from "@/constants/contact";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  lines: string[];
}

function ContactCard({ icon: Icon, title, lines }: ContactCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        {lines.map((line, index) => (
          <p key={line} className={`text-xs text-muted-foreground ${index === 0 ? "mt-1" : ""}`}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">Get In Touch</span>
        <h2 className="mt-2 font-serif text-3xl text-foreground">Partner, Pitch, or Connect</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Whether you are an aspiring student founder, an industry mentor, or an investor looking to
          attend Pitchnova, we would love to hear from you.
        </p>
      </div>

      <div className="space-y-6">
        <ContactCard icon={MapPin} title="Campus Location" lines={[CAMPUS_LOCATION]} />
        <ContactCard icon={Mail} title="Email Inquiries" lines={CONTACT_EMAILS} />
        <ContactCard
          icon={Building2}
          title="Incubation Desk"
          lines={[`In partnership with ${INCUBATION_PARTNER}`]}
        />
      </div>
    </div>
  );
}
