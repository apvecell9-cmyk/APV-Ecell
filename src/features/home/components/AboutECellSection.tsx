import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
 * AboutECellSection — Cinematic editorial About layout
 *
 * Two-column composition with cinematic proportions:
 *   LEFT:  large editorial text (eyebrow, heading, paragraph, accent)
 *   RIGHT: wide team photograph with glass frame
 *
 * Entrance animation: text rises from below in sequence,
 * image slides in from right with a subtle clip reveal.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutECellSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden px-6 pt-16 pb-20 lg:px-12 lg:pt-20 lg:pb-28"
      style={{ backgroundColor: "var(--homepage-lavender)" }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 -z-0 h-[500px] w-[500px] rounded-full bg-white/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 -z-0 h-[400px] w-[400px] rounded-full bg-[#8733C0]/[0.07] blur-[80px]" />

      <div className="relative mx-auto max-w-[1360px]">
        <div className="grid items-center gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14 xl:gap-18">
          {/* ── Left: Cinematic text content ────────────────────────── */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow — Stage 1 */}
            <motion.span
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center text-[11px] font-bold font-mono uppercase tracking-[0.24em] text-[#8733C0]"
            >
              About APV E-Cell
            </motion.span>

            {/* Heading — Stage 2 */}
            <motion.h2
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: reducedMotion ? 0 : 0.1, ease }}
              className="mt-4 font-serif text-[2.2rem] leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.4rem] lg:text-[3.8rem]"
            >
              About APV E-Cell
            </motion.h2>

            {/* Accent line */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.2, ease }}
              className="mt-6 h-0.5 w-14 origin-left rounded-full bg-[#8733C0]"
            />

            {/* Paragraph — Stage 3 */}
            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: reducedMotion ? 0 : 0.25, ease }}
              className="mt-7 max-w-xl text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px] md:text-lg md:leading-[1.8]"
            >
              APV E-Cell (Agnel Polytechnic Vashi Entrepreneurship Cell) is a
              passionate student-driven initiative focused on nurturing
              entrepreneurial mindsets across all disciplines. We believe true
              entrepreneurship isn&apos;t just about starting companies — it&apos;s
              about fostering creativity, building resilience, and striving for
              meaningful social change.
            </motion.p>

            {/* IDEAS → ACTION → IMPACT — Stage 4 */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.38, ease }}
              className="mt-9 flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#8733C0]/60"
            >
              <span>Ideas</span>
              <span className="h-px w-5 bg-[#8733C0]/25" />
              <span className="text-[#8733C0]/35">→</span>
              <span className="h-px w-5 bg-[#8733C0]/25" />
              <span>Action</span>
              <span className="h-px w-5 bg-[#8733C0]/25" />
              <span className="text-[#8733C0]/35">→</span>
              <span className="h-px w-5 bg-[#8733C0]/25" />
              <span>Impact</span>
            </motion.div>
          </div>

          {/* ── Right: Wide cinematic team photograph ───────────────── */}
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, x: 100, clipPath: "inset(0 0 0 8%)" }
            }
            whileInView={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.15, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-2xl xl:max-w-3xl">
              {/* Outer glow */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(135,51,192,0.18), transparent 70%)",
                }}
              />

              {/* Glass frame — wide cinematic ratio */}
              <div
                className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  backdropFilter: "blur(14px) saturate(120%)",
                  WebkitBackdropFilter: "blur(14px) saturate(120%)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  boxShadow:
                    "0 10px 50px -10px rgba(47, 5, 83, 0.14), 0 2px 10px rgba(47, 5, 83, 0.06), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* The team photograph — wide cinematic aspect */}
                <img
                  src="/team/team.JPG"
                  alt="APV E-Cell team — the people behind the entrepreneurship cell"
                  className="block h-auto w-full object-cover"
                  style={{ aspectRatio: "16 / 9" }}
                  loading="lazy"
                />

                {/* Top highlight inside frame */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.16), transparent)",
                  }}
                />
              </div>

              {/* Caption */}
              <motion.p
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.55, ease }}
                className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-[#8733C0]/45 lg:text-right"
              >
                The team behind APV E-Cell
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
