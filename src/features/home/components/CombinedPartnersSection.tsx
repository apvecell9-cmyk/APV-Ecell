import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { references } from "@/features/home/data/references";
import { Sparkles } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────
 * CombinedPartnersSection — Premium collectible card reveal
 *
 * Cards emerge from center with a one-time diagonal metallic shine.
 * Uses framer-motion whileInView for viewport-based reveal.
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Header animation ──────────────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

/* ── Card reveal — center emergence ────────────────────────────────── */
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 12,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
      delay: i * 0.12 + 0.3,
    },
  }),
};

/* ── Reduced-motion fallbacks ──────────────────────────────────────── */
const rmHeader = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const rmCard = {
  hidden: (i: number) => ({ opacity: 0 }),
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: i * 0.08 + 0.1 },
  }),
};

export function CombinedPartnersSection() {
  const reducedMotion = useReducedMotion();

  const hVar = reducedMotion ? rmHeader : headerVariants;
  const cVar = reducedMotion ? rmCard : cardVariants;

  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          variants={hVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Ecosystem & Trust"
            title="References & Incubation Partners"
            description="Collaborating with premier national entrepreneurship bodies, top tech institutions, and our official incubation partner."
            size="md"
          />
        </motion.div>

        {/* Balanced Partners Grid with Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {references.map((item, index) => {
            const isHighlight = item.highlight;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cVar}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-soft hover:shadow-xl overflow-visible ${isHighlight
                    ? "bg-gradient-to-b from-surface via-surface to-accent/5 border-2 border-accent/60 ring-2 ring-accent/10"
                    : "bg-surface border border-border hover:border-primary/40"
                  }`}
              >
                {/* Metallic diagonal shine — one-time sweep */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none opacity-0 rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 58%, transparent 70%)",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "100% 100%",
                  }}
                  ref={(el) => {
                    if (!el || reducedMotion) return;
                    const parent = el.parentElement;
                    if (!parent) return;

                    const observer = new IntersectionObserver(
                      (entries) => {
                        entries.forEach((entry) => {
                          if (entry.isIntersecting) {
                            const delay = index * 120 + 400;
                            setTimeout(() => {
                              el.style.transition =
                                "opacity 0.15s ease, background-position 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
                              el.style.opacity = "1";
                              el.style.backgroundPosition = "0% 0%";
                              setTimeout(() => {
                                el.style.transition = "opacity 0.4s ease";
                                el.style.opacity = "0";
                              }, 700);
                            }, delay);
                            observer.unobserve(entry.target);
                          }
                        });
                      },
                      { threshold: 0.2 }
                    );
                    observer.observe(parent);
                  }}
                />

                {/* Highlight Tag */}
                {isHighlight && (
                <div className="absolute -top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8733C0]/15 text-[#8733C0] border border-[#8733C0]/30 text-[10px] font-mono font-bold uppercase tracking-wider">                    <Sparkles className="w-3 h-3" />
                    <span>Incubation</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Logo Container */}
                  <div className="w-full h-28 rounded-xl bg-white p-3 flex items-center justify-center border border-border/60 shadow-sm overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Header info */}
                  <div className="space-y-1.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-medium ${isHighlight
                          ? "bg-[#8733C0]/10 text-[#8733C0] border border-[#8733C0]/20"
                          : "bg-secondary text-muted-foreground"
                        }`}
                    >
                      {item.tag}
                    </span>

                    <h3 className="font-serif text-lg font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
