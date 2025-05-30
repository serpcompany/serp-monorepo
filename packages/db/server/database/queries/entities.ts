import { getDb } from '../index';
import { entity } from '../schema';
import { eq } from 'drizzle-orm';

export const getEntityById = async (id: number) => {
  const results = await getDb()
    .select()
    .from(entity)
    .where(eq(entity.id, id))
    .limit(1)
    .execute();

  return results.length > 0 ? results[0] : null;
};
