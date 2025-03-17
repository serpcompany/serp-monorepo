import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Company
export const companyCache = sqliteTable('company_cache', {
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  id: integer('id'),
  name: text('name').notNull(),
  slug: text('slug').primaryKey(),
  oneLiner: text('one_liner'),
  excerpt: text('excerpt'),
  content: text('content'),
  domain: text('domain'),
  needsWww: integer('needs_www'),
  serplyLink: text('serply_link'),
  features: text('features'),
  pros: text('pros'),
  cons: text('cons'),
  faqs: text('faqs'),
  alternatives: text('alternatives'),
  categories: text('categories'),
  logo: text('logo'),
  screenshots: text('screenshots'),
  rating: real('rating'),
  downvotes: integer('downvotes'),
  featured: integer('featured'),
  featuredOrder: integer('featured_order'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});

export const companyCategoryCache = sqliteTable('company_category_cache', {
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull()
});

// Post
export const postCache = sqliteTable('post_cache', {
  slug: text('slug').primaryKey(),
  id: integer('id'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  author: text('author'),
  categories: text('categories'),
  oneLiner: text('one_liner'),
  videoId: text('video_id'),
  relatedPosts: text('related_posts'),
  module: text('module'),
  keyword: text('keyword'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});

export const postCategoryCache = sqliteTable('post_category_cache', {
  id: integer('id'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  slug: text('slug').primaryKey()
});

export const postIndexCache = sqliteTable('post_index_cache', {
  key: text('key').primaryKey(),
  data: text('data')
});

// Boxing
export const boxerCache = sqliteTable('boxer_cache', {
  lastUpdated: integer('last_updated', { mode: 'timestamp' }),
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  slug: text('slug'),
  birthName: text('birth_name'),
  career: text('career'),
  debut: text('debut'),
  status: text('status'),
  gender: text('gender'),
  nationality: text('nationality'),
  residence: text('residence'),
  nicknames: text('nicknames'),
  stance: text('stance'),
  birthPlace: text('birth_place'),
  heightCm: real('height_cm'),
  reachCm: real('reach_cm'),
  division: text('division'),
  content: text('content'),
  numWins: integer('num_wins'),
  numDraws: integer('num_draws'),
  numLosses: integer('num_losses'),
  bouts: text('bouts'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});

export const weightClassCache = sqliteTable('weight_class_cache', {
  lastUpdated: integer('last_updated', { mode: 'timestamp' }),
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  slug: text('slug')
});

// Music
export const mbMetadataCache = sqliteTable('mb_metadata_cache', {
  name: text('name').notNull(),
  slug: text('slug').primaryKey(),
  artists: text('artists').notNull(),
  tags: text('tags').notNull(),
  genres: text('genres').notNull(),
  releaseGroup: text('release_group'),
  releaseGroupSlug: text('release_group_slug'),
  length: integer('length'),
  artistRels: text('artist_rels'),
  urlRels: text('url_rels'),
  workRels: text('work_rels'),
  workUrlRels: text('work_url_rels'),
  recordingRels: text('recording_rels'),
  recordingReverseRels: text('recording_reverse_rels'),
  seriesRels: text('series_rels'),
  areaRels: text('area_rels'),
  eventRels: text('event_rels'),
  labelRels: text('label_rels'),
  placeRels: text('place_rels'),
  wikidata: text('wikidata'),
  workWikidata: text('work_wikidata'),
  lyrics: text('lyrics'),
  lyricsAnnotations: text('lyrics_annotations'),
  lyricsSync: text('lyrics_sync'),
  overview: text('overview'),
  seoDescription: text('seo_description'),
  seoTitle: text('seo_title'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});

export const mbReleaseGroupCache = sqliteTable('mb_release_group_cache', {
  name: text('name').notNull(),
  slug: text('slug').primaryKey(),
  type: text('type').notNull(),
  secondaryTypes: text('secondary_types'),
  date: text('date').notNull(),
  coverArt: text('cover_art'),
  tags: text('tags').notNull(),
  genres: text('genres').notNull(),
  artists: text('artists').notNull(),
  recordings: text('recordings').notNull(),
  mediums: text('mediums').notNull(),
  artistRels: text('artist_rels'),
  urlRels: text('url_rels'),
  eventRels: text('event_rels'),
  releaseGroupRels: text('release_group_rels'),
  releaseGroupReverseRels: text('release_group_reverse_rels'),
  seriesRels: text('series_rels'),
  wikidata: text('wikidata'),
  overview: text('overview'),
  seoDescription: text('seo_description'),
  seoTitle: text('seo_title'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});

export const mbArtistMetadataCache = sqliteTable('mb_artist_metadata_cache', {
  name: text('name').notNull(),
  slug: text('slug').primaryKey(),
  beginDate: text('begin_date'),
  endDate: text('end_date'),
  artistType: text('artist_type'),
  gender: text('gender'),
  area: text('area'),
  beginArea: text('begin_area'),
  endArea: text('end_area'),
  tags: text('tags').notNull(),
  genres: text('genres').notNull(),
  releaseGroups: text('release_groups').notNull(),
  urlRels: text('url_rels'),
  artistRels: text('artist_rels'),
  artistReverseRels: text('artist_reverse_rels'),
  eventRels: text('event_rels'),
  labelRels: text('label_rels'),
  placeRels: text('place_rels'),
  seriesRels: text('series_rels'),
  wikidata: text('wikidata'),
  overview: text('overview'),
  seoDescription: text('seo_description'),
  seoTitle: text('seo_title'),
  comments: text('comments', { mode: 'json' }),
  upvotes: text('upvotes', { mode: 'json' }),
});
