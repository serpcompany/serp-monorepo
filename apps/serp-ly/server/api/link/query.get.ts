import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { key, slug } = getQuery(event);

  if (!key || !slug) {
    throw createError({
      status: 400,
      statusText: 'Key and slug are required'
    });
  }

  const db = useDrizzle();

  try {
    const query = `
      SELECT json_extract(value, '$.url') AS url
      FROM short_links, json_each(short_links.data) AS value
      WHERE short_links.key = '${key}'
        AND json_extract(value, '$.slug') = '${slug}'
      LIMIT 1
    `;
    const result = await db.run(sql.raw(query));

    if (result.results && result.results.length > 0) {
      return { url: result.results[0].url };
    } else {
      return { url: null };
    }
  } catch (error: unknown) {
    console.error('Error retrieving destination URL:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to retrieve destination URL'
    });
  }
});
