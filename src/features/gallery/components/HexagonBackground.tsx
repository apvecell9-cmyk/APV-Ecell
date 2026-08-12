import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Reusable animated honeycomb/hexagon background.
 *
 * Renders a dense, organic hex lattice (computed, not a repeating tile),
 * with a subset of edges drawn as doubled "bond" lines for a hand-drawn,
 * molecular feel rather than a uniform grid.
 *
 * Animation layers create a subtle "living" feel:
 *   1. Slow drift — the lattice group translates over 30s
 *   2. Pulse — opacity breathes to create localized variation
 *   3. Wave — a radial gradient slowly sweeps across
 *   4. Entry — a one-time, on-mount staggered "rise" of a handful of
 *      individual hexagons, purely decorative and non-repeating
 *   5. Ambient — reuses the *same* lift → bolden → fall animation as the
 *      entry effect above, played automatically on a small random group of
 *      hexagons approximately every 10 seconds (randomized each time), then
 *      repeated indefinitely at a new random location. Each hexagon starts and ends
 *      at opacity 0 / no transform, so it returns to its exact original,
 *      undisplaced state. Not tied to the cursor in any way — there is no
 *      hover interaction and no pointer/click listener anywhere in this
 *      file, so nothing here can react to clicks elsewhere on the page.
 *
 * All animations are CSS-only (no JS loops for the animation itself; a
 * single JS timer just decides *when* and *where* the ambient burst fires).
 * Respects
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
  /** Enable the one-time page-entry hexagon "rise" animation. Default true. */
  entryAnimation?: boolean;
  /** How many hexagons participate in the entry animation. Default 12. */
  entryHexCount?: number;
  /** Enable the automatic, randomly-timed/located ambient lift effect. Default true. */
  ambientAnimation?: boolean;
  /** How many hexagons participate in each ambient burst. Default 5. */
  ambientHexCount?: number;
  /** Minimum ms between ambient bursts. Default 9000 (~9s). */
  ambientMinDelayMs?: number;
  /** Maximum ms between ambient bursts. Default 11000 (~11s). */
  ambientMaxDelayMs?: number;
};

type Edge = { x1: number; y1: number; x2: number; y2: number; bond: boolean };
type Cell = { cx: number; cy: number; corners: [number, number][] };
type EntryCell = Cell & { delay: number; duration: number };

function speedClass(speed: "slow" | "normal" | "fast"): string {
  if (speed === "slow") return "hex-speed-slow";
  if (speed === "fast") return "hex-speed-fast";
  return "";
}

// Small deterministic PRNG (Park-Miller) so bond placement (and entry-hex
// selection) is stable per seed instead of re-randomizing on every render.
function makeRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Builds a seamless flat-top hexagon lattice as a list of edges (for the
 * static honeycomb) plus a list of cells/centers (used only to place the
 * one-time entry-animation highlights — does not affect the static render).
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

  const hexCorners = (cx: number, cy: number): [number, number][] => {
    const pts: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i);
      pts.push([cx + size * Math.cos(angle), cy + size * Math.sin(angle)]);
    }
    return pts;
  };

  const round = (n: number) => Math.round(n * 10) / 10;
  const keyFor = (x1: number, y1: number, x2: number, y2: number) => {
    const a: [number, number] = [round(x1), round(y1)];
    const b: [number, number] = [round(x2), round(y2)];
    const [p, q] = a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? [a, b] : [b, a];
    return `${p[0]},${p[1]}|${q[0]},${q[1]}`;
  };

  const edgeMap = new Map<string, Omit<Edge, "bond">>();
  const cells: Cell[] = [];

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cx = col * colSpacing;
      const cy = row * rowSpacing + (col % 2 === 1 ? rowSpacing / 2 : 0);
      const corners = hexCorners(cx, cy);
      cells.push({ cx, cy, corners });
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
    cells,
    width: cols * colSpacing + w,
    height: rows * rowSpacing + h,
  };
}

/**
 * Assigns the same staggered delay/duration used by the page-entry
 * animation to an arbitrary list of cells. Shared by the mount-time entry
 * effect and the ambient effect so both play the identical animation.
 */
