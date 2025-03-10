import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const postCache = sqliteTable('post_cache', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .defaultNow(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  author: text('author'),
  categories: text('categories'),
  oneLiner: text('one_liner'),
  videoId: text('video_id'),
  relatedPosts: text('related_posts'),
  module: text('module'),
  keyword: text('keyword')
});

export const postCategoryCache = sqliteTable('post_category_cache', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .defaultNow(),
  name: text('name').notNull(),
  slug: text('slug').notNull()
});
