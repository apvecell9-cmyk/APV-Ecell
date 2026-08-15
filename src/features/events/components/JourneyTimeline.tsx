import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EventData } from "@/types/events";
import { JourneyPath } from "./JourneyPath";
import { JourneyNode } from "./JourneyNode";
import { JourneyBubble } from "./JourneyBubble";

interface JourneyTimelineProps {
  events: EventData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const NODE_SPACING = 360;
const SAFE_PAD = 240; // padding around the track so first/last bubbles never clip
const STAGE_HEIGHT = 460;
const WAVE_AMPLITUDE = 95;

/**
 * Designed trajectory: a deliberate, intentional curve that reads as a
 * chronological journey. The macro shape is "rise → fall → rise → small
 * dip", implemented as a weighted sum of sine harmonics over the
 * normalized event index (0..1), tapered at the endpoints so the first
 * and last nodes settle near the baseline.
 *
 * Same event count → same curve. No randomness.
 */
function buildAmplitudes(count: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [0];
  const amps: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0;
    // Gentle taper so endpoints sit near baseline (sin(0)=sin(π)=0).
    const taper = Math.sin(t * Math.PI);
    // Designed macro-curve, normalized to ~[-1, 1]:
    //   - sin(π·1.4) provides the main "rise then dip" motion
    //   - sin(π·2.6) adds a secondary mid-timeline wiggle
    //   - sin(π·0.7) provides a long gentle drift
    const w1 = Math.sin(t * Math.PI * 1.4);
    const w2 = Math.sin(t * Math.PI * 2.6) * 0.35;
    const w3 = Math.sin(t * Math.PI * 0.7) * 0.4;
    const value = (w1 + w2 + w3) * taper;
    // Normalize: the combined max is ~1.75, so divide to keep within
    // the intended amplitude range.
    amps.push((value / 1.75) * WAVE_AMPLITUDE);
  }
  return amps;
}

/**
 * Bubble position pattern. Designed cadence (not strict alternation):
 * first bubble above (visible immediately), last bubble above too,
 * otherwise mostly above with strategic "below" placements that follow
 * the dip in the curve so a bubble never collides with its own node.
 */
function bubblePositionFor(index: number, count: number): "above" | "below" {
  if (count === 1) return "above";
  if (index === 0) return "above";
  if (index === count - 1) return "above";
  // For middle events: place bubble on the OPPOSITE side of the curve
  // direction. When the path is rising (positive amplitude), place
  // bubble above so it doesn't overlap the upward stroke. When the
  // path is descending, place bubble below.
  // Simpler deterministic pattern:
  const pattern: Array<"above" | "below"> = ["above", "below", "above", "below"];
  return pattern[(index - 1) % pattern.length]!;
}

