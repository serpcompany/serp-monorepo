import { relations } from 'drizzle-orm'
import {
  boolean,
  customType,
  doublePrecision,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  vector,
} from 'drizzle-orm/pg-core'

export const ltree = customType<{ data: string }>({
  dataType() {
    return 'ltree'
  },
})

export const cacheSchema = pgSchema('cache')
export const formSchema = pgSchema('form')
export const stripeSchema = pgSchema('stripe')
export const userSchema = pgSchema('user')

// Public
export const image = pgTable('image', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id, { onDelete: 'cascade' }),
  contentType: text('content_type'),
  pathname: text('pathname').notNull(),
  size: integer('size'),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Admin tables
export const feedback = userSchema.table('feedback', {
  id: serial('id').primaryKey(),
  user: integer('user').references(() => user.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  reply: text('reply'),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

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

// Entity Verification
export const verification = userSchema.table('verification', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
})

export const verificationRequest = userSchema.table('verification_request', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 32 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  verification: integer('verification'),
  user: integer('user').notNull(),
})

// Teams
export const team = userSchema.table('team', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'set null' }),
  entityId: integer('entity_id').references(() => entity.id, {
    onDelete: 'set null',
  }),
  logo: varchar('logo', { length: 255 }),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

export const teamMember = userSchema.table('team_member', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => team.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).notNull().default('member'), // 'owner', 'admin', 'member'
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

