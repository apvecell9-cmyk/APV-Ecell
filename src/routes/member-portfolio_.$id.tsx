import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberPortfolioPage } from "@/features/member-portfolio/components/MemberPortfolioPage";

export const Route = createFileRoute("/member-portfolio_/$id")({
  head: () => ({
    meta: [
      { title: "Member Portfolio — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Member portfolio of APV E-Cell.",
      },
    ],
  }),
  component: MemberPortfolioPage,
});

function MemberPortfolioRoute() {
  const { id } = Route.useParams();
  return (
    <PageLayout>
      <MemberPortfolioPage id={id} />
    </PageLayout>
  );
}
