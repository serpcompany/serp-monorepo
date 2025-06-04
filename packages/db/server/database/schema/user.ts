import { boolean, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { userSchema } from './schema'

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
