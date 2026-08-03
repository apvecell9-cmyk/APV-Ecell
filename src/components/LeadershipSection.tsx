import React from "react";
import { SectionHeader } from "@/components/SectionHeader";

export function LeadershipSection() {
  const leaders = [
    {
      name: "Mrs. Saly Antony",
      role: "Principal, Agnel Polytechnic",
      image: "https://ecellapv.in/principal.jpeg",
      quote:
        "At Agnel Polytechnic, we promote innovation, creativity, and self-reliance through our E-Cell. Entrepreneurship empowers students to solve real-world problems and think independently. Let's continue nurturing future-ready, self-reliant entrepreneurs.",
      tag: "Academic Visionary",
    },
    {
      name: "Mr. Pranavkumar Bhadane",
      role: "APV E-Cell In-charge",
      image: "https://ecellapv.in/Pranavkumar%20Bhadane.jpg",
      quote:
        "Our E-Cell fosters innovation, leadership, and entrepreneurship beyond the classroom. We empower students to think independently, pitch real-world ideas, and connect with industry leaders to become confident changemakers.",
      tag: "Faculty Leader",
    },
    {
      name: "Soham Dhanokar",
      role: "President, APV E-Cell",
      image: "https://ecellapv.in/Soham%20Dhanokar%20(President).png",
      quote:
        "Leading the vision and strategic direction of APV E-Cell. Together with our department heads, we are creating an inclusive ecosystem where resilience, creativity, and real social impact drive student success.",
      tag: "Student President",
      linkedin: "https://www.linkedin.com/in/soham-dhanokar-13807a355",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-t border-border" id="leadership">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Guidance & Strategy"
          title="Our Leadership"
          description="Meet the visionary leaders guiding our academic excellence and empowering student founders."
        />

        {/* Side-by-side cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="group rounded-xl border border-border bg-surface p-8 flex flex-col justify-between transition-all duration-300 hover:border-foreground/30 hover:shadow-soft"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-secondary text-muted-foreground">
                    {leader.tag}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-16 h-16 rounded-full object-cover border border-border shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xl font-serif font-normal text-foreground">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{leader.role}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  “{leader.quote}”
                </p>
              </div>

              {leader.linkedin && (
                <div className="mt-8 pt-4 border-t border-hairline">
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
