import React, { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface YearRollerProps {
  years: number[];
  selectedYear: number;
  onSelect: (year: number) => void;
}

export function YearRoller({ years, selectedYear, onSelect }: YearRollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedIndex = years.indexOf(selectedYear);

  const handlePrev = useCallback(() => {
    const next = Math.max(0, selectedIndex - 1);
    if (next !== selectedIndex) onSelect(years[next]!);
  }, [years, selectedIndex, onSelect]);

  const handleNext = useCallback(() => {
    const next = Math.min(years.length - 1, selectedIndex + 1);
    if (next !== selectedIndex) onSelect(years[next]!);
  }, [years, selectedIndex, onSelect]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;
      if (delta > 0) handleNext();
      else handlePrev();
    },
    [handleNext, handlePrev],
  );

  if (years.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        type="button"
        onClick={handlePrev}
        disabled={selectedIndex <= 0}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface disabled:opacity-25"
        aria-label="Previous year"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-center gap-1 overflow-hidden"
      >
        {years.map((year) => {
          const isSelected = year === selectedYear;
          const dist = Math.abs(years.indexOf(year) - selectedIndex);
          const opacity = isSelected ? 1 : Math.max(0.25, 1 - dist * 0.35);
          const scale = isSelected ? 1.2 : Math.max(0.85, 1 - dist * 0.08);
          return (
            <button
              key={year}
              type="button"
              onClick={() => onSelect(year)}
              className="flex h-12 items-center px-3 font-serif transition-all duration-400"
              style={{ opacity, transform: `scale(${scale})` }}
            >
              <span
                className={`text-lg ${isSelected ? "font-normal text-foreground" : "text-muted-foreground"}`}
              >
                {year}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={selectedIndex >= years.length - 1}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface disabled:opacity-25"
        aria-label="Next year"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
