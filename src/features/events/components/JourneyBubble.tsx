import React from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";

interface JourneyBubbleProps {
  event: EventData;
  position: "above" | "below";
  active: boolean;
  onSelect: () => void;
  delay?: number;
}

function statusClasses(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") {
    return "bg-[oklch(0.30_0.19_300)] text-white border border-[oklch(0.22_0.16_300)]";
  }
  if (lower === "upcoming") {
    return "bg-[oklch(0.58_0.19_292)] text-white border border-[oklch(0.47_0.21_300)]";
  }
  return "bg-[oklch(0.96_0.02_300)] text-[oklch(0.30_0.19_300)] border border-[oklch(0.91_0.02_300)]";
}

const POINTER_HALF = 6;
const CONNECTOR_HEIGHT = 26;

/**
 * Floating dialogue bubble above (or below) a journey node.
 *
 * Layout:
 *   - Above: pointer (tip) → connector line → card
 *   - Below: card → connector line → pointer (tip)
 *
 * The wrapper is a positioning context (width = card width). The card,
 * connector, and pointer are absolutely positioned so the entire stack
 * is anchored to the node center.
 *
 * Pointer is a real SVG triangle whose tip is pixel-precise and points
 * exactly at the node center.
 */
export function JourneyBubble({
  event,
  position,
  active,
  onSelect,
  delay = 0,
}: JourneyBubbleProps) {
  const isAbove = position === "above";
  const cardWidth = 280;

  // Pointer triangle — its tip points DOWN for "above", UP for "below".
  // We position the pointer at the edge closest to the node and rotate.
  const pointer = (
    <svg
      aria-hidden="true"
      width={POINTER_HALF * 2}
      height={POINTER_HALF * 2}
      viewBox={`0 0 ${POINTER_HALF * 2} ${POINTER_HALF * 2}`}
      className="journey-bubble-pointer pointer-events-none absolute left-1/2 z-[1]"
      style={{
        ...(isAbove
          ? { bottom: -POINTER_HALF, transform: "translateX(-50%)" }
          : { top: -POINTER_HALF, transform: "translateX(-50%) rotate(180deg)" }),
      }}
    >
      <path
        d={`M0,0 L${POINTER_HALF * 2},0 L${POINTER_HALF},${POINTER_HALF * 2} Z`}
        fill="white"
        stroke={active ? "oklch(0.58 0.19 292)" : "oklch(0.91 0.02 300)"}
        strokeWidth={1}
        strokeLinejoin="round"
        style={{ transition: "stroke 300ms ease" }}
      />
    </svg>
  );

  const connectorColor = active
    ? "bg-[oklch(0.58_0.19_292)]"
    : "bg-[oklch(0.85_0.04_300)] group-hover:bg-[oklch(0.62_0.17_300)]";

  const connector = (
    <span
      aria-hidden="true"
      className={`journey-bubble-connector pointer-events-none absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${connectorColor}`}
      style={
        isAbove ? { bottom: 0, height: CONNECTOR_HEIGHT } : { top: 0, height: CONNECTOR_HEIGHT }
      }
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: isAbove ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1], delay }}
      className="journey-bubble-wrap relative"
      style={{ width: cardWidth }}
    >
      {/* The card — always positioned at the far end from the node */}
      <div
        className={`journey-bubble-card group absolute left-0 right-0 rounded-2xl border bg-white p-4 text-left transition-all duration-300 ease-out ${
          active
            ? "border-[oklch(0.58_0.19_292)] shadow-[0_1px_2px_oklch(0.30_0.19_300_/_0.06),0_22px_44px_-22px_oklch(0.30_0.19_300_/_0.55)] -translate-y-0.5"
            : "border-[oklch(0.91_0.02_300)] shadow-[0_1px_2px_oklch(0.30_0.19_300_/_0.05),0_14px_34px_-22px_oklch(0.30_0.19_300_/_0.35)] hover:-translate-y-1 hover:border-[oklch(0.78_0.05_300)] hover:shadow-[0_1px_2px_oklch(0.30_0.19_300_/_0.05),0_18px_40px_-22px_oklch(0.30_0.19_300_/_0.45)]"
        }`}
        style={
          isAbove
            ? { bottom: POINTER_HALF + CONNECTOR_HEIGHT }
            : { top: POINTER_HALF + CONNECTOR_HEIGHT }
        }
      >
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={active}
          aria-label={`${event.title} — ${event.year}`}
          className="block w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-4 top-0 h-px rounded-full transition-opacity duration-300 ${
              active ? "opacity-100" : "opacity-0"
            } bg-gradient-to-r from-transparent via-[oklch(0.58_0.19_292)] to-transparent`}
          />

          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="font-mono uppercase tracking-[0.18em] text-[oklch(0.42_0.03_300)]">
              {event.year}
            </span>
            <span className="text-[oklch(0.78_0.02_300)]">•</span>
            <span
              className={`rounded px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-[0.15em] ${statusClasses(event.status)}`}
            >
              {event.status}
            </span>
          </div>

          <h3 className="mt-2 truncate font-serif text-[16px] font-normal leading-snug text-[oklch(0.18_0.03_300)]">
            {event.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[oklch(0.42_0.03_300)]">
            {event.subtitle}
          </p>
        </button>
      </div>

      {/* Connector + pointer — anchored to the wrapper center (node center) */}
      {connector}
      {pointer}
    </motion.div>
  );
}
