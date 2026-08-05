import React from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { leaders } from "@/features/home/data/leaders";
import { Quote, Linkedin, Sparkles, Award, ShieldCheck } from "lucide-react";

export function LeadershipSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden" id="leadership">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        <SectionHeader
          eyebrow="Visionary Guidance & Strategy"
          title="Our Leadership"
          description="Meet the dedicated leaders driving academic excellence, strategic vision, and empowering student founders across APV E-Cell."
        />

        {/* Dynamic Executive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          {leaders.map((leader, i) => {
            const isPresident = leader.tag.toLowerCase().includes("president");
            return (
              <div
                key={i}
                className={`group relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 ${
                  isPresident
                    ? "bg-gradient-to-b from-surface via-surface to-accent/5 border-2 border-accent/40 shadow-lg hover:shadow-accent/10 hover:border-accent"
                    : "bg-surface border border-border hover:border-primary/40 shadow-soft hover:shadow-xl"
                }`}
              >
                {/* Highlight ribbon for President */}
                {isPresident && (
                  <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Key Executive</span>
                  </div>
                )}

                <div className="space-y-6 relative z-10">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-medium ${
                        isPresident
                          ? "bg-accent/15 text-accent-foreground border border-accent/30"
                          : "bg-secondary text-foreground/80 border border-border"
                      }`}
                    >
                      {isPresident ? <Award className="w-3.5 h-3.5 text-accent" /> : <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />}
                      {leader.tag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">0{i + 1}</span>
                  </div>

                  {/* Leader Avatar & Bio Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-md ${
                        isPresident ? "border-accent ring-4 ring-accent/10" : "border-border group-hover:border-primary/50"
                      }`}>
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground mt-1 leading-snug">
                        {leader.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote Block */}
                  <div className="relative pt-2">
                    <Quote className="w-6 h-6 text-foreground/10 absolute -top-1 -left-2 -z-10" />
                    <p className="text-sm text-muted-foreground leading-relaxed italic pl-3 border-l-2 border-border group-hover:border-accent transition-colors">
                      “{leader.quote}”
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                    Agnel Polytechnic
                  </span>
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-medium hover:underline hover:text-accent transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn →</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-muted-foreground/50">Leadership</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
