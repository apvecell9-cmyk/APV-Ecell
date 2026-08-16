import React, { useMemo } from "react";

interface JourneyPathProps {
  width: number;
  height: number;
  points: Array<{ x: number; y: number }>;
  /** Optional starting point the path begins from (before first event node). */
  startPoint?: { x: number; y: number };
  /** Duration of the draw-in animation in seconds. */
  drawDuration?: number;
  /** Optional unique ID prefix for gradient/filter defs (avoids collisions when multiple paths exist). */
  idPrefix?: string;
  /** If true, gradient flows top→bottom instead of left→right. */
  vertical?: boolean;
}

/**
 * Smooth SVG path drawn through anchor points.
 *
 * Rendered as three layers for a refined 2.5D feel:
 *   1. Wide soft glow — atmospheric depth
 *   2. Mid stroke — visible "spine"
 *   3. Crisp highlight — thin bright stroke on top
 *
 * The path draws in from left → right using stroke-dashoffset animation.
 * Endpoints fade to transparent so the line emerges from the first node
 * and dissolves into the last.
 */
export function JourneyPath({
  width,
  height,
  points,
  startPoint,
  drawDuration = 2,
  idPrefix = "jp",
  vertical = false,
}: JourneyPathProps) {
  const { d, dashLen } = useMemo(() => {
    // Build the full point list: optional start point + event nodes
    const allPoints = startPoint ? [startPoint, ...points] : points;
    if (allPoints.length < 2) return { d: "", dashLen: 0 };

    // Catmull-Rom to cubic bezier
    let path = `M${allPoints[0]!.x.toFixed(2)},${allPoints[0]!.y.toFixed(2)} `;
    for (let i = 0; i < allPoints.length - 1; i++) {
      const p0 = allPoints[i - 1] ?? allPoints[i]!;
      const p1 = allPoints[i]!;
      const p2 = allPoints[i + 1]!;
      const p3 = allPoints[i + 2] ?? p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      path += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)} `;
    }

    // Approximate path length
    let len = 0;
    for (let i = 0; i < allPoints.length - 1; i++) {
      const dx = allPoints[i + 1]!.x - allPoints[i]!.x;
      const dy = allPoints[i + 1]!.y - allPoints[i]!.y;
      len += Math.sqrt(dx * dx + dy * dy) * 1.05;
    }

    return { d: path, dashLen: Math.ceil(len) + 40 };
  }, [points, startPoint]);

  if (points.length < 1 || !d) return null;

  return (
    <svg
      className="journey-path pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient: fades at endpoints, strong in middle */}
        <linearGradient id={`${idPrefix}-grad`} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          <stop offset="0%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0" />
          <stop offset="5%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="oklch(0.47 0.21 300)" stopOpacity="0.95" />
          <stop offset="95%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.58 0.19 292)" stopOpacity="0" />
        </linearGradient>
        {/* Soft glow filter */}
        <filter id={`${idPrefix}-glow`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`${idPrefix}-glow-wide`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Layer 1: Wide ambient glow */}
      <path
        d={d}
        fill="none"
        stroke={`url(#${idPrefix}-grad)`}
        strokeWidth={28}
        strokeLinecap="round"
        filter={`url(#${idPrefix}-glow-wide)`}
        className="jp-glow-soft"
      />

      {/* Layer 2: Mid stroke (visible spine) */}
      <path
        d={d}
        fill="none"
        stroke={`url(#${idPrefix}-grad)`}
        strokeWidth={8}
        strokeLinecap="round"
        filter={`url(#${idPrefix}-glow)`}
        className="jp-mid"
      />

      {/* Layer 3: Crisp highlight stroke — animated draw-in */}
      <path
        d={d}
        fill="none"
        stroke="oklch(0.88 0.08 300 / 0.85)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={dashLen}
        className="jp-line"
        style={{
          ["--jp-len" as string]: String(dashLen),
          ["--jp-dur" as string]: `${drawDuration}s`,
        }}
      />
    </svg>
  );
}
