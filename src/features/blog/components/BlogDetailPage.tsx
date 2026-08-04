import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import type { Blog, BlogSummary } from "@/types/blog";
import { useBlogDetail } from "@/hooks/useBlogs";
import {
  BLOG_PLACEHOLDER_IMAGE,
  calculateReadingTime,
  formatBlogDate,
} from "@/features/blog/utils/blogUtils";
import { BlogCard } from "./BlogCard";

interface BlogDetailPageProps {
  slug: string;
}

function BlogLoading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <span className="text-sm text-muted-foreground">Loading article…</span>
    </div>
  );
}

function BlogNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Blog
      </Link>
      <h1 className="mt-8 font-serif text-4xl text-foreground md:text-5xl">Article not found</h1>
      <p className="mt-4 text-muted-foreground">
        The article you are looking for could not be found or has been moved.
      </p>
    </div>
  );
}

function BlogError() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Blog
      </Link>
      <h1 className="mt-8 font-serif text-4xl text-foreground md:text-5xl">
        Unable to load article
      </h1>
      <p className="mt-4 text-muted-foreground">
        Something went wrong while loading this article. Please try again.
      </p>
    </div>
  );
}

function BlogArticle({ blog }: { blog: Blog }) {
  const [imageSrc, setImageSrc] = useState(blog.coverImage);
  const readingTime = calculateReadingTime(blog);

  return (
    <article>
      <section className="border-b border-border bg-surface px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>
          {blog.featured && (
            <div className="mt-8">
              <span className="rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-background">
                Featured
              </span>
            </div>
          )}
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {blog.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{blog.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-foreground" />
              <span className="font-medium text-foreground">{blog.author}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-foreground" />
              <span>{formatBlogDate(blog.publishedAt)}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-foreground" />
              <span>{readingTime} min read</span>
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={imageSrc}
              alt={blog.title}
              onError={() => {
                if (imageSrc !== BLOG_PLACEHOLDER_IMAGE) {
                  setImageSrc(BLOG_PLACEHOLDER_IMAGE);
                }
              }}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="mt-12 space-y-12">
            {blog.sections.map((section, index) => (
              <section key={index} className="space-y-4">
                <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-base leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function RelatedArticles({ related }: { related: BlogSummary[] }) {
  if (related.length === 0) return null;

  return (
    <section className="border-t border-border bg-background px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">Keep Reading</span>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
              Related Articles
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center md:gap-2"
          >
            View all articles
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <BlogCard key={item.id} blog={item} readingTime={1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const state = useBlogDetail(slug);

  if (state.status === "loading") return <BlogLoading />;
  if (state.status === "not_found") return <BlogNotFound />;
  if (state.status === "error") return <BlogError />;

  return (
    <>
      <BlogArticle blog={state.blog} />
      <RelatedArticles related={state.related} />
    </>
  );
}
