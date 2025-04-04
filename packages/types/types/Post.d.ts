import type { Category, Comment, Pagination } from '@serp/types/types';

export type Post = {
  id: number;
  title: string;
  slug: string;
  author?: string;
  excerpt?: string;
  featuredImage?: string;
  content: string;
  categories?: Category[];
  createdAt?: string;
  updatedAt?: string;
  videoId?: string;
  oneLiner?: string;
  relatedPosts?: PostIndex[];
  module?: string;
  keyword?: string;
  comments?: Comment[];
  upvotes?: string[];
};

export type PostIndex = {
  id: number;
  title: string;
  slug: string;
  author?: string;
  excerpt?: string;
  featuredImage?: string;
  categories?: Category[];
  createdAt?: string;
  oneLiner?: string;
  module?: string;
  keyword?: string;
};

export type PostIndexCloudflare = {
  id: number;
  title: string;
  slug: string;
  author?: string;
  excerpt?: string;
  featured_image?: string;
  categories?: Category[];
  created_at?: string;
  one_liner?: string;
  module?: string;
  keyword?: string;
};

export type Posts = {
  posts: PostIndex[];
  pagination: Pagination;
  categoryName?: string;
};
