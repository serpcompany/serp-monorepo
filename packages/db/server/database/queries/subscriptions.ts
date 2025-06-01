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

/**
 * Retrieves a subscription by team ID with associated price data.
 * Excludes featured subscriptions and only returns regular subscriptions.
 * @param {number} teamId - The team ID to get subscription for
 * @returns {Promise<(Subscription & { priceData: Price }) | null>} Subscription with price data or null if not found
 * @throws {Error} If database query fails
 * @example
 * const subscription = await getSubscriptionByTeamId(123);
 * if (subscription) {
 *   console.log(subscription.priceData.unitAmount);
 * }
 */
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

    return { ...row.subscription, priceData: row.price }
  }
  catch (error) {
    console.warn('getSubscriptionByTeamId', teamId)
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

    return { ...row.subscription, priceData: row.price }
  }
  catch (error) {
    console.warn('getSubscriptionByTeamId', teamId)
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by team ID',
    })
  }
}
