import { eq } from 'drizzle-orm';
import { useDrizzle } from '../db';
import { getTableAndPKForModule } from '../../utils/getTableAndPKForModule';

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event);
    const { module, includeUpvotes = false } = getQuery(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }
    if (!module) {
      return { status: 400, message: 'Module is required' };
    }

    const { table, field } = getTableAndPKForModule(module);

    let select;
    if (includeUpvotes) {
      select = { comments: table.comments, upvotes: table.upvotes };
    } else {
      select = { comments: table.comments };
    }

    const result = await useDrizzle()
      .select(select)
      .from(table)
      .where(eq(field, id))
      .limit(1);

    if (!result.length) {
      return { status: 404, message: 'Not found' };
    }

    if (includeUpvotes) {
      return {
        comments: result[0].comments || [],
        upvotes: result[0].upvotes || []
      }
    }
    return result[0].comments || [];
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
