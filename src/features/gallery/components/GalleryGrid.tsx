import React, { memo } from "react";
import type { GalleryEvent } from "@/data/gallery.generated";
import { GalleryCard } from "./GalleryCard";

interface GalleryGridProps {
  events: GalleryEvent[];
  expandedEvent: string | null;
  onToggleEvent: (eventName: string) => void;
  onOpenImage: (eventName: string, imageIndex: number) => void;
}

export const GalleryGrid = memo(function GalleryGrid({
  events,
  expandedEvent,
  onToggleEvent,
  onOpenImage,
}: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {events.map((event) => (
        <GalleryCard
          key={`${event.year}-${event.event}`}
          event={event}
          expanded={expandedEvent === event.event}
          onToggle={() => onToggleEvent(event.event)}
          onOpenImage={(imageIndex) => onOpenImage(event.event, imageIndex)}
        />
      ))}
    </div>
  );
});
