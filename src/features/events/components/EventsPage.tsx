import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";
import { AnimatedWaveBackground } from "@/components/shared/AnimatedWaveBackground";
import { YearRoller } from "./YearRoller";
import { Timeline } from "./Timeline";
import { EventDetailPanel } from "./EventDetailPanel";

export function EventsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timelineKey, setTimelineKey] = useState(0);

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

  const handleBack = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    setTimelineKey((k) => k + 1);
  }, []);

  const selectedEvent = selectedIndex !== null ? (events[selectedIndex] ?? null) : null;

  return (
    <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
      {/* Full-page honeycomb background */}
      <HexagonBackground animated />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Introduction + Year Roller — compact single row */}
        <div className="flex items-start justify-between gap-6 pt-28 pb-6 lg:pt-32 lg:pb-8">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/70">The Journey</span>
            <h1 className="mt-1.5 font-serif text-2xl tracking-tight text-black md:text-4xl">
              Events & Pitchnova
            </h1>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-black/60 md:text-sm">
              Trace the story of APV E-Cell from campus inception to flagship national pitching
              championships.
            </p>
          </motion.div>

          <motion.div
            className="shrink-0 pt-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {selectedEvent === null && (
                <motion.div
                  key="year-roller"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <YearRoller
                    years={years}
                    selectedYear={selectedYear}
                    onSelect={handleYearChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timeline + Detail Panel area */}
        <div className="relative pb-20">
          {/* Back button — positioned at top-left of content area */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.button
                key="back-button"
                type="button"
                onClick={handleBack}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-xs font-medium text-foreground shadow-soft backdrop-blur-sm transition-colors hover:border-foreground/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Timeline
              </motion.button>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-sm text-muted-foreground">Loading events…</span>
            </div>
          ) : events.length === 0 ? (
            <div className="flex h-48 items-center justify-center">
              <span className="text-sm text-muted-foreground">No events found for this year.</span>
            </div>
          ) : (
            <div
              className={`flex gap-8 transition-all duration-500 ease-out ${
                selectedEvent ? "lg:gap-10" : ""
              }`}
            >
              {/* Timeline column — takes remaining space */}
              <div className={`min-w-0 transition-all duration-500 ease-out ${
                selectedEvent ? "lg:w-[55%]" : "w-full"
              }`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`timeline-${selectedYear}-${timelineKey}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Timeline
                      events={events}
                      selectedIndex={selectedIndex}
                      onSelect={handleSelectEvent}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Detail panel — slides in from right */}
              <AnimatePresence>
                {selectedEvent && (
                  <motion.div
                    key={`detail-${selectedYear}-${selectedIndex}`}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="min-w-0 lg:w-[45%] lg:flex-1"
                  >
                    <div className="lg:sticky lg:top-28">
                      <EventDetailPanel event={selectedEvent} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
