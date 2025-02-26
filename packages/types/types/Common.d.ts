export type ArtistRelation = {
  type: string;
  artistName: string;
  artistSlug: string;
  instrument?: string;
};

export type UrlRelation = {
  type: string;
  url: string;
};

export type WorkRelation = {
  type: string;
  workName: string;
  workSlug: string;
};

export type WorkUrlRelation = {
  type: string;
  url: string;
};

export type RecordingRelation = {
  type: string;
  recordingName: string;
  recordingSlug: string;
};

export type ReleaseGroupRelation = {
  type: string;
  releaseGroupName: string;
  releaseGroupSlug: string;
};

export type SeriesRelation = {
  type: string;
  seriesName: string;
  seriesSlug: string;
};

export type AreaRelation = {
  type: string;
  areaName: string;
  areaSlug: string;
};

export type EventRelation = {
  type: string;
  eventName: string;
  eventSlug: string;
};

export type LabelRelation = {
  type: string;
  labelName: string;
  labelSlug: string;
};

export type PlaceRelation = {
  type: string;
  placeName: string;
  placeSlug: string;
};

export type ArtistCredit = {
  creditName: string;
  joinPhrase: string;
  slug: string;
};

export type ReleaseGroupRecording = {
  name: string;
  position: number;
  slug: string;
  length: number | null;
  artists: ArtistCredit[];
  hasLyrics: boolean;
};

export type Medium = {
  name: string;
  position: number;
  format: string;
  tracks: ReleaseGroupRecording[];
};

export type CoverArt = {
  250: string;
  500: string;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
};

export type Wikidata = {
  title: string;
  aliases: string[];
  properties: Record<string, unknown>;
  description: string;
  serpWikiUrl: string;
  wikipediaUrl: string;
};
