import type { Link } from '@serp/types/types/Link';
import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema';
import { eq, sql } from 'drizzle-orm';

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
  const originalSlug = body.originalSlug;
  if (!originalSlug) {
    throw createError({
      status: 400,
      statusText: 'Original slug is required'
    });
  }

  const now = new Date();

  const link: Link = {
    url: body.url,
    slug: body.slug,
    comment: body.comment,
    createdAt: body.createdAt || now,
    updatedAt: now,
    title: body.title,
    description: body.description,
    image: body.image
  };

  const newLinkJSON = JSON.stringify(link).replace(/'/g, "''");

  const db = useDrizzle();

  try {
    await db
      .update(shortLinks)
      .set({
        data: sql`(
                SELECT json_group_array(
                    CASE
                    WHEN json_extract(value, '$.slug') = ${originalSlug}
                    THEN json(${newLinkJSON})
                    ELSE value
                    END
                )
                FROM json_each("data")
                )`
      })
      .where(eq(shortLinks.email, email))
      .execute();

    return { status: 200, message: 'Link updated successfully', link };
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Error updating link:', error);
    throw createError({
      status: 500,
      statusText: 'Failed to update link'
    });
  }
});
