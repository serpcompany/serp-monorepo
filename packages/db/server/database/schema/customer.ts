import { integer, timestamp, varchar } from 'drizzle-orm/pg-core'
import { stripeSchema } from './schema'
import { team } from './team'
import { user } from './user'

export const customer = stripeSchema.table('customer', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => user.id),
  teamId: integer('team_id').references(() => team.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
