import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db'
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import type { Link } from '@serp/types/types/Link'

// Define interface for error handling
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

  const body = await readBody(event)

  const now = new Date()

  // Use basic validation for now, similar to the LinkSchema structure
  const link: Link = {
    url: body.url,
    slug: body.slug || nanoid(), // Use slug as the unique identifier
    comment: body.comment,
    createdAt: now,
    updatedAt: now,
    title: body.title,
    description: body.description,
    image: body.image
  }

  // Apply case sensitivity rules if needed
  const { caseSensitive } = useRuntimeConfig(event)
  if (!caseSensitive) {
    link.slug = link.slug.toLowerCase()
  }

  const db = useDrizzle()

  try {
    // Prepare the link for insertion into JSON
    const newLinkJSON = JSON.stringify(link).replace(/'/g, "''")

    // Use a raw query to perform upsert operation
    const query = `
      INSERT INTO short_links (email, key, data)
      VALUES ('${email}', '${email}', json_array('${newLinkJSON}'))
      ON CONFLICT (email) DO UPDATE SET
      data = CASE
        -- Check if link with same slug already exists
        WHEN json_array_length(json_extract(data, '$[*].slug')) > 0 AND
             EXISTS(SELECT 1 FROM json_each(data) WHERE json_extract(value, '$.slug') = '${link.slug}')
        THEN (SELECT json('{"error": "Link already exists"}'))
        -- Add new link to existing array
        ELSE json_insert(
          COALESCE(data, json('[]')),
          '$[#]',
          json('${newLinkJSON}')
        )
      END
    `

    // Execute the raw query
    await db.run(sql.raw(query))

    // Check if insertion caused a conflict
    const result = await db
      .select()
      .from(shortLinks)
      .where(eq(shortLinks.email, email))
      .execute()

    // If we have an error in the data field, it means the slug already exists
    if (result.length > 0) {
      const data = JSON.parse(result[0].data || '[]')
      if (data.error === 'Link already exists') {
        throw createError({
          status: 409, // Conflict
          statusText: 'Link already exists',
        })
      }
    }

    setResponseStatus(event, 201)

    // Generate the short link
    const shortLink = `${getRequestProtocol(event)}://${getRequestHost(event)}/${link.slug}`

    return { link, shortLink }
  } catch (error: unknown) {
    // If the error is already a handled error, rethrow it
    if ((error as ErrorWithStatusCode).statusCode) {
      throw error
    }

    // Otherwise log and throw a generic error
    console.error('Error creating link:', error)
    throw createError({
      status: 500,
      statusText: 'Failed to create link',
    })
  }
})
