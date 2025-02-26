import type { seoMeta } from '@/types/seoMeta'
import type {
  ArtistCredit,
  ArtistRelation,
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
  CoverArt
} from '@/types/common'
import type { ReleaseGroupBase } from '@/types/releaseGroup'

export type RecordingBase = {
  name: string
  slug: string
}

export type RecordingIndex = RecordingBase & {
  artists: ArtistCredit[]
  releaseGroup: ReleaseGroupBase | null
}

export type Recording = RecordingBase &
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

export type LyricsAnnotation = {
  source: string
  content: string
  verified: boolean
  votes: number
}

export type LyricsSync = {
  startTime: number
  endTime: number
  words: string
  sequence: number
}
