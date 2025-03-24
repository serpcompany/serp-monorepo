import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const email = (session.user as { email?: string })?.email;
  if (!email) {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  const { slug } = await readBody(event);
  if (!slug) {
    throw createError({
      status: 400,
      statusText: 'Slug is required'
    });
  }

  const db = useDrizzle();

  try {
    const query = `
      UPDATE short_links
      SET data = COALESCE((
        SELECT json_group_array(value)
        FROM json_each(data)
        WHERE json_extract(value, '$.slug') != '${slug}'
      ), json('[]'))
      WHERE email = '${email}';
    `;
    await db.run(sql.raw(query));

    setResponseStatus(event, 200);
    return {
      status: 200,
      message: 'Link deleted successfully'
    };
  } catch (error: unknown) {
    console.error('Error deleting link:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to delete link'
    });
  }
});
