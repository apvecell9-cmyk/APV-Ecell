import type { Blog, BlogSummary } from "@/types/blog";
import {
  getRelatedBlogs,
  sortBlogsByDateDesc,
  toBlogSummary,
} from "@/features/blog/utils/blogUtils";

let cache: Blog[] | null = null;
let inflight: Promise<Blog[]> | null = null;

async function loadBlogs(): Promise<Blog[]> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = fetch("/data/blogs.json").then(async (res) => {
    if (!res.ok) {
      throw new Error(`Failed to load blogs (${res.status})`);
    }
    const data = (await res.json()) as Blog[];
    const blogs = Array.isArray(data) ? data : [];
    cache = blogs;
    inflight = null;
    return blogs;
  });

  return inflight;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await loadBlogs();
  return sortBlogsByDateDesc(blogs);
}

export async function getBlogSummaries(): Promise<BlogSummary[]> {
  const blogs = await getAllBlogs();
  return blogs.map(toBlogSummary);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await loadBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}

export async function getRelatedBlogsFor(slug: string): Promise<BlogSummary[]> {
  const blogs = await loadBlogs();
  return getRelatedBlogs(blogs, slug, 3);
}
