import type { BaseEntity, Category, Topic } from '@serp/types/types'

// TODO: Add types for the properties
export type ServiceProvider = BaseEntity & {
  id?: number
  createdAt?: string
  name?: string
  slug?: string
  logoUrl?: string // TODO: refactor to `logo` to match other company module
  excerpt?: string // TODO: add exercept to DB + generate them
  content?: string
  basicInfo?: Record<string, unknown>
  contracts?: Record<string, unknown>
  pricing?: Record<string, unknown>
  services?: Record<string, unknown>
  industries?: Record<string, unknown>
  businessesServed?: Record<string, unknown>
  supportSetup?: Record<string, unknown>
  ratings?: Record<string, unknown>
  serplyLink?: string
  categories?: Category[]
  topics?: Topic[]
  // TODO: refactor this + type Company to extend from a common base type
  // TODO: add these fields into the DB ---------- 👇
  faqs?: Faq[]
  featured?: boolean
  featuredOrder?: number
  videoId?: string
  numReviews?: number
  numOneStarReviews?: number
  numTwoStarReviews?: number
  numThreeStarReviews?: number
  numFourStarReviews?: number
  numFiveStarReviews?: number
  averageRating?: number
  alternatives?: string[]
  screenshots?: string[]
  features?: Feature[]
  verified?: number // id of verification table row (null = not verified)
  // TODO: add these fields into the DB ---------- 👆
}

export type ServiceProviderIndex = BaseEntity & {
  id: number
  name: string
  slug: string
  logoUrl: string
  exerpt?: string
  basicInfo: Record<string, unknown>
  industries: Record<string, unknown>
  ratings: Record<string, unknown>
  serplyLink: string
  categories?: Category[]
  topics?: Topic[]
}

export interface ServiceProviders {
  serviceProviders: ServiceProviderIndex[]
  pagination: Pagination
  category?: Category
}
