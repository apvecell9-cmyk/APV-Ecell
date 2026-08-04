import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BlogDetailPage } from "@/features/blog/components/BlogDetailPage";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Article — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Read the latest articles from the APV E-Cell community.",
      },
      { property: "og:title", content: "Article — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Read the latest articles from the APV E-Cell community.",
      },
    ],
  }),
  component: BlogDetailRoute,
});

function BlogDetailRoute() {
  const { slug } = Route.useParams();
  return <BlogDetailPage slug={slug} />;
}
