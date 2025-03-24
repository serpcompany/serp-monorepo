import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { sql } from 'drizzle-orm';
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

    const { caseSensitive } = useRuntimeConfig(event);
    if (!caseSensitive) {
        link.slug = link.slug.toLowerCase();
    }

    const newLinkJSON = JSON.stringify(link).replace(/'/g, "''");

    const db = useDrizzle();

    try {
        const query = `
      UPDATE short_links
      SET data = (
        SELECT json_group_array(
          CASE
            WHEN json_extract(value, '$.slug') = '${originalSlug}'
            THEN json('${newLinkJSON}')
            ELSE value
          END
        )
        FROM json_each(data)
      )
      WHERE email = '${email}';
    `;
        await db.run(sql.raw(query));
        setResponseStatus(event, 200);
        return { status: 200, message: 'Link updated successfully', link };
    } catch (error: unknown) {
        console.error('Error updating link:', error);
        throw createError({
            status: 500,
            statusText: 'Failed to update link'
        });
    }
});
