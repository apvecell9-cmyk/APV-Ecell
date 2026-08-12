import React, { useEffect, useState, useMemo } from "react";
import type { Blog } from "@/types/blog";
import { useBlogList } from "@/hooks/useBlogs";
import { getAllBlogs as getAllBlogsService } from "@/services/blogService";
import { HexagonBackground } from "@/features/gallery/components/HexagonBackground";
import { BlogHero } from "./BlogHero";
import { BlogGrid } from "./BlogGrid";
import { EmptyBlogList } from "./EmptyBlogList";

export function BlogListPage() {
  const state = useBlogList();
  const [fullBlogs, setFullBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="relative bg-background">
      {/* Hexagon background covering entire page */}
      <HexagonBackground
        opacity={0.10}
        animated={true}
        animationSpeed="fast"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Content layer */}
      <div className="relative z-10">
        <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {state.status === "loading" && (
          <div className="flex h-64 items-center justify-center px-6">
            <span className="text-sm text-muted-foreground">Loading articles…</span>
          </div>
        )}

        {state.status === "error" && (
          <div className="px-6">
            <EmptyBlogList
              title="Unable to load articles"
              description="We couldn't reach the blog archive. Please refresh the page to try again."
            />
          </div>
        )}
        
        {state.status === "success" && (
          <BlogGrid blogs={fullBlogs} fullBlogs={fullBlogs} />
        )}
      </div>
    </div>
  );
}
