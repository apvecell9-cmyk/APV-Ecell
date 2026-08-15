import React from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";

interface JourneyBubbleProps {
  event: EventData;
  position: "above" | "below";
  active: boolean;
  onSelect: () => void;
  delay?: number;
  animate?: boolean;
}

function statusPill(status: string): { bg: string; text: string } {
  const lower = status.toLowerCase();
  if (lower === "flagship")
    return {
      bg: "bg-[oklch(0.30_0.19_300)]",
      text: "text-white",
    };
  if (lower === "upcoming")
    return {
      bg: "bg-[oklch(0.58_0.19_292)]",
      text: "text-white",
    };
  return {
    bg: "bg-[oklch(0.96_0.02_300)]",
    text: "text-[oklch(0.30_0.19_300)]",
  };
}

const CONNECTOR_H = 28;
const POINTER_SIZE = 5;

/**
 * Compact event card attached to a journey node.
 *
 * Layout (position="above"):
 *   [CARD]
 *     |       (connector line)
 *     ▼       (pointer triangle, tip at node)
 *     ●       (node — rendered by parent)
 *
 * Layout (position="below"):
 *     ●       (node)
 *     ▲       (pointer triangle, tip at node)
 *     |       (connector line)
 *   [CARD]
 */
export function JourneyBubble({
  event,
  position,
  active,
  onSelect,
  delay = 0,
  animate = true,
}: JourneyBubbleProps) {
  const isAbove = position === "above";
  const pill = statusPill(event.status);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: isAbove ? 10 : -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
      className="journey-bubble-wrap relative"
      style={{ width: "min(300px, 75vw)" }}
    >
      {/* ── Card ──────────────────────────────────────────────── */}
      <div
        className={`journey-bubble-card group absolute left-0 right-0 rounded-xl border bg-white p-4 text-left transition-all duration-300 ease-out ${
          active
            ? "border-[oklch(0.58_0.19_292)] shadow-[0_2px_4px_oklch(0.30_0.19_300_/_0.08),0_16px_36px_-18px_oklch(0.30_0.19_300_/_0.5)]"
            : "border-[oklch(0.91_0.02_300)] shadow-[0_1px_3px_oklch(0.30_0.19_300_/_0.05),0_10px_28px_-18px_oklch(0.30_0.19_300_/_0.3)] hover:border-[oklch(0.78_0.05_300)] hover:shadow-[0_1px_3px_oklch(0.30_0.19_300_/_0.05),0_14px_34px_-18px_oklch(0.30_0.19_300_/_0.4)]"
        }`}
        style={
          isAbove
            ? { bottom: POINTER_SIZE + CONNECTOR_H }
            : { top: POINTER_SIZE + CONNECTOR_H }
        }
      >
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={active}
          aria-label={`${event.title} — ${event.year}`}
          className="block w-full rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Meta row */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="font-mono uppercase tracking-[0.16em] text-[oklch(0.42_0.03_300)]">
              {event.year}
            </span>
            <span className="text-[oklch(0.78_0.02_300)]">·</span>
            <span
              className={`rounded px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.14em] ${pill.bg} ${pill.text}`}
            >
              {event.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2 truncate font-serif text-[17px] font-normal leading-snug text-[oklch(0.18_0.03_300)]">
            {event.title}
          </h3>

          {/* Subtitle */}
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-[oklch(0.42_0.03_300)]">
            {event.subtitle}
          </p>
        </button>
      </div>

      {/* ── Connector line ────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className={`journey-bubble-connector pointer-events-none absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${
          active
            ? "bg-[oklch(0.58_0.19_292)]"
            : "bg-[oklch(0.85_0.04_300)] group-hover:bg-[oklch(0.62_0.17_300)]"
        }`}
        style={
          isAbove
            ? { bottom: 0, height: CONNECTOR_H }
            : { top: 0, height: CONNECTOR_H }
        }
      />

      {/* ── Pointer triangle ──────────────────────────────────── */}
      <svg
        aria-hidden="true"
        width={POINTER_SIZE * 2}
        height={POINTER_SIZE}
        viewBox={`0 0 ${POINTER_SIZE * 2} ${POINTER_SIZE}`}
        className="journey-bubble-pointer pointer-events-none absolute left-1/2 z-[1]"
        style={
          isAbove
            ? { bottom: -POINTER_SIZE, transform: "translateX(-50%)" }
            : {
                top: -POINTER_SIZE,
                transform: "translateX(-50%) rotate(180deg)",
              }
        }
      >
        <path
          d={`M0,0 L${POINTER_SIZE * 2},0 L${POINTER_SIZE},${POINTER_SIZE} Z`}
          fill="white"
          stroke={
            active ? "oklch(0.58 0.19 292)" : "oklch(0.91 0.02 300)"
          }
          strokeWidth={1}
          strokeLinejoin="round"
          style={{ transition: "stroke 300ms ease" }}
        />
      </svg>
    </motion.div>
  );
}
