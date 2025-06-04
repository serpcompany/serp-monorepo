import { getAllPlans } from '@serp/db/server/database/queries/stripe'

export default defineEventHandler(async (event) => {
  try {
    // Super-admin should see ALL plans without any filtering
    const allPlans = await getAllPlans()
    return allPlans
  }
  catch (error) {
    console.error('Error fetching plans for super-admin:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch plans',
    })
  }
})
