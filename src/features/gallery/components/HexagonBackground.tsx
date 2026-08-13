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
 * Both the entry and ambient effects pick their hexagons using stratified
 * spatial sampling (see `pickSpreadCells`) rather than plain random
 * sampling, and stagger them with evenly-paced delays along a spatial
 * sweep (see `assignTiming`) rather than index-based batches. This keeps
 * every burst spread across the whole background instead of clumping into
 * one corner, and keeps the pacing between hexagons even instead of firing
 * in simultaneous clusters with big gaps between them.
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
  /** Stroke color for normal hexagon edges. Default #A855D4. */
  lineColor?: string;
  /** Stroke color for highlighted/popped hexagons. Default #2F0553. */
  highlightColor?: string;
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
 * Picks `count` cells spread evenly across the lattice by dividing its
 * bounding box into a grid of spatial buckets and drawing at most one cell
 * per bucket (in a shuffled bucket order). This guarantees a burst covers
 * the whole background instead of clumping into one area — which is what
 * plain random sampling can do purely by chance with a small sample size,
 * and what a *fixed* seed will then repeat in the same spot every time.
 */
function pickSpreadCells(cells: Cell[], count: number, seed: number): Cell[] {
  if (cells.length === 0 || count <= 0) return [];
  const rng = makeRng(seed);

  const xs = cells.map((c) => c.cx);
  const ys = cells.map((c) => c.cy);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);

  // Roughly-square grid of buckets sized so there are at least `count` of
  // them, matched to the lattice's aspect ratio so buckets cover the full
  // width and height evenly (not just a square in the middle).
  const gridCols = Math.max(1, Math.round(Math.sqrt((count * width) / height)));
  const gridRows = Math.max(1, Math.ceil(count / gridCols));
  const bucketW = width / gridCols;
  const bucketH = height / gridRows;

  const buckets: Cell[][] = Array.from({ length: gridCols * gridRows }, () => []);
  for (const c of cells) {
    const bx = Math.min(gridCols - 1, Math.floor((c.cx - minX) / bucketW));
    const by = Math.min(gridRows - 1, Math.floor((c.cy - minY) / bucketH));
    buckets[by * gridCols + bx]!.push(c);
  }

  // Shuffle bucket visiting order (Fisher-Yates) so *which* bucket goes
  // first isn't fixed, while still guaranteeing full spatial coverage.
  const order = buckets.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = order[i]!;
    order[i] = order[j]!;
    order[j] = tmp;
  }

  const chosen: Cell[] = [];
  const used = new Set<Cell>();
  for (const bi of order) {
    if (chosen.length >= count) break;
    const bucket = buckets[bi]!;
    if (bucket.length === 0) continue;
    const pick = bucket[Math.floor(rng() * bucket.length)]!;
    chosen.push(pick);
    used.add(pick);
  }

  // Sparse buckets near the lattice edges can come up empty — top up from
  // whatever's left so we still return `count` cells.
  if (chosen.length < count) {
    const remaining = cells.filter((c) => !used.has(c));
    while (chosen.length < count && remaining.length > 0) {
      const idx = Math.floor(rng() * remaining.length);
      chosen.push(remaining.splice(idx, 1)[0]!);
    }
  }

  return chosen;
}

/**
 * Assigns staggered delay/duration to a list of cells so they animate as an
 * evenly-paced sequence rather than firing in simultaneous clusters with
 * big gaps between them. Cells are first ordered along a diagonal sweep
 * (so hexagons that are near each other in time are also near each other
 * in space, reading like a wave crossing the background) and then given
 * delays spread evenly across `spreadSeconds`, with only a light jitter
 * confined to each hexagon's own slot so it can't collide with its
 * neighbors' timing.
 */
function assignTiming(
  cells: Cell[],
  seed: number,
  spreadSeconds: number,
  minDuration: number,
  durationRange: number
): EntryCell[] {
  const rng = makeRng(seed);
  const swept = [...cells].sort((a, b) => a.cx + a.cy * 0.6 - (b.cx + b.cy * 0.6));
  const count = swept.length;
  const step = count > 1 ? spreadSeconds / count : 0;
  return swept.map((c, idx) => {
    const jitter = (rng() - 0.5) * step * 0.6; // stays within this hex's own slot
    return {
      ...c,
      delay: Math.max(0, Math.round((idx * step + jitter) * 100) / 100),
      duration: Math.round((minDuration + rng() * durationRange) * 100) / 100,
    };
  });
}

/** Entry effect: a gentle ~1.8s evenly-paced wave across the chosen hexagons. */
function assignEntryTiming(cells: Cell[], seed: number): EntryCell[] {
  return assignTiming(cells, seed, 1.8, 1.0, 0.3); // 1.0 - 1.3s per hex
}

/** Ambient burst: a tighter ~0.7s evenly-paced pop across a smaller group. */
function assignAmbientTiming(cells: Cell[], seed: number): EntryCell[] {
  return assignTiming(cells, seed, 0.7, 0.9, 0.4); // 0.9 - 1.3s per hex
}

/**
 * Picks a small, evenly-spread subset of cells for the one-time entry
 * animation and assigns each a staggered delay/duration so the group rises
 * in an organic sequence rather than all at once. Purely additive — does
 * not touch the static lattice's geometry, color, or opacity.
 */
function pickEntryCells(cells: Cell[], count: number, seed: number): EntryCell[] {
  const chosen = pickSpreadCells(cells, count, seed);
  return assignEntryTiming(chosen, seed + 1);
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
 * ~10 seconds). Sits exactly on top of the static lattice (same viewBox/scale) so each highlighted hexagon
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
  lineColor = "#A855D4",
  highlightColor = "#4F0C8A",
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
  // the page-entry effect, played automatically on a small group of
  // hexagons spread evenly across the lattice, then scheduled again after
  // a random ~10 second wait. `ambientBurst` holds only the
  // currently-playing group (cleared once its animation finishes) — never
  // a persistent per-pixel state — so the base lattice/entry animation
  // above stay completely unaffected. There is no pointer or click
  // listener anywhere in this effect (or file), so nothing here can be
  // triggered by clicking elsewhere on the page.
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
        const group = pickSpreadCells(lattice.cells, ambientHexCount, ambientSeedRef.current);
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
        <EntryHexOverlay entryCells={entryCells} width={lattice.width} height={lattice.height} lineColor={highlightColor} />
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
          small group spread across the lattice, approximately every 10
          seconds. `ambientBurst` is empty whenever nothing is playing, so
          this renders nothing most of the time. No pointer/click
          involvement whatsoever. */}
      {ambientAnimation && (
        <EntryHexOverlay entryCells={ambientBurst} width={lattice.width} height={lattice.height} lineColor={highlightColor} />
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