import { eq } from 'drizzle-orm';
import { db } from '@serp/utils/server/api/db';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    const { module, includeComments = false } = getQuery(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }
    if (!module) {
      return { status: 400, message: 'Module is required' };
    }

    const { table, field } = getTableAndPKForModule(module);

    let select;
    if (includeComments) {
      select = { upvotes: table.upvotes, comments: table.comments };
    } else {
      select = { upvotes: table.upvotes };
    }

    const result = await db
      .select(select)
      .from(table)
      .where(eq(field, id))
      .limit(1);

    if (!result.length) {
      return { status: 404, message: 'Not found' };
    }

    if (includeComments) {
      return {
        upvotes: result[0].upvotes || [],
        comments: result[0].comments || []
      };
    }

    return result[0].upvotes || [];
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
