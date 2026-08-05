import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface YearSelectorProps {
  years: number[];
  selectedYear: number | null;
  onSelect: (year: number) => void;
}

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 3;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

export function YearSelector({ years, selectedYear, onSelect }: YearSelectorProps) {
  const dragStartY = useRef<number | null>(null);
  const dragAccumulated = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIndex = years.indexOf(selectedYear ?? years[0]!);

  const handleYearNavigate = useCallback(
    (direction: number) => {
      const nextIndex = Math.max(0, Math.min(years.length - 1, selectedIndex + direction));
      if (nextIndex !== selectedIndex) {
        onSelect(years[nextIndex]!);
      }
    },
    [years, selectedIndex, onSelect],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 5) return;
      handleYearNavigate(delta > 0 ? -1 : 1);
    },
    [handleYearNavigate],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    dragAccumulated.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartY.current === null) return;
      const delta = dragStartY.current - e.clientY;
      dragAccumulated.current += delta;
      dragStartY.current = e.clientY;

      if (Math.abs(dragAccumulated.current) >= ITEM_HEIGHT) {
        const steps = Math.round(dragAccumulated.current / ITEM_HEIGHT);
        handleYearNavigate(steps);
        dragAccumulated.current = 0;
      }
    },
    [handleYearNavigate],
  );

  const handlePointerUp = useCallback(() => {
    dragStartY.current = null;
    dragAccumulated.current = 0;
  }, []);

  if (years.length === 0 || selectedYear === null) {
    return null;
  }

  const translateY = CENTER_INDEX * ITEM_HEIGHT - selectedIndex * ITEM_HEIGHT;

  return (
    <div className="relative flex flex-col items-center">
      <span className="eyebrow mb-2 text-[10px]">Year</span>
      <div
        ref={containerRef}
        className="relative w-24 select-none touch-none overflow-hidden"
        style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{ height: ITEM_HEIGHT }}
          aria-hidden="true"
        >
          <div className="h-full bg-gradient-to-b from-background to-transparent" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{ height: ITEM_HEIGHT }}
          aria-hidden="true"
        >
          <div className="h-full bg-gradient-to-t from-background to-transparent" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-2 top-1/2 z-20 -translate-y-1/2 border-y border-foreground/15"
          style={{ height: ITEM_HEIGHT }}
          aria-hidden="true"
        />
        <motion.ul
          className="flex flex-col"
          animate={{ y: translateY }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        >
          {years.map((year) => {
            const isSelected = year === selectedYear;
            return (
              <li
                key={year}
                style={{ height: ITEM_HEIGHT }}
                className="flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => onSelect(year)}
                  className="flex h-full w-full items-center justify-center focus:outline-none"
                  aria-label={`Select year ${year}`}
                  aria-pressed={isSelected}
                >
                  <motion.span
                    className="font-serif text-foreground"
                    animate={{
                      scale: isSelected ? 1.1 : 0.9,
                      opacity: isSelected ? 1 : 0.35,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <span className="text-xl md:text-2xl">{year}</span>
                  </motion.span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
