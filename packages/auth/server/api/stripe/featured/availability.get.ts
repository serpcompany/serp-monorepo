import { getDb } from '@serp/db/server/database'
import { price, subscription } from '@serp/db/server/database/schema'
import { and, inArray, sql } from 'drizzle-orm'

interface FeaturedPositionAvailability {
  position: number
  isAvailable: boolean
  priceId?: string
  currentHolder?: {
    entityId: number
    teamId: number
    expiresAt: Date | null
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { categoryId, module } = getQuery(event)

    if (!module) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Module parameter is required',
      })
    }

    // Get all featured position prices
    const featuredPrices = await getDb()
      .select({
        id: price.id,
        description: price.description,
      })
      .from(price)
      .where(sql`${price.description} ILIKE '%Featured Placement%'`)
      .execute()

    // Parse positions from descriptions
    const pricePositions = featuredPrices
      .map((p) => {
        const match = p.description?.match(/Featured\s+Placement\s+(\d+)/i)
        if (match) {
          return {
            priceId: p.id,
            position: Number.parseInt(match[1], 10),
          }
        }
        return null
      })
      .filter(Boolean) as { priceId: string, position: number }[]

    if (pricePositions.length === 0) {
      return [] // No featured positions configured
    }

    // Get active subscriptions for these prices
    const activeSubscriptions = await getDb()
      .select({
        id: subscription.id,
        priceId: subscription.priceId,
        teamId: subscription.teamId,
        metadata: subscription.metadata,
        currentPeriodEnd: subscription.currentPeriodEnd,
        status: subscription.status,
      })
      .from(subscription)
      .where(
        and(
          inArray(
            subscription.priceId,
            pricePositions.map(p => p.priceId),
          ),
          inArray(subscription.status, ['active', 'trialing']),
          // Check if subscription metadata matches the category and module
          categoryId
            ? sql`${subscription.metadata}->>'categoryId' = ${categoryId}`
            : sql`${subscription.metadata}->>'categoryId' IS NULL`,
          sql`${subscription.metadata}->>'module' = ${module}`,
          sql`${subscription.metadata}->>'type' = 'featured'`,
        ),
      )
      .execute()

    // Build availability map
    const occupiedPositions = new Map<
      number,
      (typeof activeSubscriptions)[0]
    >()

    activeSubscriptions.forEach((sub) => {
      const position = sub.metadata?.placement as number
      if (position) {
        occupiedPositions.set(position, sub)
      }
    })

    // Create availability response
    const availability: FeaturedPositionAvailability[] = pricePositions.map(
      ({ position, priceId }) => {
        const occupied = occupiedPositions.get(position)

        return {
          position,
          isAvailable: !occupied,
          priceId,
          currentHolder: occupied
            ? {
                entityId: occupied.metadata?.entityId as number,
                teamId: occupied.teamId!,
                expiresAt: occupied.currentPeriodEnd,
              }
            : undefined,
        }
      },
    )

    return availability.sort((a, b) => a.position - b.position)
  }
  catch (error) {
    console.error('Error checking featured position availability:', error)
    throw error
  }
})
