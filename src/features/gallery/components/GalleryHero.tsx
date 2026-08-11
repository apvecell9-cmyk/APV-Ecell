import React from "react";

export function GalleryHero() {
  return (
    <div className="relative z-10 pb-2 pt-24 text-center lg:pt-28">
      {/* <span className="eyebrow animate-fade-in-up stagger-1">Moments & Memories</span> */}
      <h1 className="mt-1.5 font-serif text-3xl tracking-tight text-foreground animate-fade-in-up stagger-2 md:text-5xl">
        Moments & Memories
      </h1>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground animate-fade-in-up stagger-3">
        Relive our journey through events, workshops and achievements.
      </p>
    </div>
  );
}
