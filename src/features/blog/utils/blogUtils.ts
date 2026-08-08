import type { Blog, BlogSection, BlogSummary } from "@/types/blog";

const WORDS_PER_MINUTE = 220;
export const BLOG_PLACEHOLDER_IMAGE = "/blog/placeholder.webp";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function sectionWordCount(section: BlogSection): number {
  return section.content.reduce((total, paragraph) => total + countWords(paragraph), 0);
}

export function calculateReadingTime(blog: Pick<Blog, "sections">): number {
  const totalWords = blog.sections.reduce((total, section) => total + sectionWordCount(section), 0);
  return Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
}

export function sortBlogsByDateDesc(blogs: Blog[]): Blog[] {
  return [...blogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function toBlogSummary(blog: Blog): BlogSummary {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    author: blog.author,
    publishedAt: blog.publishedAt,
    featured: blog.featured,
  };
}

export function getRelatedBlogs(blogs: Blog[], currentSlug: string, limit = 3): BlogSummary[] {
  return sortBlogsByDateDesc(blogs.filter((blog) => blog.slug !== currentSlug))
    .slice(0, limit)
    .map(toBlogSummary);
}

export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
