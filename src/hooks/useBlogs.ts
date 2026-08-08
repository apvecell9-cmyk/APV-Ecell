import { useCallback, useEffect, useState } from "react";
import type { Blog, BlogSummary } from "@/types/blog";
import {
  getAllBlogs,
  getBlogBySlug,
  getBlogSummaries,
  getRelatedBlogsFor,
} from "@/services/blogService";

export type BlogListState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; blogs: BlogSummary[] };

export function useBlogList(): BlogListState {
  const [state, setState] = useState<BlogListState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getBlogSummaries()
      .then((blogs) => {
        if (!cancelled) setState({ status: "success", blogs });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const err = error instanceof Error ? error : new Error("Failed to load blogs");
        setState({ status: "error", error: err });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export type BlogDetailState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "not_found" }
  | { status: "success"; blog: Blog; related: BlogSummary[] };

export function useBlogDetail(slug: string): BlogDetailState {
  const [state, setState] = useState<BlogDetailState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    Promise.all([getBlogBySlug(slug), getRelatedBlogsFor(slug)])
      .then(([blog, related]) => {
        if (cancelled) return;
        if (!blog) {
          setState({ status: "not_found" });
          return;
        }
        setState({ status: "success", blog, related });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const err = error instanceof Error ? error : new Error("Failed to load blog");
        setState({ status: "error", error: err });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}

export function useAllBlogs(): {
  blogs: Blog[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAllBlogs()
      .then((list) => {
        if (cancelled) return;
        setBlogs(list);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const error = err instanceof Error ? err : new Error("Failed to load blogs");
        setError(error);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { blogs, loading, error, refetch };
}
