import React from "react";
import { Search } from "lucide-react";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <section className="relative px-6 pt-24 pb-10 lg:px-12 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow text-muted-foreground/80">Insights & Stories</span>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
          The E-Cell Blog
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Insights for the next generation of innovators
        </p>
      </div>
    </section>
  );
}
