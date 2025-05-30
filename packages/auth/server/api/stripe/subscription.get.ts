import {
  getSubscriptionByTeamId,
  getSubscriptionByUserId
} from '@serp/db/server/database/queries/subscriptions';
import { getDb } from '@serp/db/server/database';
import {
  subscription as subscriptionTable,
  price
} from '@serp/db/server/database/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { teamId, type } = getQuery(event);

  // teamId is optional - if not provided, this is user context

  // If type is specified, filter by type (only applies to team context for featured subscriptions)
  if (type === 'featured' && teamId) {
    // Get all active featured subscriptions for this team
    const featuredSubs = await getDb()
      .select()
      .from(subscriptionTable)
      .leftJoin(price, eq(price.id, subscriptionTable.priceId))
      .where(
        and(
          eq(subscriptionTable.teamId, Number(teamId)),
          inArray(subscriptionTable.status, ['active', 'trialing']),
          sql`${subscriptionTable.metadata}->>'type' = 'featured'`
        )
      )
      .execute();

    return featuredSubs.map((row) => ({
      ...row.subscription,
      expand: { price_id: row.price }
    }));
  }

  // Handle team or user context
  if (teamId) {
    const subscription = await getSubscriptionByTeamId(Number(teamId));
    return subscription;
  } else {
    // User context
    const subscription = await getSubscriptionByUserId(user.id);
    return subscription;
  }
});
