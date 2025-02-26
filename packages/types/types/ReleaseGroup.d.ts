import type { seoMeta } from '@/types/seoMeta'
import type {
  ArtistRelation,
  ArtistCredit,
  ReleaseGroupRecording,
  CoverArt,
  UrlRelation,
  EventRelation,
  ReleaseGroupRelation,
  SeriesRelation,
  Wikidata
} from '@/types/common'

export type ReleaseGroupBase = {
  name: string
  slug: string
}

export type ReleaseGroupIndex = ReleaseGroupBase & {
  artists: ArtistCredit[]
}

export type ReleaseGroup = ReleaseGroupBase &
  seoMeta & {
    type: string | null
    secondaryTypes: string[] | null
    date: string | null
    coverArt: CoverArt | null
    tags: string[]
    genres: string[]
    artists: ArtistCredit[]
    recordings: ReleaseGroupRecording[] | null
    artistRels: ArtistRelation[] | null
    urlRels: UrlRelation[] | null
    eventRels: EventRelation[] | null
    releaseGroupRels: ReleaseGroupRelation[] | null
    releaseGroupReverseRels: ReleaseGroupRelation[] | null
    seriesRels: SeriesRelation[] | null
    wikidata: Wikidata | null
    overview: string | null
  }
