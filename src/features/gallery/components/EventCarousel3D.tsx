import React, { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryEvent } from "@/data/gallery.generated";

interface EventCarousel3DProps {
  events: GalleryEvent[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onExpand: () => void;
  frozen: boolean;
}

export function EventCarousel3D({
  events,
  activeIndex,
  onSelect,
  onExpand,
  frozen,
}: EventCarousel3DProps) {
  const total = events.length;
  const [dragDelta, setDragDelta] = useState(0);
  const dragRef = useRef<{ startX: number; startTime: number } | null>(null);

  // Infinite circular next/prev
  const goNext = useCallback(() => {
    if (total <= 1 || frozen) return;
    onSelect(((activeIndex + 1) % total + total) % total);
  }, [activeIndex, total, onSelect, frozen]);

  const goPrev = useCallback(() => {
    if (total <= 1 || frozen) return;
    onSelect(((activeIndex - 1) % total + total) % total);
  }, [activeIndex, total, onSelect, frozen]);

  // Keyboard navigation
  useEffect(() => {
    if (frozen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Enter") onExpand();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [frozen, goNext, goPrev, onExpand]);

  // Pointer drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (total <= 1 || frozen) return;
      dragRef.current = { startX: e.clientX, startTime: Date.now() };
      setDragDelta(0);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [total, frozen],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || frozen) return;
      setDragDelta(e.clientX - dragRef.current.startX);
    },
    [frozen],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const elapsed = Date.now() - dragRef.current.startTime;
      dragRef.current = null;
      setDragDelta(0);

      // Fast flick or sufficient drag
      const velocity = Math.abs(dx) / Math.max(elapsed, 1);
      if (velocity > 0.5 || Math.abs(dx) > 60) {
        Math.sign(dx) === -1 ? goNext() : goPrev();
      }
    },
    [goNext, goPrev],
  );

  if (total === 0) return null;

  // Drag ratio: how much drag offset affects position (0-1 range mapped to ~15% of card width)
  const dragRatio = dragDelta / 180;

  return (
    <div className="relative w-full" style={{ perspective: "1100px" }}>
      {/* Arrow buttons */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={frozen}
            aria-label="Previous event"
            className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:opacity-0 md:left-4 md:h-12 md:w-12"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={frozen}
            aria-label="Next event"
            className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background disabled:opacity-0 md:right-4 md:h-12 md:w-12"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 3D stage */}
      <div
        className="relative mx-auto touch-none select-none"
        style={{
          height: "clamp(340px, 50vw, 520px)",
          transformStyle: "preserve-3d",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {events.map((event, index) => {
          // Infinite circular offset: wrap around using modulo
          const rawOffset = index - activeIndex;
          // Wrap to [-half..+half] range for shortest path
          const half = Math.floor(total / 2);
          let offset = rawOffset;
          if (total > 2) {
            if (offset > half) offset -= total;
            else if (offset < -half) offset += total;
          }
          const abs = Math.abs(offset);

          // Only render cards within ±2 of active
          if (abs > 2) return null;

          const isActive = offset === 0;

          // 5-position layout with drag offset
          let tx = 0;
          let tz = 0;
          let ry = 0;
          let s = 1;
          let op = 1;

          if (abs === 0) {
            tx = 0;
            tz = 80;
            ry = 0;
            s = 1;
            op = 1;
          } else if (abs === 1) {
            tx = offset < 0 ? -280 : 280;
            tz = 10;
            ry = offset < 0 ? 8 : -8;
            s = 0.72;
            op = 0.85;
          } else {
            tx = offset < 0 ? -450 : 450;
            tz = -80;
            ry = offset < 0 ? 14 : -14;
            s = 0.55;
            op = 0.5;
          }

          // Apply drag offset only to center card
          const finalTx = isActive ? tx + dragDelta * 0.15 : tx;
          const finalRy = isActive ? ry + dragRatio * -3 : ry;

          return (
            <button
              key={`${event.year}-${event.event}`}
              type="button"
              onClick={() => {
                if (frozen) return;
                if (isActive) onExpand();
                else onSelect(index);
              }}
              className="absolute left-1/2 top-1/2 cursor-pointer focus:outline-none"
              style={{
                transform: `translateX(-50%) translateY(-50%) translateX(${finalTx}px) translateZ(${tz}px) rotateY(${finalRy}deg) scale(${s})`,
                opacity: frozen && !isActive ? 0 : op,
                zIndex: isActive ? 10 : 5 - abs,
                transition: dragRef.current
                  ? "none"
                  : "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease",
                width: "clamp(200px, 22vw, 300px)",
              }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl transition-shadow duration-500 ${
                  isActive
                    ? "shadow-[0_30px_80px_-12px_rgba(0,0,0,0.45)] ring-1 ring-foreground/10"
                    : "shadow-xl"
                }`}
              >
                {/* Portrait image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                  <img
                    src={event.cover}
                    alt={`${event.event} — ${event.year}`}
                    loading={abs <= 1 ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                </div>

                {/* Floating title plate — in front of image */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <h3
                    className="font-serif tracking-tight text-white drop-shadow-lg"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.5rem)" }}
                  >
                    {event.event}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 drop-shadow-sm">
                    {event.year} &bull; {event.imageCount}{" "}
                    {event.imageCount === 1 ? "Photo" : "Photos"}
                  </p>
                </div>
              </div>

              {/* Floating 3D title below card — outside image bounds */}
              <div
                className="mt-3 text-center"
                style={{ transform: "translateZ(1px)" }}
              >
                <p className="font-serif text-sm tracking-tight text-foreground/80 drop-shadow-sm">
                  {event.event}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  {event.year}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Indicator dots */}
      {total > 1 && (
        <div className="flex justify-center gap-2 pt-6">
          {events.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to event ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
