// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    coverage: {
      all: true,
      reporter: ['text', 'json', 'html'],
      include: ['components/**/*.{js,ts,vue}', 'composables/**/*.{js,ts,vue}'],
      reportsDirectory: './coverage',
      exclude: ['node_modules', 'tests']
    },
    setupFiles: ['./tests/setupTests.ts']
  }
});
