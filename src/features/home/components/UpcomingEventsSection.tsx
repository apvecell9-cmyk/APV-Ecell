import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";

/* ──────────────────────────────────────────────────────────────────────
 * UpcomingEventsSection — Homepage preview with two-sided layout
 *
 * Left side: eyebrow + heading + description
 * Right side: single prominent event card in frosted-glass style
 * Background: clean lavender with subtle ambient light animation
 * ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

export function UpcomingEventsSection() {
  const reducedMotion = useReducedMotion();
  const [upcoming, setUpcoming] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const years = await getYears();
        const perYear = await Promise.all(years.map((year) => getEventsForYear(year)));
        if (cancelled) return;
        const all = perYear.flat();
        const filtered = all
          .filter((e) => e.status === "upcoming")
          .sort((a, b) => b.year - a.year);
        setUpcoming(filtered);
      } catch (err) {
        console.error("Failed to load upcoming events:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredEvent = useMemo(() => upcoming[0] ?? null, [upcoming]);

  return (
    <section className="hp-events-bg relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
      {/* Third ambient light blob — center-top */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "hp-events-drift-1 18s ease-in-out infinite alternate-reverse",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left: Text Content ──────────────────────────────── */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-widest text-[#6A1FAF]">
              <Sparkles className="h-3.5 w-3.5" />
              What&apos;s Next
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
              Upcoming Events
            </h2>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-[#8733C0]/50" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
              Mark your calendar — here&apos;s what APV E-Cell has coming up next. From
              pitch competitions to workshops, there&apos;s always something brewing.
            </p>

            <Link
              to="/events"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/30 bg-[#8733C0]/10 px-5 py-2.5 text-xs font-medium text-[#6A1FAF] backdrop-blur-sm transition-all hover:bg-[#8733C0]/20 hover:border-[#8733C0]/50 shadow-sm"
            >
              View All Events
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* ── Right: Featured Event Card ──────────────────────── */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.15, ease }}
            className="flex justify-center lg:justify-end"
          >
            {loading ? (
              <div className="hp-event-card-glass rounded-2xl p-8 w-full max-w-md text-center">
                <span className="text-sm text-foreground/60">Loading events…</span>
              </div>
            ) : featuredEvent ? (
              <motion.div
                className="hp-event-card-glass rounded-2xl p-7 sm:p-8 w-full max-w-md"
                whileHover={reducedMotion ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="inline-flex items-center rounded-full bg-[#8733C0]/15 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8733C0]">
                  {featuredEvent.status}
                </span>

                <h3 className="mt-4 font-serif text-2xl tracking-tight text-foreground">
                  {featuredEvent.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{featuredEvent.subtitle}</p>

                <div className="mt-6 space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8733C0]/10">
                      <CalendarDays className="h-3.5 w-3.5 text-[#8733C0]" />
                    </div>
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8733C0]/10">
                      <Clock className="h-3.5 w-3.5 text-[#8733C0]" />
                    </div>
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8733C0]/10">
                      <MapPin className="h-3.5 w-3.5 text-[#8733C0]" />
                    </div>
                    <span>{featuredEvent.venue}</span>
                  </div>
                </div>

                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/30 bg-[#8733C0]/10 px-4 py-2 text-xs font-medium text-[#6A1FAF] backdrop-blur-sm transition-all hover:bg-[#8733C0]/20 hover:border-[#8733C0]/50"
                >
                  Learn More
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ) : (
              <div className="hp-event-card-glass rounded-2xl px-8 py-14 text-center w-full max-w-md">
                <CalendarDays className="mx-auto h-8 w-8 text-[#8733C0]/50" strokeWidth={1.75} />
                <h3 className="mt-4 font-serif text-xl text-foreground">
                  Nothing on the calendar right now
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  We&apos;re busy planning what&apos;s next. Check back soon, or explore our past
                  events in the meantime.
                </p>
                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#8733C0]/30 bg-[#8733C0]/10 px-5 py-2.5 text-xs font-medium text-[#6A1FAF] backdrop-blur-sm transition-all hover:bg-[#8733C0]/20 hover:border-[#8733C0]/50"
                >
                  Explore Past Events
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
