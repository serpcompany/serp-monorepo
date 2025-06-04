import { relations } from 'drizzle-orm'
import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { entity } from './entity'
import { userSchema } from './schema'
import { user } from './user'

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

export const teamRelations = relations(team, ({ many, one }) => ({
  members: many(teamMember),
  owner: one(user, {
    fields: [team.ownerId],
    references: [user.id],
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
