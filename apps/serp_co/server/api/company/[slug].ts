import { db } from '@/server/db';
import { companyCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type {
  Company,
  RawCompany,
  Feature,
  RawFeature,
  Faq,
  RawFaq,
  Category,
  RawCategory
} from '@/types';

const transformFeature = (feature: RawFeature): Feature => ({
  id: feature.id,
  item: feature.item,
  description: feature.description
});

const transformFaq = (faq: RawFaq): Faq => ({
  question: faq.question,
  answer: faq.answer
});

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

const transformCompany = (company: RawCompany): Company => ({
  id: company.id,
  name: company.name,
  slug: company.slug,
  oneLiner: company.oneLiner,
  excerpt: company.excerpt,
  logo: company.logo,
  serplyLink: company.serplyLink,
  article: company.content,
  features: company.features?.map(transformFeature),
  pros: company.pros,
  cons: company.cons,
  faqs: company.faqs?.map(transformFaq),
  alternatives: company.alternatives,
  categories: company.categories?.map(transformCategory),
  screenshots: company.screenshots,
  rating: company.rating,
  upvotes: company.upvotes,
  downvotes: company.downvotes
});

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const cacheKey = `company-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db
    .select()
    .from(companyCache)
    .where(eq(companyCache.slug, slug));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Company not found'
    });
  }

  const company = transformCompany(results[0]);
  const response = company;

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
