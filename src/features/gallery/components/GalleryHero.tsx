import React from "react";

export function GalleryHero() {
  return (
    <section className="relative border-b border-border bg-background hex-grid px-6 py-10 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Moments & Memories</span>
        <h1 className="mt-1.5 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
          Gallery
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Relive our journey through events, workshops and achievements.
        </p>
      </div>
    </section>
  );
}
