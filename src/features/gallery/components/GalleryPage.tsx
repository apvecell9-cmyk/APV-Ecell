import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { getEventsByYear, getYears } from "@/services/galleryService";
import type { GalleryEvent } from "@/data/gallery.generated";
import { HexagonBackground } from "./HexagonBackground";
import { GalleryHero } from "./GalleryHero";
import { YearRoller } from "./YearRoller";
import { EventCarousel3D } from "./EventCarousel3D";
import { ExpandedEvent } from "./ExpandedEvent";
import { GalleryLightbox, type GalleryImage } from "./GalleryLightbox";
import { EmptyGallery } from "./EmptyGallery";

export function GalleryPage() {
  const years = useMemo(() => getYears(), []);
  const defaultYear = years[0] ?? 2026;

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expandedEvent, setExpandedEvent] = useState<GalleryEvent | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const expandedRef = useRef<HTMLDivElement>(null);

  const yearEvents = useMemo(() => getEventsByYear(selectedYear), [selectedYear]);

  const lightboxImages = useMemo<GalleryImage[]>(() => {
    if (!expandedEvent) return [];
    return expandedEvent.images.map((src) => ({
      src,
      event: expandedEvent.event,
      year: expandedEvent.year,
    }));
  }, [expandedEvent]);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    setCarouselIndex(0);
    setExpandedEvent(null);
    setLightboxOpen(false);
  }, []);

  const handleExpandEvent = useCallback(() => {
    const event = yearEvents[carouselIndex];
    if (event) {
      setExpandedEvent(event);
      requestAnimationFrame(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [yearEvents, carouselIndex]);

  const handleCloseExpanded = useCallback(() => {
    setExpandedEvent(null);
    setLightboxOpen(false);
  }, []);

  const handleOpenImage = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleLightboxIndexChange = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <PageLayout mainClassName="flex-1">
      {/* Full-page hex background — isolation: isolate creates stacking context so z-index works */}
      <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
        <HexagonBackground animated />

        {/* Hero */}
        <GalleryHero />

        {/* Year roller — right-aligned */}
        <div className="relative z-10 mx-auto flex max-w-7xl justify-end px-6 lg:px-12">
          <YearRoller years={years} selectedYear={selectedYear} onSelect={handleYearChange} />
        </div>

        {/* 3D Carousel — dimmed when expanded */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
          <motion.div
            animate={{
              scale: expandedEvent ? 0.88 : 1,
              opacity: expandedEvent ? 0.4 : 1,
              filter: expandedEvent ? "blur(2px)" : "blur(0px)",
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {yearEvents.length > 0 ? (
              <EventCarousel3D
                events={yearEvents}
                activeIndex={carouselIndex}
                onSelect={setCarouselIndex}
                onExpand={handleExpandEvent}
                frozen={expandedEvent !== null}
              />
            ) : (
              <EmptyGallery description="No gallery events have been added yet." />
            )}
          </motion.div>
        </div>

        {/* Expanded event — card transforms into this hero */}
        <AnimatePresence>
          {expandedEvent && (
            <div ref={expandedRef} className="relative z-10">
              <ExpandedEvent
                event={expandedEvent}
                onClose={handleCloseExpanded}
                onOpenImage={handleOpenImage}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox — portal overlay, does not affect page flow */}
      {lightboxOpen && expandedEvent && lightboxImages.length > 0 && (
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
