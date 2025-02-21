import type { Category, Pagination } from '@serp/types/types';

export type Post = {
  id: number;
  title: string;
  slug: string;
  author?: string;
  excerpt?: string;
  image?: string;
  content: string;
  categories?: Category[];
  createdAt?: string;
  updatedAt?: string;
  videoId?: string;
  oneLiner?: string;
  relatedPosts?: PostIndex[];
  module?: string;
};

export type RawPost = {
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
  oneLiner?: string;
  videoId?: string;
  relatedPosts?: PostIndex[];
  module?: string;
};

export type PostIndex = {
  id: number;
  title: string;
  slug: string;
  author?: string;
  excerpt?: string;
  image?: string;
  categories?: Category[];
  createdAt?: string;
  oneLiner?: string;
  module?: string;
};

export type RawPostIndex = {
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
};

export type Posts = {
  posts: PostIndex[];
  pagination: Pagination;
  categoryName?: string;
};
