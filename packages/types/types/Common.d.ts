export interface ArtistRelation {
  type: string
  artistName: string
  artistSlug: string
  instrument?: string
}

export interface UrlRelation {
  type: string
  url: string
}

export interface WorkRelation {
  type: string
  workName: string
  workSlug: string
}

export interface WorkUrlRelation {
  type: string
  url: string
}

export interface RecordingRelation {
  type: string
  recordingName: string
  recordingSlug: string
}

export interface ReleaseGroupRelation {
  type: string
  releaseGroupName: string
  releaseGroupSlug: string
}

export interface SeriesRelation {
  type: string
  seriesName: string
  seriesSlug: string
}

export interface AreaRelation {
  type: string
  areaName: string
  areaSlug: string
}

export interface EventRelation {
  type: string
  eventName: string
  eventSlug: string
}

export interface LabelRelation {
  type: string
  labelName: string
  labelSlug: string
}

export interface PlaceRelation {
  type: string
  placeName: string
  placeSlug: string
}

export interface ArtistCredit {
  creditName: string
  joinPhrase: string
  slug: string
}

export interface ReleaseGroupRecording {
  name: string
  position: number
  slug: string
  length: number | null
  artists: ArtistCredit[]
  hasLyrics: boolean
}

export interface Medium {
  name: string
  position: number
  format: string
  tracks: ReleaseGroupRecording[]
}

export interface CoverArt {
  250: string
  500: string
}

export interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface Wikidata {
  title: string
  aliases: string[]
  properties: Record<string, unknown>
  description: string
  serpWikiUrl: string
  wikipediaUrl: string
}
