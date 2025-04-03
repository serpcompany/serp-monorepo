import { useServerStripe } from '#stripe/server';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) {
    return { status: 401, message: 'Unauthorized' };
  }

  const stripe = await useServerStripe(event);
  if (!stripe) {
    return {
      clientSecret: null,
      error: 'Stripe not initialized'
    };
  }

  const { subscriptionId } = getQuery(event);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get subscription'
    });
  }
});
