import React from "react";

/**
 * Reusable animated honeycomb/hexagon background.
 *
 * Renders a true tessellated hexagon pattern using CSS only.
 * Three animation layers create a subtle "living" feel:
 *   1. Slow drift — background-position shifts over 30s
 *   2. Pulse — opacity breathes to create localized variation
 *   3. Wave — a radial gradient slowly sweeps across
 *
 * All animations are CSS-only (no JS loops).
 * Respects `prefers-reduced-motion: reduce`.
 * Always passes pointer events through (`pointer-events: none`).
 */

type HexagonBackgroundProps = {
  /** Base opacity of the hexagon strokes (0–1). Default 0.08. */
  opacity?: number;
  /** Stroke color as an SVG-friendly value. Default #000. */
  lineColor?: string;
  /** Enable ambient animations. Default true. */
  animated?: boolean;
  /** Animation pace. Default "normal". */
  animationSpeed?: "slow" | "normal" | "fast";
  /** Additional CSS classes. */
  className?: string;
};

/**
 * True flat-top hexagon tessellation tile (30 × 34.64 px).
 *
 * Geometry (side = 10):
 *   width  = 2s       = 20
 *   height = s√3      ≈ 17.32
 *   col spacing = 1.5w = 30
 *   row spacing = 2h  ≈ 34.64
 *   odd-col y-offset   = h/2 ≈ 8.66
 *
 * Four hexagons per tile — no gaps, no overlaps.
 */
const HEX_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='34.64'%3E%3Cpath d='M10 8.66 5 0 15 0 20 8.66 15 17.32 5 17.32Z' fill='none' stroke='%23000' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M25 17.32 20 8.66 30 8.66 35 17.32 30 25.98 20 25.98Z' fill='none' stroke='%23000' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M10 25.98 5 17.32 15 17.32 20 25.98 15 34.64 5 34.64Z' fill='none' stroke='%23000' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M40 17.32 35 8.66 45 8.66 50 17.32 45 25.98 35 25.98Z' fill='none' stroke='%23000' stroke-opacity='0.15' stroke-width='0.75'/%3E%3C/svg%3E`;

function speedClass(speed: "slow" | "normal" | "fast"): string {
  if (speed === "slow") return "hex-speed-slow";
  if (speed === "fast") return "hex-speed-fast";
  return "";
}

export function HexagonBackground({
  opacity = 0.5,
  lineColor = "#510C9A",
  animated = true,
  animationSpeed = "fast",
  className = "",
}: HexagonBackgroundProps) {
  // If lineColor is non-default, regenerate the SVG with the custom color
  const hexSvg =
    lineColor !== "#510C9A"
      ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='34.64'%3E%3Cpath d='M10 8.66 5 0 15 0 20 8.66 15 17.32 5 17.32Z' fill='none' stroke='${encodeURIComponent(lineColor)}' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M25 17.32 20 8.66 30 8.66 35 17.32 30 25.98 20 25.98Z' fill='none' stroke='${encodeURIComponent(lineColor)}' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M10 25.98 5 17.32 15 17.32 20 25.98 15 34.64 5 34.64Z' fill='none' stroke='${encodeURIComponent(lineColor)}' stroke-opacity='0.15' stroke-width='0.75'/%3E%3Cpath d='M40 17.32 35 8.66 45 8.66 50 17.32 45 25.98 35 25.98Z' fill='none' stroke='${encodeURIComponent(lineColor)}' stroke-opacity='0.15' stroke-width='0.75'/%3E%3C/svg%3E`
      : HEX_SVG;

  const hexUrl = `url("${hexSvg}")`;
  const speed = speedClass(animationSpeed);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Layer 1: Base honeycomb — slow drift via background-position */}
      <div
        className={`absolute -inset-[10%] ${animated ? `hex-anim-drift ${speed}` : ""}`}
        style={{
          backgroundImage: hexUrl,
          backgroundSize: "60px 64.64px",
          opacity,
        }}
      />

      {/* Layer 2: Pulse — opacity breathes to create localized variation */}
      {animated && (
        <div
          className={`absolute -inset-[10%] hex-anim-pulse ${speed}`}
          style={{
            backgroundImage: hexUrl,
            backgroundSize: "60px 64.64px",
          }}
        />
      )}

      {/* Layer 3: Wave — radial gradient sweeps slowly across */}
      {animated && (
        <div
          className={`absolute -inset-[10%] hex-anim-wave ${speed}`}
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(81,12,154,0.04), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
