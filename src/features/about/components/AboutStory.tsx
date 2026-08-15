import React from "react";
import { motion } from "framer-motion";
import { FounderVision } from "./FounderVision";

export function AboutStory() {
  return (
    <section className="relative z-10 px-6 pb-24 pt-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">

          {/* OUR ORIGINS */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -7,
              scale: 1.01,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
          >
            <div
              className="
                relative overflow-hidden
                rounded-[3rem_1rem_3rem_1rem]
                border border-white/25
                bg-white/10
                p-8
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                backdrop-blur-md
                sm:p-10
              "
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--about-muted)]">
                Our Origins
              </span>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-snug text-[var(--about-text)] md:text-4xl">
                Agnel Polytechnic, Vashi — Creating change since 1983.
              </h2>
            </div>
          </motion.div>

          {/* FOUNDER VISION */}
          <div className="lg:col-span-6 lg:pt-20">
            <FounderVision />
          </div>

        </div>

        {/* ================= MAIN PARAGRAPH ================= */}
        <motion.div
          className="
            mt-16
            rounded-[1rem_3rem_1rem_3rem]
            border border-white/20
            bg-black/10
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-md
            sm:p-10
            lg:mt-20
            lg:p-12
          "
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="max-w-5xl space-y-6 text-sm leading-relaxed text-[var(--about-muted)] md:text-base">

            <p>
              Agnel Polytechnic in Vashi, Navi Mumbai, was started in 1983 with only one program —
              Diploma in Civil Engineering. It has grown since then, and today we offer five
              forward-looking branches of study:{" "}
              <strong className="text-[var(--about-text)]">
                Civil Engineering, Mechanical Engineering, Automobile Engineering, Electronics &
                Computer Engineering, and Artificial Intelligence & Machine Learning.
              </strong>
            </p>

            <p>
              What makes Agnel Polytechnic a unique institution in Mumbai is its discipline, ethical
              culture, and the dedication of the faculty in imparting knowledge and expertise to the
              students in a cosmopolitan atmosphere.
            </p>

            <p>
              <strong className="text-[var(--about-text)]">
                APV E-Cell (Agnel Polytechnic Vashi Entrepreneurship Cell)
              </strong>{" "}
              is our passionate student-driven initiative focused on nurturing entrepreneurial
              mindsets across all disciplines. We believe true entrepreneurship is not just about
              starting companies—it’s about fostering creativity, building resilience, and striving
              for meaningful social change. Through workshops, flagship competitions like{" "}
              <strong className="text-[var(--about-text)]">
                Pitchnova
              </strong>
              , mentorship, and networking opportunities, we inspire students to embrace innovation,
              learn from failure, and become the ethical leaders our world needs.
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}