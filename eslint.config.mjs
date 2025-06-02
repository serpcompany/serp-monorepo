/**
 * SERP Monorepo ESLint Config
 * Centralized ESLint configuration for all Nuxt projects
 */

// Suppress Node.js experimental warnings
import antfu from '@antfu/eslint-config'

process.noDeprecation = true
process.env.NODE_NO_WARNINGS = 1


export default antfu({
  vue: {
    a11y: true,
    vue: true
  },
  typescript: true,
  formatters: true,
  jsdoc: true, // Enable JSDoc support
  stylistic: true,
  ignores: [
    // Common directories to ignore
    'node_modules/',
    'dist/',
    '.nuxt/',
    '**/.nuxt/',
    '**/.nuxt/**/',
    '**/eslint.config.mjs',
    '.playground/',
    'coverage/',
    '.github/',
    '.vscode/',
    '.turbo/',
    '.wrangler/',
    '.data/',
    '.git/',
    '.output/',
    '**/.output/',

    // Package-specific patterns
    'packages/ui/templates/',
    'packages/ui/templates/**',
    'packages/ui/templates/nuxt-ui-landing/**',
    'packages/ui/templates/nuxt-ui-saas/**',
    'packages/ui/.nuxt/**',

    // Auto-generated files
    '**/*.min.js',
    'esm/**/*.mjs'
  ],
  rules: {
      // Component size limits
      'max-lines': ['warn', 300],
      complexity: ['warn', 10],

      // Other helpful limits
      'max-lines-per-function': ['warn', 50],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 3],

      // Vue/Nuxt rules
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/no-setup-props-reactivity-loss': 'error', // Prevent props destructuring that breaks reactivity
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'always', normal: 'never', component: 'always' },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/multi-word-component-names': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',

      // Node.js rules - allow process usage in Nuxt projects
      'node/prefer-global/buffer': 'warn',

      // Import/export rules - FORCE override antfu defaults
      'perfectionist/sort-named-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'ts/no-unused-vars': 'warn',

      // General rules
      'no-console': 'warn',
      'prefer-const': 'warn',

      // style rules
      'style/indent': 'warn',
      'style/semi': 'warn'
    }
}).append(
  {
    rules: {
      'no-restricted-globals': 'warn'
    }
  },
  {
    // Vue-specific overrides
    files: ['**/*.vue'],
    rules: {
      'max-lines': ['warn', 250], // Stricter for Vue files
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 3,
          multiline: 1
        }
      ],
      // Vue stylistic rules to match prettier vueIndentScriptAndStyle: true
      'vue/script-indent': ['warn', 2, { baseIndent: 1 }],
      'vue/html-indent': ['warn', 2],
      'vue/no-required-prop-with-default': 'warn'
    }
  },
  {
    // Configuration files - allow process usage
    files: [
      '**/nuxt.config.ts',
      'nuxt.config.ts',
      '**/drizzle.config.ts',
      'drizzle.config.ts',
      '**/drizzle.auth.config.ts',
      'drizzle.auth.config.ts',
      '**/multiCache.serverOptions.ts',
      'multiCache.serverOptions.ts',
      '**/vitest.config.ts',
      'vitest.config.ts',
      '**/tailwindcss.config.ts',
      'tailwindcss.config.ts',
      '**/server/**/*.ts',
      'server/**/*.ts'
    ],
    rules: {
      'node/prefer-global/process': 'off', // allow 'process.env' in some /server/ routes & config files bc Nuxt provides the Node.js context
      'ts/strict-boolean-expressions': 'off'
    }
  }
)
