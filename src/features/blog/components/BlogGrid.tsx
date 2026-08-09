import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Blog, BlogSummary } from "@/types/blog";
import { calculateReadingTime } from "@/features/blog/utils/blogUtils";
import { BlogCard } from "./BlogCard";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.3,
    },
  },
};

const rmContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

export const cardEntrance = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export const rmCardEntrance = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
};

interface BlogGridProps {
  blogs: BlogSummary[];
  fullBlogs?: Blog[];
}

export function BlogGrid({ blogs, fullBlogs }: BlogGridProps) {
  const reducedMotion = useReducedMotion();

  if (blogs.length === 0) return null;

  const cVar = reducedMotion ? rmContainer : containerVariants;
  const cInner = reducedMotion ? rmCardEntrance : cardEntrance;

  return (
    <section className="relative px-6 pb-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Article grid */}
        <motion.div
          variants={cVar}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {blogs.map((blog) => {
            const fullBlog = fullBlogs?.find((item) => item.slug === blog.slug);
            const readingTime = fullBlog ? calculateReadingTime(fullBlog) : 1;
            return (
              <motion.div key={blog.id} variants={cInner}>
                <BlogCard blog={blog} readingTime={readingTime} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
