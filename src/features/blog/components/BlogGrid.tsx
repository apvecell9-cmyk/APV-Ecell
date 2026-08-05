import React from "react";
import type { Blog, BlogSummary } from "@/types/blog";
import { calculateReadingTime } from "@/features/blog/utils/blogUtils";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  blogs: BlogSummary[];
  fullBlogs?: Blog[];
}

export function BlogGrid({ blogs, fullBlogs }: BlogGridProps) {
  if (blogs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => {
        const fullBlog = fullBlogs?.find((item) => item.slug === blog.slug);
        const readingTime = fullBlog ? calculateReadingTime(fullBlog) : 1;
        return <BlogCard key={blog.id} blog={blog} readingTime={readingTime} />;
      })}
    </div>
  );
}
