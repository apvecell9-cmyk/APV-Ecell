import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/features/gallery/components/GalleryPage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Relive APV E-Cell's journey through events, workshops and achievements.",
      },
      { property: "og:title", content: "Gallery — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Relive APV E-Cell's journey through events, workshops and achievements.",
      },
    ],
  }),
  component: GalleryRoute,
});

function GalleryRoute() {
  return <GalleryPage />;
}
