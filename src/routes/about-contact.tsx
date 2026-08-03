import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AboutContactContent } from "@/features/about/components/AboutContactContent";

export const Route = createFileRoute("/about-contact")({
  head: () => ({
    meta: [
      { title: "About & Contact — APV E-Cell Vashi" },
      {
        name: "description",
        content:
          "Our institutional story and contact channels combined into one minimal editorial experience.",
      },
      { property: "og:title", content: "About & Contact — APV E-Cell Vashi" },
      {
        property: "og:description",
        content:
          "Our institutional story and contact channels combined into one minimal editorial experience.",
      },
    ],
  }),
  component: AboutContactRoute,
});

function AboutContactRoute() {
  return <AboutContactContent />;
}
