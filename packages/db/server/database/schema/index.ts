import { customType, pgSchema } from 'drizzle-orm/pg-core'

// Custom types
export const ltree = customType<{ data: string }>({
  dataType() {
    return 'ltree'
  },
})

// Schemas
export const cacheSchema = pgSchema('cache')
export const formSchema = pgSchema('form')
export const stripeSchema = pgSchema('stripe')
export const userSchema = pgSchema('user')

// Re-export all tables and relations
export * from './auth'
export * from './category'
export * from './comment'
export * from './customer'
export * from './edit'
export * from './entity'
export * from './featured-subscription'
export * from './feedback'
export * from './image'
export * from './newsletter-subscription'
export * from './oauth-account'
export * from './payment'
export * from './post'
export * from './price'
export * from './product'
export * from './review'
export * from './submit-form'
export * from './subscriber'
export * from './subscription'
export * from './team'
export * from './topic'
export * from './user'
export * from './verification'
export * from './vote'
