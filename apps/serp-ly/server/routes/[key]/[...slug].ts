import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema';
import { sql, eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { key, slug } = getRouterParams(event);

  if (!key || !slug) {
    throw createError({
      status: 400,
      statusText: 'Key and slug are required'
    });
  }

  const db = useDrizzle();

  try {
    const result = await db
      .select({ url: sql`json_extract(value, '$.url')` })
      .from(sql`short_links, json_each(short_links.data) AS value`)
      .where(
        and(
          eq(shortLinks.key, key),
          sql`json_extract(value, '$.slug') = ${slug}`
        )
      )
      .limit(1)
      .execute();

    if (result && result.length > 0) {
      return sendRedirect(event, result[0].url, 301);
    } else {
      throw createError({
        status: 404,
        statusText: 'Link not found'
      });
    }
  } catch (error: unknown) {
    console.error('Error retrieving destination URL:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to retrieve destination URL'
    });
  }
});
