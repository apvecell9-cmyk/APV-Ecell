import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-muted transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ minHeight: "420px" }}
    >
      {/* Full-bleed image */}
      <img
        src={imageSrc}
        alt={blog.title}
        loading="lazy"
        onError={() => {
          if (imageSrc !== BLOG_PLACEHOLDER_IMAGE) {
            setImageSrc(BLOG_PLACEHOLDER_IMAGE);
          }
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Featured badge */}
      {blog.featured && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
          Featured
        </span>
      )}

      {/* Content overlay — positioned at bottom */}
      <div className="relative z-10 mt-auto flex flex-col gap-2 p-5 sm:p-6">
        {/* Metadata */}
        <div className="flex items-center gap-2 text-[11px] text-white/70">
          <span className="font-mono">{formatBlogDate(blog.publishedAt)}</span>
          <span className="text-white/40">•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm leading-relaxed text-white/70">
          {blog.excerpt}
        </p>

        {/* Read action */}
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/90 transition-colors group-hover:text-white">
          <span>Read article</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