export const teamInvite = userSchema.table('team_invite', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => team.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('member'),
  token: varchar('token', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  acceptedAt: timestamp('accepted_at', { withTimezone: true }),
  acceptedBy: integer('accepted_by').references(() => user.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// User
export const user = userSchema.table('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  hashedPassword: text('hashed_password'),
  superAdmin: boolean('super_admin').default(false),
  banned: boolean('banned').default(false),
  bannedReason: text('banned_reason'),
  bannedUntil: timestamp('banned_until', { withTimezone: true }),
  emailVerified: boolean('email_verified').notNull().default(false),
  phoneNumber: varchar('phone_number', { length: 32 }),
  onboarded: boolean('onboarded').default(false),
  proAccount: boolean('pro_account').default(false),
  lastActive: timestamp('last_active', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const vote = userSchema.table('vote', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  direction: integer('direction').notNull(),
})

export const comment = userSchema.table('comment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  parentId: integer('parent_id'),
  path: ltree('path'),
  user: integer('user').notNull(),
})

export const review = userSchema.table('review', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity').notNull(),
  content: text('content').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  rating: integer('rating').notNull(),
  dateOfExperience: timestamp('date_of_experience', { withTimezone: true }),
  isFlagged: boolean('is_flagged'),
  flaggedReason: text('flagged_reason'),
  flaggedAt: timestamp('flagged_at', { withTimezone: true }),
  flaggedBy: integer('flagged_by'),
  user: integer('user').notNull(),
})

export const oauthAccount = userSchema.table('oauth_account', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
})

export const emailVerificationCode = userSchema.table(
  'email_verification_code',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    code: varchar('code', { length: 32 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
)

export const passwordResetToken = userSchema.table('password_reset_token', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 32 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
})

export const oneTimePassword = userSchema.table('one_time_password', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  type: varchar('type', { length: 50 }).notNull().default('signup'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
})

export const webAuthnCredential = userSchema.table('webauthn_credential', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  publicKey: text('public_key').notNull(),
  counter: integer('counter').notNull(),
  backedUp: boolean('backed_up').notNull(),
  transports: jsonb('transports').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

export const webAuthnChallenge = userSchema.table('webauthn_challenge', {
  id: varchar('id', { length: 255 }).primaryKey(),
  challenge: text('challenge').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
})

export const edit = userSchema.table('edit', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  entity: integer('entity').notNull(),
  user: integer('user').notNull(),
  proposedChanges: jsonb('proposed_changes').notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  updatedMainDb: boolean('updated_main_db').notNull().default(false),
})

export const submitForm = userSchema.table('submit_form', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  entity: integer('entity'),
  user: integer('user').notNull(),
  formData: jsonb('form_data').notNull(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  module: varchar('module', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: integer('reviewed_by'),
  reviewNotes: text('review_notes'),
  isPriority: boolean('is_priority').notNull().default(false),
  priorityPayment: integer('priority_payment'),
  backlinkVerified: boolean('backlink_verified').notNull().default(false),
  backlinkVerifiedAt: timestamp('backlink_verified_at', { withTimezone: true }),
  uuid: uuid('uuid').notNull(),
})

export const post = userSchema.table('post', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  teamId: integer('team_id')
    .notNull()
    .references(() => team.id, { onDelete: 'cascade' }),
  image: varchar('image', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Generic
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

export const topic = cacheSchema.table('topic', {
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

// Stripe
export const customer = stripeSchema.table('customer', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => user.id),
  teamId: integer('team_id').references(() => team.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const product = stripeSchema.table('product', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  active: boolean('active').notNull().default(true),
  image: varchar('image', { length: 255 }),
  metadata: jsonb('metadata'),
  features: jsonb('features'),
  productOrders: integer('product_orders').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const price = stripeSchema.table('price', {
  id: varchar('id', { length: 255 }).primaryKey(),
  description: text('description'),
  currency: varchar('currency', { length: 10 }).notNull(),
  unitAmount: integer('unit_amount').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  interval: varchar('interval', { length: 50 }).notNull(),
  intervalCount: integer('interval_count').notNull(),
  trialPeriodDays: integer('trial_period_days'),
  active: boolean('active').notNull().default(true),
  metadata: jsonb('metadata'),
  productId: varchar('product_id', { length: 255 })
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const payment = stripeSchema.table('payment', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  customer: varchar('customer', { length: 255 }).notNull(),
  data: jsonb('data').notNull(),
  type: varchar('type', { length: 255 }).notNull(),
})

export const subscription = stripeSchema.table('subscription', {
  id: varchar('id', { length: 255 }).primaryKey(),
  customerId: varchar('customer_id', { length: 255 })
    .notNull()
    .references(() => customer.id, { onDelete: 'cascade' }),
  priceId: varchar('price_id', { length: 255 })
    .notNull()
    .references(() => price.id, { onDelete: 'cascade' }),
  teamId: integer('team_id').references(() => team.id, { onDelete: 'cascade' }),
  userId: integer('user_id').references(() => user.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).notNull(),
  metadata: jsonb('metadata'),
  quantity: integer('quantity').notNull().default(1),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
  endedAt: timestamp('ended_at', { withTimezone: true }),
  cancelAt: timestamp('cancel_at', { withTimezone: true }),
  trialStart: timestamp('trial_start', { withTimezone: true }),
  trialEnd: timestamp('trial_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const newsletterSubscription = userSchema.table(
  'newsletter_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    email: varchar('email', { length: 255 }).notNull(),
    userId: integer('user_id').references(() => user.id, {
      onDelete: 'set null',
    }),
    status: varchar('status', { length: 50 }).default('active'),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
  },
)

export const featuredSubscription = stripeSchema.table(
  'featured_subscription',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastPayment: integer('last_payment'),
    placement: integer('placement').notNull(),
    category: integer('category'),
    entity: integer('entity').notNull(),
    isActive: boolean('is_active').notNull().default(false),
    user: integer('user').notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
    currentPeriodStart: timestamp('current_period_start', {
      withTimezone: true,
    }),
    endedAt: timestamp('ended_at', { withTimezone: true }),
    cancelAt: timestamp('cancel_at', { withTimezone: true }),
    reservationExpiresAt: timestamp('reservation_expires_at', {
      withTimezone: true,
    }),
    customerId: varchar('customer'),
  },
)

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  customer: one(customer, {
    fields: [subscription.customerId],
    references: [customer.id],
  }),
  price: one(price, {
    fields: [subscription.priceId],
    references: [price.id],
  }),
  team: one(team, {
    fields: [subscription.teamId],
    references: [team.id],
  }),
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}))

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(user, {
    fields: [feedback.user],
    references: [user.id],
  }),
}))

export const oauthAccountRelations = relations(oauthAccount, ({ one }) => ({
  user: one(user, {
    fields: [oauthAccount.userId],
    references: [user.id],
  }),
}))

export const postRelations = relations(post, ({ one }) => ({
  userId: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  teamId: one(team, {
    fields: [post.teamId],
    references: [team.id],
  }),
}))

export const priceRelations = relations(price, ({ one }) => ({
  product: one(product, {
    fields: [price.productId],
    references: [product.id],
  }),
}))

export const teamRelations = relations(team, ({ many, one }) => ({
  members: many(teamMember),
  owner: one(user, {
    fields: [team.ownerId],
    references: [user.id],
  }),
  subscription: one(subscription, {
    fields: [team.id],
    references: [subscription.teamId],
  }),
}))

export const teamMembersRelations = relations(teamMember, ({ one }) => ({
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.id],
  }),
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id],
  }),
}))

export const userRelations = relations(user, ({ many }) => ({
  oauthAccounts: many(oauthAccount),
  teamMembers: many(teamMember),
}))
