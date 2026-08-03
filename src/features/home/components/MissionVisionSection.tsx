import React, { useState } from "react";
import { Compass, Target } from "lucide-react";

export function MissionVisionSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column: Minimal editorial statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="eyebrow">Purpose & Impact</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground leading-tight">
              Championing ideas into lasting societal change.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              At Agnel Polytechnic, Vashi, we redefine entrepreneurship. It is not merely about
              launching companies—it is about cultivating resilience, strategic thinking, and
              ethical leadership that stands the test of time.
            </p>

            {/* Interactive selector pills */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "vision"
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                01. Our Vision
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                02. Our Mission
              </button>
            </div>
          </div>

          {/* Right column: Interactive high-aesthetic card display */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-background p-8 md:p-12 shadow-soft overflow-hidden min-h-[340px] flex flex-col justify-between">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/50 rounded-full blur-3xl -z-0 pointer-events-none" />

              {activeTab === "vision" ? (
                <div className="relative z-10 space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      EST. 2024 • APV VASHI
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground font-normal">
                      A transformative mindset for every student.
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Champion entrepreneurship as an essential life skill across all technical
                          disciplines.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Cultivate a community where resilience, creativity, and empathy drive
                          innovation.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Redefine success by the lasting, positive difference we create in society.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">ACTION DRIVEN</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground font-normal">
                      Turn vision into real-world innovation.
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Empower students with hands-on incubation, mentorship, and training
                          experiences.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Equip future leaders with ethical values, strategic thinking, and
                          execution mastery.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span>
                          Foster an inclusive ecosystem that encourages calculated risk-taking and
                          learning from failure.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground">
                <span>Creating Change Makers</span>
                <span className="font-mono uppercase">Agnel Polytechnic Vashi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
