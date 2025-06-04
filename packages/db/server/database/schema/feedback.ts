import { relations } from 'drizzle-orm'
import {
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { userSchema } from './index'
import { user } from './user'

export const feedback = userSchema.table('feedback', {
  id: serial('id').primaryKey(),
  user: integer('user').references(() => user.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  reply: text('reply'),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(user, {
    fields: [feedback.user],
    references: [user.id],
  }),
}))
