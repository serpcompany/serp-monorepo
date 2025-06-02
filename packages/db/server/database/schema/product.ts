import { boolean, integer, jsonb, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { stripeSchema } from './index'

export const product = stripeSchema.table('product', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  active: boolean('active').notNull().default(true),
  image: varchar('image', { length: 255 }),
  metadata: jsonb('metadata'),
  features: jsonb('features'),
  productOrders: integer('product_orders').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
