import React from "react";
import { motion } from "framer-motion";

interface YearSelectorProps {
  years: number[];
  selectedYear: number | null;
  onSelect: (year: number) => void;
}

const ITEM_HEIGHT = 56;
const VISIBLE_ITEMS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

export function YearSelector({ years, selectedYear, onSelect }: YearSelectorProps) {
  if (years.length === 0 || selectedYear === null) {
    return null;
  }

  const selectedIndex = years.indexOf(selectedYear);
  const translateY = CENTER_INDEX * ITEM_HEIGHT - selectedIndex * ITEM_HEIGHT;

  return (
    <div className="relative flex w-full flex-col items-center">
      <span className="eyebrow mb-4">Year</span>
      <div
        className="relative w-28 overflow-hidden border-y border-hairline py-0"
        style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[112px] bg-gradient-to-b from-surface to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[112px] bg-gradient-to-t from-surface to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-2 top-1/2 z-20 -translate-y-1/2 border-y border-foreground/20"
          style={{ height: ITEM_HEIGHT }}
          aria-hidden="true"
        />
        <motion.ul
          className="flex flex-col"
          animate={{ y: translateY }}
          transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.6 }}
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
                      scale: isSelected ? 1.15 : 0.9,
                      opacity: isSelected ? 1 : 0.4,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <span className="text-2xl md:text-3xl">{year}</span>
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
