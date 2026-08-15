import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { DedicatedEventButton } from "./DedicatedEventButton";

interface JourneyDetailOverlayProps {
  event: EventData | null;
  onClose: () => void;
}

function statusPillClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") {
    return "bg-[oklch(0.30_0.19_300)] text-white";
  }
  if (lower === "upcoming") {
    return "bg-[oklch(0.58_0.19_292)] text-white";
  }
  return "bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)] border border-[oklch(0.91_0.02_300)]";
}

/**
 * Floating detail card for the selected event.
 *
 * Rendered inside the timeline stage's relative parent so it overlays
 * the journey without affecting layout. The card itself is bounded
 * (~380px on desktop, near-full-width on mobile) and never resizes
 * the underlying timeline.
 *
 * - Desktop: anchors to the right edge of the stage, slides in from right.
 * - Mobile: bottom sheet, slides up from the bottom.
 */
export function JourneyDetailOverlay({ event, onClose }: JourneyDetailOverlayProps) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);

  return (
    <AnimatePresence mode="wait">
      {event && (
        <motion.div
          key={`journey-detail-${event.year}-${event.title}`}
          initial={{ opacity: 0, x: 32, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 32, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`${event.title} event details`}
          className="journey-detail-panel absolute z-40 flex max-h-[calc(100%-1.5rem)] w-[min(380px,calc(100%-1.5rem))] flex-col overflow-hidden rounded-2xl border border-[oklch(0.91_0.02_300)] bg-white shadow-[0_1px_2px_oklch(0.30_0.19_300_/_0.06),0_28px_64px_-24px_oklch(0.30_0.19_300_/_0.45)] sm:right-4 sm:top-1/2 sm:bottom-auto sm:w-[380px] sm:-translate-y-1/2
                     inset-x-3 bottom-3 top-auto sm:inset-x-auto"
        >
          {/* Header */}
          <div className="relative shrink-0 border-b border-[oklch(0.91_0.02_300)] px-5 pb-4 pt-5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close event details"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white text-[oklch(0.42_0.03_300)] transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <span className="eyebrow text-[10px]">Event Details</span>
            <div className="mt-2 flex items-center gap-1.5 text-[10px]">
              <span className="font-mono uppercase tracking-[0.18em] text-[oklch(0.42_0.03_300)]">
                {event.year}
              </span>
              <span className="text-[oklch(0.78_0.02_300)]">•</span>
              <span
                className={`rounded px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.15em] ${statusPillClass(event.status)}`}
              >
                {event.status}
              </span>
            </div>
            <h2 className="mt-2 font-serif text-[20px] font-normal leading-tight text-[oklch(0.18_0.03_300)]">
              {event.title}
            </h2>
            <p className="mt-1 text-[12px] leading-snug text-[oklch(0.42_0.03_300)]">
              {event.subtitle}
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-2 text-[12.5px] text-[oklch(0.42_0.03_300)]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                  <Calendar className="h-3 w-3" />
                </span>
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                    <Clock className="h-3 w-3" />
                  </span>
                  <span>{event.time}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                    <MapPin className="h-3 w-3" />
                  </span>
                  <span>{event.venue}</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-[12.5px] leading-relaxed text-[oklch(0.18_0.03_300)]/90">
              {event.description}
            </p>

            {event.highlights.length > 0 && (
              <div className="mt-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[oklch(0.42_0.03_300)]">
                  Highlights
                </span>
                <ul className="mt-2.5 space-y-1.5">
                  {event.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[12.5px] text-[oklch(0.18_0.03_300)]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.58_0.19_292)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 pt-1">
              <DedicatedEventButton event={event} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
