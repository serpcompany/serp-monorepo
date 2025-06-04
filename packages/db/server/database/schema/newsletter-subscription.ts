import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { userSchema } from './schema'
import { user } from './user'

export const newsletterSubscription = userSchema.table(
  'newsletter_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    email: varchar('email', { length: 255 }).notNull(),
    userId: integer('user_id').references(() => user.id, {
      onDelete: 'set null',
    }),
    status: varchar('status', { length: 50 }).default('active'),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
  },
)
