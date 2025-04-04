// server/api/stripe/webhook.ts
import { useServerStripe } from '#stripe/server';
import { defineEventHandler, getHeader } from 'h3';
import { processSuccessfulPayment } from '../../utils/validPaymentIntentMapping';

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  if (!stripe) {
    event.node.res.statusCode = 500;
    return 'Stripe not initialized';
  }

  let rawBody = await readRawBody(event);

  const signature = getHeader(event, 'stripe-signature');
  const endpointSecret =
    process.env.STRIPE_WEBHOOK_SECRET ||
    'whsec_924a4c6acfc1e171958c883077705236e75a617f8a816c5d7bd88aa6525b55f6';

  try {
    rawBody = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );
  } catch (err) {
    console.error(`Error verifying webhook signature: ${err}`);
    event.node.res.statusCode = 400;
    return 'Webhook signature verification failed';
  }

  switch (rawBody.type) {
    case 'customer.subscription.updated': {
      const subscription = rawBody.data.object;
      subscription.mode = 'customer.subscription.updated';
      processSuccessfulPayment(
        subscription.metadata.type,
        false,
        false,
        subscription
      );
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = rawBody.data.object;
      if (paymentIntent.invoice) {
        // subscriptions are handled in the customer.subscription.updated event
        event.node.res.statusCode = 200;
        return 'Webhook received';
      }
      paymentIntent.mode = 'payment_intent.succeeded';
      processSuccessfulPayment(
        paymentIntent.metadata.type,
        false,
        false,
        paymentIntent
      );
      break;
    }
    default: {
      console.log(`Unhandled event type ${rawBody.type}`);
    }
  }

  event.node.res.statusCode = 200;
  return 'Webhook received';
});
