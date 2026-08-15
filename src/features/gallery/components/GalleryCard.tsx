import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryEvent } from "@/data/gallery.generated";

interface GalleryCardProps {
  event: GalleryEvent;
  expanded: boolean;
  onToggle: () => void;
  onOpenImage: (imageIndex: number) => void;
}

function getPhotoLabel(count: number): string {
  return count === 1 ? "Photo" : "Photos";
}

export const GalleryCard = memo(function GalleryCard({
  event,
  expanded,
  onToggle,
  onOpenImage,
}: GalleryCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-md">
      {/* Card header — clickable */}
      <button
        type="button"
        onClick={onToggle}
        className="group relative w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
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
          <h3 className="font-serif text-xl font-normal tracking-tight text-white">
            {event.event}
          </h3>
          <p className="mt-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/80">
            <span>{event.year}</span>
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span>
              {event.imageCount} {getPhotoLabel(event.imageCount)}
            </span>
          </p>
        </div>
      </button>

      {/* Accordion — thumbnail grid */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="thumbnails"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-2 border-t border-border p-3 sm:grid-cols-4">
              {event.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onOpenImage(i)}
                  className="group/thumb relative aspect-square overflow-hidden rounded-lg bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={src}
                    alt={`${event.event} — ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/thumb:bg-black/10" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
