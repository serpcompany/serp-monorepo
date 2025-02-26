import type { seoMeta } from '@/types/seoMeta';
import type {
  CoverArt,
  ArtistCredit,
  ReleaseGroupRecording,
  UrlRelation,
  ArtistRelation,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  SeriesRelation,
  Wikidata
} from '@/types/common';

export type ArtistBase = {
  name: string;
  slug: string;
};

export type Artist = ArtistBase &
  seoMeta & {
    beginDate: string | null;
    endDate: string | null;
    artistType: string | null;
    gender: string | null;
    area: string | null;
    beginArea: string | null;
    endArea: string | null;
    tags: string[];
    genres: string[];
    releaseGroups: ArtistReleaseGroup[] | null;
    urlRels: UrlRelation[] | null;
    artistRels: ArtistRelation[] | null;
    artistReverseRels: ArtistRelation[] | null;
    eventRels: EventRelation[] | null;
    labelRels: LabelRelation[] | null;
    placeRels: PlaceRelation[] | null;
    seriesRels: SeriesRelation[] | null;
    wikidata: Wikidata | null;
    overview: string | null;
  };

export type ArtistReleaseGroup = {
  name: string;
  slug: string;
  artists: ArtistCredit[];
  date: string | null;
  type: string | null;
  secondaryTypes: string[] | null;
  coverArt: CoverArt | null;
  recordings: ReleaseGroupRecording[];
};