function assignEntryTiming(cells: Cell[], seed: number): EntryCell[] {
  const rng = makeRng(seed);
  return cells.map((c, idx) => {
    const batch = idx % 4;
    const batchDelay = batch * 0.4;
    const jitter = rng() * 0.35;
    return {
      ...c,
      delay: Math.round((batchDelay + jitter) * 100) / 100,
      duration: 1.0 + Math.round(rng() * 30) / 100, // 1.0 - 1.3s
    };
  });
}

/**
 * Picks `count` random cells from the lattice using a seeded RNG. Shared by
 * the mount-time entry effect and the ambient effect so both draw from the
 * same kind of "small random group somewhere on the page" selection.
 */
function pickRandomCells(cells: Cell[], count: number, seed: number): Cell[] {
  if (cells.length === 0 || count <= 0) return [];
  const rng = makeRng(seed);
  const pool = cells.map((c) => ({ c, r: rng() }));
  pool.sort((a, b) => a.r - b.r);
  return pool.slice(0, Math.min(count, pool.length)).map(({ c }) => c);
}

/**
 * Picks a small, scattered subset of cells for the one-time entry
 * animation and assigns each a staggered delay/duration so the group
 * rises in an organic sequence rather than all at once. Purely additive —
 * does not touch the static lattice's geometry, color, or opacity.
 */
function pickEntryCells(cells: Cell[], count: number, seed: number): EntryCell[] {
  const chosen = pickRandomCells(cells, count, seed);
  return assignEntryTiming(chosen, seed + 1);
}

/**
 * Tighter delay/duration for the ambient background burst — a smaller
 * group that pops in ~1–2s total, rather than the entry effect's longer
 * ~2.5–3s wave across more hexagons. Uses the exact same keyframe
 * (`hex-entry-rise`), just a shorter animation-duration.
 */
