import type { WeightClass } from '@serp/types/types';

const predefinedWeightClasses: WeightClass[] = [
  { id: 1, name: 'Bantamweight', slug: 'bantamweight' },
  { id: 2, name: 'Cruiserweight', slug: 'cruiserweight' },
  { id: 3, name: 'Featherweight', slug: 'featherweight' },
  { id: 4, name: 'Flyweight', slug: 'flyweight' },
  { id: 5, name: 'Heavyweight', slug: 'heavyweight' },
  { id: 6, name: 'Light Flyweight', slug: 'light-flyweight' },
  { id: 7, name: 'Light Heavyweight', slug: 'light-heavyweight' },
  { id: 8, name: 'Lightweight', slug: 'lightweight' },
  { id: 9, name: 'Middleweight', slug: 'middleweight' },
  { id: 10, name: 'Minimumweight', slug: 'minimumweight' },
  { id: 11, name: 'Super Bantamweight', slug: 'super-bantamweight' },
  { id: 12, name: 'Super Featherweight', slug: 'super-featherweight' },
  { id: 13, name: 'Super Flyweight', slug: 'super-flyweight' },
  { id: 14, name: 'Super Lightweight', slug: 'super-lightweight' },
  { id: 15, name: 'Super Middleweight', slug: 'super-middleweight' },
  { id: 16, name: 'Super Welterweight', slug: 'super-welterweight' },
  { id: 17, name: 'Welterweight', slug: 'welterweight' }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  return predefinedWeightClasses;
});
