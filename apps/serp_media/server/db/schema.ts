import {
  serial,
  timestamp,
  varchar,
  text,
  jsonb,
  pgSchema
} from 'drizzle-orm/pg-core';

export const cacheSchema = pgSchema('cache');

export const postCache = cacheSchema.table('post_cache', {
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }),
  slug: varchar('slug', { length: 255 }),
  content: text('content'),
  categories: jsonb('categories')
});

export const postCategoryCache = cacheSchema.table('post_category_cache', {
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull()
});