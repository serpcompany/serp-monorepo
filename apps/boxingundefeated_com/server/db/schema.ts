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

export const boxerCache = cacheSchema.table('boxer_cache', {
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  birthName: varchar('birth_name', { length: 255 }),
  career: varchar('career', { length: 255 }),
  debut: varchar('debut', { length: 255 }),
  status: varchar('status', { length: 50 }),
  gender: varchar('gender', { length: 10 }),
  nationality: varchar('nationality', { length: 255 }),
  residence: varchar('residence', { length: 255 }),
  nicknames: jsonb('nicknames'),
  stance: varchar('stance', { length: 255 }),
  birthPlace: varchar('birth_place', { length: 255 }),
  heightCm: doublePrecision('height_cm'),
  reachCm: doublePrecision('reach_cm'),
  division: jsonb('division'),
  content: text('content'),
  numWins: integer('num_wins'),
  numDraws: integer('num_draws'),
  numLosses: integer('num_losses'),
  bouts: jsonb('bouts')
});

export const weightClassCache = cacheSchema.table('weight_class_cache', {
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 })
});
