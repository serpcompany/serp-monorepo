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

// Company
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
  featuredOrder: integer('featured_order')
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
// End Company

// Post
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
  module: varchar('module', { length: 255 }),
  keyword: varchar('keyword', { length: 255 })
});

export const postCategoryCache = cacheSchema.table('post_category_cache', {
  id: serial('id').primaryKey(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull()
});
// End Post

// Boxing
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
// End Boxing

// Music
export const mappingSchema = pgSchema('mapping');

export const mbMetadataCache = mappingSchema.table('mb_metadata_cache', {
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  artists: jsonb('artists').notNull(),
  tags: text('tags').array().notNull(),
  genres: text('genres').array().notNull(),
  releaseGroup: jsonb('release_group'),
  releaseGroupSlug: text('release_group_slug'),
  length: integer('length'),
  artistRels: jsonb('artist_rels'),
  urlRels: jsonb('url_rels'),
  workRels: jsonb('work_rels'),
  workUrlRels: jsonb('work_url_rels'),
  recordingRels: jsonb('recording_rels'),
  recordingReverseRels: jsonb('recording_reverse_rels'),
  seriesRels: jsonb('series_rels'),
  areaRels: jsonb('area_rels'),
  eventRels: jsonb('event_rels'),
  labelRels: jsonb('label_rels'),
  placeRels: jsonb('place_rels'),
  wikidata: jsonb('wikidata'),
  workWikidata: jsonb('work_wikidata'),
  lyrics: text('lyrics'),
  lyricsAnnotations: jsonb('lyrics_annotations'),
  lyricsSync: jsonb('lyrics_sync'),
  overview: text('overview'),
  seoDescription: text('seo_description'),
  seoTitle: text('seo_title')
});

export const mbReleaseGroupCache = mappingSchema.table(
  'mb_release_group_cache',
  {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    type: text('type').notNull(),
    secondaryTypes: text('secondary_types').array(),
    date: text('date').notNull(),
    coverArt: jsonb('cover_art'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    artists: jsonb('artists').notNull(),
    recordings: jsonb('recordings').notNull(),
    mediums: jsonb('mediums').notNull(),
    artistRels: jsonb('artist_rels'),
    urlRels: jsonb('url_rels'),
    eventRels: jsonb('event_rels'),
    releaseGroupRels: jsonb('release_group_rels'),
    releaseGroupReverseRels: jsonb('release_group_reverse_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }
);

export const mbArtistMetadataCache = mappingSchema.table(
  'mb_artist_metadata_cache',
  {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    beginDate: text('begin_date'),
    endDate: text('end_date'),
    artistType: text('artist_type'),
    gender: text('gender'),
    area: text('area'),
    beginArea: text('begin_area'),
    endArea: text('end_area'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    releaseGroups: jsonb('release_groups').notNull(),
    urlRels: jsonb('url_rels'),
    artistRels: jsonb('artist_rels'),
    artistReverseRels: jsonb('artist_reverse_rels'),
    eventRels: jsonb('event_rels'),
    labelRels: jsonb('label_rels'),
    placeRels: jsonb('place_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }
);
// End Music
