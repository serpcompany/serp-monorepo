import type { Category } from '@serp/types/types';

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology'
  },
  {
    id: 2,
    name: 'Finance',
    slug: 'finance'
  },
  {
    id: 3,
    name: 'Healthcare',
    slug: 'healthcare'
  },
  {
    id: 4,
    name: 'Education',
    slug: 'education'
  },
  {
    id: 5,
    name: 'E-commerce',
    slug: 'e-commerce'
  },
  {
    id: 6,
    name: 'Marketing',
    slug: 'marketing'
  }
];

export default defineEventHandler(async () => CATEGORIES);
