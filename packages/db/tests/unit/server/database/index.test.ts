import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDrizzleInstance, mockSqlClient } from '../../../setup'

describe('database Connection Management', () => {
  const originalEnv = { ...process.env }
  const postgresErrorMessage = 'Connection error'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  describe('getClient', () => {
    it('should create a new database client when DATABASE_URL is present', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const { getClient } = await import('../../../../server/database')
      const client = getClient()

      expect(postgres).toHaveBeenCalledWith(
        'postgres://user:password@localhost:5432/test',
      )
      expect(client).toBe(mockSqlClient)
    })

    it('should return undefined when DATABASE_URL is not set', async () => {
      delete process.env.DATABASE_URL

      const { getClient } = await import('../../../../server/database')
      const client = getClient()

      expect(postgres).not.toHaveBeenCalled()
      expect(client).toBeUndefined()
    })

    it('should handle empty but non-null DATABASE_URL', async () => {
      process.env.DATABASE_URL = ''

      const { getClient } = await import('../../../../server/database')
      const client = getClient()

      expect(postgres).not.toHaveBeenCalled()
      expect(client).toBeUndefined()
    })

    it('should handle postgres constructor throwing an error', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const postgresError = new Error(postgresErrorMessage)
      vi.mocked(postgres).mockImplementationOnce(() => {
        throw postgresError
      })

      const { getClient } = await import('../../../../server/database')

      expect(() => getClient()).not.toThrow()
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create database client'),
        postgresError,
      )
    })

    it('should reuse the SQL client instance on subsequent calls', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const { getClient } = await import('../../../../server/database')

      const client1 = getClient()
      expect(postgres).toHaveBeenCalledTimes(1)

      const client2 = getClient()
      expect(postgres).toHaveBeenCalledTimes(1)
      expect(client1).toBe(client2)
    })
  })

  describe('getDb', () => {
    it('should create a new Drizzle instance when DATABASE_URL is present', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const { getDb } = await import('../../../../server/database')
      const db = getDb()

      expect(drizzle).toHaveBeenCalledWith(
        mockSqlClient,
        expect.objectContaining({ schema: expect.anything() }),
      )
      expect(db).toBe(mockDrizzleInstance)
    })

    it('should return undefined when DATABASE_URL is not set', async () => {
      delete process.env.DATABASE_URL

      const { getDb } = await import('../../../../server/database')
      const db = getDb()

      expect(drizzle).not.toHaveBeenCalled()
      expect(db).toBeUndefined()
    })

    it('should handle drizzle constructor throwing an error', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const drizzleError = new Error('Drizzle initialization error')
      vi.mocked(drizzle).mockImplementationOnce(() => {
        throw drizzleError
      })

      const { getDb } = await import('../../../../server/database')

      expect(() => getDb()).not.toThrow()
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create drizzle instance'),
        drizzleError,
      )
    })

    it('should reuse the Drizzle instance on subsequent calls', async () => {
      process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/test'

      const { getDb } = await import('../../../../server/database')

      const db1 = getDb()
      expect(drizzle).toHaveBeenCalledTimes(1)

      const db2 = getDb()
      expect(drizzle).toHaveBeenCalledTimes(1)
      expect(db1).toBe(db2)
    })
  })
})
