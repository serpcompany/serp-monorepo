import { integer, jsonb, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { cacheSchema } from './index'

export const category = cacheSchema.table('category', {
  id: serial('id').primaryKey(),
  module: varchar('module', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sourceId: integer('source_id'),
  data: jsonb('data'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
