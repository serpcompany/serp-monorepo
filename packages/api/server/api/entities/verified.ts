import { getDb } from '@serp/db/server/database';
import { entity, verification } from '@serp/db/server/database/schema';
import { and, eq, or, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.id;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { module = '' } = getQuery(event);

    // @todo - improve the typesafety of this after implementing zod
    const modules = module
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
