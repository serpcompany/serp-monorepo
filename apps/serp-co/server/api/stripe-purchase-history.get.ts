import { useServerStripe } from '#stripe/server';
import { db } from '@serp/utils/server/api/db';
import { customer } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) {
    return { status: 401, message: 'Unauthorized' };
  }

  const { starting_after, limit: limitParam } = getQuery(event);
  const limit = Number(limitParam) || 50;

  const stripe = await useServerStripe(event);
  if (!stripe) {
    return { error: 'Stripe not initialized', purchases: [] };
  }

  // Retrieve customer from DB or create one if they don't exist.
  let customer_;
  try {
    const results = await db
      .select({ id: customer.id })
      .from(customer)
      .where(eq(customer.email, email))
      .limit(1)
      .execute();

    if (results.length > 0) {
      customer_ = results[0];
    } else {
      customer_ = await stripe.customers.create({ email });
      await db
        .insert(customer)
        .values({
          id: customer_.id,
          email
        })
        .execute();
    }
  } catch (e) {
    return { error: e, purchases: [] };
  }

  // Fetch PaymentIntents for the customer using cursor-based pagination.
  let paymentIntents;
  try {
    const options: unknown = {
      customer: customer_.id,
      limit
    };
    if (starting_after) {
      options.starting_after = starting_after;
    }
    paymentIntents = await stripe.paymentIntents.list(options);
  } catch (e) {
    return { error: e, purchases: [] };
  }

  const purchases = paymentIntents.data.map((pi) => ({
    id: pi.id,
    amount: pi.amount,
    currency: pi.currency,
    status: pi.status,
    description: pi.description,
    createdAt: pi.created
  }));

  return {
    purchases,
    pagination: {
      hasMore: paymentIntents.has_more,
      // Provide the cursor for the next page if available.
      nextCursor: purchases.length ? purchases[purchases.length - 1].id : null,
      limit
    },
    error: null
  };
});
