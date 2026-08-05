import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";
import { YearSelector } from "./YearSelector";
import { Timeline } from "./Timeline";
import { EventDetailPanel } from "./EventDetailPanel";

const SHIFT_AMOUNT = 40;

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

  const handleBack = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const selectedEvent = selectedIndex !== null ? (events[selectedIndex] ?? null) : null;

  const selectedSide: "left" | "right" | null =
    selectedIndex !== null ? (selectedIndex % 2 === 0 ? "left" : "right") : null;

  const shiftX =
    selectedSide === "left" ? SHIFT_AMOUNT : selectedSide === "right" ? -SHIFT_AMOUNT : 0;

  const detailEnterX = selectedSide === "left" ? "8%" : "-8%";

  return (
    <div className="relative border-b border-border hex-grid">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Compact header: intro left, year selector right */}
        <div className="flex items-start justify-between py-8 lg:py-10">
          <div className="max-w-sm">
            <span className="eyebrow">The Journey</span>
            <h1 className="mt-1.5 font-serif text-2xl tracking-tight text-foreground md:text-4xl">
              Events & Pitchnova
            </h1>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground md:text-sm">
              Trace the story of APV E-Cell from campus inception to flagship national pitching
              championships.
            </p>
          </div>

          <div className="shrink-0 pt-1">
            <AnimatePresence mode="wait" initial={false}>
              {selectedEvent === null && (
                <motion.div
                  key="year-selector"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <YearSelector
                    years={years}
                    selectedYear={selectedYear}
                    onSelect={handleYearChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline area — starts immediately below header */}
        <div className="relative pb-10 lg:pb-14">
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
                className="absolute -top-2 left-0 z-20 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground shadow-soft transition-colors hover:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className={`grid grid-cols-1 gap-6 transition-all duration-500 ease-out lg:gap-8 ${
                selectedEvent ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-1"
              }`}
            >
              <div className="min-w-0">
                <Timeline
                  events={events}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelectEvent}
                  shiftX={shiftX}
                />
              </div>

              <AnimatePresence>
                {selectedEvent && (
                  <motion.div
                    key={`detail-${selectedYear}-${selectedIndex}`}
                    initial={{ opacity: 0, x: detailEnterX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: detailEnterX }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="min-w-0"
                  >
                    <EventDetailPanel event={selectedEvent} />
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
