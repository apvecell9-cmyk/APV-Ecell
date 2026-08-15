import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * MissionVisionSection — Time-based animated storytelling
 *
 * Two horizontal sections with animated PNG visuals:
 *  • Vision: compass body + rotating needle
 *  • Mission: target + arrow trajectory
 *
 * Animation is viewport-triggered (IntersectionObserver) and plays
 * autonomously once started — NOT scroll-bound.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Vision Compass (PNG) — time-based animation ─────────────────── */
function CompassVisual({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Glow ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="absolute inset-0 rounded-full blur-2xl scale-110 pointer-events-none"
        style={{ background: "rgba(135, 51, 192, 0.12)" }}
      />

      {/* Compass body PNG — enters from left */}
      <motion.div
        initial={{ opacity: 0, x: -80, scale: 0.85 }}
        animate={
          inView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: -80, scale: 0.85 }
        }
        transition={{ duration: 0.8, ease }}
        className="relative w-full h-full"
      >
        <img
          src="/assets/compass_without_needle.png"
          alt=""
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>

      {/* Needle PNG — overlaid, rotates independently */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={
          inView
            ? { opacity: 1, rotate: 120 }
            : { opacity: 0, rotate: 0 }
        }
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ transformOrigin: "50% 50%" }}
        className="absolute inset-[8%] w-[84%] h-[84%] pointer-events-none"
      >
        <img
          src="/assets/compass_needle.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: "brightness(0) sepia(1) saturate(12) hue-rotate(-50deg)" }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

/* ── Mission Target + Arrow (PNG) — time-based animation ─────────── */
function TargetVisual({ inView }: { inView: boolean }) {
  const [showImpact, setShowImpact] = useState(false);

  // Trigger impact pulse when arrow reaches target
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowImpact(true), 1600);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
      {/* Impact ripple */}
      <AnimatePresence>
        {showImpact && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full border-2 pointer-events-none"
            style={{ borderColor: "oklch(0.47 0.21 300)" }}
          />
        )}
      </AnimatePresence>

      {/* Target PNG — enters from right */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.88 }}
        animate={
          inView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 60, scale: 0.88 }
        }
        transition={{ duration: 0.8, ease }}
        className="relative w-full h-full"
      >
        {/* Target pulse on impact */}
        <motion.img
          src="/assets/bullseye.png"
          alt=""
          initial={{ scale: 1 }}
          animate={
            showImpact
              ? { scale: [1, 1.05, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full object-contain"
          style={{
            /* Shift bullseye right so its center aligns with the arrow tip */
            transform: "translateX(18%)",
          }}
          draggable={false}
        />
      </motion.div>

      {/* Arrow PNG — travels from lower-left to exact bullseye center */}
      <motion.div
        initial={{ opacity: 0, left: "-8%", top: "85%", rotate: -50 }}
        animate={
          inView
            ? {
                opacity: [0, 1, 1, 1, 0.9],
                left: ["-8%", "12%", "32%", "50%"],
                top: ["85%", "60%", "35%", "50%"],
                rotate: [-50, -35, -15, 0],
              }
            : {
                opacity: 0,
                left: "-8%",
                top: "85%",
                rotate: -50,
              }
        }
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: [0.22, 0.61, 0.36, 1],
          times: [0, 0.2, 0.6, 1],
        }}
        className="absolute w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 5 }}
      >
        <img
          src="/assets/arrow.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: "invert(1) brightness(2.2) contrast(0.8)" }}
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

/* ── Reduced Motion: Static versions ──────────────────────────────── */
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
          style={{ filter: "brightness(0) sepia(1) saturate(12) hue-rotate(-50deg)" }}
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
          style={{
            transform: "translateX(18%)",
          }}
          draggable={false}
        />
      </div>
      {/* Arrow at final resting position — bullseye center */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 pointer-events-none">
        <img
          src="/assets/arrow.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: "invert(1) brightness(2.2) contrast(0.8)" }}
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Bullet List ───────────────────────────────────────────────────── */
function BulletList({ bullets, accentColor }: { bullets: string[]; accentColor: string }) {
  return (
    <ul className="space-y-2">
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
  const headingRef = useRef<HTMLDivElement>(null);

  // Viewport triggers — fire once when section enters
  const visionInView = useInView(visionRef, { once: true, amount: 0.25 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.25 });
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section
      className="relative overflow-hidden px-6 pt-8 pb-20 lg:px-12 lg:pt-12 lg:pb-28"
      style={{ backgroundColor: "var(--homepage-lavender)" }}
    >
      {/* Subtle grid pattern background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Section Heading ──────────────────────────────────────── */}
        <div ref={headingRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease }}
            className="font-serif text-3xl tracking-tight text-foreground md:text-4xl"
          >
            Vision &amp; Mission
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={reducedMotion ? { opacity: 1, scaleX: 1 } : headingInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="mt-3 h-0.5 w-12 origin-left rounded-full bg-[#8733C0]"
          />
        </div>

        {/* ── Vision Section: Compass (left) + Text (right) ──────── */}
        <div
          ref={visionRef}
          className="mt-14 flex flex-col items-center gap-10 lg:mt-20 lg:flex-row lg:gap-16 lg:mb-28"
        >
          {/* Visual — Compass PNG */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            {reducedMotion ? (
              <StaticCompass />
            ) : (
              <CompassVisual inView={visionInView} />
            )}
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : visionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex-1 order-2 lg:order-2"
          >
            <span className="inline-block text-xs text-[#8733C0] font-bold font-mono uppercase tracking-widest mb-1.5">
              Our Vision
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight leading-tight mb-3">
              A transformative mindset for every student.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
              We envision a future where entrepreneurship is not just a career path, but a mindset
              woven into every student&apos;s journey — empowering them to innovate, lead, and create
              lasting impact.
            </p>
            <BulletList bullets={visionBullets} accentColor="text-[#8733C0]" />
            <div className="mt-4 flex gap-2">
              {["ENTREPRENEURSHIP", "CREATIVITY", "IMPACT"].map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-secondary/50 px-2 py-1 text-[10px] font-bold font-mono uppercase tracking-wider text-[#6A1FAF]"
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
          className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:gap-16"
        >
          {/* Visual — Target PNG */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            {reducedMotion ? (
              <StaticTarget />
            ) : (
              <TargetVisual inView={missionInView} />
            )}
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex-1 order-2 lg:order-2"
          >
            <span className="inline-block text-xs text-[#8733C0] font-bold font-mono uppercase tracking-widest mb-1.5">
              Our Mission
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight leading-tight mb-3">
              Turn ideas into real-world innovation.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
              We exist to bridge the gap between ideation and execution — giving students the tools,
              mentorship, and environment to transform bold ideas into ventures that matter.
            </p>
            <BulletList bullets={missionBullets} accentColor="text-[#8733C0]" />
            <div className="mt-4 flex gap-2">
              {["ACTION", "EXPERIENCE", "INNOVATION"].map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-secondary/50 px-2 py-1 text-[10px] font-bold font-mono uppercase tracking-wider text-[#6A1FAF]"
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
