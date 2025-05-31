/**
 * SERP Monorepo ESLint Config
 * Centralized ESLint configuration for all Nuxt projects
 */

// Suppress Node.js experimental warnings
process.noDeprecation = true;
process.env.NODE_NO_WARNINGS = 1;

import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: {
      a11y: true
    },
    typescript: true,
    formatters: false, // We're removing prettier
    jsdoc: true, // Enable JSDoc support
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
      'esm/**/*.mjs',
    ]
  },
  {
    // Add your custom rules here
    rules: {
      // Component size limits
      'max-lines': ['warn', 300],
      'complexity': ['warn', 10],
      
      // Other helpful limits
      'max-lines-per-function': ['warn', 50],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 3],
      
      // Vue/Nuxt rules
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/no-setup-props-destructure': 'error',
      'vue/html-self-closing': ['warn', {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always'
      }],
      'vue/multi-word-component-names': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      
      // General rules
      'no-console': 'warn',
      'prefer-const': 'warn',
    }
  },
  {
    // Vue-specific overrides
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
