import React, { useState } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types/events";

interface EventGalleryProps {
  gallery: GalleryItem[] | undefined;
}

export function EventGallery({ gallery }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {gallery.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(item)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-[#8733C0]/10 bg-white/5 transition-all hover:border-[#8733C0]/25"
          >
            <img
              src={item.url}
              alt={item.alt ?? item.caption ?? `Gallery image ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2F0553]/70 to-transparent p-2">
                <p className="text-[10px] text-white">{item.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F0553]/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 text-white/70 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.alt ?? selectedImage.caption ?? "Gallery image"}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.caption && (
            <p className="absolute bottom-4 text-center text-sm text-white/80">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
