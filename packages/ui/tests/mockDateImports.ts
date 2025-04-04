/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

// Mock for Date.now() to always return a fixed timestamp
/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed } from 'vue';

const originalDate = global.Date;
class MockDate extends originalDate {
  constructor(...args: any[]) {
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

// Mock for Nuxt's useNuxtApp if needed
(globalThis as any).useNuxtApp = (): Record<string, any> => {
  return {
    $date: {
      format: (): string => 'January 1, 1970',
      formatDate: (): string => 'January 1, 1970',
      formatTime: (): string => '9:00 AM',
      formatDistance: (): string => '56 years ago'
    }
  };
};

// Mock useDate composable if it exists in the project
(globalThis as any).useDate = (): Record<string, any> => {
  return {
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
    }
  };
};

// Mock for other potential date-related functions used in components
(globalThis as any).useDateFormat = (
  date: string | number
): { value: string } => {
  return {
    value: 'January 1, 1970'
  };
};

// Mock useTimeAgo which is often used in Nuxt
(globalThis as any).useTimeAgo = (date: string | number): { value: string } => {
  return computed(() => '56 years ago');
};

// Mock formatDistance if it's used directly
(globalThis as any).formatDistance = (
  date: string | number
): { value: string } => {
  return computed(() => '56 years ago');
};

// Add parseISO mock which is often used with date-fns
(globalThis as any).parseISO = (dateString: string): Date => {
  return new Date(1970, 0, 1);
};
/* eslint-enable @typescript-eslint/no-explicit-any */

// Cleanup function to restore original Date functionality in afterAll
export const cleanupDateMocks = (): void => {
  global.Date = originalDate;
};
