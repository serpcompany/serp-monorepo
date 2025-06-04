import type { BaseEntity, Category, Pagination } from './Pagination'

export type MCPServer = BaseEntity & {
  id: number
  slug: string
  url: string
  description: string
  tags: string[]
  contributors: string[]
  readme: string
  owner: string
  repo: string
  stars: number
  forks: number
  topics: string[]
  languages: string[]
  repoCreatedAt: string
  repoUpdatedAt: string
  categories: Category[]
  serplyLink: string
}

export type MCPServerIndex = BaseEntity & {
  id: number
  slug: string
  url: string
  description: string
  tags: string[]
  contributors: string[]
  owner: string
  repo: string
  stars: number
  forks: number
  topics: string[]
  languages: string[]
  repoCreatedAt: string
  repoUpdatedAt: string
  categories: Category[]
  serplyLink: string
}

export interface MCPServers {
  servers: MCPServerIndex[]
  pagination: Pagination
  category: Category
}
