import type { Pagination } from './Pagination'

export interface Review {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  rating: number
  content: string
  dateOfExperience: string
  user: {
    id: number
    name: string
    image?: string
  }
}

export interface Reviews {
  reviews: Review[]
  pagination: Pagination
}
