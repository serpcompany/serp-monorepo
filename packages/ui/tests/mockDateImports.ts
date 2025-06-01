/* eslint-disable ts/no-unused-vars */

// Mock for Date.now() to always return a fixed timestamp

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { computed } from 'vue'

const originalDate = globalThis.Date
class MockDate extends originalDate {
  constructor(...args: unknown[]) {
    if (args.length === 0) {
      super(1970, 0, 1) // January 1, 1970
    }
    else {
      super(...(args as [number, number, number]))
    }
  }

  static override now(): number {
    return 1704067200000 // January 1, 2024
  }
}

globalThis.Date = MockDate as DateConstructor

// Mock for Date.toLocaleString to return a consistent date string
// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleString = function (): string {
  return 'Thursday, January 1, 1970 at 9:00:01 AM'
}

// Define date-related utility objects
const nuxtAppDateUtils = {
  $date: {
    format: (): string => 'January 1, 1970',
    formatDate: (): string => 'January 1, 1970',
    formatTime: (): string => '9:00 AM',
    formatDistance: (): string => '56 years ago',
  },
}

const dateUtils = {
  format: (_date: string | number, _format?: string): string => {
    return 'January 1, 1970'
  },
  formatDate: (_date: string | number): string => {
    return 'January 1, 1970'
  },
  formatTime: (_date: string | number): string => {
    return '9:00 AM'
  },
  formatDistance: (_date: string | number): string => {
    return '56 years ago'
  },
}

mockNuxtImport(
  'useNuxtApp',
  () => (): Record<string, unknown> => nuxtAppDateUtils,
);

(globalThis as unknown).useDate = (): Record<string, unknown> => dateUtils;
(globalThis as unknown).useDateFormat = (
  _date: string | number,
): { value: string } => ({
  value: 'January 1, 1970',
});
(globalThis as unknown).useTimeAgo = (
  _date: string | number,
): { value: string } => computed(() => '56 years ago');
(globalThis as unknown).formatDistance = (
  _date: string | number,
): { value: string } => computed(() => '56 years ago');
(globalThis as unknown).parseISO = (_dateString: string): Date =>
  new Date(1970, 0, 1)

// Cleanup function to restore original Date functionality in afterAll
export function cleanupDateMocks(): void {
  globalThis.Date = originalDate
}
