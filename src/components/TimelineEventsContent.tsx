import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PdfUploadSystem } from "@/components/PdfUploadSystem";
import { ArrowUpRight, ArrowRight, Calendar, Sparkles, MapPin, Users } from "lucide-react";

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  status: "Completed" | "Upcoming" | "Annual Flagship";
}

export function TimelineEventsContent() {
  const events: TimelineEvent[] = [
    {
      id: "pitchnova-2026",
      year: "2026",
      title: "Pitchnova 3.0",
      subtitle: "National Student Pitching Championship",
      date: "September 18–20, 2026",
      location: "Agnel Polytechnic Auditorium, Vashi",
      description:
        "The flagship startup pitching competition of Agnel Polytechnic. Students across disciplines pitch innovative ventures to angel investors, industry founders, and incubation mentors.",
      highlights: [
        "₹1,50,000+ Prize Pool & Seed Grants",
        "Direct Mentorship from CIBA Founders",
        "40+ Participating Colleges",
      ],
      status: "Annual Flagship",
    },
    {
      id: "e-summit-2026",
      year: "2026",
      title: "APV E-Summit & Leadership Conclave",
      subtitle: "Connecting Campus Visionaries with Industry Icons",
      date: "August 05, 2026",
      location: "APV Main Seminar Hall",
      description:
        "An immersive one-day symposium featuring keynote addresses by serial entrepreneurs, interactive panel discussions on AI & robotics startups, and networking mixers.",
      highlights: [
        "Keynote: Future of DeepTech in India",
        "1-on-1 Mentorship Booths",
        "Student Innovator Showcase",
      ],
      status: "Upcoming",
    },
    {
      id: "nec-2025",
      year: "2025",
      title: "National Entrepreneurship Challenge (NEC)",
      subtitle: "In Association with E-Cell IIT Bombay",
      date: "November 14, 2025",
      location: "IIT Bombay Campus & Vashi Hub",
      description:
        "APV E-Cell represented Agnel Polytechnic Vashi at the prestigious NEC 2025, demonstrating campus entrepreneurship initiatives, policy frameworks, and student ventures.",
      highlights: [
        "Recognized among Top Technical E-Cells",
        "Collaborative Hub with E-Cell IIT Bombay",
      ],
      status: "Completed",
    },
    {
      id: "eureka-qualifier",
      year: "2025",
      title: "Eureka! Preliminary Showcase",
      subtitle: "Campus Ideation & Bootcamp",
      date: "February 22, 2025",
      location: "APV Innovation Lab",
      description:
        "An intensive 48-hour ideation bootcamp designed to help polytechnic students build viable business models, refine customer validation, and prepare for Eureka! competitions.",
      highlights: ["25+ Ideas Pitched", "Hands-on Financial & Legal Workshop"],
      status: "Completed",
    },
    {
      id: "ecell-inception",
      year: "1983 / 2024",
      title: "Agnel Polytechnic Vashi & E-Cell Inception",
      subtitle: "A Legacy of Self-Reliance & Technical Mastery",
      date: "Foundation Milestone",
      location: "Vashi, Navi Mumbai",
      description:
        "Rooted in the vision of Fr. C. Rodrigues to foster self-reliance among youth through education. The E-Cell was established to empower students with entrepreneurial mindsets.",
      highlights: ["5 Technical Branches", "Cosmopolitan Culture & Ethics"],
      status: "Completed",
    },
  ];

  const defaultEvent = events[0] as TimelineEvent;
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(defaultEvent);
  const [activeId, setActiveId] = useState<string>(defaultEvent.id);

  const handleSelectEvent = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setActiveId(event.id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        {/* Hexagonal Background pattern section */}
        <div className="relative border-b border-border bg-surface hex-grid py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="eyebrow">Interactive Chronicle</span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground mt-2">
              Timeline & Events
            </h1>
            <p className="max-w-xl text-muted-foreground text-base mt-4 leading-relaxed">
              Explore our journey from campus inception to flagship national pitching competitions.
              Click the arrow on any event to preview its detailed tile on this page.
            </p>
          </div>
        </div>

        {/* Timeline List + Event Tile Preview */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Interactive Timeline with Arrow Animation */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-6">
                Click an event arrow to inspect
              </span>

              <div className="space-y-4">
                {events.map((event, idx) => {
                  const isActive = event.id === activeId;
                  return (
                    <div
                      key={event.id}
                      onClick={() => handleSelectEvent(event)}
                      className={`group relative rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-background border-foreground shadow-sm"
                          : "bg-surface border-border hover:border-foreground/40 hover:bg-background/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {event.year}
                            </span>
                            <span>•</span>
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                                event.status === "Annual Flagship"
                                  ? "bg-foreground text-background"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {event.status}
                            </span>
                          </div>
                          <h3 className="text-xl font-serif font-normal text-foreground">
                            {event.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{event.subtitle}</p>
                        </div>

                        {/* Interactive Arrow with animation */}
                        <button
                          type="button"
                          aria-label={`View details for ${event.title}`}
                          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            isActive
                              ? "bg-foreground text-background border-foreground scale-105"
                              : "bg-background border-border text-foreground group-hover:border-foreground group-hover:translate-x-1"
                          }`}
                        >
                          <ArrowRight
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isActive ? "rotate-[-45deg]" : "group-hover:translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Event Tile Preview (on the same page) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                <div
                  key={selectedEvent.id}
                  className="rounded-2xl border border-border bg-surface p-8 shadow-soft animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="eyebrow">Active Event Tile</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {selectedEvent.year}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif text-foreground font-normal">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedEvent.subtitle}</p>

                  <div className="mt-6 pt-6 border-t border-hairline space-y-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-foreground" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-foreground" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 mt-6 leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  <div className="mt-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-3">
                      Event Highlights
                    </span>
                    <ul className="space-y-2">
                      {selectedEvent.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-muted-foreground">
                      Status: {selectedEvent.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`Registered interest for ${selectedEvent.title}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
                    >
                      Register Interest
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* PDF Upload System section */}
                <PdfUploadSystem />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
