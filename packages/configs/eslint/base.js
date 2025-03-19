const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a base ESLint configuration for use across the monorepo.
 * Other configurations should extend this for their specific needs.
 */

module.exports = {
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  // Shared ignore patterns for the entire monorepo
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    '.eslintrc.cjs',
    'nuxt.config.ts',
    'eslint.config.mjs',
    '.nuxt/',
    '**/package.json',
    '**/tsconfig.json'
  ],
  // Base rules for all projects
  rules: {
    'comma-dangle': 'off',
    semi: 'off'
  }
};
