import React from "react";
import { SectionHeader } from "@/components/SectionHeader";

export function CombinedPartnersSection() {
  const references = [
    {
      name: "E-Cell NEC",
      subtitle: "National Entrepreneurship Challenge 2025",
      tag: "Reference",
    },
    {
      name: "Agnel Polytechnic, Vashi",
      subtitle: "Leading Technical Education Institution",
      tag: "Institution",
    },
    {
      name: "E-Cell IIT Bombay",
      subtitle: "Premier Technological Institute in India",
      tag: "Reference",
    },
    {
      name: "Eureka!",
      subtitle: "Startup Idea Pitching Competition",
      tag: "Reference",
    },
    {
      name: "CIBA",
      subtitle: "Centre for Incubation & Business Acceleration",
      tag: "Incubation Partner",
      highlight: true,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Ecosystem & Trust"
          title="References & Incubation Partner"
          description="Combined institutions, premier national entrepreneurship bodies, and our dedicated incubation partner supporting entrepreneurial growth."
          size="md"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {references.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border transition-all duration-300 flex flex-col justify-between min-h-[170px] ${
                item.highlight
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-surface text-foreground border-border hover:border-foreground/40"
              }`}
            >
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider mb-3 ${
                    item.highlight
                      ? "bg-background/20 text-background"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="font-serif text-lg font-normal tracking-tight">{item.name}</h3>
              </div>
              <p
                className={`text-xs mt-4 leading-normal ${
                  item.highlight ? "text-background/80" : "text-muted-foreground"
                }`}
              >
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
