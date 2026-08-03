import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Pitchnova — APV E-Cell Vashi" },
      { name: "description", content: "Explore Pitchnova and flagship entrepreneurship competitions at Agnel Polytechnic Vashi." },
      { property: "og:title", content: "Events & Pitchnova — APV E-Cell Vashi" },
      { property: "og:description", content: "Explore Pitchnova and flagship entrepreneurship competitions at Agnel Polytechnic Vashi." },
    ],
  }),
  component: EventsRoute,
});

function EventsRoute() {
  const eventsList = [
    {
      title: "Pitchnova 3.0",
      tag: "Annual Flagship Competition",
      date: "September 18–20, 2026",
      location: "Agnel Polytechnic Auditorium, Vashi",
      desc: "Our national-level student pitching championship. Innovators present live before angel investors and CIBA mentors.",
      badge: "Registrations Open Soon",
    },
    {
      title: "APV E-Summit & Leadership Conclave",
      tag: "Symposium",
      date: "August 05, 2026",
      location: "APV Main Seminar Hall",
      desc: "One-day leadership forum featuring serial entrepreneurs, policy leaders, and interactive DeepTech networking mixers.",
      badge: "Upcoming",
    },
    {
      title: "Eureka! Ideation & Bootcamp",
      tag: "Workshop Series",
      date: "February 22, 2025",
      location: "APV Innovation Lab",
      desc: "An intensive 48-hour ideation bootcamp designed to prepare polytechnic students for national business model competitions.",
      badge: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <section className="py-20 px-6 lg:px-12 border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto">
            <span className="eyebrow">Flagship Initiatives</span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground mt-2">
              Our Events & Pitchnova
            </h1>
            <p className="max-w-2xl text-muted-foreground text-base mt-4 leading-relaxed">
              Discover competitions, bootcamps, and networking summits that bridge classroom technical education with real-world startup execution.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventsList.map((e, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-surface p-8 flex flex-col justify-between transition-all duration-300 hover:border-foreground/40 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-secondary text-muted-foreground">
                      {e.tag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-foreground font-normal">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{e.desc}</p>

                  <div className="mt-6 pt-6 border-t border-hairline space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-foreground" />
                      <span>{e.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-foreground" />
                      <span>{e.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{e.badge}</span>
                  <Link
                    to="/timeline"
                    className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:underline"
                  >
                    View in Timeline →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
