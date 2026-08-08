import React from "react";

export function BlogHero() {
  return (
    <section className="relative border-b border-border bg-surface px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Insights & Stories</span>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
          The E-Cell Blog
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Field notes, playbooks, and honest reflections from the students, founders, and mentors
          building the next generation of Indian entrepreneurship.
        </p>
      </div>
    </section>
  );
}
