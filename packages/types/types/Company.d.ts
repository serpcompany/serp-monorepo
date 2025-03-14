import type { Category, Faq, Comment } from '@serp/types/types';

export type Feature = {
  id: number;
  item: string;
  description: string;
};

export type Company = {
  id: number;
  name: string;
  slug: string;
  oneLiner?: string;
  excerpt?: string;
  logo?: string;
  serplyLink: string;
  content: string;
  features?: Feature[];
  pros?: string[];
  cons?: string[];
  faqs?: Faq[];
  alternatives?: string[];
  categories?: Category[];
  screenshots?: string[];
  rating?: number;
  upvotes?: string[];
  downvotes?: number;
  comments?: Comment[];
  featured?: boolean;
  featuredOrder?: number;
};

export type CompanyIndex = {
  id: number;
  name: string;
  slug: string;
  oneLiner?: string;
  excerpt?: string;
  logo?: string;
  serplyLink: string;
  categories?: Category[];
  screenshots?: string[];
  rating?: number;
  upvotes?: number;
  downvotes?: number;
};

export type Companies = {
  companies: Company[];
  pagination: Pagination;
  categoryArticle?: string;
  categoryName?: string;
};
