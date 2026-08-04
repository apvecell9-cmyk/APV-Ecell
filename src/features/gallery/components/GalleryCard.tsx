import React from "react";
import type { GalleryEvent } from "@/data/gallery.generated";

interface GalleryCardProps {
  event: GalleryEvent;
  onOpen: () => void;
}

function getPhotoLabel(count: number): string {
  return count === 1 ? "Photo" : "Photos";
}

export function GalleryCard({ event, onOpen }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-xl border border-border bg-surface text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.cover}
          alt={`${event.event} — ${event.year}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-serif text-xl font-normal tracking-tight text-white">{event.event}</h3>
        <p className="mt-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/80">
          <span>{event.year}</span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <span>
            {event.imageCount} {getPhotoLabel(event.imageCount)}
          </span>
        </p>
      </div>
    </button>
  );
}
