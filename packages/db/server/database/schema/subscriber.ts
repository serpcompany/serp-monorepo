import {
  jsonb,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { userSchema } from './index'

export const subscriber = userSchema.table('subscriber', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  referrer: text('referrer'),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
