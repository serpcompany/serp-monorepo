import { and, desc, eq } from 'drizzle-orm'
import { H3Error } from 'h3'
import { getDb } from '../index'
import { post, user } from '../schema'

type Post = typeof post.$inferSelect
type InsertPost = typeof post.$inferInsert

export async function getAllPosts(
  teamId: number,
): Promise<
    Array<
      Post & {
        user: {
          id: number
          name: string | null
          email: string
          avatarUrl: string | null
        } | null
      }
    >
  > {
  try {
    const rows = await getDb()
      .select()
      .from(post)
      .leftJoin(user, eq(user.id, post.userId))
      .where(eq(post.teamId, teamId))
      .orderBy(desc(post.createdAt))
      .execute()

    const posts = rows.map(({ post: p, user: u }) => ({
      ...p,
      user: u
        ? {
            id: u.id,
            name: u.name,
            email: u.email,
            avatarUrl: u.avatarUrl,
          }
        : null,
    }))

    return posts
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get all posts',
    })
  }
}

export async function createPost(postData: InsertPost): Promise<Post> {
  try {
    const [newPost] = await getDb()
      .insert(post)
      .values(postData)
      .returning()
      .execute()
    return newPost
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create post',
    })
  }
}

export async function getPostById(
  id: number,
  teamId: number,
  userId: number,
): Promise<Post | null> {
  try {
    const [postRecord] = await getDb()
      .select()
      .from(post)
      .where(
        and(eq(post.id, id), eq(post.teamId, teamId), eq(post.userId, userId)),
      )
      .execute()
    return postRecord ?? null
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get post by ID',
    })
  }
}

export async function updatePost(
  id: number,
  teamId: number,
  userId: number,
  postData: Partial<Post>,
): Promise<Post> {
  try {
    const result = await getDb()
      .update(post)
      .set(postData)
      .where(
        and(eq(post.id, id), eq(post.teamId, teamId), eq(post.userId, userId)),
      )
      .returning()
      .execute()

    if (!result.length) {
      throw createError({
        statusCode: 403,
        statusMessage:
          'You are not authorized to update this post or it does not exist',
      })
    }

    return result[0]
  }
  catch (error) {
    if (error instanceof H3Error && error.statusCode)
      throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update post',
    })
  }
}

export async function deletePost(
  id: number,
  teamId: number,
  userId: number,
): Promise<Post> {
  try {
    const result = await getDb()
      .delete(post)
      .where(
        and(eq(post.id, id), eq(post.teamId, teamId), eq(post.userId, userId)),
      )
      .returning()
      .execute()

    if (!result.length) {
      throw createError({
        statusCode: 403,
        statusMessage:
          'You are not authorized to delete this post or it does not exist',
      })
    }

    return result[0]
  }
  catch (error) {
    if (error instanceof H3Error && error.statusCode)
      throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete post',
    })
  }
}
