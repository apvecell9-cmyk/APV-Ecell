import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { BlogSummary } from "@/types/blog";
import { BLOG_PLACEHOLDER_IMAGE } from "@/features/blog/utils/blogUtils";
import { calculateReadingTime, formatBlogDate } from "@/features/blog/utils/blogUtils";

interface BlogCardProps {
  blog: BlogSummary;
  readingTime: number;
}

export function BlogCard({ blog, readingTime }: BlogCardProps) {
  const [imageSrc, setImageSrc] = useState(blog.coverImage);

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: blog.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={blog.title}
          loading="lazy"
          onError={() => {
            if (imageSrc !== BLOG_PLACEHOLDER_IMAGE) {
              setImageSrc(BLOG_PLACEHOLDER_IMAGE);
            }
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {blog.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-background">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{formatBlogDate(blog.publishedAt)}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTime} min read
          </span>
        </div>

        <h3 className="font-serif text-xl font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground">
          {blog.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p>

        <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4 text-xs">
          <span className="font-medium text-foreground">{blog.author}</span>
          <span className="font-mono uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
