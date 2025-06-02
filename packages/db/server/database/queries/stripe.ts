import { eq } from 'drizzle-orm'
import { getDb } from '../index'
import { price, product } from '../schema'

type InsertProduct = typeof product.$inferInsert
type InsertPrice = typeof price.$inferInsert

export async function clearStripeData(): Promise<void> {
  await getDb().delete(price).execute()
  await getDb().delete(product).execute()
}

export async function createStripeProduct(payload: InsertProduct): Promise<typeof product.$inferSelect> {
  const [productRecord] = await getDb()
    .insert(product)
    .values(payload)
    .returning()
    .execute()
  return productRecord
}

export async function createStripePrice(payload: InsertPrice): Promise<typeof price.$inferSelect> {
  const [priceRecord] = await getDb()
    .insert(price)
    .values(payload)
    .returning()
    .execute()
  return priceRecord
}

// These functions are used by the webhook handler
export async function createOrUpdateStripeProduct(payload: InsertProduct): Promise<typeof product.$inferSelect> {
  if (!payload.id) {
    throw new Error('Product ID is required')
  }

  // First delete the existing product and its prices
  await getDb().delete(price).where(eq(price.productId, payload.id)).execute()
  await getDb().delete(product).where(eq(product.id, payload.id)).execute()

  // Then create fresh
  return createStripeProduct(payload)
}

export async function createOrUpdateStripePrice(payload: InsertPrice): Promise<typeof price.$inferSelect> {
  if (!payload.id) {
    throw new Error('Price ID is required')
  }

  // First delete the existing price
  await getDb().delete(price).where(eq(price.id, payload.id)).execute()

  // Then create fresh
  return createStripePrice(payload)
}

export async function getAllPlans(): Promise<Array<typeof price.$inferSelect & { product: typeof product.$inferSelect | null }>> {
  const rows = await getDb()
    .select()
    .from(price)
    .leftJoin(product, eq(product.id, price.productId))
    .orderBy(price.unitAmount)
    .execute()

  const plans = rows.map(({ price: p, product: prod }) => ({
    ...p,
    product: prod,
  }))
  return plans
}

export async function deleteStripeProduct(id: string): Promise<void> {
  await getDb().delete(product).where(eq(product.id, id)).execute()
}

export async function deleteStripePrice(id: string): Promise<void> {
  await getDb().delete(price).where(eq(price.id, id)).execute()
}

export async function deletePricesByProductId(productId: string): Promise<void> {
  await getDb().delete(price).where(eq(price.productId, productId)).execute()
}
