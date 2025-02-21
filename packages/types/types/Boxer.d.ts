import type { WeightClass, RawWeightClass, Pagination } from '@serp/types/types';

export type Opponent = {
  name: string;
  slug: string;
};

export type Bout = {
  date: string;
  opponent: Opponent;
  result: string;
  location: string;
};

export type RawOpponent = {
  name: string;
  slug: string;
};

export type RawBout = {
  date: string;
  opponent: RawOpponent;
  result: string;
  location: string;
};

export type Boxer = {
  id: number;
  name: string;
  slug: string;
  birthName: string;
  career: string;
  debut: string;
  status: string;
  gender: string;
  nationality: string;
  residence: string;
  nicknames: string[];
  stance: string;
  birthPlace: string;
  heightCm: number;
  reachCm: number;
  division: WeightClass;
  content: string;
  numWins: number;
  numDraws: number;
  numLosses: number;
  bouts: Bout[];
};

export type RawBoxer = {
  id: number;
  name: string;
  slug: string;
  birthName: string;
  career: string;
  debut: string;
  status: string;
  gender: string;
  nationality: string;
  residence: string;
  nicknames: string[];
  stance: string;
  birthPlace: string;
  heightCm: number;
  reachCm: number;
  division: RawWeightClass;
  content: string;
  numWins: number;
  numDraws: number;
  numLosses: number;
  bouts: RawBout[];
};

export type BoxerIndex = {
  id: number;
  name: string;
  slug: string;
  division: WeightClass;
};

export type RawBoxerIndex = {
  id: number;
  name: string;
  slug: string;
  division: RawWeightClass;
};

export type Boxers = {
  boxers: BoxerIndex[];
  pagination: Pagination;
};
