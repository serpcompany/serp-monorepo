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
    snapshotSerializers: ['./node_modules/vue3-snapshot-serializer/index.js'],
    setupFiles: ['./tests/setupTests.ts']
  }
});
