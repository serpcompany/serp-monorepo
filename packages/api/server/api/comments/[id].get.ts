import type { Comment } from '@serp/types/types'
import { getDb } from '@serp/db/server/database'
import { comment } from '@serp/db/server/database/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event)
    const { page = '1', pageSize = '10' } = getQuery(event)

    if (!id)
      return { status: 400, message: 'ID is required' }

    const pageInt = Number.parseInt(page, 10)
    const pageSizeInt = Number.parseInt(pageSize, 10)
    const offset = (pageInt - 1) * pageSizeInt

    const recursiveQuery = sql`
WITH RECURSIVE top_level AS (
  SELECT
    c.id,
    c.created_at,
    c.updated_at,
    c.content,
    c.parent_id,
    c.path,
    c."user" AS user_id,
    u.name AS name,
    u.avatar_url AS image,
    nlevel(c.path) AS depth
  FROM ${comment} c
  LEFT JOIN "user"."user" u ON c."user" = u.id
  WHERE c.entity = ${id} AND c.parent_id IS NULL
  ORDER BY c.created_at
  LIMIT ${pageSizeInt} OFFSET ${offset}
),
full_tree AS (
  SELECT * FROM top_level
  UNION ALL
  SELECT
    c.id,
    c.created_at,
    c.updated_at,
    c.content,
    c.parent_id,
    c.path,
    c."user" AS user_id,
    u.name AS name,
    u.avatar_url AS image,
    nlevel(c.path) AS depth
  FROM ${comment} c
  LEFT JOIN "user"."user" u ON c."user" = u.id
  INNER JOIN full_tree ft ON c.parent_id = ft.id
),
top_level_count AS (
  SELECT COUNT(*) AS total
  FROM ${comment} c
  WHERE c.entity = ${id} AND c.parent_id IS NULL
)
SELECT 
  (SELECT total FROM top_level_count) AS total_count,
  json_agg(full_tree.*) AS comments
FROM full_tree;
`

    const result = await getDb().execute(recursiveQuery)
    const totalCount = result[0]?.total_count || 0
    const flatComments = result[0]?.comments || []

    // Convert the flat list into a nested structure.
    // @todo - improve the typesafety of this after implementing zod
    const nestComments = (comments: Comment[]) => {
      const commentMap: Record<string, Comment> = {}
      // initialize map with each comment, and initialize replies array
      comments.forEach((comment: Comment) => {
        comment.replies = []
        commentMap[comment.id] = comment
      })

      const nested: Comment[] = []
      comments.forEach((comment: Comment) => {
        // if comment has a parent, attach to parent's replies, otherwise it's a top-level comment.
        if (comment.parent_id) {
          if (commentMap[comment.parent_id]) {
            commentMap[comment.parent_id].replies.push(comment)
          }
          else {
            // edge case: parent not found (could log or handle differently)
            nested.push(comment)
          }
        }
        else {
          nested.push(comment)
        }
      })

      return nested
    }

    const nestedComments = nestComments(flatComments)

    return {
      comments: nestedComments,
      pagination: {
        currentPage: pageInt,
        pageSize: pageSizeInt,
        totalItems: totalCount,
      },
    }
  }
  catch (error) {
    return { status: 500, message: error.message }
  }
})
