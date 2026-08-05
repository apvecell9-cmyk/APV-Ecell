import React from "react";

export function GalleryHero() {
  return (
    <section className="relative border-b border-border bg-surface px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Moments & Memories</span>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
          Gallery
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Relive our journey through events, workshops and achievements.
        </p>
      </div>
    </section>
  );
}
