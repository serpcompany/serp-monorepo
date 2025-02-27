import { pgSchema, integer, text, jsonb } from 'drizzle-orm/pg-core';

export const mappingSchema = pgSchema('mapping');

export const mbMetadataCache = mappingSchema.table('mb_metadata_cache', {
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  artists: jsonb('artists').notNull(),
  tags: text('tags').array().notNull(),
  genres: text('genres').array().notNull(),
  releaseGroup: jsonb('release_group'),
  releaseGroupSlug: text('release_group_slug'),
  length: integer('length'),
  artistRels: jsonb('artist_rels'),
  urlRels: jsonb('url_rels'),
  workRels: jsonb('work_rels'),
  workUrlRels: jsonb('work_url_rels'),
  recordingRels: jsonb('recording_rels'),
  recordingReverseRels: jsonb('recording_reverse_rels'),
  seriesRels: jsonb('series_rels'),
  areaRels: jsonb('area_rels'),
  eventRels: jsonb('event_rels'),
  labelRels: jsonb('label_rels'),
  placeRels: jsonb('place_rels'),
  wikidata: jsonb('wikidata'),
  workWikidata: jsonb('work_wikidata'),
  lyrics: text('lyrics'),
  lyricsAnnotations: jsonb('lyrics_annotations'),
  lyricsSync: jsonb('lyrics_sync'),
  overview: text('overview'),
  seoDescription: text('seo_description'),
  seoTitle: text('seo_title')
});

export const mbReleaseGroupCache = mappingSchema.table(
  'mb_release_group_cache',
  {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    type: text('type').notNull(),
    secondaryTypes: text('secondary_types').array(),
    date: text('date').notNull(),
    coverArt: jsonb('cover_art'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    artists: jsonb('artists').notNull(),
    recordings: jsonb('recordings').notNull(),
    mediums: jsonb('mediums').notNull(),
    artistRels: jsonb('artist_rels'),
    urlRels: jsonb('url_rels'),
    eventRels: jsonb('event_rels'),
    releaseGroupRels: jsonb('release_group_rels'),
    releaseGroupReverseRels: jsonb('release_group_reverse_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }
);

export const mbArtistMetadataCache = mappingSchema.table(
  'mb_artist_metadata_cache',
  {
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    beginDate: text('begin_date'),
    endDate: text('end_date'),
    artistType: text('artist_type'),
    gender: text('gender'),
    area: text('area'),
    beginArea: text('begin_area'),
    endArea: text('end_area'),
    tags: text('tags').array().notNull(),
    genres: text('genres').array().notNull(),
    releaseGroups: jsonb('release_groups').notNull(),
    urlRels: jsonb('url_rels'),
    artistRels: jsonb('artist_rels'),
    artistReverseRels: jsonb('artist_reverse_rels'),
    eventRels: jsonb('event_rels'),
    labelRels: jsonb('label_rels'),
    placeRels: jsonb('place_rels'),
    seriesRels: jsonb('series_rels'),
    wikidata: jsonb('wikidata'),
    overview: text('overview'),
    seoDescription: text('seo_description'),
    seoTitle: text('seo_title')
  }
);
