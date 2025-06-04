import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { customer } from './customer'
import { stripeSchema } from './schema'
import { price } from './price'
import { team } from './team'
import { user } from './user'

export const subscription = stripeSchema.table('subscription', {
  id: varchar('id', { length: 255 }).primaryKey(),
  customerId: varchar('customer_id', { length: 255 })
    .notNull()
    .references(() => customer.id, { onDelete: 'cascade' }),
  priceId: varchar('price_id', { length: 255 })
    .notNull()
    .references(() => price.id, { onDelete: 'cascade' }),
  teamId: integer('team_id').references(() => team.id, { onDelete: 'cascade' }),
  userId: integer('user_id').references(() => user.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull(),
  metadata: jsonb('metadata'),
  quantity: integer('quantity').notNull().default(1),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
  endedAt: timestamp('ended_at', { withTimezone: true }),
  cancelAt: timestamp('cancel_at', { withTimezone: true }),
  trialStart: timestamp('trial_start', { withTimezone: true }),
  trialEnd: timestamp('trial_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  customer: one(customer, {
    fields: [subscription.customerId],
    references: [customer.id],
  }),
  price: one(price, {
    fields: [subscription.priceId],
    references: [price.id],
  }),
  team: one(team, {
    fields: [subscription.teamId],
    references: [team.id],
  }),
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}))
