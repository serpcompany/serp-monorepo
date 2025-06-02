import antfu from '@antfu/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    standalone: false,
  },
}).append(
  antfu({
    // JSDoc for documentation standards
    jsonc: false,
    jsdoc: {
      stylistic: true,
    },
    // Project type
    type: 'lib',

    // TypeScript with type-aware rules
    typescript: {
      overrides: {
        'ts/no-unused-vars': 'warn',
        'ts/no-explicit-any': 'warn',
        'ts/consistent-type-imports': 'error',
      },
    },

    // Vue with accessibility support
    vue: false,

    // Stylistic formatting rules
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },

    // External formatters for non-JS files
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },

    // Better editor experience
    isInEditor: true,

    // Ignore patterns
    ignores: [
      'dist/**',
      'build/**',
      '.nuxt/**',
      '.output/**',
      'coverage/**',
      'node_modules/**',
      '*.min.js',
      '*.d.ts',
      'public/**',
    ],

    // Global rules
    rules: {
      // General code quality
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',

      // Component size limits
      'max-lines': ['warn', 300],
      'complexity': ['warn', 10],

      // Other helpful limits
      'max-lines-per-function': ['warn', 50],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 3],

      // JSDoc/TSDoc documentation standards
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
    },
  }),
)
