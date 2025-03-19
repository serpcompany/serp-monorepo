const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");
const baseConfig = require('./base');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true
  },
  settings: baseConfig.settings,
  ignorePatterns: baseConfig.ignorePatterns,
  rules: {
    ...baseConfig.rules
    // Add library-specific rules here
  }
};
