import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { stripeSchema } from './schema'
import { product } from './product'

export const price = stripeSchema.table('price', {
  id: varchar('id', { length: 255 }).primaryKey(),
  description: text('description'),
  currency: varchar('currency', { length: 10 }).notNull(),
  unitAmount: integer('unit_amount').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  interval: varchar('interval', { length: 50 }).notNull(),
  intervalCount: integer('interval_count').notNull(),
  trialPeriodDays: integer('trial_period_days'),
  active: boolean('active').notNull().default(true),
  metadata: jsonb('metadata'),
  productId: varchar('product_id', { length: 255 })
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const priceRelations = relations(price, ({ one }) => ({
  product: one(product, {
    fields: [price.productId],
    references: [product.id],
  }),
}))
