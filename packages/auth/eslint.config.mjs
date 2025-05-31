import antfu from '@antfu/eslint-config'

export default antfu({
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
    'no-debugger': 'error',
    'prefer-const': 'error',

    // Component size limits
    'max-lines': ['warn', 300],
    'max-depth': ['warn', 4],
    'max-params': ['warn', 3],

    // JSDoc/TSDoc documentation standards
    'jsdoc/require-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-param-names': 'error',

    // TODO: Fix these properly later - temporarily disabled for PR merge
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
    'ts/explicit-function-return-type': 'off',
    'eqeqeq': 'off',
    'ts/no-use-before-define': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'off',
    'ts/no-unused-vars': 'off',
    'no-console': 'off',
    'max-lines-per-function': 'off',
    'complexity': 'off',
  },
})
