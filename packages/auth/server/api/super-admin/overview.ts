import { getOverviewCounts } from '@serp/db/server/database/queries/admin';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }

  const counts = await getOverviewCounts();
  return counts;
});
