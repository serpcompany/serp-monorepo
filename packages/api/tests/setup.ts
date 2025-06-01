import process from 'node:process'
import { vi } from 'vitest'

const mockReadBody = vi.fn()
const mockGetQuery = vi.fn()
const mockGetRouterParam = vi.fn()
const mockGetRouterParams = vi.fn()
const mockCreateError = vi.fn().mockImplementation((options) => {
  const error = new Error(options.message)
  error.statusCode = options.statusCode
  return error
})
const mockGetUserSession = vi.fn().mockResolvedValue({
  user: { siteId: 'user-123', id: 'user-123' },
})
const mockRequireUserSession = vi.fn().mockResolvedValue({
  user: { siteId: 'user-123', id: 'user-123' },
})

// Make auto-imported functions globally available
globalThis.defineEventHandler = vi.fn(handler => handler)
globalThis.readBody = mockReadBody
globalThis.getQuery = mockGetQuery
globalThis.getRouterParam = mockGetRouterParam
globalThis.getRouterParams = mockGetRouterParams
globalThis.createError = mockCreateError
globalThis.getUserSession = mockGetUserSession
globalThis.requireUserSession = mockRequireUserSession

// Mock h3 module for explicit imports
vi.mock('h3', () => ({
  defineEventHandler: handler => handler,
  readBody: mockReadBody,
  getQuery: mockGetQuery,
  getRouterParam: mockGetRouterParam,
  getRouterParams: mockGetRouterParams,
  createError: mockCreateError,
}))

// Create mock database objects
const mockExecute = vi.fn().mockImplementation(() => Promise.resolve([]))

// Simple and reliable approach to mock database operations
const mockDbOperations = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  leftJoin: vi.fn().mockReturnThis(),
  rightJoin: vi.fn().mockReturnThis(),
  fullJoin: vi.fn().mockReturnThis(),
  crossJoin: vi.fn().mockReturnThis(),
  innerJoin: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  groupBy: vi.fn().mockReturnThis(),
  having: vi.fn().mockReturnThis(),
  execute: mockExecute,
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  onConflictDoNothing: vi.fn().mockReturnThis(),
  returning: vi.fn().mockResolvedValue([{ id: 'mock-id' }]),
}

const mockDb = {
  ...mockDbOperations,
  transaction: vi.fn(
    async callback => await callback({ ...mockDbOperations }),
  ),
}

vi.mock('@serp/db/server/database', () => ({
  getDb: vi.fn().mockReturnValue(mockDb),
}))

vi.mock('@serp/db/server/database/auth', () => ({
  getAuthDb: vi.fn().mockReturnValue(mockDb),
}))

// Mock schemas
vi.mock('@serp/db/server/database/auth/schema', () => ({
  domain: { id: 'id', name: 'name' },
  lDomainNewsletter: { domainId: 'domainId', newsletterId: 'newsletterId' },
  newsletterSubscription: { id: 'id', email: 'email' },
}))

vi.mock('@serp/db/server/database/schema', () => ({
  category: { id: 'id', module: 'module', slug: 'slug', name: 'name' },
  entity: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    module: 'module',
    data: 'data',
    singleData: 'singleData',
    categories: 'categories',
    topics: 'topics',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  entityAggregate: {
    entity: 'entity',
    numReviews: 'numReviews',
    numOneStarReviews: 'numOneStarReviews',
    numTwoStarReviews: 'numTwoStarReviews',
    numThreeStarReviews: 'numThreeStarReviews',
    numFourStarReviews: 'numFourStarReviews',
    numFiveStarReviews: 'numFiveStarReviews',
    averageRating: 'averageRating',
    numUpvotes: 'numUpvotes',
    numDownvotes: 'numDownvotes',
    hotScore: 'hotScore',
    hotScoreHour: 'hotScoreHour',
    hotScoreDay: 'hotScoreDay',
    hotScoreWeek: 'hotScoreWeek',
    hotScoreMonth: 'hotScoreMonth',
    hotScoreYear: 'hotScoreYear',
  },
  featuredSubscription: {
    entity: 'entity',
    category: 'category',
    isActive: 'isActive',
    placement: 'placement',
    reservationExpiresAt: 'reservationExpiresAt',
  },
  verification: {
    entity: 'entity',
    user: 'user',
    id: 'id',
  },
  verificationRequest: {
    id: 'id',
    entity: 'entity',
    user: 'user',
    code: 'code',
    expiresAt: 'expiresAt',
    verification: 'verification',
  },
  vote: {
    entity: 'entity',
    user: 'user',
    direction: 'direction',
  },
  comment: {
    id: 'id',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    content: 'content',
    parentId: 'parent_id',
    path: 'path',
    user: 'user',
    entity: 'entity',
  },
  review: {
    id: 'id',
    title: 'title',
    content: 'content',
    rating: 'rating',
    dateOfExperience: 'dateOfExperience',
    createdAt: 'createdAt',
    user: 'user',
    entity: 'entity',
  },
  edit: {
    id: 'id',
    user: 'user',
    entity: 'entity',
    proposedChanges: 'proposedChanges',
    status: 'status',
    createdAt: 'createdAt',
  },
  submitForm: {
    id: 'id',
    entity: 'entity',
    user: 'user',
    module: 'module',
    backlinkVerified: 'backlinkVerified',
    backlinkVerifiedAt: 'backlinkVerifiedAt',
  },
  topic: { id: 'id', module: 'module', slug: 'slug', name: 'name' },
  user: {
    id: 'id',
    name: 'name',
    image: 'image',
  },
}))

// Mock SQL functions
const mockRaw = vi.fn(x => x)
const mockJoin = vi.fn((arr, _separator) => arr.join(','))
const mockSql = vi.fn(query => ({ query }))
mockSql.raw = mockRaw
mockSql.join = mockJoin

vi.mock('drizzle-orm', () => ({
  eq: vi
    .fn()
    .mockImplementation((a, b) => ({ field: a, value: b, operator: 'eq' })),
  and: vi
    .fn()
    .mockImplementation((...conditions) => ({ conditions, operator: 'and' })),
  or: vi
    .fn()
    .mockImplementation((...conditions) => ({ conditions, operator: 'or' })),
  not: vi
    .fn()
    .mockImplementation(condition => ({ condition, operator: 'not' })),
  desc: vi.fn().mockImplementation(field => ({ field, direction: 'desc' })),
  asc: vi.fn().mockImplementation(field => ({ field, direction: 'asc' })),
  inArray: vi.fn().mockImplementation((field, values) => ({
    field,
    values,
    operator: 'inArray',
  })),
  isNull: vi
    .fn()
    .mockImplementation(field => ({ field, operator: 'isNull' })),
  isNotNull: vi
    .fn()
    .mockImplementation(field => ({ field, operator: 'isNotNull' })),
  sql: mockSql,
}))

vi.mock('#nuxt-multi-cache/composables', () => ({
  useDataCache: vi.fn().mockImplementation(() => ({
    value: null,
    addToCache: vi.fn(),
  })),
}))

export {
  mockCreateError,
  mockDb,
  mockExecute,
  mockGetQuery,
  mockGetRouterParam,
  mockGetRouterParams,
  mockGetUserSession,
  mockRequireUserSession,
  mockJoin,
  mockRaw,
  mockReadBody,
  mockSql,
}

process.env.NUXT_PUBLIC_DOMAIN = 'test.domain.com'
