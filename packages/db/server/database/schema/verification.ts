import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { userSchema } from './schema'

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
