import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Check } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * MissionVisionSection — Scroll-driven storytelling
 *
 * Two large horizontal sections with animated PNG visuals:
 *  • Vision: compass body + rotating needle PNGs
 *  • Mission: target PNG + arrow PNG following curved trajectory
 *
 * Uses useScroll + useTransform for scroll-progress-driven animation.
 * Animation completes at ~80–85% scroll; remainder shows final state.
 * No scroll jacking — natural scrolling preserved.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Vision Compass (PNG) ──────────────────────────────────────────── */
function CompassVisual({ progress }: { progress: ReturnType<typeof useScroll>["progress"] }) {
  // Compass body entrance from left + scale
  const compassOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const compassX = useTransform(progress, [0, 0.18], [-80, 0]);
  const compassScale = useTransform(progress, [0, 0.18], [0.85, 1]);

  // Needle rotation — smooth unidirectional rotation, smaller increments
  // Rotates clockwise only, proportional to scroll, no reversal
  const needleRotation = useTransform(progress, [0.12, 0.8], [0, 120]);

  // Subtle glow ring behind compass
  const glowOpacity = useTransform(progress, [0.15, 0.3, 0.7], [0, 0.5, 0.3]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Glow ring */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-110 pointer-events-none"
      />

      {/* Compass body PNG — enters from left */}
      <motion.div
        style={{ opacity: compassOpacity, x: compassX, scale: compassScale }}
        className="relative w-full h-full"
      >
        <img
          src="/assets/compass_without_needle.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>

      {/* Needle PNG — overlaid, rotates independently (slightly reduced size) */}
      <motion.div
        style={{
          opacity: compassOpacity,
          rotate: needleRotation,
          transformOrigin: "50% 50%",
        }}
        className="absolute inset-[8%] w-[84%] h-[84%] pointer-events-none"
      >
        <img
          src="/assets/compass_needle.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* ── Mission Target + Arrow (PNG) ──────────────────────────────────── */
function TargetVisual({ progress }: { progress: ReturnType<typeof useScroll>["progress"] }) {
  // Target entrance from right
  const targetOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const targetX = useTransform(progress, [0, 0.18], [60, 0]);
  const targetScale = useTransform(progress, [0, 0.18], [0.88, 1]);

  // Arrow trajectory — approaches from lower-left toward bullseye center
  // Fades out after a brief pause at center, then stays invisible
  const arrowOpacity = useTransform(progress, [0.12, 0.2, 0.62, 0.65, 0.78], [0, 1, 1, 1, 0]);

  // Arrow position: starts off-screen lower-left, ends at exact container center (50%, 50%)
  // Locks in place at 0.62 and stays frozen
  const arrowLeft = useTransform(progress, [0.12, 0.28, 0.48, 0.62], ["-12%", "8%", "28%", "50%"]);
  const arrowTop = useTransform(progress, [0.12, 0.28, 0.48, 0.62], ["88%", "62%", "38%", "50%"]);

  // Arrow rotation follows the trajectory tangent
  // Starts pointing upper-right, locks at target on impact
  const arrowRotate = useTransform(progress, [0.12, 0.28, 0.48, 0.62], [-50, -35, -18, 0]);

  // Impact ripple after arrow lands
  const rippleScale = useTransform(progress, [0.62, 0.76], [0, 2.2]);
  const rippleOpacity = useTransform(progress, [0.62, 0.76], [0.45, 0]);

  // Target pulse after impact
  const targetPulseScale = useTransform(progress, [0.63, 0.68, 0.76], [1, 1.04, 1]);

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
      {/* Impact ripple — centered on target */}
      <motion.div
        style={{ scale: rippleScale, opacity: rippleOpacity }}
        className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full border-2 border-accent pointer-events-none"
      />

      {/* Target PNG — enters from right */}
      <motion.div
        style={{
          opacity: targetOpacity,
          x: targetX,
          scale: targetScale,
        }}
        className="relative w-full h-full"
      >
        <motion.img
          src="/assets/bullseye.png"
          alt=""
          style={{ scale: targetPulseScale }}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>

      {/* Arrow PNG — follows curved path toward bullseye center */}
      <motion.div
        style={{
          opacity: arrowOpacity,
          left: arrowLeft,
          top: arrowTop,
          rotate: arrowRotate,
        }}
        className="absolute w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src="/assets/arrow.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* ── Section Content Data ──────────────────────────────────────────── */
const visionBullets = [
  "Champion entrepreneurship as a life skill.",
  "Build a community where creativity and resilience thrive.",
  "Create lasting social and economic impact.",
];

const missionBullets = [
  "Give students hands-on entrepreneurial experience.",
  "Develop ethical, strategic future leaders.",
  "Create an ecosystem where experimentation and learning are encouraged.",
];

/* ── Reduced Motion: Static versions (PNGs) ────────────────────────── */
function StaticCompass() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      <div className="relative w-full h-full">
        <img
          src="/assets/compass_without_needle.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="absolute inset-[8%] w-[84%] h-[84%] pointer-events-none">
        <img
          src="/assets/compass_needle.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

function StaticTarget() {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
      <div className="relative w-full h-full">
        <img
          src="/assets/bullseye.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      {/* Arrow at final resting position — bullseye center */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 pointer-events-none">
        <img
          src="/assets/arrow.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Bullet List ───────────────────────────────────────────────────── */
function BulletList({ bullets, accentColor }: { bullets: string[]; accentColor: string }) {
  return (
    <ul className="space-y-3">
      {bullets.map((bullet, j) => (
        <li key={j} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
          <Check className={`w-4 h-4 ${accentColor} shrink-0 mt-0.5`} strokeWidth={2.5} />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Main Section ──────────────────────────────────────────────────── */
export function MissionVisionSection() {
  const reducedMotion = useReducedMotion();

  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: visionProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });

  /*
   * TIMING MAP (target: complete at ~80–85%):
   *
   * 0%      — Initial state
   * 0–12%   — Visual begins entering (compass from left / target from right)
   * 12–20%  — Visual settles into position
   * 15–25%  — Text begins fading in
   * 20–55%  — Needle rotation / arrow trajectory
   * 55–72%  — Final action completes (needle locks / arrow hits)
   * 72–82%  — Text fully revealed
   * 82–100% — Everything remains in final completed state
   */

  // Text reveal — completes by ~82%
  const visionTextOpacity = useTransform(visionProgress, [0.15, 0.35], [0, 1]);
  const visionTextY = useTransform(visionProgress, [0.15, 0.35], [30, 0]);
  const missionTextOpacity = useTransform(missionProgress, [0.15, 0.35], [0, 1]);
  const missionTextY = useTransform(missionProgress, [0.15, 0.35], [30, 0]);

  // Heading — appears early
  const headingOpacity = useTransform(visionProgress, [0, 0.08], [0, 1]);
  const headingY = useTransform(visionProgress, [0, 0.08], [20, 0]);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-surface border-t border-border relative overflow-hidden">
      {/* Subtle grid pattern background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Heading ──────────────────────────────────────── */}
        <motion.div
          style={reducedMotion ? undefined : { opacity: headingOpacity, y: headingY }}
          initial={reducedMotion ? { opacity: 1 } : undefined}
          className="mb-16 lg:mb-24"
        >
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
            Vision & Mission
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-accent/60 rounded-full" />
        </motion.div>

        {/* ── Vision Section: Compass (left) + Text (right) ──────── */}
        <div
          ref={visionRef}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-24 lg:mb-32"
        >
          {/* Visual — Compass PNG */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            {reducedMotion ? (
              <StaticCompass />
            ) : (
              <CompassVisual progress={visionProgress} />
            )}
          </div>

          {/* Text Content */}
          <motion.div
            style={reducedMotion ? undefined : { opacity: visionTextOpacity, y: visionTextY }}
            initial={reducedMotion ? { opacity: 1 } : undefined}
            className="flex-1 order-2 lg:order-2"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
              Our Vision
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight leading-tight mb-6">
              A transformative mindset for every student.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              We envision a future where entrepreneurship is not just a career path, but a mindset woven into every student&apos;s journey — empowering them to innovate, lead, and create lasting impact.
            </p>
            <BulletList bullets={visionBullets} accentColor="text-primary" />
            <div className="mt-8 flex gap-2">
              {["ENTREPRENEURSHIP", "CREATIVITY", "IMPACT"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider px-2 py-1 rounded bg-secondary/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Mission Section: Text (left) + Target (right) ──────── */}
        <div
          ref={missionRef}
          className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16"
        >
          {/* Visual — Target PNG */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            {reducedMotion ? (
              <StaticTarget />
            ) : (
              <TargetVisual progress={missionProgress} />
            )}
          </div>

          {/* Text Content */}
          <motion.div
            style={reducedMotion ? undefined : { opacity: missionTextOpacity, y: missionTextY }}
            initial={reducedMotion ? { opacity: 1 } : undefined}
            className="flex-1 order-2 lg:order-2"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-accent mb-3">
              Our Mission
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight leading-tight mb-6">
              Turn ideas into real-world innovation.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              We exist to bridge the gap between ideation and execution — giving students the tools, mentorship, and environment to transform bold ideas into ventures that matter.
            </p>
            <BulletList bullets={missionBullets} accentColor="text-accent" />
            <div className="mt-8 flex gap-2">
              {["ACTION", "EXPERIENCE", "INNOVATION"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider px-2 py-1 rounded bg-secondary/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
