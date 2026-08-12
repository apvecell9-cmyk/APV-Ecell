import React from "react";
import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative z-10 w-full">
      <div className="flex min-h-[62vh] translate-y-6 items-center px-6 sm:px-10 lg:px-16">
        <motion.div
  className="max-w-4xl"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }}
>
  <motion.span
    className="eyebrow text-[var(--about-text)]"
    variants={{
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }}
  >
    About Us
  </motion.span>

  <motion.h1
    className="mt-2 font-serif text-4xl tracking-tight text-[var(--about-text)] md:text-5xl lg:text-6xl"
    variants={{
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }}
  >
    Building the Entrepreneurial Culture at Agnel Polytechnic Vashi
  </motion.h1>

  <motion.p
    className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--about-muted)] md:text-lg"
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }}
  >
    Agnel Polytechnic, Vashi has shaped technical education and
    self-reliance since 1983. Discover the institution, the founder's
    vision, and the entrepreneurial story behind APV E-Cell.
  </motion.p>
</motion.div>
      </div>
    </section>
  );
}