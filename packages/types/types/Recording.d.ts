import type {
  AreaRelation,
  ArtistCredit,
  ArtistRelation,
  CoverArt,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  RecordingRelation,
  SeriesRelation,
  UrlRelation,
  Wikidata,
  WorkRelation,
  WorkUrlRelation,
} from '@/types/common'
import type { ReleaseGroupBase } from '@/types/releaseGroup'
import type { seoMeta } from '@/types/seoMeta'
import type { BaseEntity } from '@/types/types'

export interface RecordingBase {
  name: string
  slug: string
}

export type RecordingIndex = RecordingBase & {
  artists: ArtistCredit[]
  releaseGroup: ReleaseGroupBase | null
}

export type Recording = BaseEntity &
  RecordingBase &
  seoMeta & {
    length: number | null
    tags: string[]
    genres: string[]
    releaseGroupSlug: string | null
    releaseGroup: RecordingReleaseGroup | null
    artists: ArtistCredit[]
    artistRels: ArtistRelation[] | null
    urlRels: UrlRelation[] | null
    workRels: WorkRelation[] | null
    workUrlRels: WorkUrlRelation[] | null
    recordingRels: RecordingRelation[] | null
    recordingReverseRels: RecordingRelation[] | null
    seriesRels: SeriesRelation[] | null
    areaRels: AreaRelation[] | null
    eventRels: EventRelation[] | null
    labelRels: LabelRelation[] | null
    placeRels: PlaceRelation[] | null
    wikidata: Wikidata | null
    workWikidata: Wikidata | null
    lyrics: string | null
    lyricsAnnotations: LyricsAnnotation[] | null
    lyricsSync: LyricsSync[] | null
    overview: string | null
  }

export type RecordingReleaseGroup = ReleaseGroupBase & {
  artists: ArtistCredit[]
  date: string | null
  type: string | null
  secondaryTypes: string[] | null
  coverArt: CoverArt | null
}

export interface LyricsAnnotation {
  source: string
  content: string
  verified: boolean
  votes: number
}

export interface LyricsSync {
  startTime: number
  endTime: number
  words: string
  sequence: number
}
