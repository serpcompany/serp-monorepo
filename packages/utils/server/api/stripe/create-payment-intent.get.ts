import { useServerStripe } from '#stripe/server';
import { db } from '@serp/utils/server/api/db';
import { customer } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';
import { defineEventHandler } from 'h3';
import { processSuccessfulPayment } from '../../utils/validPaymentIntentMapping';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  const stripe = await useServerStripe(event);
  if (!stripe) {
    return {
      clientSecret: null,
      error: 'Stripe not initialized'
    };
  }

  const { type, id, secondaryId } = getQuery(event);
  const { amount, currency, description, recurring, paymentId } =
    await processSuccessfulPayment(type as string, false, true);

  let customer_;
  try {
    // Check if customer exists in the database
    // If not, create a new customer in Stripe and save it to the database
    const results = await db
      .select({ id: customer.id })
      .from(customer)
      .where(eq(customer.email, email))
      .limit(1)
      .execute();
    if (results.length > 0) {
      customer_ = results[0];
    } else {
      customer_ = await stripe.customers.create({
        email
      });
      await db
        .insert(customer)
        .values({
          id: customer_.id,
          email
        })
        .execute();
    }
  } catch (e) {
    return { clientSecret: null, error: e };
  }

  // If it's a recurring (subscription) payment
  if (recurring) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customer_.id,
        items: [{ price: paymentId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        collection_method: 'charge_automatically',
        description,
        metadata: {
          email,
          type,
          id,
          customerId: customer_.id,
          secondaryId
        }
      });
      return {
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        error: null
      };
    } catch (e) {
      return {
        clientSecret: null,
        error: e
      };
    }
  } else {
    // One-off payment intent flow
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer_.id,
        currency,
        amount,
        description,
        automatic_payment_methods: { enabled: true },
        metadata: { email, type, id, customerId: customer_.id, secondaryId }
      });
      return {
        clientSecret: paymentIntent.client_secret,
        error: null
      };
    } catch (e) {
      return {
        clientSecret: null,
        error: e
      };
    }
  }
});
