import React, { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryFiltersProps {
  years: number[];
  events: string[];
  selectedYear: number;
  selectedEvent: string | null;
  onYearChange: (year: number) => void;
  onEventChange: (event: string | null) => void;
}

const FILTER_PILL_CLASSES =
  "px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap";

function EventPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${FILTER_PILL_CLASSES} ${
        active
          ? "bg-foreground text-background shadow-sm"
          : "bg-background border border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export function GalleryFilters({
  years,
  events,
  selectedYear,
  selectedEvent,
  onYearChange,
  onEventChange,
}: GalleryFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedIndex = years.indexOf(selectedYear);

  const handlePrev = useCallback(() => {
    const next = Math.max(0, selectedIndex - 1);
    if (next !== selectedIndex) onYearChange(years[next]!);
  }, [years, selectedIndex, onYearChange]);

  const handleNext = useCallback(() => {
    const next = Math.min(years.length - 1, selectedIndex + 1);
    if (next !== selectedIndex) onYearChange(years[next]!);
  }, [years, selectedIndex, onYearChange]);

  return (
    <div className="space-y-6">
      {/* Year selector row */}
      <div className="flex items-center justify-between gap-4">
        <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Filter by Year
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={selectedIndex <= 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Previous year"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div ref={scrollRef} className="flex items-center gap-1 overflow-hidden">
            {years.map((year) => {
              const isSelected = year === selectedYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => onYearChange(year)}
                  className={`flex h-10 items-center rounded-lg px-3 font-serif text-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-foreground text-background scale-105 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={selectedIndex >= years.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label="Next year"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Event filter row */}
      <div className="space-y-3">
        <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Filter by Event
        </span>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
          <EventPill
            label="All Events"
            active={selectedEvent === null}
            onClick={() => onEventChange(null)}
          />
          {events.map((event) => (
            <EventPill
              key={event}
              label={event}
              active={selectedEvent === event}
              onClick={() => onEventChange(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
