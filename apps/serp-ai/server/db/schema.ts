import {
  serial,
  timestamp,
  varchar,
  text,
  boolean,
  jsonb,
  doublePrecision,
  integer,
  pgSchema
} from 'drizzle-orm/pg-core';

export const cacheSchema = pgSchema('cache');

export const companyCache = cacheSchema.table('company_cache', {
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  oneLiner: text('one_liner'),
  excerpt: text('excerpt'),
  content: text('content'),
  domain: text('domain'),
  needsWww: boolean('needs_www'),
  serplyLink: text('serply_link'),
  features: jsonb('features'),
  pros: text('pros').array(),
  cons: text('cons').array(),
  faqs: jsonb('faqs'),
  alternatives: jsonb('alternatives'),
  categories: jsonb('categories'),
  logo: text('logo'),
  screenshots: jsonb('screenshots'),
  rating: doublePrecision('rating'),
  upvotes: integer('upvotes'),
  downvotes: integer('downvotes'),
  featured: boolean('featured'),
  featuredOrder: integer('featured_order'),
});

export const companyCategoryCache = cacheSchema.table(
  'company_category_cache',
  {
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull()
  }
);

export const postCache = cacheSchema.table('post_cache', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  excerpt: varchar('excerpt', { length: 255 }),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 255 }),
  author: varchar('author', { length: 255 }),
  categories: jsonb('categories'),
  oneLiner: text('one_liner'),
  videoId: varchar('video_id', { length: 255 }),
  relatedPosts: jsonb('related_posts'),
  module: varchar('module', { length: 255 })
});

export const postCategoryCache = cacheSchema.table('post_category_cache', {
  id: serial('id').primaryKey(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull()
});
