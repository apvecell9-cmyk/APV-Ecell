import React from "react";

interface GalleryFiltersProps {
  years: number[];
  events: string[];
  selectedYear: number | null;
  selectedEvent: string | null;
  onYearChange: (year: number | null) => void;
  onEventChange: (event: string | null) => void;
}

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ALL_LABEL = "All";

const FILTER_PILL_CLASSES =
  "px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap";

function FilterPill({ label, active, onClick }: FilterPillProps) {
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
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Filter by Year
        </span>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
          <FilterPill
            label={ALL_LABEL}
            active={selectedYear === null}
            onClick={() => onYearChange(null)}
          />
          {years.map((year) => (
            <FilterPill
              key={year}
              label={String(year)}
              active={selectedYear === year}
              onClick={() => onYearChange(year)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Filter by Event
        </span>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
          <FilterPill
            label={ALL_LABEL}
            active={selectedEvent === null}
            onClick={() => onEventChange(null)}
          />
          {events.map((event) => (
            <FilterPill
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
