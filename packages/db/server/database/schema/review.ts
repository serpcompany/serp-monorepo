import {
  boolean,
  integer,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { userSchema } from './index'

export const review = userSchema.table('review', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  rating: integer('rating').notNull(),
  dateOfExperience: timestamp('date_of_experience', { withTimezone: true }),
  isFlagged: boolean('is_flagged'),
  flaggedReason: text('flagged_reason'),
  flaggedAt: timestamp('flagged_at', { withTimezone: true }),
  flaggedBy: integer('flagged_by'),
  user: integer('user').notNull(),
})
