import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";
import { YearRoller } from "./YearRoller";
import { JourneyTimeline } from "./JourneyTimeline";
import { JourneyTimelineMobile } from "./JourneyTimelineMobile";
import { JourneyDetailOverlay } from "./JourneyDetailOverlay";

/** Tailwind `md` breakpoint = 768px. */
const MOBILE_BP = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BP,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/**
 * EventsPage — journey timeline over honeycomb background.
 *
 * Desktop: horizontal curved timeline.
 * Mobile: genuine vertical timeline flowing top → bottom.
 *
 * Detail panel is portaled to document.body (above navbar).
 */
export function EventsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

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
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (selectedYear === null) { setEvents([]); return; }
    let cancelled = false;
    setLoading(true);
    getEventsForYear(selectedYear)
      .then((list) => { if (!cancelled) { setEvents(list); setSelectedIndex(null); } })
      .catch((err) => { console.error("Failed to load events:", err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
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
  const panelOpen = selectedEvent !== null;

  return (
    <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
      {/* ── Background: honeycomb fills entire page ───────────────── */}
      <HexagonBackground animated />

      {/* ── Content: sits above honeycomb ─────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* ── Hero: eyebrow + heading + description + year selector ── */}
        <section className="pt-28 pb-4 lg:pt-32 lg:pb-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[oklch(0.42_0.03_300)]">
                The Journey
              </span>
              <h1 className="mt-2 font-serif text-3xl tracking-tight text-[oklch(0.18_0.03_300)] md:text-4xl lg:text-5xl">
                Events &amp; Pitchnova
              </h1>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[oklch(0.42_0.03_300)] md:text-sm">
                Trace the story of APV E-Cell from campus inception to flagship
                national pitching championships — every milestone along the way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="shrink-0 self-start lg:self-end"
            >
              <YearRoller
                years={years}
                selectedYear={selectedYear}
                onSelect={handleYearChange}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Timeline section ─────────────────────────────────────── */}
        <section className="relative pb-16 lg:pb-28">
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
          ) : isMobile ? (
            /* ── Mobile: genuine vertical timeline ────────────── */
            <motion.div
              key={`journey-mobile-${selectedYear}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <JourneyTimelineMobile
                events={events}
                selectedIndex={selectedIndex}
                onSelect={handleSelectEvent}
                animKey={selectedYear ?? 0}
              />
            </motion.div>
          ) : (
            /* ── Desktop: horizontal curved timeline ──────────── */
            <motion.div
              key={`journey-${selectedYear}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <JourneyTimeline
                events={events}
                selectedIndex={selectedIndex}
                onSelect={handleSelectEvent}
                animKey={selectedYear ?? 0}
              />
            </motion.div>
          )}
        </section>
      </div>

      {/* ── Detail panel: portaled to document.body (above navbar) ── */}
      <JourneyDetailOverlay
        event={selectedEvent}
        onClose={handleCloseDetails}
        open={panelOpen}
      />
    </div>
  );
}
