import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
  // JSDoc for documentation standards
    jsonc: false,
    jsdoc: {
      stylistic: true,
    },
    // Project type
    type: 'app',

    // TypeScript with type-aware rules
    typescript: {
      tsconfigPath: 'tsconfig.json',
      overrides: {
        'ts/no-unused-vars': 'warn',
        'ts/no-explicit-any': 'warn',
        'ts/consistent-type-imports': 'error',
      },
    },

    // Vue with accessibility support
    vue: {
      a11y: true,
      overrides: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/require-default-prop': 'off', // Using TypeScript defaults
      },
    },

    // Stylistic formatting rules
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },

    // External formatters for non-JS files
    formatters: {
      css: true, // Format CSS and <style> blocks in Vue
      html: true, // Format HTML files
      markdown: true, // Format Markdown files
    },

    // Better editor experience
    isInEditor: true, // Disable some auto-fixes in editor during refactoring

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
      '.claude/**',
      'docs/**',
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

      // Import organization
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      }],

      // JSDoc/TSDoc documentation standards
      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': ['error', {
        definedTags: ['component', 'example'],
      }],

      // Stylistic preferences
      'style/max-len': ['warn', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
    },
  }),
  // Vue-specific overrides
  {
    files: ['**/*.vue'],
    rules: {
      'max-lines': ['warn', 250], // Stricter for Vue files
      'vue/max-attributes-per-line': ['warn', {
        singleline: 3,
        multiline: 1,
      }],
    },
  },
)
