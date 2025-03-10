import { useDrizzle } from '../../db';
import { postCategoryCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const postCategories = await useDrizzle()
    .select({ slug: postCategoryCache.slug })
    .from(postCategoryCache)
    .execute();

  const response = postCategories.map(
    (postCategory) => `/posts/category/${postCategory.slug}/`
  );

  return response;
});
