import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import {
  edit,
  entity,
  oauthAccount,
  post,
  price,
  subscription,
  team,
  teamInvite,
  user,
} from '../server/database/schema'

export type User = typeof user.$inferSelect
export type InsertUser = typeof user.$inferInsert

export type Team = typeof team.$inferSelect
export type InsertTeam = typeof team.$inferInsert

export type Post = typeof post.$inferSelect
export type InsertPost = typeof post.$inferInsert

export type OauthAccount = typeof oauthAccount.$inferSelect
export type InsertOauthAccount = typeof oauthAccount.$inferInsert

export type TeamInvite = typeof teamInvite.$inferSelect
export type InsertTeamInvite = typeof teamInvite.$inferInsert

export type Subscription = typeof subscription.$inferSelect
export type InsertSubscription = typeof subscription.$inferInsert

export type Price = typeof price.$inferSelect
export type InsertPrice = typeof price.$inferInsert

export const insertUserSchema = createInsertSchema(user)
export const selectUserSchema = createSelectSchema(user)

export const insertTeamSchema = createInsertSchema(team)
export const selectTeamSchema = createSelectSchema(team)

export const insertPostSchema = createInsertSchema(post)
export const selectPostSchema = createSelectSchema(post)

export const insertOauthAccountSchema = createInsertSchema(oauthAccount)
export const selectOauthAccountSchema = createSelectSchema(oauthAccount)

export const insertTeamInviteSchema = createInsertSchema(teamInvite)
export const selectTeamInviteSchema = createSelectSchema(teamInvite)

export const insertSubscriptionSchema = createInsertSchema(subscription)
export const selectSubscriptionSchema = createSelectSchema(subscription)

export const insertPriceSchema = createInsertSchema(price)
export const selectPriceSchema = createSelectSchema(price)

export type Edit = typeof edit.$inferSelect
export type InsertEdit = typeof edit.$inferInsert

export type Entity = typeof entity.$inferSelect
export type InsertEntity = typeof entity.$inferInsert

export const insertEditSchema = createInsertSchema(edit)
export const selectEditSchema = createSelectSchema(edit)

export const insertEntitySchema = createInsertSchema(entity)
export const selectEntitySchema = createSelectSchema(entity)
