import React, { useMemo } from "react";

/**
 * Reusable animated honeycomb/hexagon background.
 *
 * Renders a dense, organic hex lattice (computed, not a repeating tile),
 * with a subset of edges drawn as doubled "bond" lines for a hand-drawn,
 * molecular feel rather than a uniform grid.
 *
 * Three ambient animation layers create a subtle "living" feel:
 *   1. Slow drift — the lattice group translates over 30s
 *   2. Pulse — opacity breathes to create localized variation
 *   3. Wave — a radial gradient slowly sweeps across
 *
 * Plus a one-time entry animation: on mount, a handful of individual
 * hexagons "rise" with a soft shadow in a staggered, organic sequence
 * (~2.5s total), then the background is completely static again. It
 * replays whenever the component remounts (e.g. navigating back to the
 * page).
 *
 * All animations are CSS-only (no JS loops/timers). Respects
 * `prefers-reduced-motion: reduce`. Always passes pointer events through
 * (`pointer-events: none`).
 */

type HexagonBackgroundProps = {
  /** Base opacity of the hexagon strokes (0–1). Default 0.16. */
  opacity?: number;
  /** Stroke color as an SVG-friendly value. Default #000. */
  lineColor?: string;
  /** Enable ambient animations. Default true. */
  animated?: boolean;
  /** Animation pace. Default "normal". */
  animationSpeed?: "slow" | "normal" | "fast";
  /** Additional CSS classes. */
  className?: string;
  /** Hexagon "radius" in SVG units — smaller = denser lattice. Default 22. */
  hexSize?: number;
  /** Fraction of edges rendered as a doubled "bond" line (0–1). Default 0.32. */
  bondRatio?: number;
  /** Fixed seed so the "hand-drawn" bond placement is stable across renders. */
  seed?: number;
};

type Edge = { x1: number; y1: number; x2: number; y2: number; bond: boolean };

/** A single hexagon selected for the one-time entry "rise" animation. */
type EntryHex = {
  corners: [number, number][];
  delayMs: number;
  durationMs: number;
};

// Same grid dimensions the base lattice is built with — kept as a shared
// constant so the entry-animation overlay lines up with the base lattice.
const GRID_COLS = 34;
const GRID_ROWS = 26;

function speedClass(speed: "slow" | "normal" | "fast"): string {
  if (speed === "slow") return "hex-speed-slow";
  if (speed === "fast") return "hex-speed-fast";
  return "";
}

// Small deterministic PRNG (Park-Miller) so bond placement is stable per seed
// instead of re-randomizing on every render.
function makeRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hexCorners(cx: number, cy: number, size: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i);
    pts.push([cx + size * Math.cos(angle), cy + size * Math.sin(angle)]);
  }
  return pts;
}

/**
 * Builds a seamless flat-top hexagon lattice as a list of edges.
 * Edges shared between neighboring hexagons are deduped so each wall of
 * the honeycomb is only drawn once — then a random subset is flagged as
 * a "bond" edge for the doubled-line treatment.
 */
function buildHexLattice(cols: number, rows: number, size: number, seed: number, bondRatio: number) {
  const rng = makeRng(seed);
  const w = size * 2;
  const h = size * Math.sqrt(3);
  const colSpacing = w * 0.75;
  const rowSpacing = h;

  const round = (n: number) => Math.round(n * 10) / 10;
  const keyFor = (x1: number, y1: number, x2: number, y2: number) => {
    const a: [number, number] = [round(x1), round(y1)];
    const b: [number, number] = [round(x2), round(y2)];
    const [p, q] = a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? [a, b] : [b, a];
    return `${p[0]},${p[1]}|${q[0]},${q[1]}`;
  };

  const edgeMap = new Map<string, Omit<Edge, "bond">>();
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cx = col * colSpacing;
      const cy = row * rowSpacing + (col % 2 === 1 ? rowSpacing / 2 : 0);
      const corners = hexCorners(cx, cy, size);
      for (let i = 0; i < 6; i++) {
        const [x1, y1] = corners[i]!;
        const [x2, y2] = corners[(i + 1) % 6]!;
        const key = keyFor(x1, y1, x2, y2);
        if (!edgeMap.has(key)) edgeMap.set(key, { x1, y1, x2, y2 });
      }
    }
  }

  // Sort for deterministic ordering before assigning bonds, so the same
  // seed always produces the same-looking lattice regardless of Map order.
  const ordered = Array.from(edgeMap.values()).sort((a, b) => a.x1 - b.x1 || a.y1 - b.y1);
  const edges: Edge[] = ordered.map((e) => ({ ...e, bond: rng() < bondRatio }));

  return {
    edges,
    width: cols * colSpacing + w,
    height: rows * rowSpacing + h,
  };
}

