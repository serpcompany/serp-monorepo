import type { Category, Pagination, Topic } from '@serp/types/types';

export type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  module: string;
  featured?: boolean;
  featuredOrder?: number;
  categories?: Category[];
  topics?: Topic[];
  numReviews?: number;
  numOneStarReviews?: number;
  numTwoStarReviews?: number;
  numThreeStarReviews?: number;
  numFourStarReviews?: number;
  numFiveStarReviews?: number;
  averageRating?: number;
  numUpvotes?: number;
  numDownvotes?: number;
  hotScore?: number;
  hotScoreHour?: number;
  hotScoreDay?: number;
  hotScoreWeek?: number;
  hotScoreMonth?: number;
  hotScoreYear?: number;
  usersCurrentVote?: boolean; // true = upvote, false = downvote, null = no vote
};

export type Entity = BaseEntity & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  module: string;
  data: object;
  singleData?: object;
  featured?: boolean;
  featuredOrder?: number;
  categories?: Category[];
  topics?: Topic[];
  numReviews?: number;
  numOneStarReviews?: number;
  numTwoStarReviews?: number;
  numThreeStarReviews?: number;
  numFourStarReviews?: number;
  numFiveStarReviews?: number;
  averageRating?: number;
  numUpvotes?: number;
  numDownvotes?: number;
  hotScore?: number;
  hotScoreHour?: number;
  hotScoreDay?: number;
  hotScoreWeek?: number;
  hotScoreMonth?: number;
  hotScoreYear?: number;
  usersCurrentVote?: boolean; // true = upvote, false = downvote, null = no vote
};

export type EntitySearchResult = {
  id: number;
  name: string;
  slug: string;
  module: string;
};

export type Entities = {
  entities: Entity[];
  pagination: Pagination;
  category: Category;
};

export type EntitiesParams = {
  page?: number;
  limit?: number;
  categorySlug?: string;
  name?: string;
  sort?: string;
};

export interface EntitiesResponse<T> {
  entities: T[];
  pagination: Pagination;
  category: Category;
}
