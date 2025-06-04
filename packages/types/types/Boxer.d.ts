import type { BaseEntity, Pagination, WeightClass } from '@serp/types/types'

export interface Opponent {
  name: string
  slug: string
}

export interface Bout {
  date: string
  opponent: Opponent
  result: string
  location: string
}

export interface RawOpponent {
  name: string
  slug: string
}

export interface RawBout {
  date: string
  opponent: RawOpponent
  result: string
  location: string
}

export type Boxer = BaseEntity & {
  id: number
  name: string
  slug: string
  birthName: string
  career: string
  debut: string
  status: string
  gender: string
  nationality: string
  residence: string
  nicknames: string[]
  stance: string
  birthPlace: string
  heightCm: number
  reachCm: number
  division: WeightClass
  content: string
  numWins: number
  numDraws: number
  numLosses: number
  bouts: Bout[]
}

export type BoxerIndex = BaseEntity & {
  id: number
  name: string
  slug: string
  division: WeightClass
}

export interface Boxers {
  boxers: BoxerIndex[]
  pagination: Pagination
}
