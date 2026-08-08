import React from "react";
import { BookOpen } from "lucide-react";

interface EmptyBlogListProps {
  title?: string;
  description?: string;
}

export function EmptyBlogList({
  title = "No blog posts yet",
  description = "Stories, playbooks, and field notes from the E-Cell community will appear here.",
}: EmptyBlogListProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
        <BookOpen className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-normal tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
