import { db } from '@/server/db';
import { mbMetadataCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import type {
  Recording,
  ArtistCredit,
  ArtistRelation,
  RecordingReleaseGroup,
  LyricsAnnotation,
  LyricsSync,
  UrlRelation,
  AreaRelation,
  WorkRelation,
  WorkUrlRelation,
  RecordingRelation,
  SeriesRelation,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  Wikidata,
  CoverArt,
  RawRecordingSong,
  RawArtistCredit,
  RawArtistRelation,
  RawRecordingReleaseGroup,
  RawLyricsAnnotation,
  RawLyricsSync,
  RawUrlRelation,
  RawAreaRelation,
  RawWorkRelation,
  RawWorkUrlRelation,
  RawRecordingRelation,
  RawSeriesRelation,
  RawEventRelation,
  RawLabelRelation,
  RawPlaceRelation,
  RawWikidata,
  RawCoverArt
} from '@serp/types/types';

const postProcessLyrics = (lyrics: string) => {
  if (!lyrics) return null;

  return lyrics
    .split('\n')
    .map((line) => (line.trim() ? `<p>${line}</p>` : '<br>'))
    .join('');
};

const transformLyricsAnnotation = (
  annotation: RawLyricsAnnotation
): LyricsAnnotation => ({
  source: annotation.source,
  content: annotation.content,
  verified: annotation.verified,
  votes: annotation.votes
});

const transformLyricsSync = (sync: RawLyricsSync): LyricsSync => ({
  startTime: sync.start_time,
  endTime: sync.end_time,
  words: sync.words,
  sequence: sync.sequence
});

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

const transformAreaRelation = (rel: RawAreaRelation): AreaRelation => ({
  type: rel.type,
  areaName: rel.area_name,
  areaSlug: rel.area_slug
});

const transformWorkRelation = (rel: RawWorkRelation): WorkRelation => ({
  type: rel.type,
  workName: rel.work_name,
  workSlug: rel.work_slug
});

const transformWorkUrlRelation = (
  rel: RawWorkUrlRelation
): WorkUrlRelation => ({
  type: rel.type,
  url: rel.url
});

const transformRecordingRelation = (
  rel: RawRecordingRelation
): RecordingRelation => ({
  type: rel.type,
  recordingName: rel.recording_name,
  recordingSlug: rel.recording_slug
});

const transformSeriesRelation = (rel: RawSeriesRelation): SeriesRelation => ({
  type: rel.type,
  seriesName: rel.series_name,
  seriesSlug: rel.series_slug
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

const transformReleaseGroup = (
  releaseGroup: RawRecordingReleaseGroup | null
): RecordingReleaseGroup | null => {
  if (!releaseGroup) return null;
  return {
    name: releaseGroup.name,
    slug: releaseGroup.slug,
    artists: releaseGroup.artists?.map(transformArtistCredit) || [],
    date: releaseGroup.date || null,
    type: releaseGroup.type || null,
    secondaryTypes: releaseGroup.secondary_types || null,
    coverArt: releaseGroup.cover_art_urls
      ? transformCoverArt(releaseGroup.cover_art_urls)
      : null
  };
};

const transformRecording = (record: RawRecordingSong): Recording => ({
  name: record.name,
  slug: record.slug,
  seoTitle: record.seoTitle,
  seoDescription: record.seoDescription,
  length: record.length,
  tags: record.tags,
  genres: record.genres,
  releaseGroupSlug: record.releaseGroupSlug,
  releaseGroup: transformReleaseGroup(record.releaseGroup),
  artists: record.artists.map(transformArtistCredit),
  artistRels: record.artistRels?.map(transformArtistRelation) || null,
  urlRels: record.urlRels?.map(transformUrlRelation) || null,
  workRels: record.workRels?.map(transformWorkRelation) || null,
  workUrlRels: record.workUrlRels?.map(transformWorkUrlRelation) || null,
  recordingRels: record.recordingRels?.map(transformRecordingRelation) || null,
  recordingReverseRels:
    record.recordingReverseRels?.map(transformRecordingRelation) || null,
  seriesRels: record.seriesRels?.map(transformSeriesRelation) || null,
  areaRels: record.areaRels?.map(transformAreaRelation) || null,
  eventRels: record.eventRels?.map(transformEventRelation) || null,
  labelRels: record.labelRels?.map(transformLabelRelation) || null,
  placeRels: record.placeRels?.map(transformPlaceRelation) || null,
  wikidata: record.wikidata ? transformWikidata(record.wikidata) : null,
  workWikidata: record.workWikidata
    ? transformWikidata(record.workWikidata)
    : null,
  lyrics: record.lyrics ? postProcessLyrics(record.lyrics) : null,
  lyricsAnnotations:
    record.lyricsAnnotations?.map(transformLyricsAnnotation) || null,
  lyricsSync: record.lyricsSync?.map(transformLyricsSync) || null,
  overview: record.overview
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

  const song = transformRecording(results[0] as RawRecordingSong);

  return song;
});
