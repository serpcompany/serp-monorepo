import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET_KEY ||
    'development',
);

export interface CreateCheckoutSessionParams {
  customerId: string;
  priceId: string;
  teamSlug: string;
  metadata?: Record<string, unknown>;
}

export const stripeService = {
  async createCustomer(teamId: string, email: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        metadata: { teamId },
      });
      return customer.id;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create Stripe customer',
      });
    }
  },

  async createCheckoutSession({
    customerId,
    priceId,
    teamSlug,
    metadata,
  }: CreateCheckoutSessionParams) {
    try {
      return await stripe.checkout.sessions.create({
        customer: customerId,
        billing_address_collection: 'required',
        customer_update: {
          address: 'auto',
        },
        allow_promotion_codes: true,
        success_url: teamSlug
          ? `${process.env.NUXT_PUBLIC_URL}/dashboard/${teamSlug}/settings/billing?success=true`
          : `${process.env.NUXT_PUBLIC_URL}/dashboard/settings/billing?success=true`,
        cancel_url: teamSlug
          ? `${process.env.NUXT_PUBLIC_URL}/dashboard/${teamSlug}/settings/billing?cancel=true`
          : `${process.env.NUXT_PUBLIC_URL}/dashboard/settings/billing?cancel=true`,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        metadata: metadata || {},
        subscription_data: metadata
          ? {
              metadata,
            }
          : undefined,
      });
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create checkout session',
      });
    }
  },

  async getCheckoutSession(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get checkout session',
      });
    }
  },

  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get subscription',
      });
    }
  },

  async createBillingPortalSession(customerId: string) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
      });
      return session;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create billing portal session',
      });
    }
  },
};
