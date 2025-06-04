import { pgSchema } from 'drizzle-orm/pg-core'

// Schemas
export const cacheSchema = pgSchema('cache')
export const formSchema = pgSchema('form')
export const stripeSchema = pgSchema('stripe')
export const userSchema = pgSchema('user')