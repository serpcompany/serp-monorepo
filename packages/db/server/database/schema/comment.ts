import { integer, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { ltree, userSchema } from './index'

export const comment = userSchema.table('comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  parentId: integer('parent_id'),
  path: ltree('path'),
  user: integer('user').notNull(),
})
