import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";
import { JourneyNode } from "./JourneyNode";

interface JourneyTimelineMobileProps {
  events: EventData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  animKey: number | string;
}

/** Vertical spacing between event rows. */
const NODE_V_SPACING = 220;
/** Top padding for the timeline (below origin bubble). */
const TOP_PAD = 100;
/** Bottom padding after the last event. */
const BOT_PAD = 100;
/** Total horizontal width of the SVG vertical path. */
const PATH_W = 60;
/** Center of the vertical path (where nodes sit). */
const PATH_CX = PATH_W / 2;
/** Horizontal wave amplitude for subtle curve in the vertical path. */
const WAVE_AMP = 8;
/** Duration of the path draw animation. */
const DRAW_DUR = 2;
/** Width of the center column (where the vertical line and nodes sit). */
const CENTER_COL_W = 48;
/** Connector width: from card edge to node center. */
const CONNECTOR_W = CENTER_COL_W / 2;

/**
 * Mobile vertical timeline.
 *
 * Genuinely vertical: flows top → bottom.
 * Cards alternate left/right of the center vertical line.
 * The path has a subtle horizontal wave for visual interest.
 */
export function JourneyTimelineMobile({
  events,
  selectedIndex,
  onSelect,
  animKey,
}: JourneyTimelineMobileProps) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = events.length;

  // Reset animation when animKey changes
  useEffect(() => {
    setAnimationStarted(false);
    const raf = requestAnimationFrame(() => setAnimationStarted(true));
    return () => cancelAnimationFrame(raf);
  }, [animKey]);

  const totalHeight = useMemo(() => {
    if (count === 0) return 0;
    return TOP_PAD + count * NODE_V_SPACING + BOT_PAD;
  }, [count]);

  // Build vertical path points: origin at top, events below
  const verticalPoints = useMemo(() => {
    return events.map((_, i) => {
      const y = TOP_PAD + i * NODE_V_SPACING;
      const t = count > 1 ? i / (count - 1) : 0;
      const wave = Math.sin(t * Math.PI * 1.8) * WAVE_AMP;
      return { x: PATH_CX + wave, y };
    });
  }, [events, count]);

  const originPoint = useMemo(() => ({ x: PATH_CX, y: 30 }), []);

  // Node reveal delays
  const getDelay = (index: number) => {
    const progress = count > 1 ? index / (count - 1) : 0.5;
    return progress * DRAW_DUR;
  };

  if (count === 0) return null;

  return (
    <div ref={containerRef} className="journey-stage-mobile relative w-full">
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 500,
          height: totalHeight,
          paddingLeft: `${CENTER_COL_W / 2}px`,
        }}
      >
        {/* ── Vertical line ─────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2"
          style={{
            width: 4,
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.58 0.19 292 / 0.15) 8%, oklch(0.47 0.21 300 / 0.7) 50%, oklch(0.58 0.19 292 / 0.15) 92%, transparent 100%)",
          }}
        />

        {/* ── Origin bubble ─────────────────────────────────── */}
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
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 0 }}
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
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
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-mono font-bold uppercase tracking-[0.2em] text-[oklch(0.58_0.19_292_/_0.7)]"
            >
              Origin
            </span>
          </div>
        </motion.div>

        {/* ── Event rows ────────────────────────────────────── */}
        {events.map((event, index) => {
          const y = TOP_PAD + index * NODE_V_SPACING;
          const isActive = selectedIndex === index;
          const delay = getDelay(index);
          const isEven = index % 2 === 0;

          return (
            <div
              key={`${event.year}-${event.title}-${index}`}
              className="journey-mobile-row absolute left-0 right-0"
              style={{ top: y, height: 0 }}
            >
              {/* ── Center node ────────────────────────────── */}
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
                className="journey-mobile-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <JourneyNode
                  active={isActive}
                  onClick={() => onSelect(index)}
                  label={`Select event ${event.title}`}
                />
              </motion.div>

              {/* ── Card + connector ──────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                animate={
                  animationStarted
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: isEven ? -16 : 16 }
                }
                transition={{
                  duration: 0.4,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: animationStarted ? delay + 0.15 : 0,
                }}
                className={`journey-mobile-card-wrap absolute top-1/2 -translate-y-1/2 flex items-center ${
                  isEven ? "right-1/2 flex-row-reverse" : "left-1/2"
                }`}
                style={{ gap: 0 }}
              >
                {/* Connector line */}
                <span
                  aria-hidden="true"
                  className={`journey-mobile-connector shrink-0 ${
                    isActive
                      ? "bg-[oklch(0.58_0.19_292)]"
                      : "bg-[oklch(0.85_0.04_300)]"
                  }`}
                  style={{
                    width: `${CONNECTOR_W}px`,
                    height: 2,
                  }}
                />

                {/* Card */}
                <div
                  className={`journey-bubble-card group shrink-0 rounded-xl border bg-white p-3.5 text-left transition-all duration-300 ease-out cursor-pointer ${
                    isActive
                      ? "border-[oklch(0.58_0.19_292)] shadow-[0_2px_4px_oklch(0.30_0.19_300_/_0.08),0_16px_36px_-18px_oklch(0.30_0.19_300_/_0.5)]"
                      : "border-[oklch(0.91_0.02_300)] shadow-[0_1px_3px_oklch(0.30_0.19_300_/_0.05),0_10px_28px_-18px_oklch(0.30_0.19_300_/_0.3)] hover:border-[oklch(0.78_0.05_300)]"
                  }`}
                  style={{ width: "min(240px, 42vw)" }}
                  onClick={() => onSelect(index)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${event.title} — ${event.year}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(index);
                    }
                  }}
                >
                  {/* Meta row */}
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-mono uppercase tracking-[0.16em] text-[oklch(0.42_0.03_300)]">
                      {event.year}
                    </span>
                    <span className="text-[oklch(0.78_0.02_300)]">·</span>
                    <span
                      className={`rounded px-1.5 py-[1px] font-mono text-[8px] uppercase tracking-[0.14em] ${
                        event.status.toLowerCase() === "flagship"
                          ? "bg-[oklch(0.30_0.19_300)] text-white"
                          : event.status.toLowerCase() === "upcoming"
                            ? "bg-[oklch(0.58_0.19_292)] text-white"
                            : "bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)]"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-1.5 truncate font-serif text-[15px] font-normal leading-snug text-[oklch(0.18_0.03_300)]">
                    {event.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[oklch(0.42_0.03_300)]">
                    {event.subtitle}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
