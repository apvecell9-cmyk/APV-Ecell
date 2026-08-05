import React from "react";
import { Compass, Target, CheckCircle2, Sparkles } from "lucide-react";

export function MissionVisionSection() {

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface border-t border-border relative overflow-hidden">
      {/* Subtle grid pattern background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header Title */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Purpose & Impact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground leading-tight">
            Championing ideas into lasting societal change.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            At Agnel Polytechnic, Vashi, we redefine entrepreneurship. It is not merely about
            launching companies—it is about cultivating resilience, strategic thinking, and
            ethical leadership that stands the test of time.
          </p>
        </div>

        {/* Side-by-Side Modern Feature Cards for Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 01: Vision */}
          <div className="group relative rounded-3xl border border-border bg-background/80 backdrop-blur-md p-8 md:p-10 shadow-soft hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col justify-between overflow-hidden">
            {/* Glowing background accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest bg-secondary px-3 py-1 rounded-full border border-border">
                  01 • Our Vision
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif text-foreground font-medium tracking-tight">
                  A transformative mindset for every student.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We strive to cultivate a vibrant ecosystem where technical knowledge meets entrepreneurial initiative, preparing students to become fearless problem solvers.
                </p>

                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Champion entrepreneurship as an essential life skill across all technical disciplines.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Cultivate a community where resilience, creativity, and empathy drive innovation.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Redefine success by the lasting, positive social & economic impact we create.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground font-mono uppercase tracking-wider relative z-10">
              <span>Future Focused</span>
              <span>APV Vashi</span>
            </div>
          </div>

          {/* Card 02: Mission */}
          <div className="group relative rounded-3xl border border-border bg-background/80 backdrop-blur-md p-8 md:p-10 shadow-soft hover:shadow-2xl hover:border-accent/40 transition-all duration-500 flex flex-col justify-between overflow-hidden">
            {/* Glowing background accent */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500 pointer-events-none" />

            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest bg-secondary px-3 py-1 rounded-full border border-border">
                  02 • Our Mission
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif text-foreground font-medium tracking-tight">
                  Turn vision into real-world innovation.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Providing students with actionable pathways, hands-on incubation, seed networking, and mentorship to turn early-stage ideas into scalable ventures.
                </p>

                <ul className="space-y-3.5 pt-2">
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Empower students with hands-on incubation, mentorship, and practical training experiences.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Equip future leaders with ethical values, strategic thinking, and execution mastery.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Foster an inclusive ecosystem that encourages calculated risk-taking and learning.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground font-mono uppercase tracking-wider relative z-10">
              <span>Action Driven</span>
              <span>APV E-Cell</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
