import { relations } from 'drizzle-orm'
import { integer, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { userSchema } from './index'
import { team } from './team'
import { user } from './user'

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
