import React from "react";

export function ContactHero() {
  return (
    <section className="border-b border-border bg-surface px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Contact Us</span>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
          Let's Build Something Together
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Reach out to APV E-Cell for partnerships, sponsorships, mentorship, or any questions about
          our events and initiatives.
        </p>
      </div>
    </section>
  );
}
