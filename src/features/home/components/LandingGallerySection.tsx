import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getYears, getEventsByYear } from "@/services/galleryService";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";

export function LandingGallerySection() {
  const years = useMemo(() => getYears(), []);
  const latestYear = years[0];
  const previewEvents = useMemo(
    () => (latestYear ? getEventsByYear(latestYear).slice(0, 4) : []),
    [latestYear],
  );

  if (previewEvents.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-20 lg:px-12 lg:py-28">
      <HexagonBackground animated washColor="#F1E6FA" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="eyebrow">Moments & Memories</span>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
              Gallery
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Relive our journey through events, workshops and achievements.
            </p>
          </div>
          <Link
            to="/gallery"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-medium text-foreground shadow-soft transition-all hover:border-foreground/40 hover:shadow-md md:inline-flex"
          >
            View All
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {previewEvents.map((event) => (
            <div
              key={`${event.year}-${event.event}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={event.cover}
                  alt={`${event.event} — ${event.year}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-base tracking-tight text-white">{event.event}</h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {event.year} &bull; {event.imageCount}{" "}
                  {event.imageCount === 1 ? "Photo" : "Photos"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-medium text-foreground shadow-soft transition-all hover:border-foreground/40"
          >
            View Gallery
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
