import {
  boolean,
  integer,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { stripeSchema } from './schema'

export const featuredSubscription = stripeSchema.table(
  'featured_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastPayment: integer('last_payment'),
    placement: integer('placement').notNull(),
    category: integer('category'),
    entity: integer('entity').notNull(),
    isActive: boolean('is_active').notNull().default(false),
    user: integer('user').notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
    currentPeriodStart: timestamp('current_period_start', {
      withTimezone: true,
    }),
    endedAt: timestamp('ended_at', { withTimezone: true }),
    cancelAt: timestamp('cancel_at', { withTimezone: true }),
    reservationExpiresAt: timestamp('reservation_expires_at', {
      withTimezone: true,
    }),
    customerId: varchar('customer'),
  },
)
