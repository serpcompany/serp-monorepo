import type { Category, Pagination, Topic } from '@serp/types/types'

export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  slug: string
  module: string
  featured?: boolean
  featuredOrder?: number
  categories?: Category[]
  topics?: Topic[]
  numReviews?: number
  numOneStarReviews?: number
  numTwoStarReviews?: number
  numThreeStarReviews?: number
  numFourStarReviews?: number
  numFiveStarReviews?: number
  averageRating?: number
  numUpvotes?: number
  numDownvotes?: number
  hotScore?: number
  hotScoreHour?: number
  hotScoreDay?: number
  hotScoreWeek?: number
  hotScoreMonth?: number
  hotScoreYear?: number
  usersCurrentVote?: boolean // true = upvote, false = downvote, null = no vote
}

export type Entity = BaseEntity & {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  slug: string
  module: string
  data: object
  singleData?: object
  featured?: boolean
  featuredOrder?: number
  categories?: Category[]
  topics?: Topic[]
  numReviews?: number
  numOneStarReviews?: number
  numTwoStarReviews?: number
  numThreeStarReviews?: number
  numFourStarReviews?: number
  numFiveStarReviews?: number
  averageRating?: number
  numUpvotes?: number
  numDownvotes?: number
  hotScore?: number
  hotScoreHour?: number
  hotScoreDay?: number
  hotScoreWeek?: number
  hotScoreMonth?: number
  hotScoreYear?: number
  usersCurrentVote?: boolean // true = upvote, false = downvote, null = no vote
}

export interface EntitySearchResult {
  id: number
  name: string
  slug: string
  module: string
}

export interface Entities {
  entities: Entity[]
  pagination: Pagination
  category: Category
}
