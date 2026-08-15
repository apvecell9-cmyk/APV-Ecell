import React, { useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AboutHero } from "./AboutHero";
import { AboutStory } from "./AboutStory";

const ABOUT_THEME = {
  backgroundImage: "/AboutUs/AboutUsImg.png",

  // "light" = dark background → light content
  // "dark"  = light background → dark content
  mode: "light",
};

export function AboutPage() {
  const isLightContent = ABOUT_THEME.mode === "light";

  useEffect(() => {
    // Preload the About background once.
    const image = new Image();
    image.src = ABOUT_THEME.backgroundImage;
  }, []);

  return (
    <PageLayout mainClassName="flex-1 p-0">
      <div
        className="relative isolate overflow-hidden"
        style={
          {
            "--about-text": isLightContent ? "#ffffff" : "#111111",
            "--about-muted": isLightContent
              ? "rgba(255,255,255,0.85)"
              : "rgba(17,17,17,0.75)",
            "--about-border": isLightContent
              ? "rgba(255,255,255,0.2)"
              : "rgba(17,17,17,0.2)",
          } as React.CSSProperties
        }
      >
        {/* ONE background for the entire About page */}
        <div className="absolute inset-0 -z-10">
          <img
            src={ABOUT_THEME.backgroundImage}
            alt=""
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/30" />
        </div>

        <AboutHero />
        <AboutStory />
      </div>
    </PageLayout>
  );
}