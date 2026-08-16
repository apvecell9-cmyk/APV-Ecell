import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
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
 * Portaled to document.body so it sits above EVERYTHING including the navbar.
 * Slides in from the right edge. On mobile it occupies full width.
 *
 * Close interactions:
 *   - "Return to Events" capsule button at the bottom
 *   - Drag/swipe the drawer to the right
 *   - Click the backdrop
 *   - Escape key
 */
export function JourneyDetailOverlay({
  event,
  onClose,
  open,
}: JourneyDetailOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Drag-to-close: record initial pointer X on down, track delta on move
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    const el = panelRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    // Only allow dragging rightward
    if (deltaX > 0) {
      dragX.set(deltaX);
    }
  }, [dragX]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = panelRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);

    const panelWidth = el.getBoundingClientRect().width;
    const currentDrag = dragX.get();
    const threshold = panelWidth * 0.3;

    if (currentDrag > threshold) {
      // Close — animate out to the right
      animate(dragX, panelWidth, {
        duration: 0.25,
        ease: [0.22, 0.61, 0.36, 1],
        onComplete: onClose,
      });
    } else {
      // Snap back to open position
      animate(dragX, 0, {
        duration: 0.3,
        ease: [0.22, 0.61, 0.36, 1],
      });
    }
  }, [dragX, onClose]);

  // When opening, reset dragX
  useEffect(() => {
    if (open) dragX.set(0);
  }, [open, dragX]);

  // Backdrop fades as user drags
  const backdropOpacity = useTransform(dragX, [0, 300], [1, 0]);

  return createPortal(
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
            style={{ opacity: backdropOpacity }}
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — portaled above everything */}
          <motion.div
            key={`detail-${event.year}-${event.title}`}
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${event.title} event details`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="journey-detail-panel fixed inset-y-0 right-0 z-[9999] flex h-full flex-col overflow-hidden border-l border-[oklch(0.91_0.02_300)] bg-white shadow-[-8px_0_40px_-12px_oklch(0.30_0.19_300_/_0.2)]
                       w-full md:w-[min(45vw,520px)]"
            style={{ x: dragX, touchAction: "pan-y" as const }}
          >
            {/* ── Drag handle indicator ────────────────────────── */}
            <div className="pointer-events-none flex justify-center pt-3 pb-1 md:hidden">
              <span className="h-1 w-10 rounded-full bg-[oklch(0.85_0.04_300)]" />
            </div>

            {/* ── Header ──────────────────────────────────────── */}
            <div className="relative shrink-0 border-b border-[oklch(0.91_0.02_300)] px-6 pb-5 pt-4">
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

            {/* ── Scrollable Body ─────────────────────────────── */}
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

              {/* Spacer so content doesn't hide behind sticky footer */}
              <div className="h-20" />
            </div>

            {/* ── Fixed Footer: Return to Events ──────────────── */}
            <div className="shrink-0 border-t border-[oklch(0.91_0.02_300)] bg-white px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-[oklch(0.58_0.19_292)] bg-[oklch(0.58_0.19_292)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[oklch(0.48_0.19_292)] hover:shadow-[0_4px_20px_-4px_oklch(0.30_0.19_300_/_0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.58_0.19_292)] focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Return to Events
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
