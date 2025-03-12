import { useDrizzle } from '../api/db';
import { postCache, postCategoryCache, postIndexCache } from '../api/db/schema';
import { desc } from 'drizzle-orm';
import type { Pagination } from '@serp/types/types';

const POSTS_PER_PAGE = 100;

export default defineTask({
  meta: {
    name: 'db:seedPostsIndex',
    description: 'Seed the post index cache with posts data'
  },
  async run() {
    try {
      console.log('Running DB seed posts index task...');
      const db = useDrizzle();

      // Get all posts
      const posts = await db
        .select()
        .from(postCache)
        .orderBy(desc(postCache.createdAt));

      // Get all categories
      const categories = await db.select().from(postCategoryCache);

      // Get unique modules
      const moduleSet = new Set<string>();
      posts.forEach((post) => {
        if (post.module) {
          moduleSet.add(post.module);
        }
      });
      const modules = Array.from(moduleSet);

      // Helper function to chunk array into pages
      const chunkArray = <T>(array: T[], size: number): T[][] => {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
          array.slice(i * size, i * size + size)
        );
      };

      // Helper function to create pagination object
      const createPagination = (
        totalItems: number,
        currentPage: number
      ): Pagination => {
        return {
          currentPage,
          pageSize: POSTS_PER_PAGE,
          totalItems
        };
      };

      // Helper function to format post for index
      const formatPostForIndex = (post: typeof postCache.$inferSelect) => {
        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          author: post.author,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          categories: post.categories,
          oneLiner: post.oneLiner,
          module: post.module
        };
      };

      // Helper function to safely parse post categories
      const parsePostCategories = (post: typeof postCache.$inferSelect) => {
        try {
          if (!post.categories) return [];
          // If it's already an array (might happen in some cases), return it
          if (Array.isArray(post.categories)) return post.categories;
          // Try to parse as JSON if it's a string
          return JSON.parse(post.categories as string);
        } catch (e) {
          // If parsing fails, it might be a comma-separated string or another format
          if (typeof post.categories === 'string') {
            // Try to handle as comma-separated
            return post.categories.split(',').map((cat) => cat.trim());
          }
          console.warn('Could not parse categories for post:', post.title);
          return [];
        }
      };

      // Insert records for all posts pagination
      const allPostsChunks = chunkArray(posts, POSTS_PER_PAGE);
      for (let i = 0; i < allPostsChunks.length; i++) {
        const pageNumber = i + 1;
        const key = `all-${pageNumber}`;
        const data = {
          posts: allPostsChunks[i].map(formatPostForIndex),
          pagination: createPagination(posts.length, pageNumber),
          categoryName: null
        };

        await db
          .insert(postIndexCache)
          .values({
            key,
            data: JSON.stringify(data)
          })
          .onConflictDoUpdate({
            target: postIndexCache.key,
            set: { data: JSON.stringify(data) }
          });
      }

      // Insert records for each category
      for (const category of categories) {
        const categoryPosts = posts.filter((post) => {
          const postCategories = parsePostCategories(post);
          return postCategories.some(
            (cat: unknown) =>
              cat?.slug === category.slug ||
              // Handle if the category is just a string
              cat === category.slug ||
              // Handle if the category object has a different structure
              cat?.name?.toLowerCase() === category.name?.toLowerCase()
          );
        });

        const categoryPostsChunks = chunkArray(categoryPosts, POSTS_PER_PAGE);
        for (let i = 0; i < categoryPostsChunks.length; i++) {
          const pageNumber = i + 1;
          const key = `${category.slug}-${pageNumber}`;
          const data = {
            posts: categoryPostsChunks[i].map(formatPostForIndex),
            pagination: createPagination(categoryPosts.length, pageNumber),
            categoryName: category.name
          };

          await db
            .insert(postIndexCache)
            .values({
              key,
              data: JSON.stringify(data)
            })
            .onConflictDoUpdate({
              target: postIndexCache.key,
              set: { data: JSON.stringify(data) }
            });
        }
      }

      // Insert records for each module
      for (const module of modules) {
        if (!module) continue;

        const modulePosts = posts.filter((post) => post.module === module);

        // For each module + category combination
        for (const category of categories) {
          const moduleAndCategoryPosts = modulePosts.filter((post) => {
            const postCategories = parsePostCategories(post);
            return postCategories.some(
              (cat: unknown) =>
                cat?.slug === category.slug ||
                // Handle if the category is just a string
                cat === category.slug ||
                // Handle if the category object has a different structure
                cat?.name?.toLowerCase() === category.name?.toLowerCase()
            );
          });

          if (moduleAndCategoryPosts.length > 0) {
            const chunkedPosts = chunkArray(
              moduleAndCategoryPosts,
              POSTS_PER_PAGE
            );
            for (let i = 0; i < chunkedPosts.length; i++) {
              const pageNumber = i + 1;
              const key = `${module}-${category.slug}-${pageNumber}`;
              const data = {
                posts: chunkedPosts[i].map(formatPostForIndex),
                pagination: createPagination(
                  moduleAndCategoryPosts.length,
                  pageNumber
                ),
                categoryName: category.name
              };

              await db
                .insert(postIndexCache)
                .values({
                  key,
                  data: JSON.stringify(data)
                })
                .onConflictDoUpdate({
                  target: postIndexCache.key,
                  set: { data: JSON.stringify(data) }
                });
            }
          }
        }

        // For module only
        const modulePostsChunks = chunkArray(modulePosts, POSTS_PER_PAGE);
        for (let i = 0; i < modulePostsChunks.length; i++) {
          const pageNumber = i + 1;
          const key = `${module}-${pageNumber}`;
          const data = {
            posts: modulePostsChunks[i].map(formatPostForIndex),
            pagination: createPagination(modulePosts.length, pageNumber),
            categoryName: null
          };

          await db
            .insert(postIndexCache)
            .values({
              key,
              data: JSON.stringify(data)
            })
            .onConflictDoUpdate({
              target: postIndexCache.key,
              set: { data: JSON.stringify(data) }
            });
        }
      }

      console.log('Post index seeding completed');
      return { success: true };
    } catch (error) {
      console.error('Error seeding post index:', error);
      throw error;
    }
  }
});
