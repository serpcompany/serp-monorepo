/* eslint-disable @typescript-eslint/no-unused-vars */

// Mock for Date.now() to always return a fixed timestamp

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { computed } from 'vue';

const originalDate = global.Date;
class MockDate extends originalDate {
  constructor(...args: unknown[]) {
    if (args.length === 0) {
      super(1970, 0, 1); // January 1, 1970
    } else {
      super(...(args as [number, number, number]));
    }
  }

  static override now(): number {
    return 1704067200000; // January 1, 2024
  }
}

global.Date = MockDate as DateConstructor;

// Mock for Date.toLocaleString to return a consistent date string
Date.prototype.toLocaleString = function (): string {
  return 'Thursday, January 1, 1970 at 9:00:01 AM';
};

// Define date-related utility objects
const nuxtAppDateUtils = {
  $date: {
    format: (): string => 'January 1, 1970',
    formatDate: (): string => 'January 1, 1970',
    formatTime: (): string => '9:00 AM',
    formatDistance: (): string => '56 years ago',
  },
};

const dateUtils = {
  format: (date: string | number, format?: string): string => {
    return 'January 1, 1970';
  },
  formatDate: (date: string | number): string => {
    return 'January 1, 1970';
  },
  formatTime: (date: string | number): string => {
    return '9:00 AM';
  },
  formatDistance: (date: string | number): string => {
    return '56 years ago';
  },
};

mockNuxtImport(
  'useNuxtApp',
  () => (): Record<string, unknown> => nuxtAppDateUtils,
);

(globalThis as unknown).useDate = (): Record<string, unknown> => dateUtils;
(globalThis as unknown).useDateFormat = (
  date: string | number,
): { value: string } => ({
  value: 'January 1, 1970',
});
(globalThis as unknown).useTimeAgo = (
  date: string | number,
): { value: string } => computed(() => '56 years ago');
(globalThis as unknown).formatDistance = (
  date: string | number,
): { value: string } => computed(() => '56 years ago');
(globalThis as unknown).parseISO = (dateString: string): Date =>
  new Date(1970, 0, 1);

// Cleanup function to restore original Date functionality in afterAll
export function cleanupDateMocks(): void {
  global.Date = originalDate;
}
