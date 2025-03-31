import type { Link } from '@serp/types/types/Link';
import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

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

    await db
      .insert(shortLinks)
      .values({
        email,
        key: email,
        data: sql`json_array(json(${newLinkJSON}))`
      })
      .onConflictDoUpdate({
        target: shortLinks.email,
        set: {
          data: sql`CASE
          WHEN EXISTS(
            SELECT 1 FROM json_each("data")
            WHERE json_extract(value, '$.slug') = ${link.slug}
          )
          THEN "data"
          ELSE json_insert(
            COALESCE("data", json('[]')),
            '$[#]',
            json(${newLinkJSON})
          )
        END`
        }
      })
      .execute();

    const shortLink = `${getRequestProtocol(event)}://${getRequestHost(event)}/${email}/${link.slug}`;

    return { link, shortLink };
  } catch (error: unknown) {
    if (error.statusCode) {
      throw error;
    }

    // eslint-disable-next-line no-console
    console.error('Error creating link:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to create link'
    });
  }
});
