import {
  boolean,
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { userSchema } from './schema'

export const edit = userSchema.table('edit', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  proposedChanges: jsonb('proposed_changes').notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  updatedMainDb: boolean('updated_main_db').notNull().default(false),
})
