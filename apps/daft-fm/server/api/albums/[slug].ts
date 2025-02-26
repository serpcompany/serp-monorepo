import { db } from '@/server/db';
import { mbReleaseGroupCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import type {
  ReleaseGroup,
  ArtistCredit,
  ArtistRelation,
  ReleaseGroupRecording,
  UrlRelation,
  EventRelation,
  ReleaseGroupRelation,
  SeriesRelation,
  Wikidata,
  CoverArt,
  RawArtistCredit,
  RawArtistRelation,
  RawUrlRelation,
  RawEventRelation,
  RawReleaseGroupRelation,
  RawSeriesRelation,
  RawWikidata,
  RawCoverArt,
  RawRecording,
  RawReleaseGroup
} from '@serp/types/types';

const transformArtistCredit = (artist: RawArtistCredit): ArtistCredit => ({
  creditName: artist.credit_name,
  joinPhrase: artist.join_phrase,
  slug: artist.slug
});

const transformArtistRelation = (rel: RawArtistRelation): ArtistRelation => ({
  type: rel.type,
  artistName: rel.artist_name,
  artistSlug: rel.artist_slug,
  ...(rel.instrument && { instrument: rel.instrument })
});

const transformUrlRelation = (rel: RawUrlRelation): UrlRelation => ({
  type: rel.type,
  url: rel.url
});

const transformEventRelation = (rel: RawEventRelation): EventRelation => ({
  type: rel.type,
  eventName: rel.event_name,
  eventSlug: rel.event_slug
});

const transformReleaseGroupRelation = (
  rel: RawReleaseGroupRelation
): ReleaseGroupRelation => ({
  type: rel.type,
  releaseGroupName: rel.release_group_name,
  releaseGroupSlug: rel.release_group_slug
});

const transformSeriesRelation = (rel: RawSeriesRelation): SeriesRelation => ({
  type: rel.type,
  seriesName: rel.series_name,
  seriesSlug: rel.series_slug
});

const transformWikidata = (wikidata: RawWikidata): Wikidata => ({
  title: wikidata.title,
  aliases: wikidata.aliases,
  properties: wikidata.properties,
  description: wikidata.description,
  serpWikiUrl: wikidata.serp_wiki_url,
  wikipediaUrl: wikidata.wikipedia_url
});

const transformCoverArt = (coverArt: RawCoverArt): CoverArt => ({
  250: coverArt['250'],
  500: coverArt['500']
});

const transformRecording = (
  recording: RawRecording
): ReleaseGroupRecording => ({
  name: recording.name,
  position: recording.position,
  slug: recording.slug,
  length: recording.length || null,
  artists: recording.artists.map(transformArtistCredit),
  hasLyrics: recording.has_lyrics
});

const transformReleaseGroup = (record: RawReleaseGroup): ReleaseGroup => ({
  name: record.name,
  slug: record.slug,
  seoTitle: record.seoTitle,
  seoDescription: record.seoDescription,
  type: record.type || null,
  secondaryTypes: record.secondaryTypes || null,
  date: record.date || null,
  coverArt: record.coverArt ? transformCoverArt(record.coverArt) : null,
  tags: record.tags,
  genres: record.genres,
  artists: record.artists.map(transformArtistCredit),
  recordings: record.recordings?.map(transformRecording) || null,
  artistRels: record.artistRels?.map(transformArtistRelation) || null,
  urlRels: record.urlRels?.map(transformUrlRelation) || null,
  eventRels: record.eventRels?.map(transformEventRelation) || null,
  releaseGroupRels:
    record.releaseGroupRels?.map(transformReleaseGroupRelation) || null,
  releaseGroupReverseRels:
    record.releaseGroupReverseRels?.map(transformReleaseGroupRelation) || null,
  seriesRels: record.seriesRels?.map(transformSeriesRelation) || null,
  wikidata: record.wikidata ? transformWikidata(record.wikidata) : null,
  overview: record.overview || null
});

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const query = db
    .select()
    .from(mbReleaseGroupCache)
    .where(eq(mbReleaseGroupCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Album not found'
    });
  }

  const album = transformReleaseGroup(results[0]);

  return album;
});
