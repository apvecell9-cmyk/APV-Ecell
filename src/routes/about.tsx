import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/features/about/components/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — APV E-Cell Vashi" },
      {
        name: "description",
        content:
          "Learn about Agnel Polytechnic, Vashi and the entrepreneurial story of APV E-Cell.",
      },
      { property: "og:title", content: "About Us — APV E-Cell Vashi" },
      {
        property: "og:description",
        content:
          "Learn about Agnel Polytechnic, Vashi and the entrepreneurial story of APV E-Cell.",
      },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return <AboutPage />;
}
