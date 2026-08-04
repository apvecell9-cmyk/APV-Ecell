export interface BlogSection {
  heading: string;
  content: string[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  featured: boolean;
  sections: BlogSection[];
}

export interface BlogSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  featured: boolean;
}
