import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/features/home/components/HeroSection";
import { LeadershipSection } from "@/features/home/components/LeadershipSection";
import { MissionVisionSection } from "@/features/home/components/MissionVisionSection";
import { TeamSection } from "@/features/home/components/TeamSection";
import { LandingGallerySection } from "@/features/home/components/LandingGallerySection";
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

      {/* Our Leadership: minimalist aesthetic side-by-side cards */}
      <LeadershipSection />

      {/* Our Mission & Vision: refined minimal editorial layout */}
      <MissionVisionSection />

      {/* Our Teams: departmental cards with hover head photo + member reveal */}
      <TeamSection />

      {/* Gallery preview: cinematic event cards with animated hex background
      <LandingGallerySection /> */}

      {/* Combined References & Incubation Partner in one cohesive section */}
      <CombinedPartnersSection />
    </PageLayout>
  );
}
