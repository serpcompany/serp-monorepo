import { vi } from 'vitest'

// Mock SQL client
export const mockSqlClient = {
  // Add methods that might be called on the SQL client
  query: vi.fn(),
  end: vi.fn(),
}

// Mock Drizzle ORM instance
export const mockDrizzleInstance = {
  // Add methods that might be called on the Drizzle instance
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  execute: vi.fn().mockResolvedValue([]),
  transaction: vi.fn(async cb => cb(mockDrizzleInstance)),
}

// Mock postgres
vi.mock('postgres', () => {
  return { default: vi.fn().mockReturnValue(mockSqlClient) }
})

// Mock drizzle
vi.mock('drizzle-orm/postgres-js', () => ({
  drizzle: vi.fn(() => mockDrizzleInstance),
}))

// Silence console logs in tests
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.spyOn(console, 'warn').mockImplementation(() => {})
