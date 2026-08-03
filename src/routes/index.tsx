import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { HeroSection } from "@/components/HeroSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { MissionVisionSection } from "@/components/MissionVisionSection";
import { TeamSection } from "@/components/TeamSection";
import { CombinedPartnersSection } from "@/components/CombinedPartnersSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageLayout
      className="selection:bg-foreground selection:text-background"
      mainClassName="flex-1"
    >
      {/* Landing page hero section with flowing background image */}
      <HeroSection />

      {/* Our Leadership: minimalist aesthetic side-by-side cards */}
      <LeadershipSection />

      {/* Our Mission & Vision: refined minimal editorial layout */}
      <MissionVisionSection />

      {/* Our Teams: departmental cards with hover head photo + member reveal */}
      <TeamSection />

      {/* Combined References & Incubation Partner in one cohesive section */}
      <CombinedPartnersSection />
    </PageLayout>
  );
}
