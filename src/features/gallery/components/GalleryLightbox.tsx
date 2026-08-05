import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  event: string;
  year: number;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function GalleryLightbox({ images, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    if (total === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % total);
      } else if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [total, index, onClose, onIndexChange]);

  if (!current) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.event} image viewer`}
    >
      <div
        className="relative flex h-full w-full flex-col items-center justify-center p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="absolute left-1/2 top-5 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-white/70 md:top-8">
          {index + 1} / {total}
        </p>

        <div className="flex max-h-full w-full max-w-5xl items-center justify-center">
          <img
            key={current.src}
            src={current.src}
            alt={`${current.event} — ${current.year}`}
            className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl animate-fade-in"
          />
        </div>

        <p className="mt-6 font-serif text-lg text-white">
          {current.event} <span className="text-white/50">•</span>{" "}
          <span className="font-mono text-sm uppercase tracking-wider text-white/60">
            {current.year}
          </span>
        </p>

        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + total) % total)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % total)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
