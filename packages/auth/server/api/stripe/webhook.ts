import type { InsertSubscription } from '@serp/db/types/database'
import process from 'node:process'
import { getCustomerById } from '@serp/db/server/database/queries/customers'
import {
  createOrUpdateStripePrice,
  createOrUpdateStripeProduct,
} from '@serp/db/server/database/queries/stripe'
import { upsertSubscription } from '@serp/db/server/database/queries/subscriptions'
import { updateUser } from '@serp/db/server/database/queries/users'
import Stripe from 'stripe'
import { stripeService } from '../../services/stripe'

export default defineEventHandler(async (event) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  const stripe = new Stripe(stripeSecretKey)

  const body = await readRawBody(event)
  const stripeSignature = getHeader(event, 'stripe-signature')

  if (!stripeSignature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stripe signature is missing',
    })
  }
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is missing',
    })
  }
  let stripeEvent
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      stripeSignature,
      webhookSecret,
    )
  }
  catch (err) {
    console.log('err', err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook Error',
      message: err instanceof Error ? err.message : 'Unknown error',
    })
  }
  const type = stripeEvent.type

  const relevantEvents = [
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'customer.subscription.paused',
    'customer.subscription.resumed',
    'price.created',
    'price.deleted',
    'price.updated',
    'product.created',
    'product.deleted',
    'product.updated',
  ]
  if (!relevantEvents.includes(type)) {
    console.log('Not a relevant event')
    return 'OK'
  }
  const data = stripeEvent.data.object
  if (!data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid event data',
    })
  }
  console.log('Received event', type)
  try {
    switch (type) {
      case 'product.created':
      case 'product.updated':
        await handleProductEvent(data as Stripe.Product)
        break
      case 'price.created':
      case 'price.updated':
        await handlePriceEvent(data as Stripe.Price)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.resumed':
      case 'customer.subscription.paused':
        await handleSubscriptionEvent(data as Stripe.Subscription)
        break
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await handleCheckoutSessionEvent(data as Stripe.Checkout.Session)
        break
      default:
        throw createError({
          statusCode: 400,
          statusMessage: 'Unhandled event type.',
        })
    }
  }
  catch (err) {
    console.log(err)
    return 'Error'
  }
  return 'OK'
})

async function handleProductEvent(data: Stripe.Product) {
  const product = await createOrUpdateStripeProduct({
    id: data.id,
    name: data.name,
    description: data.description,
    active: data.active,
    metadata: data.metadata,
    features: data.marketing_features,
  })
  return product
}

async function handlePriceEvent(data: Stripe.Price) {
  const record = {
    id: data.id,
    type: data.type,
    currency: data.currency,
    unitAmount: data.unit_amount ?? 0,
    interval: data.recurring?.interval ?? 'month',
    intervalCount: data.recurring?.interval_count ?? 1,
    productId:
      typeof data.product === 'string' ? data.product : data.product.id,
    description: data.nickname,
    active: data.active,
    metadata: data.metadata,
    trialPeriodDays: data.recurring?.trial_period_days,
  }
  const price = await createOrUpdateStripePrice(record)
  return price
}

async function handleSubscriptionEvent(data: Stripe.Subscription) {
  const customer = await getCustomerById(data.customer as string)
  if (!customer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer not found',
    })
  }
  const teamId = customer.teamId
  const userId = customer.userId
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const subscription = await upsertSubscription({
    id: data.id,
    customerId: data.customer as string,
    priceId: data.items.data[0].price.id,
    teamId,
    userId,
    status: data.status,
    metadata: data.metadata,
    quantity: data.items.data[0].quantity ?? 1,
    cancelAtPeriodEnd: data.cancel_at_period_end,
    currentPeriodEnd: new Date(data.items.data[0].current_period_end * 1000),
    currentPeriodStart: new Date(
      data.items.data[0].current_period_start * 1000,
    ),
    endedAt: data.ended_at ? new Date(data.ended_at * 1000) : null,
    cancelAt: data.cancel_at ? new Date(data.cancel_at * 1000) : null,
    trialStart: data.trial_start ? new Date(data.trial_start * 1000) : null,
    trialEnd: data.trial_end ? new Date(data.trial_end * 1000) : null,
  })

  // Update user's pro account status based on subscription status
  const isProAccount = ['active', 'trialing'].includes(data.status)
  await updateUser(userId, {
    proAccount: isProAccount,
  })

  return subscription
}

async function handleCheckoutSessionEvent(data: Stripe.Checkout.Session) {
  console.log('handleCheckoutSessionEvent', data)
  if (data.mode !== 'subscription') {
    return // Only handle subscription checkouts
  }

  const existingCustomer = await getCustomerById(data.customer as string)
  if (!existingCustomer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer not found',
    })
  }
  const customerId = existingCustomer.id
  const teamId = existingCustomer.teamId
  const userId = existingCustomer.userId

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const session = await stripeService.getCheckoutSession(data.id)

  if (session.status === 'complete') {
    // Get the subscription from the session
    const subscriptionId = session.subscription as string
    const subscription = await stripeService.getSubscription(subscriptionId)

    const subscriptionData: InsertSubscription = {
      id: subscription.id,
      customerId,
      teamId,
      userId,
      priceId: subscription.items.data[0].price.id,
      status: subscription.status,
      quantity: subscription.items.data[0].quantity ?? 1,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: new Date(
        subscription.items.data[0].current_period_end * 1000,
      ),
      currentPeriodStart: new Date(
        subscription.items.data[0].current_period_start * 1000,
      ),
      cancelAt: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : null,
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      trialStart: subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
      metadata: subscription.metadata,
    }

    // Upsert the subscription to ensure we have the latest data
    await upsertSubscription(subscriptionData)

    // Update user's pro account status
    await updateUser(userId, {
      proAccount: subscription.status === 'active',
    })
  }
}
