import React, { useCallback, useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getFilteredEvents, getEventNamesByYear, getYears } from "@/services/galleryService";
import { GalleryHero } from "./GalleryHero";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryLightbox, type GalleryImage } from "./GalleryLightbox";
import { EmptyGallery } from "./EmptyGallery";

export function GalleryPage() {
  const years = useMemo(() => getYears(), []);
  const defaultYear = years[0] ?? 2026;

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [lightboxEvent, setLightboxEvent] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const eventNames = useMemo(() => getEventNamesByYear(selectedYear), [selectedYear]);

  const filteredEvents = useMemo(
    () => getFilteredEvents({ year: selectedYear, event: selectedEvent }),
    [selectedYear, selectedEvent],
  );

  const lightboxImages = useMemo<GalleryImage[]>(() => {
    if (!lightboxEvent) return [];
    const match = filteredEvents.find((e) => e.event === lightboxEvent);
    if (!match) return [];
    return match.images.map((src) => ({ src, event: match.event, year: match.year }));
  }, [filteredEvents, lightboxEvent]);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    setSelectedEvent(null);
    setExpandedEvent(null);
    setLightboxEvent(null);
  }, []);

  const handleEventChange = useCallback((event: string | null) => {
    setSelectedEvent(event);
    setExpandedEvent(null);
    setLightboxEvent(null);
  }, []);

  const handleToggleEvent = useCallback((eventName: string) => {
    setExpandedEvent((prev) => (prev === eventName ? null : eventName));
  }, []);

  const handleOpenImage = useCallback((eventName: string, imageIndex: number) => {
    setLightboxEvent(eventName);
    setLightboxIndex(imageIndex);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxEvent(null);
  }, []);

  const handleLightboxIndexChange = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <PageLayout>
      <GalleryHero />

      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-12">
        <GalleryFilters
          years={years}
          events={eventNames}
          selectedYear={selectedYear}
          selectedEvent={selectedEvent}
          onYearChange={handleYearChange}
          onEventChange={handleEventChange}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-12">
        {filteredEvents.length > 0 ? (
          <>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
            </p>
            <GalleryGrid
              events={filteredEvents}
              expandedEvent={expandedEvent}
              onToggleEvent={handleToggleEvent}
              onOpenImage={handleOpenImage}
            />
          </>
        ) : (
          <EmptyGallery
            title="No images match your filters"
            description="Try a different year or event combination."
          />
        )}
      </div>

      {lightboxEvent && lightboxImages.length > 0 && (
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
