import React, { useCallback, useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  getAllEvents,
  getEventNames,
  getFilteredEvents,
  getYears,
} from "@/services/galleryService";
import { GalleryHero } from "./GalleryHero";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryLightbox, type GalleryImage } from "./GalleryLightbox";
import { EmptyGallery } from "./EmptyGallery";

export function GalleryPage() {
  const allEvents = useMemo(() => getAllEvents(), []);
  const years = useMemo(() => getYears(), []);
  const eventNames = useMemo(() => getEventNames(), []);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredEvents = useMemo(
    () => getFilteredEvents({ year: selectedYear, event: selectedEvent }),
    [selectedYear, selectedEvent],
  );

  const lightboxImages = useMemo<GalleryImage[]>(
    () =>
      filteredEvents.flatMap((event) =>
        event.images.map((src) => ({ src, event: event.event, year: event.year })),
      ),
    [filteredEvents],
  );

  const handleYearChange = useCallback((year: number | null) => {
    setSelectedYear(year);
    setLightboxIndex(null);
  }, []);

  const handleEventChange = useCallback((event: string | null) => {
    setSelectedEvent(event);
    setLightboxIndex(null);
  }, []);

  const handleOpenEvent = useCallback(
    (eventIndex: number) => {
      const event = filteredEvents[eventIndex];
      if (!event) {
        return;
      }
      const startIndex = filteredEvents
        .slice(0, eventIndex)
        .reduce((sum, item) => sum + item.images.length, 0);
      setLightboxIndex(startIndex);
    },
    [filteredEvents],
  );

  const handleCloseLightbox = useCallback(() => setLightboxIndex(null), []);
  const handleLightboxIndexChange = useCallback((index: number) => setLightboxIndex(index), []);

  const hasAnyEvents = allEvents.length > 0;

  return (
    <PageLayout>
      <GalleryHero />

      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-12">
        <GalleryFilters
          years={years}
          events={eventNames}
          selectedYear={selectedYear}
          selectedEvent={selectedEvent}
          onYearChange={handleYearChange}
          onEventChange={handleEventChange}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12">
        {filteredEvents.length > 0 ? (
          <>
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
            </p>
            <GalleryGrid events={filteredEvents} onOpenEvent={handleOpenEvent} />
          </>
        ) : hasAnyEvents ? (
          <EmptyGallery
            title="No images match your filters"
            description="Try a different year or event combination."
          />
        ) : (
          <EmptyGallery description="Add a gallery folder with images and they will appear here automatically." />
        )}
      </div>

      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <GalleryLightbox
          images={lightboxImages}
          index={lightboxIndex}
          onIndexChange={handleLightboxIndexChange}
          onClose={handleCloseLightbox}
        />
      )}
    </PageLayout>
  );
}
