import type { BaseEntity, Category, Comment, Faq } from '@serp/types/types';

export type Feature = {
  id: number;
  item: string;
  description: string;
};

export type Company = BaseEntity & {
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
  videoId?: string;
  numReviews?: number;
  numOneStarReviews?: number;
  numTwoStarReviews?: number;
  numThreeStarReviews?: number;
  numFourStarReviews?: number;
  numFiveStarReviews?: number;
  averageRating?: number;
  verified?: number; // id of verification table row (null = not verified)
};

export type CompanyIndex = BaseEntity & {
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
  category?: Category;
};

export type CompanyReview = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  rating: number;
  content: string;
  dateOfExperience: string;
  user: {
    id: number;
    name: string;
    image?: string;
  };
};

export type Reviews = {
  reviews: CompanyReview[];
  pagination: Pagination;
};

export type CompanySubmissionForm = {
  name: string;
  domain: string;
  pricing: string;
  tags: string;
  oneLiner: string;
  description: string;
  categories: string[];
  logo: string;
};

export type CompanyFormField = {
  key: keyof CompanySubmissionForm;
  label: string;
};
