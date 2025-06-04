import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { userSchema } from './schema'
import { user } from './user'

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

export const emailVerificationCodeRelations = relations(
  emailVerificationCode,
  ({ one }) => ({
    user: one(user, {
      fields: [emailVerificationCode.userId],
      references: [user.id],
    }),
  }),
)

export const passwordResetTokenRelations = relations(
  passwordResetToken,
  ({ one }) => ({
    user: one(user, {
      fields: [passwordResetToken.userId],
      references: [user.id],
    }),
  }),
)

export const oneTimePasswordRelations = relations(
  oneTimePassword,
  ({ one }) => ({
    user: one(user, {
      fields: [oneTimePassword.userId],
      references: [user.id],
    }),
  }),
)

export const webAuthnCredentialRelations = relations(
  webAuthnCredential,
  ({ one }) => ({
    user: one(user, {
      fields: [webAuthnCredential.userId],
      references: [user.id],
    }),
  }),
)
