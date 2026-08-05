import React from "react";
import type { GalleryEvent } from "@/data/gallery.generated";
import { GalleryCard } from "./GalleryCard";

interface GalleryGridProps {
  events: GalleryEvent[];
  onOpenEvent: (index: number) => void;
}

export function GalleryGrid({ events, onOpenEvent }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {events.map((event, index) => (
        <GalleryCard
          key={`${event.year}-${event.event}`}
          event={event}
          onOpen={() => onOpenEvent(index)}
        />
      ))}
    </div>
  );
}
