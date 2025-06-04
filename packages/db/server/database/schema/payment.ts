import { jsonb, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { stripeSchema } from './schema'

export const payment = stripeSchema.table('payment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  customer: varchar('customer', { length: 255 }).notNull(),
  data: jsonb('data').notNull(),
  type: varchar('type', { length: 255 }).notNull(),
})
