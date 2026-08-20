import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MemberPortfolioPage } from "@/features/member-portfolio/components/MemberPortfolioPage";

export const Route = createFileRoute("/member-portfolio_/$id")({
  head: () => ({
    meta: [
      { title: "Member Profile — APV E-Cell Vashi" },
      {
        name: "description",
        content: "Individual member portfolio page for APV E-Cell Vashi team members.",
      },
      { property: "og:title", content: "Member Profile — APV E-Cell Vashi" },
      {
        property: "og:description",
        content: "Individual member portfolio page for APV E-Cell Vashi team members.",
      },
    ],
  }),
  component: MemberPortfolioRoute,
});

function MemberPortfolioRoute() {
  const { id } = Route.useParams();
  return <MemberPortfolioPage id={id} />;
}
