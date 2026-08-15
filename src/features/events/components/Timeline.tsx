import React from "react";
import { motion } from "framer-motion";
import type { EventData } from "@/types/events";
import { TimelineCard } from "./TimelineCard";
import { TimelineNode } from "./TimelineNode";

interface TimelineProps {
  events: EventData[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function Timeline({ events, selectedIndex, onSelect }: TimelineProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-visible px-2 py-2 sm:px-6 md:px-10 lg:px-14">
      {/* Central timeline line — slightly thicker */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[2.5px] -translate-x-1/2 bg-foreground/15"
        aria-hidden="true"
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      />

      <div className="relative flex flex-col">
        {events.map((event, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
          const isActive = selectedIndex === index;
          return (
            <motion.div
              key={`${event.year}-${event.title}-${index}`}
              className="relative grid grid-cols-2 items-center py-5 sm:py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: 0.1 + index * 0.1,
              }}
            >
              <div className="flex justify-end pr-5 sm:pr-8 md:pr-12">
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

              <div className="flex justify-start pl-5 sm:pl-8 md:pl-12">
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
