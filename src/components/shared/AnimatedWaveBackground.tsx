import React from "react";

/**
 * AnimatedWaveBackground
 * ----------------------------------------------------------------------------
 * Flat-design layered "ocean" background, matching the reference image:
 * solid, opaque, gently rolling hill/wave bands stacked from a dark blue
 * top down to a pale near-white bottom. Each band scrolls horizontally on
 * an infinite seamless loop, and — this is the "lively ocean" part — bands
 * alternate direction and speed, so it reads as layers of swell drifting
 * past each other rather than one flat sheet sliding sideways.
 *
 * HOW THE SEAMLESS LOOP WORKS:
 * Every band's top edge is a sum of sine waves whose frequencies are exact
 * integer multiples of the loop period P. Sine is perfectly periodic, so
 * sampling one period and placing a second identical copy exactly P units
 * over guarantees a pixel-identical, slope-identical seam — no visible
 * jump when the loop repeats.
 *
 * Each band is a simple SOLID fill from its wavy top edge down to the
 * bottom of the canvas (like the reference art), not a thin ribbon — so
 * there's no risk of self-intersecting edges. Later bands (lighter, drawn
 * on top) simply cover the lower portion of earlier ones, which is what
 * creates the layered-hill look.
 *
 * Respects prefers-reduced-motion via an embedded <style> media query.
 * No external CSS/utilities beyond Tailwind's built-in classes.
 */

const P = 1200; // loop period — every harmonic below is an integer
// multiple of (2π/P), which is what makes the horizontal tiling seamless
const VB_W = 1200;
const VB_H = 620;
const MARGIN = 120; // sample past the tile edge so nothing clips on screen
const STEPS = 60; // sample density per wave edge

/* ── Catmull-Rom → cubic bezier, so sampled points become one smooth curve */
function smoothCurve(points: [number, number][]): string {
  const n = points.length;
  let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)} `;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} `;
  }
  return d;
}

type Harmonic = { mult: number; amp: number; phase: number };
type WaveFn = (x: number) => number;

/* A wave-top function built from sine harmonics locked to integer
 * multiples of the base frequency, so it repeats every P. */
function makeWave(baseY: number, harmonics: Harmonic[]): WaveFn {
  return (x: number) => {
    let y = baseY;
    for (const h of harmonics) {
      y += h.amp * Math.sin((2 * Math.PI * h.mult * x) / P + h.phase);
    }
    return y;
  };
}

/* Build a solid band: wavy top edge, filled straight down to the bottom
 * of the canvas (this is what stacks into the layered-hill look). */
function buildBand(waveFn: WaveFn): string {
  const xMin = -MARGIN;
  const xMax = P + MARGIN;
  const pts: [number, number][] = [];
  for (let i = 0; i <= STEPS; i++) {
    const x = xMin + ((xMax - xMin) * i) / STEPS;
    pts.push([x, waveFn(x)]);
  }
  return smoothCurve(pts) + ` L${xMax.toFixed(2)},${VB_H} L${xMin.toFixed(2)},${VB_H} Z`;
}

/* ── Band recipes ────────────────────────────────────────────────────────
 * Ordered back (darkest, near the top) → front (lightest, near the
 * bottom), matching the reference palette. Direction alternates per band
 * and speeds vary so each layer visibly drifts past its neighbors.
 * ──────────────────────────────────────────────────────────────────────── */
const BANDS = [
  {
    key: "b1",
    wave: makeWave(95, [
      { mult: 1, amp: 42, phase: 0.4 },
      { mult: 2, amp: 16, phase: 1.6 },
    ]),
    color: "#4a76bd",
    dir: "left",
    dur: 62,
  },
  {
    key: "b2",
    wave: makeWave(205, [
      { mult: 1, amp: 52, phase: 2.1 },
      { mult: 2, amp: 20, phase: 0.3 },
    ]),
    color: "#5a8bce",
    dir: "right",
    dur: 50,
  },
  {
    key: "b3",
    wave: makeWave(305, [
      { mult: 1, amp: 48, phase: 0.9 },
      { mult: 2, amp: 22, phase: 2.4 },
    ]),
    color: "#6fa3db",
    dir: "left",
    dur: 42,
  },
  {
    key: "b4",
    wave: makeWave(400, [
      { mult: 1, amp: 44, phase: 3.0 },
      { mult: 2, amp: 17, phase: 1.0 },
    ]),
    color: "#8fc0e9",
    dir: "right",
    dur: 55,
  },
  {
    key: "b5",
    wave: makeWave(485, [
      { mult: 1, amp: 40, phase: 1.4 },
      { mult: 2, amp: 14, phase: 2.9 },
    ]),
    color: "#b9ddf3",
    dir: "left",
    dur: 36,
  },
  {
    key: "b6",
    wave: makeWave(560, [
      { mult: 1, amp: 34, phase: 2.6 },
      { mult: 2, amp: 11, phase: 0.7 },
    ]),
    color: "#ddf1fb",
    dir: "right",
    dur: 68,
  },
];

const PATHS = Object.fromEntries(BANDS.map((b) => [b.key, buildBand(b.wave)]));

export function AnimatedWaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Darkest tone as the base fill, visible above the first band's peaks */}
      <div className="absolute inset-0" style={{ background: "#3f68ab" }} />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {BANDS.map((b) => {
          const rightward = b.dir === "right";
          // Leftward bands: copies at 0 and +P, animate translateX 0 → -P.
          // Rightward bands: copies at 0 and -P, animate translateX 0 → +P.
          // (Copy placement has to be on the side the animation is
          // heading TOWARD, or the far edge of the viewport goes empty
          // partway through the loop.)
          const secondCopyX = rightward ? -P : P;
          return (
            <g className={`wb-${b.key}`} key={b.key}>
              <path d={PATHS[b.key]} fill={b.color} />
              <path d={PATHS[b.key]} fill={b.color} transform={`translate(${secondCopyX},0)`} />
            </g>
          );
        })}
      </svg>

      <style>{`
        ${BANDS.map((b) => {
          const rightward = b.dir === "right";
          const end = rightward ? P : -P;
          return `
        @keyframes wb-anim-${b.key} {
          from { transform: translateX(0px) }
          to   { transform: translateX(${end}px) }
        }
        .wb-${b.key} { animation: wb-anim-${b.key} ${b.dur}s linear infinite; }
          `;
        }).join("\n")}

        @media (prefers-reduced-motion: reduce) {
          ${BANDS.map((b) => `.wb-${b.key}`).join(", ")} { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Live preview wrapper (not part of the component you're copying) ──── */
export default function Preview() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatedWaveBackground />
    </div>
  );
}