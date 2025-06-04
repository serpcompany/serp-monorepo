import { integer, serial, timestamp } from 'drizzle-orm/pg-core'
import { userSchema } from './schema'

export const vote = userSchema.table('vote', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  direction: integer('direction').notNull(),
})
