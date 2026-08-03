import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TimelineEventsContent } from "@/components/TimelineEventsContent";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline & Document Repository — APV E-Cell Vashi" },
      { name: "description", content: "Interactive hexagonal event chronicle with PDF document upload system." },
      { property: "og:title", content: "Timeline & Document Repository — APV E-Cell Vashi" },
      { property: "og:description", content: "Interactive hexagonal event chronicle with PDF document upload system." },
    ],
  }),
  component: TimelineRoute,
});

function TimelineRoute() {
  return <TimelineEventsContent />;
}
