import React from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";
import { TimelineCard } from "./TimelineCard";
import { TimelineNode } from "./TimelineNode";

interface TimelineProps {
  events: EventData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  shiftX: number;
}

export function Timeline({ events, selectedIndex, onSelect, shiftX }: TimelineProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-visible px-2 py-2 sm:px-8 md:px-14 lg:px-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-foreground/15"
        aria-hidden="true"
      />

      <motion.div
        className="relative flex flex-col"
        animate={{ x: shiftX }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        {events.map((event, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
          const isActive = selectedIndex === index;
          return (
            <div
              key={`${event.year}-${event.title}-${index}`}
              className="relative grid grid-cols-2 items-center py-6"
            >
              <div className="flex justify-end pr-6 sm:pr-10 md:pr-14">
                {side === "left" && (
                  <div className="w-full max-w-sm">
                    <TimelineCard
                      event={event}
                      side="left"
                      active={isActive}
                      onSelect={() => onSelect(index)}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-start pl-6 sm:pl-10 md:pl-14">
                {side === "right" && (
                  <div className="w-full max-w-sm">
                    <TimelineCard
                      event={event}
                      side="right"
                      active={isActive}
                      onSelect={() => onSelect(index)}
                    />
                  </div>
                )}
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <TimelineNode active={isActive} onClick={() => onSelect(index)} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
