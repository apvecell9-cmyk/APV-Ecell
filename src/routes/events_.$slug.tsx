import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { DedicatedEventPage } from "@/features/events/components/DedicatedEventPage";

export const Route = createFileRoute("/events_/$slug")({
  head: () => ({
    meta: [
      { title: "Event — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Dedicated event page for APV E-Cell events and initiatives.",
      },
      { property: "og:title", content: "Event — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Dedicated event page for APV E-Cell events and initiatives.",
      },
    ],
  }),
  component: DedicatedEventRoute,
});

function DedicatedEventRoute() {
  const { slug } = Route.useParams();
  return (
    <PageLayout>
      <DedicatedEventPage slug={slug} />
    </PageLayout>
  );
}
