import type { Category } from '@serp/types/types';

const predefinedCategories: Category[] = [
  { id: 1, name: 'Shop', slug: 'shop' },
  { id: 2, name: 'Movies', slug: 'movies' }
];

export default defineEventHandler(async (event) => {
  return predefinedCategories;
});
