import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { DedicatedEventButton } from "./DedicatedEventButton";

interface EventDetailPanelProps {
  event: EventData;
}

export function EventDetailPanel({ event }: EventDetailPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
      <span className="eyebrow">Event Details</span>

      <h2 className="mt-3 font-serif text-2xl font-normal leading-tight text-foreground md:text-3xl">
        {event.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{event.subtitle}</p>

      <div className="mt-6 space-y-3 border-t border-hairline pt-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 shrink-0 text-foreground" />
          <span>{event.date}</span>
        </div>
        {event.time && (
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-foreground" />
            <span>{event.time}</span>
          </div>
        )}
        {event.venue && (
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-foreground" />
            <span>{event.venue}</span>
          </div>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-foreground/90">{event.description}</p>

      {event.highlights.length > 0 && (
        <div className="mt-6">
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

      <div className="mt-auto pt-6">
        <DedicatedEventButton event={event} />
      </div>
    </div>
  );
}
