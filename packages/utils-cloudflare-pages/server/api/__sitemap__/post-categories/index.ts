import { useDrizzle } from '../../db';
import { postCategoryCache } from '../../db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
