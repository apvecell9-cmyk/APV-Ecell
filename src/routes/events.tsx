import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { EventsPage } from "@/features/events/components/EventsPage";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Pitchnova — APV E-Cell Vashi" },
      {
        name: "description",
        content:
          "Interactive timeline chronicling the journey of APV E-Cell through flagship events, workshops, and national pitching championships.",
      },
      { property: "og:title", content: "Events & Pitchnova — APV E-Cell Vashi" },
      {
        property: "og:description",
        content:
          "Interactive timeline chronicling the journey of APV E-Cell through flagship events, workshops, and national pitching championships.",
      },
    ],
  }),
  component: EventsRoute,
});

function EventsRoute() {
  return (
    <PageLayout>
      <EventsPage />
    </PageLayout>
  );
}