/**
 * Picks a small, scattered set of hexagon cells (from the same grid used by
 * buildHexLattice) to animate on mount. Uses its own RNG instance (seeded
 * independently of the bond RNG) so it never perturbs the existing lattice
 * geometry/bond pattern.
 */
function pickEntryHexes(size: number, seed: number, count: number): EntryHex[] {
  const rng = makeRng(seed + 104729); // arbitrary large prime offset, distinct RNG stream
  const w = size * 2;
  const h = size * Math.sqrt(3);
  const colSpacing = w * 0.75;
  const rowSpacing = h;

  // Stay away from the outer margin so selected hexagons are unlikely to be
  // clipped by the container's overflow, and keep them spread across the
  // visible area rather than clustered.
  const colMin = Math.floor(GRID_COLS * 0.15);
  const colMax = Math.ceil(GRID_COLS * 0.85);
  const rowMin = Math.floor(GRID_ROWS * 0.15);
  const rowMax = Math.ceil(GRID_ROWS * 0.85);

  const picks: EntryHex[] = [];
  const seen = new Set<string>();
  let guard = 0;

  while (picks.length < count && guard < count * 40) {
    guard++;
    const col = colMin + Math.floor(rng() * (colMax - colMin));
    const row = rowMin + Math.floor(rng() * (rowMax - rowMin));
    const key = `${col},${row}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const cx = col * colSpacing;
    const cy = row * rowSpacing + (col % 2 === 1 ? rowSpacing / 2 : 0);

    // Staggered, organic timing: spread starts across ~1.5s with jitter,
    // slightly varied per-hex duration so the sequence doesn't feel mechanical.
    const order = picks.length;
    const delayMs = order * 150 + rng() * 120;
    const durationMs = 1100 + rng() * 300;

    picks.push({ corners: hexCorners(cx, cy, size), delayMs, durationMs });
  }

  return picks;
}

function LatticeSvg({
  edges,
  width,
  height,
  lineColor,
  strokeOpacity,
}: {
  edges: Edge[];
  width: number;
  height: number;
  lineColor: string;
  strokeOpacity: number;
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      {edges.map((e, i) => {
        if (!e.bond) {
          return (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={lineColor}
              strokeOpacity={strokeOpacity}
              strokeWidth={1.1}
              strokeLinecap="round"
            />
          );
        }
        // Doubled "bond" edge: draw the main line plus a short offset
        // parallel line, matching the chemistry-bond look in the sketch.
        const dx = e.x2 - e.x1;
        const dy = e.y2 - e.y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = (-dy / len) * 2.6;
        const ny = (dx / len) * 2.6;
        const inset = 0.18; // shorten the second line slightly at both ends
        const ox1 = e.x1 + dx * inset + nx;
        const oy1 = e.y1 + dy * inset + ny;
        const ox2 = e.x2 - dx * inset + nx;
        const oy2 = e.y2 - dy * inset + ny;
        return (
          <g key={i}>
            <line
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={lineColor}
              strokeOpacity={strokeOpacity * 1.4}
              strokeWidth={1.4}
              strokeLinecap="round"
            />
            <line
              x1={ox1}
              y1={oy1}
              x2={ox2}
              y2={oy2}
              stroke={lineColor}
              strokeOpacity={strokeOpacity * 1.4}
              strokeWidth={1.1}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * One-time entry overlay: draws outlines for a handful of individual
 * hexagons directly on top of the base lattice (same coordinates, same
 * stroke) and animates each with the `hex-entry-rise` CSS animation
 * (staggered via `animationDelay`). The animation is `both`-filled and
 * runs a single iteration, so once it finishes each hexagon is visually
 * identical to — and perfectly overlaps — the corresponding lines already
 * drawn by the base lattice, leaving the background static.
 */
function EntryRiseOverlay({
  hexes,
  width,
  height,
  lineColor,
  strokeOpacity,
}: {
  hexes: EntryHex[];
  width: number;
  height: number;
  lineColor: string;
  strokeOpacity: number;
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      {hexes.map((hex, i) => (
        <polygon
          key={i}
          className="hex-entry-rise"
          points={hex.corners.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke={lineColor}
          strokeOpacity={strokeOpacity}
          strokeWidth={1.1}
          strokeLinecap="round"
          style={
            {
              animationDelay: `${hex.delayMs}ms`,
              animationDuration: `${hex.durationMs}ms`,
              transformBox: "fill-box",
              transformOrigin: "center",
              "--hex-entry-opacity": strokeOpacity,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}

export function HexagonBackground({
  opacity = 0.16,
  lineColor = "#000000",
  animated = true,
  animationSpeed = "normal",
  className = "",
  hexSize = 22,
  bondRatio = 0.32,
  seed = 7,
}: HexagonBackgroundProps) {
  const speed = speedClass(animationSpeed);
  // Generous virtual grid so drift/pulse translation never reveals an edge,
  // regardless of the container's aspect ratio.
  const lattice = useMemo(
    () => buildHexLattice(GRID_COLS, GRID_ROWS, hexSize, seed, bondRatio),
    [hexSize, seed, bondRatio]
  );

  // Small scattered set of hexagons for the one-time entry animation.
  // Recomputed only if the geometry inputs change — effectively "once per
  // mount" for a given instance, and naturally re-runs on remount since the
  // component instance (and its memoized state) is fresh.
  const entryHexes = useMemo(() => pickEntryHexes(hexSize, seed, 10), [hexSize, seed]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Layer 1: Base lattice — slow drift via transform translate */}
      <div className={`absolute -inset-[10%] ${animated ? `hex-anim-drift ${speed}` : ""}`}>
        <LatticeSvg {...lattice} lineColor={lineColor} strokeOpacity={opacity} />
      </div>

      {/* Layer 2: Pulse — opacity breathes to create localized variation */}
      {animated && (
        <div className={`absolute -inset-[10%] hex-anim-pulse ${speed}`}>
          <LatticeSvg {...lattice} lineColor={lineColor} strokeOpacity={opacity} />
        </div>
      )}

      {/* Layer 3: Wave — radial gradient sweeps slowly across */}
      {animated && (
        <div
          className={`absolute -inset-[10%] hex-anim-wave ${speed}`}
          style={{
            background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,0,0,0.05), transparent 70%)",
          }}
        />
      )}

      {/* Layer 4: One-time entry animation — a few hexagons "rise" on mount, then settle and stay static */}
      {animated && (
        <div className="absolute -inset-[10%]">
          <EntryRiseOverlay
            hexes={entryHexes}
            width={lattice.width}
            height={lattice.height}
            lineColor={lineColor}
            strokeOpacity={opacity}
          />
        </div>
      )}

      <style>{`
        @keyframes hex-entry-rise {
          0% {
            transform: translateY(0);
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
            opacity: var(--hex-entry-opacity, 0.16);
          }
          45% {
            transform: translateY(-4px);
            filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
            opacity: calc(var(--hex-entry-opacity, 0.16) * 1.8);
          }
          100% {
            transform: translateY(0);
            filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
            opacity: var(--hex-entry-opacity, 0.16);
          }
        }
        .hex-entry-rise {
          animation-name: hex-entry-rise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hex-entry-rise {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}