import type {
  ArtistCredit,
  ArtistRelation,
  CoverArt,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  ReleaseGroupRecording,
  SeriesRelation,
  UrlRelation,
  Wikidata,
} from '@/types/common'
import type { seoMeta } from '@/types/seoMeta'
import type { BaseEntity } from '@/types/types'

export interface ArtistBase {
  name: string
  slug: string
}

export type Artist = BaseEntity &
  ArtistBase &
  seoMeta & {
    beginDate: string | null
    endDate: string | null
    artistType: string | null
    gender: string | null
    area: string | null
    beginArea: string | null
    endArea: string | null
    tags: string[]
    genres: string[]
    releaseGroups: ArtistReleaseGroup[] | null
    urlRels: UrlRelation[] | null
    artistRels: ArtistRelation[] | null
    artistReverseRels: ArtistRelation[] | null
    eventRels: EventRelation[] | null
    labelRels: LabelRelation[] | null
    placeRels: PlaceRelation[] | null
    seriesRels: SeriesRelation[] | null
    wikidata: Wikidata | null
    overview: string | null
  }

export interface ArtistReleaseGroup {
  name: string
  slug: string
  artists: ArtistCredit[]
  date: string | null
  type: string | null
  secondaryTypes: string[] | null
  coverArt: CoverArt | null
  recordings: ReleaseGroupRecording[]
}
