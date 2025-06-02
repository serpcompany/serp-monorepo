import { and, eq, isNull, sql } from 'drizzle-orm'
import { createError } from 'h3'
import { getDb } from '../index'
import { price, subscription } from '../schema'

type Subscription = typeof subscription.$inferSelect
type InsertSubscription = typeof subscription.$inferInsert

export async function upsertSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
  try {
    const [upsertedSubscription] = await getDb()
      .insert(subscription)
      .values(subscriptionData)
      .onConflictDoUpdate({
        target: [subscription.id],
        set: subscriptionData,
      })
      .returning()
      .execute()

    return upsertedSubscription
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert subscription',
    })
  }
}

export async function getSubscriptionByTeamId(teamId: number): Promise<Subscription | null> {
  try {
    const [row] = await getDb()
      .select()
      .from(subscription)
      .leftJoin(price, eq(price.id, subscription.priceId))
      .where(
        and(
          eq(subscription.teamId, teamId),
          // Exclude featured subscriptions - only get regular subscriptions
          sql`${subscription.metadata}->>'type' IS DISTINCT FROM 'featured'`,
        ),
      )
      .execute()

    if (!row)
      return null

    return { ...row.subscription, price: row.price }
  }
  catch (error) {
    console.error('getSubscriptionByTeamId error for teamId:', teamId)
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by team ID',
    })
  }
}

export async function getSubscriptionByUserId(userId: number): Promise<Subscription | null> {
  try {
    const [row] = await getDb()
      .select()
      .from(subscription)
      .leftJoin(price, eq(price.id, subscription.priceId))
      .where(
        and(
          isNull(subscription.teamId),
          eq(subscription.userId, userId),
          // Exclude featured subscriptions - only get regular subscriptions
          sql`${subscription.metadata}->>'type' IS DISTINCT FROM 'featured'`,
        ),
      )
      .execute()

    if (!row)
      return null

    return { ...row.subscription, price: row.price }
  }
  catch (error) {
    console.error('getSubscriptionByUserId error for userId:', userId)
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by user ID',
    })
  }
}
