import { db } from '@/server/db';
import { boxerCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type {
  Opponent,
  RawOpponent,
  Bout,
  RawBout,
  Boxer,
  RawBoxer,
  WeightClass,
  RawWeightClass
} from '@serp/types/types';

const transformWeightClass = (weightClass: RawWeightClass): WeightClass => ({
  name: weightClass.name,
  slug: weightClass.slug
});

const transformOpponent = (opponent: RawOpponent): Opponent => ({
  name: opponent.name,
  slug: opponent.slug
});

const transformBout = (bout: RawBout): Bout => ({
  date: bout.date,
  opponent: transformOpponent(bout.opponent),
  result: bout.result,
  location: bout.location
});

const transformBoxer = (boxer: RawBoxer): Boxer => ({
  id: boxer.id,
  name: boxer.name,
  slug: boxer.slug,
  birthName: boxer.birthName,
  career: boxer.career,
  debut: boxer.debut,
  status: boxer.status,
  gender: boxer.gender,
  nationality: boxer.nationality,
  residence: boxer.residence,
  nicknames: boxer.nicknames,
  stance: boxer.stance,
  birthPlace: boxer.birthPlace,
  heightCm: boxer.heightCm,
  reachCm: boxer.reachCm,
  division: transformWeightClass(boxer.division),
  content: boxer.content,
  numWins: boxer.numWins,
  numDraws: boxer.numDraws,
  numLosses: boxer.numLosses,
  bouts: boxer.bouts.map(transformBout)
});

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const cacheKey = `boxer-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(boxerCache).where(eq(boxerCache.slug, slug));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Boxer not found'
    });
  }

  const boxer = transformBoxer(results[0]);
  const response = boxer;

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
