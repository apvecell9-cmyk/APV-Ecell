import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { DedicatedEventButton } from "./DedicatedEventButton";

interface EventDetailPanelProps {
  event: EventData;
}

export function EventDetailPanel({ event }: EventDetailPanelProps) {
  return (
    <motion.div
      key={`${event.year}-${event.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-full flex-col overflow-y-auto rounded-2xl border border-border bg-surface p-8 shadow-soft md:p-10"
    >
      <span className="eyebrow">Event Details</span>

      <h2 className="mt-3 font-serif text-3xl font-normal leading-tight text-foreground md:text-4xl">
        {event.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{event.subtitle}</p>

      <div className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-foreground" />
          <span>{event.date}</span>
        </div>
        {event.time && (
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-foreground" />
            <span>{event.time}</span>
          </div>
        )}
        {event.venue && (
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-foreground" />
            <span>{event.venue}</span>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-foreground/90">{event.description}</p>

      {event.highlights.length > 0 && (
        <div className="mt-8">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Highlights
          </span>
          <ul className="mt-3 space-y-2">
            {event.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-8">
        <DedicatedEventButton event={event} />
      </div>
    </motion.div>
  );
}
