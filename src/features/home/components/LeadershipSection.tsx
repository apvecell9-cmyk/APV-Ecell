import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { leaders } from "@/features/home/data/leaders";
import { LeadershipProfile } from "./LeadershipProfile";

/* ──────────────────────────────────────────────────────────────────────
 * LeadershipSection — Asymmetric half-capsule + glass profiles
 *
 * A dark-purple half-capsule extends from the left viewport edge with
 * a fully rounded right end. It slides in from outside the viewport as
 * the user scrolls to the section, followed by the heading fading in.
 * Leadership profiles remain below in aero-glass cards.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Reduced-motion static fallbacks ────────────────────────────────── */
function CapsuleGlowStatic() {
  return (
    <div className="absolute pointer-events-none" aria-hidden="true">
      <div
        className="absolute -inset-3 md:-inset-4"
        style={{
          borderRadius: "0 100px 100px 0",
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0.10) 50%, transparent 75%)",
          filter: "blur(18px)",
        }}
      />
      <div
        className="absolute -inset-6 md:-inset-8"
        style={{
          borderRadius: "0 120px 120px 0",
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.10) 0%, transparent 60%)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}

function CapsuleShape({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: 0,
        width: "calc(50vw - 2rem + 35%)",
        borderRadius: "0 100px 100px 0",
        background:
          "linear-gradient(135deg, oklch(0.22 0.16 300) 0%, oklch(0.28 0.18 300) 50%, oklch(0.24 0.17 300) 100%)",
        boxShadow:
          "0 0 0 1px rgba(139,92,246,0.2), 0 4px 24px -4px rgba(47,5,83,0.4), 0 8px 40px -8px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.15)",
      }}
    >
      {/* Top highlight strip */}
      <div
        className="absolute top-0 left-0 right-[5%] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.22) 60%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />
      {/* Bottom reflection */}
      <div
        className="absolute bottom-0 left-0 right-[8%] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.08) 65%, transparent 100%)",
        }}
      />
      {/* Right-end inner shadow */}
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0.20), transparent)",
          borderRadius: "0 100px 100px 0",
        }}
      />
      {children}
    </div>
  );
}

export function LeadershipSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Scroll progress tied to section entry ──────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  /* Capsule: translate from far-left off-screen to rest position */
  const capsuleX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const capsuleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6], [0, 0.6, 1]);

  /* Heading: fades in after capsule is mostly in place */
  const headingOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.4, 0.75], [12, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-10 lg:py-16 relative overflow-hidden"
      style={{ backgroundColor: "var(--homepage-lavender)" }}
      id="leadership"
    >
      {/* ── Asymmetric Half-Capsule ────────────────────────────────── */}
      <div className="relative mb-8 md:mb-10 lg:mb-12">
        {reducedMotion ? (
          <>
            <CapsuleGlowStatic />
            <div className="relative">
              <CapsuleShape>
                <div className="relative z-10 py-5 px-7 sm:py-6 sm:px-10 md:py-7 md:px-14 lg:py-8 lg:px-16 flex items-center">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-white leading-tight">
                    Our Leadership
                  </h2>
                </div>
              </CapsuleShape>
            </div>
          </>
        ) : (
          <>
            {/* Animated glow */}
            <motion.div
              style={{ x: capsuleX, opacity: capsuleOpacity }}
              className="absolute pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="absolute -inset-3 md:-inset-4"
                style={{
                  borderRadius: "0 100px 100px 0",
                  background:
                    "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0.10) 50%, transparent 75%)",
                  filter: "blur(18px)",
                }}
              />
              <div
                className="absolute -inset-6 md:-inset-8"
                style={{
                  borderRadius: "0 120px 120px 0",
                  background:
                    "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.10) 0%, transparent 60%)",
                  filter: "blur(32px)",
                }}
              />
            </motion.div>

            {/* Animated capsule */}
            <motion.div
              style={{ x: capsuleX, opacity: capsuleOpacity }}
              initial={{ x: "-100%", opacity: 0 }}
              className="relative"
            >
              <CapsuleShape>
                <motion.div
                  style={{ opacity: headingOpacity, y: headingY }}
                  className="relative z-10 py-5 px-7 sm:py-6 sm:px-10 md:py-7 md:px-14 lg:py-8 lg:px-16 flex items-center"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-white leading-tight">
                    Our Leadership
                  </h2>
                </motion.div>
              </CapsuleShape>
            </motion.div>
          </>
        )}
      </div>

      {/* ── Leadership Profiles ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Vertical center line (desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2" />

        <div className="space-y-3 md:space-y-4 lg:space-y-5">
          {leaders.map((leader, i) => (
            <LeadershipProfile
              key={i}
              leader={leader}
              index={i}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
