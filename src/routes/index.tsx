import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/features/home/components/HeroSection";
import { AboutECellSection } from "@/features/home/components/AboutECellSection";
import { MissionVisionSection } from "@/features/home/components/MissionVisionSection";
import { FatherAgnelSection } from "@/features/home/components/FatherAgnelSection";
import { LeadershipSection } from "@/features/home/components/LeadershipSection";
import { UpcomingEventsSection } from "@/features/home/components/UpcomingEventsSection";
import { TeamSection } from "@/features/home/components/TeamSection";
import { CombinedPartnersSection } from "@/features/home/components/CombinedPartnersSection";

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

      {/* About E-Cell: quick intro + three pillars */}
      <AboutECellSection />

      {/* Our Mission & Vision: refined minimal editorial layout */}
      <MissionVisionSection />

      {/* Father Agnel / Agnel Polytechnic origins + founder vision */}
      <FatherAgnelSection />

      {/* Our Leadership: minimalist aesthetic side-by-side cards */}
      <LeadershipSection />

      {/* Upcoming Events: real, scheduled events with animated hex background */}
      <UpcomingEventsSection />

      {/* Our Teams: departmental cards with hover head photo + member reveal */}
      <TeamSection />

      {/* Combined References & Incubation Partner in one cohesive section */}
      <CombinedPartnersSection />
    </PageLayout>
  );
}