export function JourneyTimeline({ events, selectedIndex, onSelect }: JourneyTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<{
    canScrollLeft: boolean;
    canScrollRight: boolean;
  }>({ canScrollLeft: false, canScrollRight: false });

  const count = events.length;

  // Track inner width: events spread evenly with safe padding on both ends.
  const trackWidth = useMemo(() => {
    if (count === 0) return 0;
    return SAFE_PAD * 2 + Math.max(0, count - 1) * NODE_SPACING;
  }, [count]);

  const amplitudes = useMemo(() => buildAmplitudes(count), [count]);

  // Vertical centerline for nodes — the path baseline. Slightly above
  // the geometric center so the curve + bubbles above/below both fit
  // within the stage height without clipping.
  const baseY = STAGE_HEIGHT / 2 + 10;

  // Path anchor points: one per event, centered on its x in track coords.
  const pathPoints = useMemo(() => {
    return events.map((_, i) => ({
      x: SAFE_PAD + i * NODE_SPACING,
      y: baseY + (amplitudes[i] ?? 0),
    }));
  }, [events, amplitudes, baseY]);

  // Track scroll state for arrow visibility.
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollState({
      canScrollLeft: el.scrollLeft > 4,
      canScrollRight: el.scrollLeft < maxScroll - 4,
    });
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, trackWidth]);

  // IMPORTANT: do NOT auto-scroll on selection. Selection only changes
  // node/bubble visual state and the details overlay.
  useEffect(() => {
    /* no-op */
  }, [selectedIndex]);

  const handleScrollBy = useCallback((dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }, []);

  if (count === 0) return null;

  return (
    <div className="journey-stage relative w-full">
      {/* ── Viewport (transparent container) ──────────────────────────
          The viewport is intentionally TRANSPARENT — no background,
          no border, no rounded rectangle, no shadow. The honeycomb
          page background shows through every part of it. The track
          inside scrolls horizontally; nothing else moves. */}
      <div className="journey-viewport relative overflow-hidden" style={{ height: STAGE_HEIGHT }}>
        {/* The scroll container — the ONLY element that translates. */}
        <div
          ref={scrollRef}
          className="journey-scroll absolute inset-0 overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
          aria-label="Event journey timeline"
        >
          <div
            className="journey-track relative"
            style={{ width: `${trackWidth}px`, height: `${STAGE_HEIGHT}px` }}
          >
            {/* Path */}
            <JourneyPath width={trackWidth} height={STAGE_HEIGHT} points={pathPoints} />

            {/* Nodes + bubbles */}
            <div className="absolute inset-0">
              {events.map((event, index) => {
                const cx = SAFE_PAD + index * NODE_SPACING;
                const cy = baseY + (amplitudes[index] ?? 0);
                const position = bubblePositionFor(index, count);
                const isActive = selectedIndex === index;

                return (
                  <div
                    key={`${event.year}-${event.title}-${index}`}
                    className="journey-anchor absolute"
                    style={{
                      left: `${cx}px`,
                      top: `${cy}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Bubble — wrapper sits at the node center; the
                        bubble's internal geometry pushes the card above
                        or below the node. */}
                    <div className="journey-bubble-anchor absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <JourneyBubble
                        event={event}
                        position={position}
                        active={isActive}
                        onSelect={() => onSelect(index)}
                        delay={0.15 + index * 0.06}
                      />
                    </div>

                    {/* Node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 0.61, 0.36, 1],
                        delay: 0.1 + index * 0.06,
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <JourneyNode
                        active={isActive}
                        onClick={() => onSelect(index)}
                        label={`Select event ${event.title}`}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edge fade masks — narrow, only at the immediate scroll edge
            so the honeycomb shows through everywhere else. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[oklch(0.99_0.005_285)] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[oklch(0.99_0.005_285)] to-transparent"
        />

        {/* Integrated navigation arrows — sit on the viewport edges */}
        {scrollState.canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollBy(-NODE_SPACING)}
            aria-label="Scroll journey left"
            className="journey-nav-btn group absolute left-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white/95 text-[oklch(0.30_0.19_300)] shadow-[0_4px_14px_-4px_oklch(0.30_0.19_300_/_0.35)] backdrop-blur-sm transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] hover:shadow-[0_6px_18px_-4px_oklch(0.30_0.19_300_/_0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}
        {scrollState.canScrollRight && (
          <button
            type="button"
            onClick={() => handleScrollBy(NODE_SPACING)}
            aria-label="Scroll journey right"
            className="journey-nav-btn group absolute right-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white/95 text-[oklch(0.30_0.19_300)] shadow-[0_4px_14px_-4px_oklch(0.30_0.19_300_/_0.35)] backdrop-blur-sm transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] hover:shadow-[0_6px_18px_-4px_oklch(0.30_0.19_300_/_0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Hint footer — sits under the viewport, integrated typography */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[oklch(0.42_0.03_300)]">
        <span className="h-px w-6 bg-[oklch(0.91_0.02_300)]" />
        <span>Drag · scroll · use arrows</span>
        <span className="h-px w-6 bg-[oklch(0.91_0.02_300)]" />
      </div>
    </div>
  );
}
