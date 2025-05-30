import { getDb } from '../index';
import { product, price } from '../schema';
import { eq } from 'drizzle-orm';

type InsertProduct = typeof product.$inferInsert;
type InsertPrice = typeof price.$inferInsert;

export const clearStripeData = async () => {
  await getDb().delete(price).execute();
  await getDb().delete(product).execute();
};

export const createStripeProduct = async (payload: InsertProduct) => {
  const [productRecord] = await getDb()
    .insert(product)
    .values(payload)
    .returning()
    .execute();
  return productRecord;
};

export const createStripePrice = async (payload: InsertPrice) => {
  const [priceRecord] = await getDb()
    .insert(price)
    .values(payload)
    .returning()
    .execute();
  return priceRecord;
};

// These functions are used by the webhook handler
export const createOrUpdateStripeProduct = async (payload: InsertProduct) => {
  if (!payload.id) {
    throw new Error('Product ID is required');
  }

  // First delete the existing product and its prices
  await getDb().delete(price).where(eq(price.productId, payload.id)).execute();
  await getDb().delete(product).where(eq(product.id, payload.id)).execute();

  // Then create fresh
  return createStripeProduct(payload);
};

export const createOrUpdateStripePrice = async (payload: InsertPrice) => {
  if (!payload.id) {
    throw new Error('Price ID is required');
  }

  // First delete the existing price
  await getDb().delete(price).where(eq(price.id, payload.id)).execute();

  // Then create fresh
  return createStripePrice(payload);
};

export const getAllPlans = async () => {
  const rows = await getDb()
    .select()
    .from(price)
    .leftJoin(product, eq(product.id, price.productId))
    .orderBy(price.unitAmount)
    .execute();

  const plans = rows.map(({ price: p, product: prod }) => ({
    ...p,
    product: prod
  }));
  return plans;
};

export const deleteStripeProduct = async (id: string) => {
  await getDb().delete(product).where(eq(product.id, id)).execute();
};

export const deleteStripePrice = async (id: string) => {
  await getDb().delete(price).where(eq(price.id, id)).execute();
};

export const deletePricesByProductId = async (productId: string) => {
  await getDb().delete(price).where(eq(price.productId, productId)).execute();
};
