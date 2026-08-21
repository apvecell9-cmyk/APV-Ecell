import React from "react";
import type { AboutSection } from "@/types/events";

interface EventAboutProps {
  about: AboutSection | undefined;
  fallbackDescription: string;
}

export function EventAbout({ about, fallbackDescription }: EventAboutProps) {
  const hasEnhancedAbout = Boolean(about);

  if (!hasEnhancedAbout) {
    return (
      <p className="text-sm leading-relaxed text-foreground/85">{fallbackDescription}</p>
    );
  }

  const paragraphs = about!.paragraphs ?? [];
  const image = about!.image;

  if (paragraphs.length === 0 && !image) {
    return (
      <p className="text-sm leading-relaxed text-foreground/85">{fallbackDescription}</p>
    );
  }

  if (!image) {
    return (
      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground/85">
            {para}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-foreground/85">
            {para}
          </p>
        ))}
      </div>
      <img
        src={image!}
        alt={about!.title ?? "About"}
        className="w-full rounded-lg object-cover"
        style={{ maxHeight: "320px" }}
        loading="lazy"
      />
    </div>
  );
}
