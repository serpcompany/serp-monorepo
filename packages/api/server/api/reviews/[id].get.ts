import { getDb } from '@serp/db/server/database';
import { review, user } from '@serp/db/server/database/schema';
import { and, eq, not, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const userId = session?.user?.id;

    const { id } = getRouterParams(event);
    const { page = '1', pageSize = '10' } = getQuery(event);

    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    const pageInt = parseInt(page, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    const offset = (pageInt - 1) * pageSizeInt;

    const reviews = await getDb()
      .select({
        id: review.id,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        content: review.content,
        rating: review.rating,
        dateOfExperience: review.dateOfExperience,
        user: {
          id: user.id,
          name: user.name,
          image: user.avatarUrl
        },
        isFlagged: review.isFlagged,
        flaggedAt: review.flaggedAt,
        flaggedReason: review.flaggedReason,
        flaggedBy: review.flaggedBy
      })
      .from(review)
      .leftJoin(user, eq(review.user, user.id))
      .where(
        and(eq(review.entity, id), userId ? not(eq(user.id, userId)) : true)
      )
      .orderBy(review.createdAt)
      .limit(pageSizeInt)
      .offset(offset)
      .execute();

    const totalCountResult = await getDb()
      .select({ total: sql`COUNT(*)` })
      .from(review)
      .where(eq(review.entity, id))
      .execute();
    const totalCount = totalCountResult[0]?.total || 0;

    let userReview = null;
    if (userId) {
      const usersReview = await getDb()
        .select()
        .from(review)
        .leftJoin(user, eq(review.user, user.id))
        .where(and(eq(review.entity, id), eq(user.id, userId)))
        .limit(1)
        .execute();
      if (usersReview.length > 0) {
        userReview = {
          ...usersReview[0],
          user: {
            id: usersReview[0].user,
            name: session?.user?.name || null,
            image: session?.user?.image || session?.user?.avatarUrl || null
          }
        };
      }
    }

    return {
      reviews,
      pagination: {
        currentPage: pageInt,
        pageSize: pageSizeInt,
        totalItems: totalCount
      },
      userReview
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { status: 500, message: error.message };
  }
});
