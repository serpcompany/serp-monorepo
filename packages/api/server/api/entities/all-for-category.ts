import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  featuredSubscription
} from '@serp/db/server/database/schema';
import { and, eq, isNull, or, sql } from 'drizzle-orm';

/**
 * Retrieves all entities for a specific category with available featured placements.
 * Returns entities and available placement slots (1-5) for featured subscriptions.
 * 
 * @param {H3Event} event - The event object containing category and module filters
 * @returns {Promise<{entities: Entity[], availablePlacements: number[]}>}
 * @throws {Error} If database query fails
 * @example
 * // GET /api/entities/all-for-category?categorySlug=ai-tools&module=seo,marketing
 * // Returns entities in ai-tools category for seo/marketing modules with available placements
 */
export default defineEventHandler(async (event) => {
  const { categorySlug, module = '' } = getQuery(event);

  const baseQuery = getDb()
    .select({
      id: entity.id,
      slug: entity.slug
    })
    .from(entity);

  // @todo - improve the typesafety of this after implementing zod
  const modules = (typeof module === 'string' ? module : String(module))
    .split(',')
    .map((mod: string) => mod.trim())
    .filter(Boolean);

  const whereConditions = [
    modules.length
      ? or(...modules.map((mod: string) => eq(entity.module, mod)))
      : sql`true`
  ];

  if (categorySlug) {
    whereConditions.push(
      sql`
        jsonb_path_exists(
          ${entity.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  const results = await baseQuery.where(and(...whereConditions)).execute();

  whereConditions.push(
    and(
      or(
        eq(featuredSubscription.isActive, true),
        sql`(${featuredSubscription.reservationExpiresAt} IS NOT NULL AND ${featuredSubscription.reservationExpiresAt} > NOW())`
      ),
      categorySlug ? eq(category.slug, categorySlug) : isNull(category.slug)
    )
  );

  // get available placements for the category (1-5)
  const usedPlacementsAndEntities = await getDb()
    .select({
      placement: featuredSubscription.placement,
      entityId: entity.id,
      reservationExpiresAt: featuredSubscription.reservationExpiresAt
    })
    .from(featuredSubscription)
    .leftJoin(category, eq(category.id, featuredSubscription.category))
    .innerJoin(entity, eq(entity.id, featuredSubscription.entity))
    .where(and(...whereConditions))
    .execute();
  const usedPlacementsSet = new Set(
    usedPlacementsAndEntities.map((item) => item.placement)
  );
  const availablePlacements = [];
  for (let i = 1; i <= 5; i++) {
    if (!usedPlacementsSet.has(i)) {
      availablePlacements.push(i);
    }
  }

  // get all entities for the category (remove entities with an active subscription for the category)
  const entities = results.length ? results : [];
  const usedEntities = usedPlacementsAndEntities.map((item) => item.entityId);
  for (const entityId of usedEntities) {
    const index = entities.findIndex((item) => item.id === entityId);
    if (index !== -1) {
      entities.splice(index, 1);
    }
  }

  return {
    entities,
    availablePlacements
  };
});
