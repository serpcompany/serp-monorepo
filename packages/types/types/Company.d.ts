import type { Category, RawCategory } from '~/types/Category';
import type { Faq, RawFaq } from '~/types/Faq';

export type Feature = {
  id: number;
  item: string;
  description: string;
};

export type RawFeature = {
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
  article: string;
  features?: Feature[];
  pros?: string[];
  cons?: string[];
  faqs?: Faq[];
  alternatives?: string[];
  categories?: Category[];
  screenshots?: string[];
  rating?: number;
  upvotes?: number;
  downvotes?: number;
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

export type RawCompany = {
  id: number;
  name: string;
  slug: string;
  oneLiner?: string;
  excerpt?: string;
  logo?: string;
  serplyLink: string;
  content: string;
  features?: RawFeature[];
  pros?: string[];
  cons?: string[];
  faqs?: RawFaq[];
  alternatives?: string[];
  categories?: RawCategory[];
  screenshots?: string[];
  rating?: number;
  upvotes?: number;
  downvotes?: number;
};

export type RawCompanyIndex = {
  id: number;
  name: string;
  slug: string;
  oneLiner?: string;
  excerpt?: string;
  logo?: string;
  serplyLink: string;
  categories?: RawCategory[];
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
