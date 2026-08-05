import React from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { references } from "@/features/home/data/references";
import { Sparkles } from "lucide-react";

export function CombinedPartnersSection() {
  return (
    <section className="py-24 px-6 lg:px-12 border-t border-border bg-background relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow="Ecosystem & Trust"
          title="References & Incubation Partners"
          description="Collaborating with premier national entrepreneurship bodies, top tech institutions, and our official incubation partner."
          size="md"
        />

        {/* Balanced Partners Grid with Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {references.map((item, index) => {
            const isHighlight = item.highlight;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-soft hover:shadow-xl ${
                  isHighlight
                    ? "bg-gradient-to-b from-surface via-surface to-accent/5 border-2 border-accent/60 ring-2 ring-accent/10"
                    : "bg-surface border border-border hover:border-primary/40"
                }`}
              >
                {/* Highlight Tag */}
                {isHighlight && (
                  <div className="absolute -top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Incubation</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Logo Container */}
                  <div className="w-full h-28 rounded-xl bg-white p-3 flex items-center justify-center border border-border/60 shadow-sm overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Header info */}
                  <div className="space-y-1.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-medium ${
                        isHighlight
                          ? "bg-accent/15 text-accent-foreground border border-accent/30"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {item.tag}
                    </span>

                    <h3 className="font-serif text-lg font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </div>


              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
