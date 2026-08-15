import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";
import { YearRoller } from "./YearRoller";
import { JourneyTimeline } from "./JourneyTimeline";
import { JourneyDetailOverlay } from "./JourneyDetailOverlay";

export function EventsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getYears()
      .then((list) => {
        if (cancelled) return;
        setYears(list);
        setSelectedYear(list[0] ?? null);
      })
      .catch((err) => {
        console.error("Failed to load years:", err);
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (selectedYear === null) {
      setEvents([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getEventsForYear(selectedYear)
      .then((list) => {
        if (cancelled) return;
        setEvents(list);
        setSelectedIndex(null);
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  const handleSelectEvent = useCallback((index: number) => {
    setSelectedIndex((current) => (current === index ? null : index));
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const selectedEvent = selectedIndex !== null ? (events[selectedIndex] ?? null) : null;

  return (
    <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
      {/* Honeycomb background — page-root level, NEVER inside any
          transformed subtree. Selecting events / scrolling the
          timeline / opening the panel cannot affect it. */}
      <HexagonBackground animated />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── Section: Hero + Year selector ────────────────────────────
            Top padding accounts for the fixed 80px navbar so neither
            the title nor the year roller can ever sit behind it. */}
        <section className="pt-28 pb-6 lg:pt-32 lg:pb-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[oklch(0.42_0.03_300)]">
                The Journey
              </span>
              <h1 className="mt-2 font-serif text-3xl tracking-tight text-[oklch(0.18_0.03_300)] md:text-4xl lg:text-5xl">
                Events &amp; Pitchnova
              </h1>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[oklch(0.42_0.03_300)] md:text-sm">
                Trace the story of APV E-Cell from campus inception to flagship national pitching
                championships — every milestone along the way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="shrink-0 self-start sm:self-end"
            >
              <YearRoller years={years} selectedYear={selectedYear} onSelect={handleYearChange} />
            </motion.div>
          </div>
        </section>

        {/* ── Section: Journey stage ──────────────────────────────────
            This is the relative parent that anchors both the timeline
            (scrolls horizontally inside) and the detail overlay (floats
            above). Selection never transforms this wrapper. */}
        <section className="relative pb-24 lg:pb-28">
          {loading ? (
            <div className="flex h-[420px] items-center justify-center">
              <span className="text-sm text-[oklch(0.42_0.03_300)]">Loading events…</span>
            </div>
          ) : events.length === 0 ? (
            <div className="flex h-[420px] items-center justify-center">
              <span className="text-sm text-[oklch(0.42_0.03_300)]">
                No events found for this year.
              </span>
            </div>
          ) : (
            <motion.div
              key={`journey-${selectedYear}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="journey-section relative"
            >
              <JourneyTimeline
                events={events}
                selectedIndex={selectedIndex}
                onSelect={handleSelectEvent}
              />

              {/* Detail overlay — same relative parent so it anchors to
                  the stage. NEVER moves the timeline. */}
              <JourneyDetailOverlay event={selectedEvent} onClose={handleCloseDetails} />
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
