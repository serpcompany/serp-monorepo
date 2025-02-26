export type RawArtistCredit = {
  credit_name: string;
  join_phrase: string;
  slug: string;
};

export type RawArtistRelation = {
  type: string;
  artist_name: string;
  artist_slug: string;
  instrument?: string;
};

export type RawUrlRelation = {
  type: string;
  url: string;
};

export type RawEventRelation = {
  type: string;
  event_name: string;
  event_slug: string;
};

export type RawReleaseGroupRelation = {
  type: string;
  release_group_name: string;
  release_group_slug: string;
};

export type RawSeriesRelation = {
  type: string;
  series_name: string;
  series_slug: string;
};

export type RawWikidata = {
  title: string;
  aliases: string[];
  properties: Record<string, unknown>;
  description: string;
  serp_wiki_url: string;
  wikipedia_url: string;
};

export type RawCoverArt = {
  '250': string;
  '500': string;
};

export type RawLabelRelation = {
  type: string;
  label_name: string;
  label_slug: string;
};

export type RawPlaceRelation = {
  type: string;
  place_name: string;
  place_slug: string;
};

export type RawArtistReleaseGroup = {
  name: string;
  slug: string;
  artists: RawArtistCredit[];
  date: string | null;
  type: string | null;
  secondary_types: string[] | null;
  cover_art_urls: RawCoverArt | null;
  recordings: RawRecording[];
};

export type RawLyricsAnnotation = {
  source: string;
  content: string;
  verified: boolean;
  votes: number;
};

export type RawLyricsSync = {
  start_time: number;
  end_time: number;
  words: string;
  sequence: number;
};

export type RawAreaRelation = {
  type: string;
  area_name: string;
  area_slug: string;
};

export type RawWorkRelation = {
  type: string;
  work_name: string;
  work_slug: string;
};

export type RawWorkUrlRelation = {
  type: string;
  url: string;
};

export type RawRecordingRelation = {
  type: string;
  recording_name: string;
  recording_slug: string;
};

export type RawRecordingReleaseGroup = {
  name: string;
  slug: string;
  artists?: RawArtistCredit[];
  date: string | null;
  type: string | null;
  secondary_types: string[] | null;
  cover_art_urls: RawCoverArt | null;
};

export type RawReleaseGroup = {
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  type: string | null;
  secondaryTypes: string[] | null;
  date: string | null;
  coverArt: RawCoverArt | null;
  tags: string[];
  genres: string[];
  artists: RawArtistCredit[];
  recordings?: RawRecording[] | null;
  artistRels?: RawArtistRelation[] | null;
  urlRels?: RawUrlRelation[] | null;
  eventRels?: RawEventRelation[] | null;
  releaseGroupRels?: RawReleaseGroupRelation[] | null;
  releaseGroupReverseRels?: RawReleaseGroupRelation[] | null;
  seriesRels?: RawSeriesRelation[] | null;
  wikidata: RawWikidata | null;
  overview: string | null;
};

export type RawArtist = {
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  beginDate: string | null;
  endDate: string | null;
  artistType: string | null;
  gender: string | null;
  area: string | null;
  beginArea: string | null;
  endArea: string | null;
  tags: string[];
  genres: string[];
  releaseGroups?: RawArtistReleaseGroup[] | null;
  urlRels?: RawUrlRelation[] | null;
  artistRels?: RawArtistRelation[] | null;
  artistReverseRels?: RawArtistRelation[] | null;
  eventRels?: RawEventRelation[] | null;
  labelRels?: RawLabelRelation[] | null;
  placeRels?: RawPlaceRelation[] | null;
  seriesRels?: RawSeriesRelation[] | null;
  wikidata: RawWikidata | null;
  overview: string | null;
};

export type RawRecording = {
  name: string;
  position: number;
  slug: string;
  length: number | null;
  artists: RawArtistCredit[];
  has_lyrics: boolean;
};

export type RawRecordingSong = {
  name: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  length: number | null;
  tags: string[];
  genres: string[];
  releaseGroupSlug: string;
  releaseGroup: RawRecordingReleaseGroup | null;
  artists: RawArtistCredit[];
  artistRels?: RawArtistRelation[] | null;
  urlRels?: RawUrlRelation[] | null;
  workRels?: RawWorkRelation[] | null;
  workUrlRels?: RawWorkUrlRelation[] | null;
  recordingRels?: RawRecordingRelation[] | null;
  recordingReverseRels?: RawRecordingRelation[] | null;
  seriesRels?: RawSeriesRelation[] | null;
  areaRels?: RawAreaRelation[] | null;
  eventRels?: RawEventRelation[] | null;
  labelRels?: RawLabelRelation[] | null;
  placeRels?: RawPlaceRelation[] | null;
  wikidata: RawWikidata | null;
  workWikidata: RawWikidata | null;
  lyrics: string | null;
  lyricsAnnotations?: RawLyricsAnnotation[] | null;
  lyricsSync?: RawLyricsSync[] | null;
  overview: string | null;
};

export type RawReleaseGroupBase = {
  name: string;
  slug: string;
  artists: RawArtistCredit[];
};

export type RawArtistBase = {
  name: string;
  slug: string;
};

export type RawRecordingIndex = {
  name: string;
  slug: string;
  artists: RawArtistCredit[];
  releaseGroup: RawReleaseGroupBase;
};
