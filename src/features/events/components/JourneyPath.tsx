import React from "react";

interface JourneyPathProps {
  width: number;
  height: number;
  points: Array<{ x: number; y: number }>;
}

/**
 * Smooth SVG path drawn through an array of (x, y) anchor points.
 *
 * The path is rendered as three stacked layers to create a 2.5D feel:
 *   1. Wide soft glow (blurred, low opacity) — atmospheric depth
 *   2. Mid stroke with stronger gradient — the visible "spine"
 *   3. Crisp bright stroke (1.5px) — the "highlight" running along the top
 *
 * Path endpoints fade to transparent so the line visually emerges from
 * the first node and dissolves into the last node, instead of looking
 * like a hard line that runs off the canvas.
 *
 * The path is drawn between the *node centers* only — never extended
 * past them — so the journey has a clearly defined start and end.
 */
export function JourneyPath({ width, height, points }: JourneyPathProps) {
  if (points.length < 2) return null;

  // Build a smooth Catmull-Rom-style cubic bezier path.
  let d = `M${points[0]!.x.toFixed(2)},${points[0]!.y.toFixed(2)} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)} `;
  }

  // Approximate path length for the draw-in dasharray.
  let approxLen = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1]!.x - points[i]!.x;
    const dy = points[i + 1]!.y - points[i]!.y;
    approxLen += Math.sqrt(dx * dx + dy * dy) * 1.05;
  }
  const dashLen = Math.ceil(approxLen) + 40;

  return (
    <svg
      className="journey-path pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jp-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.0" />
          <stop offset="6%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.55" />
          <stop offset="50%" stopColor="oklch(0.47 0.21 300)" stopOpacity="0.9" />
          <stop offset="94%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.0" />
        </linearGradient>
        <filter id="jp-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="jp-glow-soft" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Wide ambient glow (very soft) */}
      <path
        d={d}
        fill="none"
        stroke="url(#jp-stroke)"
        strokeWidth={20}
        strokeLinecap="round"
        filter="url(#jp-glow-soft)"
        className="jp-glow-soft"
      />

      {/* Mid stroke (with glow) */}
      <path
        d={d}
        fill="none"
        stroke="url(#jp-stroke)"
        strokeWidth={6}
        strokeLinecap="round"
        filter="url(#jp-glow)"
        className="jp-mid"
      />

      {/* Crisp top highlight stroke */}
      <path
        d={d}
        fill="none"
        stroke="oklch(0.86 0.06 300 / 0.85)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={dashLen}
        className="jp-line"
        style={{ ["--jp-len" as string]: String(dashLen) }}
      />
    </svg>
  );
}
