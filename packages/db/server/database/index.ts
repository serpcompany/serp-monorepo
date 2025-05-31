import type { Sql } from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let clientInstance: Sql | undefined
let dbInstance: ReturnType<typeof drizzle> | undefined

export function getClient(): Sql | undefined {
  if (clientInstance) {
    return clientInstance
  }

  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    return undefined
  }

  try {
    clientInstance = postgres(connectionString)
    return clientInstance
  }
  catch (error) {
    console.error('Failed to create database client', error)
    return undefined
  }
}

export function getDb(): ReturnType<typeof drizzle> | undefined {
  if (dbInstance) {
    return dbInstance
  }

  const client = getClient()

  if (!client) {
    return undefined
  }

  try {
    dbInstance = drizzle(client, { schema })
    return dbInstance
  }
  catch (error) {
    console.error('Failed to create drizzle instance', error)
    return undefined
  }
}
