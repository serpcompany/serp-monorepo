import { db } from '@serp/utils/server/api/db';
import { mbMetadataCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Recording } from '@serp/types/types';

const postProcessLyrics = (lyrics: string) => {
  if (!lyrics) return null;

  return lyrics
    .split('\n')
    .map((line) => (line.trim() ? `<p>${line}</p>` : '<br>'))
    .join('');
};

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const cacheKey = `song-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db
    .select()
    .from(mbMetadataCache)
    .where(eq(mbMetadataCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Song not found'
    });
  }

  const song = results[0] as Recording;
  if (song.lyrics) {
    song.lyrics = postProcessLyrics(song.lyrics);
  }
  addToCache(song, [], 60 * 60 * 24 * 7); // 1 week
  return song;
});
