import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberPortfolioPage } from "@/features/member-portfolio/components/MemberPortfolioPage";

export const Route = createFileRoute("/member-portfolio_/$id")({
  head: () => ({
    meta: [
      { title: "Member Profile — APV E-Cell Vashi" },
      {
        name: "description",
        content: "View the profile of an APV E-Cell team member.",
      },
      { property: "og:title", content: "Member Profile — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "View the profile of an APV E-Cell team member.",
      },
    ],
  }),
  component: MemberPortfolioRoute,
});

function MemberPortfolioRoute() {
  const { id } = Route.useParams();
  return (
    <PageLayout>
      <MemberPortfolioPage id={id} />
    </PageLayout>
  );
}
