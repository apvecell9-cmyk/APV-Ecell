import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { EventData } from "@/types/events";

interface DedicatedEventButtonProps {
  event: EventData;
}

export function DedicatedEventButton({ event }: DedicatedEventButtonProps) {
  if (!event.dedicatedPage || !event.pageUrl) {
    return null;
  }

  return (
    <Link
      to={event.pageUrl}
      className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Explore Full Event
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  );
}
