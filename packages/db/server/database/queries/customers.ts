import { and, eq, isNull } from 'drizzle-orm'
import { createError } from 'h3'
import { getDb } from '../index'
import { customer } from '../schema'

type Customer = typeof customer.$inferSelect
type InsertCustomer = typeof customer.$inferInsert

export async function getCustomerByTeamId(teamId: number) {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(eq(customer.teamId, teamId))
      .execute()
    return customerRecord ?? null
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by team ID',
    })
  }
}

export async function getCustomerByUserId(userId: number) {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(and(isNull(customer.teamId), eq(customer.userId, userId)))
      .execute()
    return customerRecord ?? null
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by user ID',
    })
  }
}

export async function createCustomer(payload: InsertCustomer): Promise<Customer> {
  try {
    const [customerRecord] = await getDb()
      .insert(customer)
      .values(payload)
      .returning()
      .execute()
    return customerRecord
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create customer',
    })
  }
}

export async function getCustomerById(id: string) {
  try {
    const [customerRecord] = await getDb()
      .select()
      .from(customer)
      .where(eq(customer.id, id))
      .execute()
    return customerRecord ?? null
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find customer by ID',
    })
  }
}
