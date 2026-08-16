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
  /** Changing this key triggers a fresh animation cycle. */
  animKey: number | string;
}

const NODE_SPACING = 360;
const SAFE_PAD = 260;
const STAGE_HEIGHT = 520;
/** X position of the origin bubble center (far left of the track). */
const ORIGIN_X = 80;

/**
 * Desktop horizontal curved journey timeline.
 *
 * On mobile, the vertical JourneyTimelineMobile is rendered instead.
 * This component handles the horizontal layout only.
 */
function buildAmplitudes(count: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [0];
  const amps: number[] = [];
  const WAVE = 150;
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0;
    const taper = Math.sin(t * Math.PI);
    const w1 = Math.sin(t * Math.PI * 1.4);
    const w2 = Math.sin(t * Math.PI * 2.6) * 0.35;
    const w3 = Math.sin(t * Math.PI * 0.7) * 0.4;
    const value = (w1 + w2 + w3) * taper;
    amps.push((value / 1.75) * WAVE);
  }
  return amps;
}

/** Card alternation: above, below, above, below... */
function bubblePositionFor(index: number): "above" | "below" {
  return index % 2 === 0 ? "above" : "below";
}

export function JourneyTimeline({
  events,
  selectedIndex,
  onSelect,
  animKey,
}: JourneyTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });
  const [animationStarted, setAnimationStarted] = useState(false);

  const count = events.length;

  const trackWidth = useMemo(() => {
    if (count === 0) return 0;
    return SAFE_PAD * 2 + Math.max(0, count - 1) * NODE_SPACING;
  }, [count]);

  const amplitudes = useMemo(() => buildAmplitudes(count), [count]);
  const baseY = STAGE_HEIGHT / 2 + 10;

  const pathPoints = useMemo(() => {
    return events.map((_, i) => ({
      x: SAFE_PAD + i * NODE_SPACING,
      y: baseY + (amplitudes[i] ?? 0),
    }));
  }, [events, amplitudes, baseY]);

  /** Origin point — the starting bubble sits here. */
  const originPoint = useMemo(() => ({ x: ORIGIN_X, y: baseY }), [baseY]);

  // Reset animation when animKey changes
  useEffect(() => {
    setAnimationStarted(false);
    const raf = requestAnimationFrame(() => {
      setAnimationStarted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [animKey]);

  // Scroll state tracking
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

  const handleScrollBy = useCallback((dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }, []);

  if (count === 0) return null;

  // Total path draw duration in seconds
  const DRAW_DURATION = 2;
  // Each node appears at its proportional point along the path
  const getDelay = (index: number) => {
    const progress = count > 1 ? index / (count - 1) : 0.5;
    return progress * DRAW_DURATION;
  };

  return (
    <div className="journey-stage relative w-full">
      {/* ── Viewport: transparent, no background, no border ────────── */}
      <div
        className="journey-viewport relative overflow-hidden"
        style={{ height: STAGE_HEIGHT }}
      >
        {/* Scroll container */}
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
            {/* SVG Path */}
            <JourneyPath
              width={trackWidth}
              height={STAGE_HEIGHT}
              points={pathPoints}
              startPoint={originPoint}
              drawDuration={DRAW_DURATION}
              idPrefix="jp-desktop"
            />

            {/* Origin bubble — large decorative starting node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={
                animationStarted
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={{
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1],
                delay: animationStarted ? 0.1 : 0,
              }}
              className="absolute"
              style={{
                left: ORIGIN_X,
                top: baseY,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16">
                {/* Outer ring pulse */}
                <span
                  aria-hidden="true"
                  className="absolute inset-[-12px] rounded-full"
                  style={{
                    border: "1.5px solid oklch(0.58 0.19 292 / 0.2)",
                    animation: animationStarted
                      ? "origin-ring-pulse 3s ease-in-out infinite"
                      : "none",
                  }}
                />
                {/* Ambient glow */}
                <span
                  aria-hidden="true"
                  className="absolute inset-[-18px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.58 0.19 292 / 0.25) 0%, transparent 70%)",
                    filter: "blur(10px)",
                    animation: animationStarted
                      ? "journey-node-breathe 4.5s ease-in-out infinite"
                      : "none",
                  }}
                />
                {/* Glassy body */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, oklch(0.92 0.04 300) 0%, oklch(0.82 0.10 300) 30%, oklch(0.55 0.18 300) 70%, oklch(0.38 0.20 300) 100%)",
                    boxShadow:
                      "0 0 0 1.5px oklch(0.86 0.06 300 / 0.6), 0 6px 20px -4px oklch(0.30 0.19 300 / 0.5), inset 0 1px 3px oklch(1 0 0 / 0.5), inset 0 -2px 6px oklch(0.30 0.19 300 / 0.4)",
                  }}
                />
                {/* Inner disc */}
                <span
                  aria-hidden="true"
                  className="absolute inset-[7px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, oklch(0.58 0.19 292) 0%, oklch(0.40 0.20 300) 60%, oklch(0.28 0.18 300) 100%)",
                    boxShadow:
                      "inset 0 1px 4px oklch(1 0 0 / 0.3), inset 0 -2px 5px oklch(0.18 0.10 300 / 0.4)",
                  }}
                />
                {/* Specular highlight */}
                <span
                  aria-hidden="true"
                  className="absolute left-[8px] top-[9px] h-[6px] w-[6px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(1 0 0 / 0.9) 0%, oklch(1 0 0 / 0) 70%)",
                    filter: "blur(0.3px)",
                  }}
                />
                {/* "ORIGIN" label */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-[oklch(0.58_0.19_292_/_0.7)]"
                >
                  Origin
                </span>
              </div>
            </motion.div>

            {/* Nodes + Bubbles */}
            <div className="absolute inset-0">
              {events.map((event, index) => {
                const cx = SAFE_PAD + index * NODE_SPACING;
                const cy = baseY + (amplitudes[index] ?? 0);
                const position = bubblePositionFor(index);
                const isActive = selectedIndex === index;
                const delay = getDelay(index);

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
                    {/* Bubble (card + connector + pointer) */}
                    <div className="journey-bubble-anchor absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <JourneyBubble
                        event={event}
                        position={position}
                        active={isActive}
                        onSelect={() => onSelect(index)}
                        delay={animationStarted ? delay + 0.25 : 0}
                        animate={animationStarted}
                      />
                    </div>

                    {/* Node (glowing orb) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={
                        animationStarted
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.3 }
                      }
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 0.61, 0.36, 1],
                        delay: animationStarted ? delay : 0,
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

        {/* Navigation arrows */}
        {scrollState.canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScrollBy(-NODE_SPACING)}
            aria-label="Scroll journey left"
            className="journey-nav-btn group absolute left-2 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white/95 text-[oklch(0.30_0.19_300)] shadow-[0_4px_14px_-4px_oklch(0.30_0.19_300_/_0.35)] backdrop-blur-sm transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] hover:shadow-[0_6px_18px_-4px_oklch(0.30_0.19_300_/_0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-3 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}
        {scrollState.canScrollRight && (
          <button
            type="button"
            onClick={() => handleScrollBy(NODE_SPACING)}
            aria-label="Scroll journey right"
            className="journey-nav-btn group absolute right-2 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[oklch(0.91_0.02_300)] bg-white/95 text-[oklch(0.30_0.19_300)] shadow-[0_4px_14px_-4px_oklch(0.30_0.19_300_/_0.35)] backdrop-blur-sm transition-all hover:border-[oklch(0.58_0.19_292)] hover:text-[oklch(0.30_0.19_300)] hover:shadow-[0_6px_18px_-4px_oklch(0.30_0.19_300_/_0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-3 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Hint footer */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[oklch(0.42_0.03_300)]">
        <span className="h-px w-6 bg-[oklch(0.91_0.02_300)]" />
        <span>Drag · scroll · use arrows</span>
        <span className="h-px w-6 bg-[oklch(0.91_0.02_300)]" />
      </div>
    </div>
  );
}
