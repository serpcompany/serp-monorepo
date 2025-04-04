import { useServerStripe } from '#stripe/server';
import { db } from '@serp/utils/server/api/db';
import { customer } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';
import { createError, defineEventHandler } from 'h3';
import { processSuccessfulPayment } from '../../utils/validPaymentIntentMapping';

export default defineEventHandler(async (event) => {
  // Validate user session and email
  const session = await requireUserSession(event);
  const email = session.user?.email;
  if (!email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    });
  }

  // Initialize Stripe
  const stripe = await useServerStripe(event);
  if (!stripe) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe not initialized'
    });
  }

  // Retrieve query parameters
  const {
    type,
    id,
    secondaryId,
    successRoute = '/purchase?success=true',
    cancelRoute = '/purchase?cancel=true'
  } = getQuery(event);
  const { amount, currency, description, recurring, paymentId } =
    await processSuccessfulPayment(type as string, false, true);

  // Lookup or create customer
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve or create customer'
    });
  }

  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  let checkoutSession;

  // Create checkout session based on payment type
  if (recurring) {
    try {
      checkoutSession = await stripe.checkout.sessions.create({
        customer: customer_.id,
        billing_address_collection: 'required',
        customer_update: { address: 'auto' },
        allow_promotion_codes: true,
        success_url: `${BASE_URL}${successRoute}`,
        cancel_url: `${BASE_URL}${cancelRoute}`,
        line_items: [
          {
            price: paymentId, // Stripe Price ID for subscription
            quantity: 1
          }
        ],
        mode: 'subscription',
        metadata: {
          email,
          type,
          id,
          customerId: customer_.id,
          secondaryId
        },
        subscription_data: {
          metadata: {
            email,
            type,
            id,
            customerId: customer_.id,
            secondaryId
          }
        }
      });
    } catch (e) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create checkout session'
      });
    }
  } else {
    try {
      checkoutSession = await stripe.checkout.sessions.create({
        customer: customer_.id,
        billing_address_collection: 'required',
        customer_update: { address: 'auto' },
        allow_promotion_codes: true,
        success_url: `${BASE_URL}${successRoute}`,
        cancel_url: `${BASE_URL}${cancelRoute}`,
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: description },
              unit_amount: amount
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        metadata: {
          email,
          type,
          id,
          customerId: customer_.id,
          secondaryId
        },
        payment_intent_data: {
          metadata: {
            email,
            type,
            id,
            customerId: customer_.id,
            secondaryId
          }
        }
      });
    } catch (e) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create checkout session'
      });
    }
  }

  // Return the checkout session URL
  return checkoutSession.url;
});
