import { eq } from 'drizzle-orm';
import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'Company ID is required' };
    }

    const result = await db
      .select({ comments: companyCache.comments })
      .from(companyCache)
      .where(eq(companyCache.id, id))
      .limit(1);

    if (!result.length) {
      return { status: 404, message: 'Company not found' };
    }

    return result[0].comments || [];
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
