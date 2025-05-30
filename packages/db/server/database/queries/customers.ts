import { getDb } from '../index';
import { customer } from '../schema';
import { eq, isNull, and } from 'drizzle-orm';
import { createError } from 'h3';

type Customer = typeof customer.$inferSelect;
type InsertCustomer = typeof customer.$inferInsert;

export const getCustomerByTeamId = async (teamId: number) => {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(eq(customer.teamId, teamId))
      .execute();
    return customerRecord ?? null;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by team ID'
    });
  }
};

export const getCustomerByUserId = async (userId: number) => {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(and(isNull(customer.teamId), eq(customer.userId, userId)))
      .execute();
    return customerRecord ?? null;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by user ID'
    });
  }
};

export const createCustomer = async (
  payload: InsertCustomer
): Promise<Customer> => {
  try {
    const [customerRecord] = await getDb()
      .insert(customer)
      .values(payload)
      .returning()
      .execute();
    return customerRecord;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create customer'
    });
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(eq(customer.id, id))
      .execute();
    return customerRecord ?? null;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by ID'
    });
  }
};
