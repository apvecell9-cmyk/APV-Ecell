import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
 * FatherAgnelSection — Homepage section on the roots of Agnel Polytechnic
 *
 * Image + text editorial layout: the institution's origin story and the
 * founder's guiding vision, adapted from the About page for a lighter,
 * homepage-appropriate treatment.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

export function FatherAgnelSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-background px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <motion.div
            className="lg:col-span-5"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="relative overflow-hidden rounded-[2rem_0.75rem_2rem_0.75rem] border border-border shadow-soft">
              <img
                src="/AboutUs/AboutUsImg.jpg"
                alt="Agnel Polytechnic, Vashi campus"
                loading="lazy"
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <img
                  src="/logos/agenl.png"
                  alt="Agnel logo"
                  className="h-12 w-12 rounded-full border-2 border-white/80 bg-white object-contain p-1 shadow-md"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.1, ease }}
          >
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#8733C0]">
              Our Roots
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
              Agnel Polytechnic, Vashi
            </h2>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-[#8733C0]" />

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Started in 1983 with a single Diploma in Civil Engineering, Agnel Polytechnic has
              grown into an institution offering five forward-looking branches — Civil,
              Mechanical, Automobile, Electronics &amp; Computer, and AI &amp; Machine Learning
              Engineering. What sets it apart is its discipline, ethical culture, and a faculty
              dedicated to shaping students in a cosmopolitan atmosphere. APV E-Cell was born from
              this same spirit of purposeful, values-led education.
            </p>

            <blockquote className="mt-8 border-l-2 border-[#8733C0]/50 pl-5">
              <p className="font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                &ldquo;To foster love and understanding among the various communities in India and
                to contribute to the development of self-reliance among youth through
                education.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs text-muted-foreground">
                — Fr. C. Rodrigues
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
