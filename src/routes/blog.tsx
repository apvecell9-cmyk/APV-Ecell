import React from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
