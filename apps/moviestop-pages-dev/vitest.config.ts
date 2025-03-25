// vitest.config.ts

// THIS IS THE DUMMYTEST SETUP
// MAKE SURE TO UPDATE THESE VALUES
// IF YOU START WRITING ACTUAL TESTS FOR THIS APP/PACKAGE
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules', 'tests']
    },
    setupFiles: ['./tests/setupTests.ts']
  }
});
