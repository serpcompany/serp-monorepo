import { getDb } from '@serp/db/server/database';
import { entity, verification } from '@serp/db/server/database/schema';
import { and, eq, or, sql } from 'drizzle-orm';

/**
 * Retrieves entities verified by the authenticated user.
 * Filters by module if specified in query parameters.
 * 
 * @param {H3Event} event - The event object containing user session and query params
 * @returns {Promise<{entities: VerifiedEntity[]}>} List of verified entities
 * @throws {Error} If user is unauthorized or database query fails
 * @example
 * // GET /api/entities/verified?module=seo,marketing
 * // Returns entities verified by user in seo and marketing modules
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const user = session?.user as { id: string } | undefined;
    const userId = user?.id;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { module = '' } = getQuery(event);

    // @todo - improve the typesafety of this after implementing zod
    const modules = (typeof module === 'string' ? module : String(module))
      .split(',')
      .map((mod: string) => mod.trim())
      .filter(Boolean);

    const whereConditions = [
      eq(verification.user, userId),
      modules.length
        ? or(...modules.map((mod: string) => eq(entity.module, mod)))
        : sql`true`
    ];

    const verifiedEntities = await getDb()
      .select({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        module: entity.module,
        verifiedAt: verification.createdAt
      })
      .from(verification)
      .innerJoin(entity, eq(verification.entity, entity.id))
      .where(and(...whereConditions))
      .execute();

    return { entities: verifiedEntities };
  } catch (err: unknown) {
    return {
      status: err.statusCode || 500,
      message: err.message || 'Something went wrong'
    };
  }
});
