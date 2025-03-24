import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema';
import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import type { Link } from '@serp/types/types/Link';

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const email = (session.user as { email?: string })?.email;
  if (!email) {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  const body = await readBody(event);

  const now = new Date();

  const link: Link = {
    url: body.url,
    slug: body.slug || nanoid(),
    comment: body.comment,
    createdAt: now,
    updatedAt: now,
    title: body.title,
    description: body.description,
    image: body.image
  };

  const { caseSensitive } = useRuntimeConfig(event);
  if (!caseSensitive) {
    link.slug = link.slug.toLowerCase();
  }

  const db = useDrizzle();

  try {
    const newLinkJSON = JSON.stringify(link).replace(/'/g, "''");

    const query = `
      INSERT INTO short_links (email, key, data)
      VALUES (
        '${email}',
        '${email}',
        json_array(json('${newLinkJSON}'))
      )
      ON CONFLICT (email) DO UPDATE SET
        data = CASE
          WHEN EXISTS(
            SELECT 1 FROM json_each(data)
            WHERE json_extract(value, '$.slug') = '${link.slug}'
          )
          THEN data
          ELSE json_insert(
            COALESCE(data, json('[]')),
            '$[#]',
            json('${newLinkJSON}')
          )
        END
    `;
    await db.run(sql.raw(query));

    setResponseStatus(event, 201);

    const shortLink = `${getRequestProtocol(event)}://${getRequestHost(event)}/${link.slug}`;

    return { link, shortLink };
  } catch (error: unknown) {
    if ((error as ErrorWithStatusCode).statusCode) {
      throw error;
    }

    console.error('Error creating link:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to create link'
    });
  }
});
