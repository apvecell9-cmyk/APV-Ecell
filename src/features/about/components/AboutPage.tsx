import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AboutHero } from "./AboutHero";
import { AboutStory } from "./AboutStory";

export function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <AboutStory />
    </PageLayout>
  );
}
