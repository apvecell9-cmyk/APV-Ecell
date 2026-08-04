import React, { useEffect, useState } from "react";
import type { Blog } from "@/types/blog";
import { useBlogList } from "@/hooks/useBlogs";
import { getAllBlogs as getAllBlogsService } from "@/services/blogService";
import { BlogHero } from "./BlogHero";
import { BlogGrid } from "./BlogGrid";
import { EmptyBlogList } from "./EmptyBlogList";

export function BlogListPage() {
  const state = useBlogList();
  const [fullBlogs, setFullBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    let cancelled = false;
    getAllBlogsService()
      .then((blogs) => {
        if (!cancelled) setFullBlogs(blogs);
      })
      .catch(() => {
        if (!cancelled) setFullBlogs([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <BlogHero />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {state.status === "loading" && (
          <div className="flex h-64 items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading articles…</span>
          </div>
        )}

        {state.status === "error" && (
          <EmptyBlogList
            title="Unable to load articles"
            description="We couldn't reach the blog archive. Please refresh the page to try again."
          />
        )}

        {state.status === "success" && state.blogs.length === 0 && <EmptyBlogList />}

        {state.status === "success" && state.blogs.length > 0 && (
          <BlogGrid blogs={state.blogs} fullBlogs={fullBlogs} />
        )}
      </section>
    </>
  );
}
