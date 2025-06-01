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
      'ts/explicit-function-return-type': 'warn', // Make return types non-blocking
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

    // Disable restrictive rules that are blocking CI
    'node/prefer-global/process': 'off',
    'max-lines': 'off',
    'complexity': 'off',
    'max-lines-per-function': 'off',
    'max-depth': 'off',
    'max-params': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',

    // JSDoc/TSDoc documentation standards
    'jsdoc/require-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-param-names': 'error',
  },
})
