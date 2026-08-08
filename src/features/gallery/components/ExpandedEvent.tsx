import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { GalleryEvent } from "@/data/gallery.generated";

interface ExpandedEventProps {
  event: GalleryEvent;
  onClose: () => void;
  onOpenImage: (index: number) => void;
}

export function ExpandedEvent({ event, onClose, onOpenImage }: ExpandedEventProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10 lg:px-12">
      {/* Back button */}
      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-xs font-medium text-foreground shadow-soft backdrop-blur-sm transition-colors hover:border-foreground/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Carousel
      </motion.button>

      {/* Cinematic expansion — card hero transforms here */}
      <motion.div
        initial={{ scaleX: 0.3, scaleY: 0.6, opacity: 0, borderRadius: "1rem" }}
        animate={{ scaleX: 1, scaleY: 1, opacity: 1, borderRadius: "1rem" }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_32px_100px_-20px_rgba(0,0,0,0.35)]">
          <div className="relative overflow-hidden" style={{ aspectRatio: "21 / 9" }}>
            <img
              src={event.cover}
              alt={`${event.event} — ${event.year}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          </div>

          {/* Floating title */}
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-serif text-3xl tracking-tight text-white drop-shadow-lg md:text-5xl"
            >
              {event.event}
            </motion.h2>
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70"
            >
              {event.year} &bull; {event.imageCount} {event.imageCount === 1 ? "Photo" : "Photos"}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Photo strip — horizontal scrollable row */}
      {event.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="mt-10"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            All Photos
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {event.images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => onOpenImage(i)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.04, duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={src}
                  alt={`${event.event} — ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-white/70 drop-shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
