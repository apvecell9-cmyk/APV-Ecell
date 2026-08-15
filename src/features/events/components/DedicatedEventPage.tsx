import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import type { EventData } from "@/types/events";
import { getEventBySlug } from "@/services/eventLoader";

interface DedicatedEventPageProps {
  slug: string;
}

function getStatusClass(status: string): string {
  const lower = status.toLowerCase();
  if (lower === "flagship") {
    return "bg-foreground text-background";
  }
  if (lower === "upcoming") {
    return "bg-secondary text-secondary-foreground";
  }
  return "bg-secondary text-muted-foreground";
}

export function DedicatedEventPage({ slug }: DedicatedEventPageProps) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getEventBySlug(slug)
      .then((result) => {
        if (cancelled) return;
        if (result === null) {
          setNotFound(true);
          setEvent(null);
        } else {
          setEvent(result.event);
        }
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading event…</span>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Events
        </Link>
        <h1 className="mt-8 font-serif text-4xl text-foreground md:text-5xl">Event not found</h1>
        <p className="mt-4 text-muted-foreground">
          The event you are looking for could not be found.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative border-b border-border bg-surface px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Events
          </Link>
          <div className="mt-8 flex items-center gap-3 text-xs">
            <span className="font-mono text-muted-foreground">{event.year}</span>
            <span className="text-muted-foreground/50">•</span>
            <span
              className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${getStatusClass(event.status)}`}
            >
              {event.status}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
            {event.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{event.subtitle}</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
              <span className="eyebrow">About the Event</span>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                {event.description}
              </p>
            </div>

            {event.highlights.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
                <span className="eyebrow">Highlights</span>
                <ul className="mt-4 space-y-3">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <span className="eyebrow">Event Information</span>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-foreground" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-foreground" />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                    <span>{event.venue}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
