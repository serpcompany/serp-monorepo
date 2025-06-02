import {
  clearStripeData,
  createStripePrice,
  createStripeProduct,
} from '@serp/db/server/database/queries/stripe'
import { consola } from 'consola'
import Stripe from 'stripe'

export default defineEventHandler(async (_event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  consola.start('Syncing Stripe products and prices...')
  try {
    // First, clear all existing data
    await clearStripeData()
    consola.info('Cleared existing data')

    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      limit: 100,
    })

    consola.info(`Found ${products.data.length} active products`)

    // Create a set of active product IDs for quick lookup
    const activeProductIds = new Set(products.data.map(p => p.id))

    // Create all active products
    for (const product of products.data) {
      await createStripeProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        metadata: product.metadata,
        features: product.marketing_features,
      })
    }

    // Fetch all active prices
    consola.info('💰 Fetching prices...')
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
    })

    // Filter out prices for products that no longer exist
    const validPrices = prices.data.filter((price) => {
      const productId
        = typeof price.product === 'string' ? price.product : price.product.id
      return activeProductIds.has(productId)
    })

    consola.info(`Found ${validPrices.length} valid prices`)

    // Create all valid prices
    for (const price of validPrices) {
      const productId
        = typeof price.product === 'string' ? price.product : price.product.id
      await createStripePrice({
        id: price.id,
        type: price.type,
        currency: price.currency,
        unitAmount: price.unit_amount ?? 0,
        interval: price.recurring?.interval ?? 'month',
        intervalCount: price.recurring?.interval_count ?? 1,
        productId,
        description: price.nickname,
        active: price.active,
        metadata: price.metadata,
        trialPeriodDays: price.recurring?.trial_period_days,
      })
    }
  }
  catch (error) {
    consola.error('Error syncing products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error syncing products',
    })
  }
  return 'Stripe data synced successfully'
})
