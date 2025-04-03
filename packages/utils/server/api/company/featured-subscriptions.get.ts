import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyFeaturedSubscription
} from '@serp/utils/server/api/db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    const email = session.user?.email;
    if (!email) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const { activeOnly = true } = getQuery(event);

    const results = await db
      .select({
        id: companyFeaturedSubscription.id,
        createdAt: companyFeaturedSubscription.createdAt,
        placement: companyFeaturedSubscription.placement,
        categoryFk: companyFeaturedSubscription.categoryFk,
        companyFk: companyFeaturedSubscription.companyFk,
        companyName: companyCache.name,
        companyDomain: companyCache.domain,
        companyLogo: companyCache.logo,
        categoryName: companyCategoryCache.name,
        categorySlug: companyCategoryCache.slug,
        isActive: companyFeaturedSubscription.isActive
      })
      .from(companyFeaturedSubscription)
      .innerJoin(
        companyCache,
        eq(companyFeaturedSubscription.companyFk, companyCache.id)
      )
      .leftJoin(
        companyCategoryCache,
        eq(companyFeaturedSubscription.categoryFk, companyCategoryCache.id)
      )
      .where(
        and(
          eq(companyFeaturedSubscription.email, email),
          activeOnly
            ? eq(companyFeaturedSubscription.isActive, true)
            : undefined
        )
      )
      .execute();

    return results.length ? results : [];
  } catch (error) {
    console.error('Error fetching company submissions:', error);
    return {
      status: error.statusCode || 500,
      message: error.message
    };
  }
});
