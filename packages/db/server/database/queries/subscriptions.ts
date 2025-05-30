import { getDb } from '../index';
import { subscription, price } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import { createError } from 'h3';

type Subscription = typeof subscription.$inferSelect;
type InsertSubscription = typeof subscription.$inferInsert;

export const upsertSubscription = async (
  subscriptionData: InsertSubscription
): Promise<Subscription> => {
  try {
    const [upsertedSubscription] = await getDb()
      .insert(subscription)
      .values(subscriptionData)
      .onConflictDoUpdate({
        target: [subscription.id],
        set: subscriptionData
      })
      .returning()
      .execute();

    return upsertedSubscription;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert subscription'
    });
  }
};

export const getSubscriptionByTeamId = async (
  teamId: number
): Promise<Subscription | null> => {
  try {
    const [row] = await getDb()
      .select()
      .from(subscription)
      .leftJoin(price, eq(price.id, subscription.priceId))
      .where(
        and(
          eq(subscription.teamId, teamId),
          // Exclude featured subscriptions - only get regular subscriptions
          sql`${subscription.metadata}->>'type' IS DISTINCT FROM 'featured'`
        )
      )
      .execute();

    if (!row) return null;

    return { ...row.subscription, price: row.price };
  } catch (error) {
    console.log('getSubscriptionByTeamId', teamId);
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by team ID'
    });
  }
};

export const getSubscriptionByUserId = async (
  userId: number
): Promise<Subscription | null> => {
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
          sql`${subscription.metadata}->>'type' IS DISTINCT FROM 'featured'`
        )
      )
      .execute();

    if (!row) return null;

    return { ...row.subscription, price: row.price };
  } catch (error) {
    console.log('getSubscriptionByTeamId', teamId);
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription by team ID'
    });
  }
};
