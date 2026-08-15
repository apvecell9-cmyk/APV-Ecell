import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventsForYear, getYears } from "@/services/eventLoader";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";

/* ──────────────────────────────────────────────────────────────────────
 * UpcomingEventsSection — Homepage preview of what's actually coming up
 *
 * Pulls real event data (via eventLoader) across all years and surfaces
 * only events whose status is "Upcoming", rather than a gallery of past
 * photos. Sits on the same animated hex background used on the Events
 * page. Falls back to a friendly "stay tuned" state when nothing is
 * currently scheduled.
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
          .filter((e) => e.status === "Upcoming")
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

  const previewEvents = useMemo(() => upcoming.slice(0, 3), [upcoming]);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-20 lg:px-12 lg:py-28">
      <HexagonBackground animated washColor="#F1E6FA" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="eyebrow">What&apos;s Next</span>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
              Upcoming Events
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Mark your calendar — here&apos;s what APV E-Cell has coming up next.
            </p>
          </div>
          <Link
            to="/events"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-medium text-foreground shadow-soft transition-all hover:border-foreground/40 hover:shadow-md md:inline-flex"
          >
            View All Events
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading events…</span>
          </div>
        ) : previewEvents.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface/80 px-8 py-14 text-center backdrop-blur-sm">
            <CalendarDays className="mx-auto h-8 w-8 text-[#8733C0]" strokeWidth={1.75} />
            <h3 className="mt-4 font-serif text-xl text-foreground">
              Nothing on the calendar right now
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              We&apos;re busy planning what&apos;s next. Check back soon, or explore our past
              events in the meantime.
            </p>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-medium text-foreground shadow-soft transition-all hover:border-foreground/40"
            >
              Explore Past Events
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {previewEvents.map((event, i) => (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: reducedMotion ? 0 : i * 0.1, ease }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/90 p-6 shadow-soft backdrop-blur-sm transition-shadow hover:shadow-lg"
              >
                <span className="inline-flex items-center rounded-full bg-[#8733C0]/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8733C0]">
                  {event.status}
                </span>

                <h3 className="mt-4 font-serif text-xl tracking-tight text-foreground">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{event.subtitle}</p>

                <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#8733C0]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-[#8733C0]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8733C0]" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-medium text-foreground shadow-soft transition-all hover:border-foreground/40"
          >
            View All Events
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
