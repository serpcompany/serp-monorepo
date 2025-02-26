import { db } from '@/server/db';
import { mbArtistMetadataCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import type {
  Artist,
  ArtistReleaseGroup,
  ArtistCredit,
  ReleaseGroupRecording,
  CoverArt,
  UrlRelation,
  ArtistRelation,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  SeriesRelation,
  Wikidata,
  RawArtistCredit,
  RawRecording,
  RawCoverArt,
  RawUrlRelation,
  RawArtistRelation,
  RawEventRelation,
  RawLabelRelation,
  RawPlaceRelation,
  RawSeriesRelation,
  RawWikidata,
  RawArtistReleaseGroup,
  RawArtist
} from '@serp/types/types';

const transformArtistCredit = (artist: RawArtistCredit): ArtistCredit => ({
  creditName: artist.credit_name,
  joinPhrase: artist.join_phrase,
  slug: artist.slug
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

const transformCoverArt = (coverArt: RawCoverArt): CoverArt => ({
  250: coverArt['250'],
  500: coverArt['500']
});

const transformUrlRelation = (rel: RawUrlRelation): UrlRelation => ({
  type: rel.type,
  url: rel.url
});

const transformArtistRelation = (rel: RawArtistRelation): ArtistRelation => ({
  type: rel.type,
  artistName: rel.artist_name,
  artistSlug: rel.artist_slug,
  ...(rel.instrument && { instrument: rel.instrument })
});

const transformEventRelation = (rel: RawEventRelation): EventRelation => ({
  type: rel.type,
  eventName: rel.event_name,
  eventSlug: rel.event_slug
});

const transformLabelRelation = (rel: RawLabelRelation): LabelRelation => ({
  type: rel.type,
  labelName: rel.label_name,
  labelSlug: rel.label_slug
});

const transformPlaceRelation = (rel: RawPlaceRelation): PlaceRelation => ({
  type: rel.type,
  placeName: rel.place_name,
  placeSlug: rel.place_slug
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

const transformReleaseGroup = (
  releaseGroup: RawArtistReleaseGroup
): ArtistReleaseGroup => ({
  name: releaseGroup.name,
  slug: releaseGroup.slug,
  artists: releaseGroup.artists.map(transformArtistCredit),
  date: releaseGroup.date || null,
  type: releaseGroup.type || null,
  secondaryTypes: releaseGroup.secondary_types || null,
  coverArt: releaseGroup.cover_art_urls
    ? transformCoverArt(releaseGroup.cover_art_urls)
    : null,
  recordings: releaseGroup.recordings.map(transformRecording)
});

const transformArtist = (record: RawArtist): Artist => ({
  name: record.name,
  slug: record.slug,
  seoTitle: record.seoTitle,
  seoDescription: record.seoDescription,
  beginDate: record.beginDate || null,
  endDate: record.endDate || null,
  artistType: record.artistType || null,
  gender: record.gender || null,
  area: record.area || null,
  beginArea: record.beginArea || null,
  endArea: record.endArea || null,
  tags: record.tags,
  genres: record.genres,
  releaseGroups: record.releaseGroups?.map(transformReleaseGroup) || null,
  urlRels: record.urlRels?.map(transformUrlRelation) || null,
  artistRels: record.artistRels?.map(transformArtistRelation) || null,
  artistReverseRels:
    record.artistReverseRels?.map(transformArtistRelation) || null,
  eventRels: record.eventRels?.map(transformEventRelation) || null,
  labelRels: record.labelRels?.map(transformLabelRelation) || null,
  placeRels: record.placeRels?.map(transformPlaceRelation) || null,
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
    .from(mbArtistMetadataCache)
    .where(eq(mbArtistMetadataCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Artist not found'
    });
  }

  const artist = transformArtist(results[0]);

  return artist;
});
