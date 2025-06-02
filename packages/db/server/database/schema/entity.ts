import { relations } from 'drizzle-orm'
import {
  doublePrecision,
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  varchar,
  vector,
} from 'drizzle-orm/pg-core'
import { cacheSchema } from './index'

export const entity = cacheSchema.table('entity', {
  id: serial('id').primaryKey(),
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  sourceId: varchar('source_id', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  module: varchar('module', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  data: jsonb('data'),
  singleData: jsonb('single_data'),
  categories: jsonb('categories'),
  topics: jsonb('topics'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  searchText: text('search_text'),
  embedding: vector('embedding', { dimensions: 1536 }),
})

export const entityAggregate = cacheSchema.table('entity_aggregate', {
  entity: integer('entity').primaryKey(),
  numReviews: integer('num_reviews').notNull().default(0),
  numOneStarReviews: integer('num_one_star_reviews').notNull().default(0),
  numTwoStarReviews: integer('num_two_star_reviews').notNull().default(0),
  numThreeStarReviews: integer('num_three_star_reviews').notNull().default(0),
  numFourStarReviews: integer('num_four_star_reviews').notNull().default(0),
  numFiveStarReviews: integer('num_five_star_reviews').notNull().default(0),
  averageRating: doublePrecision('average_rating').notNull().default(0),
  numUpvotes: integer('num_upvotes').notNull().default(0),
  numDownvotes: integer('num_downvotes').notNull().default(0),
  hotScore: doublePrecision('hot_score').notNull().default(0),
  hotScoreHour: doublePrecision('hot_score_hour').notNull().default(0),
  hotScoreDay: doublePrecision('hot_score_day').notNull().default(0),
  hotScoreWeek: doublePrecision('hot_score_week').notNull().default(0),
  hotScoreMonth: doublePrecision('hot_score_month').notNull().default(0),
  hotScoreYear: doublePrecision('hot_score_year').notNull().default(0),
  lastUpdatedVotes: timestamp('last_updated_votes', { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastUpdatedReviews: timestamp('last_updated_reviews', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const entityRelations = relations(entity, ({ one }) => ({
  aggregate: one(entityAggregate, {
    fields: [entity.id],
    references: [entityAggregate.entity],
  }),
}))

export const entityAggregateRelations = relations(
  entityAggregate,
  ({ one }) => ({
    entity: one(entity, {
      fields: [entityAggregate.entity],
      references: [entity.id],
    }),
  }),
)
