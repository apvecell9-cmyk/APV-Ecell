import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EventsContent } from "@/features/events/components/EventsContent";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Document Repository — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Interactive hexagonal event chronicle with PDF document upload system.",
      },
      { property: "og:title", content: "Events & Document Repository — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Interactive hexagonal event chronicle with PDF document upload system.",
      },
    ],
  }),
  component: EventsRoute,
});

function EventsRoute() {
  return <EventsContent />;
}
