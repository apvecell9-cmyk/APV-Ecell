import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { BlogListPage } from "@/features/blog/components/BlogListPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — APV E-Cell Vashi" },
      {
        name: "description",
        content:
          "Field notes, playbooks, and honest reflections from the APV E-Cell community of student founders and mentors.",
      },
      { property: "og:title", content: "Blog — APV E-Cell Vashi" },
      {
        property: "og:description",
        content:
          "Field notes, playbooks, and honest reflections from the APV E-Cell community of student founders and mentors.",
      },
    ],
  }),
  component: BlogListRoute,
});

function BlogListRoute() {
  return (
    <PageLayout>
      <BlogListPage />
    </PageLayout>
  );
}
