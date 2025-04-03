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

  const { sessionId } = getQuery(event);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get checkout session'
    });
  }
});
