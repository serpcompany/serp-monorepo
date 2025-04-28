import {
  boolean,
  customType,
  doublePrecision,
  integer,
  jsonb,
  pgSchema,
  serial,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const ltree = customType<{ data: string }>({
  dataType() {
    return 'ltree';
  }
});

export const cacheSchema = pgSchema('cache');
export const formSchema = pgSchema('form');
export const stripeSchema = pgSchema('stripe');
export const userSchema = pgSchema('user');

// Stripe
export const customer = stripeSchema.table('customer', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  email: varchar('email', { length: 255 }).unique().notNull()
});

export const payment = stripeSchema.table('payment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  customer: varchar('customer', { length: 255 }).notNull(),
  data: jsonb('data').notNull(),
  type: varchar('type', { length: 255 }).notNull()
});

export const companyFeaturedSubscription = stripeSchema.table(
  'companyFeaturedSubscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastPaymentFk: integer('last_payment_fk'),
    placement: integer('placement'),
    categoryFk: integer('category_fk'),
    companyFk: integer('company_fk'),
    isActive: boolean('is_active').notNull().default(false),
    email: varchar('email', { length: 255 }).notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull(),
    currentPeriodEnd: timestamp('current_period_end'),
    currentPeriodStart: timestamp('current_period_start'),
    reservationExpiresAt: timestamp('reservation_expires_at'),
    endedAt: timestamp('ended_at'),
    cancelAt: timestamp('cancel_at')
  }
);

// User
export const postComment = userSchema.table('post_comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  user: integer('user').notNull(),
  post: integer('post').notNull(),
  content: varchar('content', { length: 255 }),
  parentId: integer('parent_id'),
  path: varchar('path', { length: 255 })
});

export const companyComment = userSchema.table('company_comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  user: integer('user').notNull(),
  company: integer('company').notNull(),
  content: varchar('content', { length: 255 }),
  parentId: integer('parent_id'),
  path: ltree('path')
});

export const mcpServerComment = userSchema.table('mcp_server_comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  user: integer('user').notNull(),
  server: integer('server').notNull(),
  content: varchar('content', { length: 255 }),
  parentId: integer('parent_id'),
  path: ltree('path')
});

export const companyReview = userSchema.table('company_review', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  user: integer('user').notNull(),
  company: integer('company').notNull(),
  content: varchar('content', { length: 255 }),
  title: varchar('title', { length: 255 }),
  rating: integer('rating').notNull(),
  dateOfExperience: timestamp('date_of_experience', { withTimezone: true }),
  isFlagged: boolean('is_flagged'),
  flaggedReason: text('flagged_reason'),
  flaggedAt: timestamp('flagged_at', { withTimezone: true }),
  flaggedBy: integer('flagged_by'),
  reviewedBy: integer('reviewed_by'),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true })
});

export const companyVerification = userSchema.table('company_verification', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  company: integer('company').notNull().unique(),
  user: integer('user').notNull()
});

export const companyVerificationRequests = userSchema.table(
  'company_verification_request',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    company: integer('company').notNull(),
    user: integer('user').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 32 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    verification: integer('verification')
  }
);

export const companyEdit = userSchema.table('company_edit', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  company: integer('company').notNull(),
  user: integer('user').notNull(),
  proposedChanges: varchar('proposed_changes', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  updatedMainDb: boolean('updated_main_db').notNull().default(false)
});

export const user = userSchema.table('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 })
});

// MCP
export const mcpServerCache = cacheSchema.table('mcp_server_cache', {
  lastUpdated: timestamp('last_updated', { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 512 }).notNull(),
  url: varchar('url', { length: 512 }).notNull(),
  description: text('description'),
  tags: jsonb('tags'),
  contributors: jsonb('contributors'),
  readme: text('readme').notNull(),
  owner: varchar('owner', { length: 512 }).notNull(),
  repo: varchar('repo', { length: 512 }).notNull(),
  stars: integer('stars'),
  forks: integer('forks'),
  topics: jsonb('topics'),
  languages: jsonb('languages'),
  repoCreatedAt: timestamp('repo_created_at', { withTimezone: true }),
  repoUpdatedAt: timestamp('repo_updated_at', { withTimezone: true }),
  upvotes: text('upvotes').array(),
  categories: jsonb('categories'),
  serplyLink: text('serply_link')
});

export const mcpServerCategoryCache = cacheSchema.table(
  'mcp_server_category_cache',
  {
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    buyersGuide: text('buyers_guide'),
    faqs: jsonb('faqs')
  }
);

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
  upvotes: text('upvotes').array(),
  downvotes: integer('downvotes'),
  comments: jsonb('comments'),
  featured: boolean('featured'),
  featuredOrder: integer('featured_order'),
  videoId: varchar('video_id', { length: 255 })
});

export const companyCategoryCache = cacheSchema.table(
  'company_category_cache',
  {
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    buyersGuide: text('buyers_guide'),
    faqs: jsonb('faqs')
  }
);

export const companyReviewAggregate = cacheSchema.table(
  'company_review_aggregate',
  {
    companyId: integer('company_id').primaryKey(),
    numReviews: integer('num_reviews').notNull().default(0),
    numOneStarReviews: integer('num_one_star_reviews').notNull().default(0),
    numTwoStarReviews: integer('num_two_star_reviews').notNull().default(0),
    numThreeStarReviews: integer('num_three_star_reviews').notNull().default(0),
    numFourStarReviews: integer('num_four_star_reviews').notNull().default(0),
    numFiveStarReviews: integer('num_five_star_reviews').notNull().default(0),
    averageRating: doublePrecision('average_rating').notNull().default(0),
    lastUpdated: timestamp('last_updated', { withTimezone: true })
      .notNull()
      .defaultNow()
  }
);

export const companySubmitForm = formSchema.table('company_submit', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  submittingEmail: varchar('submitting_email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  domain: varchar('domain', { length: 255 }).notNull(),
  categories: jsonb('categories'),
  pricing: varchar('pricing', { length: 255 }),
  tags: jsonb('tags'),
  oneLiner: text('one_liner'),
  description: text('description'),
  logo: varchar('logo', { length: 255 }),
  approved: boolean('approved').notNull().default(false),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: varchar('reviewed_by', { length: 255 }),
  reviewedNotes: text('reviewed_notes'),
  isPriority: boolean('is_priority').notNull().default(false),
  priorityPaymentFk: integer('priority_payment_fk'),
  uuid: uuid('uuid').unique().notNull(),
  backlinkVerified: boolean('backlink_verified').notNull().default(false),
  backlinkVerifiedAt: timestamp('backlink_verified_at', { withTimezone: true })
});
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
  keyword: varchar('keyword', { length: 255 }),
  comments: jsonb('comments'),
  upvotes: text('upvotes').array()
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
  seoTitle: text('seo_title'),
  comments: jsonb('comments'),
  upvotes: text('upvotes').array()
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
    seoTitle: text('seo_title'),
    comments: jsonb('comments'),
    upvotes: text('upvotes').array()
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
    seoTitle: text('seo_title'),
    comments: jsonb('comments'),
    upvotes: text('upvotes').array()
  }
);
// End Music
