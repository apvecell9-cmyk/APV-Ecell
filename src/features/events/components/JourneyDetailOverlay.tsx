import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { DedicatedEventButton } from "./DedicatedEventButton";

interface JourneyDetailOverlayProps {
  event: EventData | null;
  onClose: () => void;
  open: boolean;
}

function statusPillClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") return "bg-[oklch(0.30_0.19_300)] text-white";
  if (lower === "upcoming") return "bg-[oklch(0.58_0.19_292)] text-white";
  return "bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)] border border-[oklch(0.91_0.02_300)]";
}

/**
 * Full-height event details drawer.
 *
 * Slides in from the right edge of the viewport at ~45% width on desktop.
 * On mobile it becomes a bottom sheet. The timeline underneath is NOT
 * moved or resized — this panel overlays the page.
 *
 * - Escape key closes
 * - Click outside closes
 * - No event image (text/information focused)
 */
export function JourneyDetailOverlay({
  event,
  onClose,
  open,
}: JourneyDetailOverlayProps) {
  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && event && (
        <>
          {/* Backdrop: click to close */}
          <motion.div
            key="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key={`detail-${event.year}-${event.title}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${event.title} event details`}
            className="journey-detail-panel fixed inset-y-0 right-0 z-[60] flex w-full flex-col overflow-hidden border-l border-[oklch(0.91_0.02_300)] bg-white shadow-[-8px_0_40px_-12px_oklch(0.30_0.19_300_/_0.2)]
                       sm:w-[min(45vw,520px)]"
          >
            {/* ── Header ──────────────────────────────────────── */}
            <div className="relative shrink-0 border-b border-[oklch(0.91_0.02_300)] px-6 pb-5 pt-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close event details"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white text-[oklch(0.42_0.03_300)] transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[oklch(0.42_0.03_300)]">
                Event Details
              </span>

              <div className="mt-3 flex items-center gap-1.5 text-[10px]">
                <span className="font-mono uppercase tracking-[0.18em] text-[oklch(0.42_0.03_300)]">
                  {event.year}
                </span>
                <span className="text-[oklch(0.78_0.02_300)]">·</span>
                <span
                  className={`rounded px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.15em] ${statusPillClass(event.status)}`}
                >
                  {event.status}
                </span>
              </div>

              <h2 className="mt-2 font-serif text-[22px] font-normal leading-tight text-[oklch(0.18_0.03_300)]">
                {event.title}
              </h2>
              <p className="mt-1 text-[13px] leading-snug text-[oklch(0.42_0.03_300)]">
                {event.subtitle}
              </p>
            </div>

            {/* ── Body ────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Metadata */}
              <div className="space-y-2.5 text-[13px] text-[oklch(0.42_0.03_300)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                    <Calendar className="h-3.5 w-3.5" />
                  </span>
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                      <Clock className="h-3.5 w-3.5" />
                    </span>
                    <span>{event.time}</span>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]">
                      <MapPin className="h-3.5 w-3.5" />
                    </span>
                    <span>{event.venue}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mt-5 text-[13px] leading-relaxed text-[oklch(0.18_0.03_300)]/90">
                {event.description}
              </p>

              {/* Highlights */}
              {event.highlights.length > 0 && (
                <div className="mt-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[oklch(0.42_0.03_300)]">
                    Highlights
                  </span>
                  <ul className="mt-3 space-y-2">
                    {event.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[13px] text-[oklch(0.18_0.03_300)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[oklch(0.58_0.19_292)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dedicated page button */}
              <div className="mt-6 pt-1">
                <DedicatedEventButton event={event} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