function assignAmbientTiming(cells: Cell[], seed: number): EntryCell[] {
  const rng = makeRng(seed);
  return cells.map((c, idx) => ({
    ...c,
    delay: Math.round((idx * 0.06 + rng() * 0.15) * 100) / 100, // 0 - ~0.45s
    duration: 0.9 + Math.round(rng() * 40) / 100, // 0.9 - 1.3s
  }));
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
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
    >
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
 * Overlay of a handful of hexagon outlines used for the one-time lift →
 * bolden → fall animation — reused both at mount (the page-entry effect)
 * and automatically (the ambient effect, a small random cluster every
 * 1-2 minutes). Sits exactly on top of the static lattice (same viewBox/scale) so each highlighted hexagon
 * aligns with the real one beneath it. Starts and ends at opacity 0 / no
 * transform, so once the animation finishes the background is
 * pixel-identical to the plain static lattice — nothing lingers, nothing
 * is displaced.
 */
function EntryHexOverlay({
  entryCells,
  width,
  height,
  lineColor,
}: {
  entryCells: EntryCell[];
  width: number;
  height: number;
  lineColor: string;
}) {
  if (entryCells.length === 0) return null;
  return (
    <svg
      className="absolute inset-0"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
    >
      {entryCells.map((cell, i) => (
        <polygon
          key={`${i}-${cell.delay}-${cell.duration}`}
          className="hex-entry-cell"
          points={cell.corners.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke={lineColor}
          strokeWidth={1.3}
          strokeLinecap="round"
          style={{
            transformOrigin: `${cell.cx}px ${cell.cy}px`,
            animationDelay: `${cell.delay}s`,
            animationDuration: `${cell.duration}s`,
          }}
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
  entryAnimation = true,
  entryHexCount = 12,
  ambientAnimation = true,
  ambientHexCount = 5,
  ambientMinDelayMs = 9000,
  ambientMaxDelayMs = 11000,
}: HexagonBackgroundProps) {
  const speed = speedClass(animationSpeed);

  // Generous virtual grid so drift/pulse translation never reveals an edge,
  // regardless of the container's aspect ratio.
  const lattice = useMemo(
    () => buildHexLattice(34, 26, hexSize, seed, bondRatio),
    [hexSize, seed, bondRatio]
  );

  // Ambient burst: reuses the exact same lift → bolden → fall animation as
  // the page-entry effect, played automatically on a small random group of
  // hexagons, then scheduled again after a random ~10 second wait.
  // `ambientBurst` holds only the currently-playing group (cleared once its
  // animation finishes) — never a persistent per-pixel state — so the base
  // lattice/entry animation above stay completely unaffected. There is no
  // pointer or click listener anywhere in this effect (or file), so nothing
  // here can be triggered by clicking elsewhere on the page.
  const [ambientBurst, setAmbientBurst] = useState<EntryCell[]>([]);
  const ambientSeedRef = useRef(1000);

  useEffect(() => {
    if (!ambientAnimation) return;
    let cancelled = false;
    let scheduleId: ReturnType<typeof setTimeout> | null = null;
    let clearId: ReturnType<typeof setTimeout> | null = null;

    const scheduleNext = () => {
      const delay =
        ambientMinDelayMs + Math.random() * Math.max(0, ambientMaxDelayMs - ambientMinDelayMs);
      scheduleId = setTimeout(() => {
        if (cancelled) return;

        ambientSeedRef.current += 1;
        const group = pickRandomCells(lattice.cells, ambientHexCount, ambientSeedRef.current);
        const timed = assignAmbientTiming(group, ambientSeedRef.current);
        setAmbientBurst(timed);

        const totalMs =
          timed.length > 0 ? Math.max(...timed.map((c) => (c.delay + c.duration) * 1000)) + 50 : 0;
        clearId = setTimeout(() => {
          if (!cancelled) setAmbientBurst([]);
        }, totalMs);

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (scheduleId != null) clearTimeout(scheduleId);
      if (clearId != null) clearTimeout(clearId);
    };
  }, [ambientAnimation, lattice, ambientHexCount, ambientMinDelayMs, ambientMaxDelayMs]);

  // Selected cells for the one-time entry animation. Recomputed only if the
  // lattice or seed changes — stable for the lifetime of a given mount.
  const entryCells = useMemo(
    () => (entryAnimation ? pickEntryCells(lattice.cells, entryHexCount, seed + 101) : []),
    [lattice.cells, entryAnimation, entryHexCount, seed]
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Layer 1: Base lattice — slow drift via transform translate.
          The entry-animation overlay lives inside this same layer so it
          drifts together with the base lattice and stays perfectly aligned. */}
      <div
        className={`absolute -inset-[10%] ${animated ? `hex-anim-drift ${speed}` : ""}`}
      >
        <LatticeSvg {...lattice} lineColor={lineColor} strokeOpacity={opacity} />
        <EntryHexOverlay entryCells={entryCells} width={lattice.width} height={lattice.height} lineColor={lineColor} />
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
            background:
              "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,0,0,0.05), transparent 70%)",
          }}
        />
      )}

      {/* Layer 5: ambient boost — reuses EntryHexOverlay (the exact same
          lift → bolden → fall animation as page-entry) automatically, on a
          small random group, approximately every 10 seconds. `ambientBurst`
          is empty whenever nothing is playing, so this renders nothing most
          of the time. No pointer/click involvement whatsoever. */}
      {ambientAnimation && (
        <EntryHexOverlay entryCells={ambientBurst} width={lattice.width} height={lattice.height} lineColor={lineColor} />
      )}

      {/* Layer 4: one-time entry-animation keyframes. Scoped to this
          component via the .hex-entry-cell class name; safe to move into a
          global stylesheet alongside the hex-anim-* rules if preferred. */}
      <style>{`
        .hex-entry-cell {
          opacity: 0;
          transform: translateY(0);
          animation-name: hex-entry-rise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }
        @keyframes hex-entry-rise {
          0% {
            opacity: 0;
            transform: translateY(0);
            filter: drop-shadow(0 0px 0px rgba(0, 0, 0, 0));
          }
          45% {
            opacity: 0.9;
            transform: translateY(-4px);
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.16));
          }
          100% {
            opacity: 0;
            transform: translateY(0);
            filter: drop-shadow(0 0px 0px rgba(0, 0, 0, 0));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hex-entry-cell {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}