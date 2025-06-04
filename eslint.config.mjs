/**
 * SERP Monorepo ESLint Config
 * Centralized ESLint configuration for all Nuxt projects
 */

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
  jsdoc: true,
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
    'reports/',
    '.output/',
    '**/.output/',
    'scripts/',

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
      // TypeScript rules are handled by ts/* prefixed rules below

      // Node.js rules - allow process usage in Nuxt projects
      'node/prefer-global/buffer': 'warn',
      'perfectionist/sort-named-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'ts/no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-restricted-globals': 'warn',
      'style/indent': 'warn',
      'style/semi': 'warn'
    }
}).append(
  // Overrides: ALL ROUTES
  {
    rules: {
      'vue-a11y/form-control-has-label': 'warn',
      'no-alert': 'warn',
      'style/brace-style': 'warn',
      'antfu/if-newline': 'warn',
      'style/quotes': 'warn',
      'style/no-trailing-spaces': 'warn',
      'style/member-delimiter-style': 'warn',
      'style/operator-linebreak': 'warn',
      'style/arrow-parens': 'warn',
      'vue/operator-linebreak': 'warn',
    }
  },
  // Overrides: Vue
  {
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
      'vue/no-required-prop-with-default': 'warn',
      // Disable operator-linebreak rules for Vue files to prevent auto-fix issues
      'style/operator-linebreak': 'off',
      'vue/operator-linebreak': 'off',
      'style/indent-binary-ops': 'off'
    }
  },
  // Overrides: /server/ routes
  {
    files: [
      '**/server/**/*.ts',
      'server/**/*.ts'
    ],
    rules: {
      'node/prefer-global/process': 'warn',
    }
  },
  // Overrides: .config.ts files
  {
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

    ],
    rules: {
      'node/prefer-global/process': 'warn', // allow 'process.env' in some /server/ routes & config files bc Nuxt provides the Node.js context
      'ts/strict-boolean-expressions': 'off'
    }
  },
  // Package-specific overrides: packages/api
  {
    files: [
      '**/packages/api/**',
      '../../packages/api/**'
    ],
    rules: {
      // Now that isNaN errors are fixed, enforce the rule to prevent new occurrences
      'unicorn/prefer-number-properties': 'error'
    }
  },
  // Package-specific overrides: packages/ui
  {
    files: [
      '**/packages/ui/**',
      '../../packages/ui/**'
    ],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'eqeqeq': 'warn',
      'format/prettier': 'warn',
      'no-alert': 'warn',
      'no-extend-native': 'warn',
      'no-restricted-globals': 'warn',
      'node/prefer-global/process': 'warn',
      'regexp/no-misleading-capturing-group': 'warn',
      'ts/explicit-function-return-type': 'warn',
      'ts/no-unused-vars': 'warn',
      'ts/no-use-before-define': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'vue-a11y/alt-text': 'warn',
      'vue-a11y/anchor-has-content': 'warn',
      'vue-a11y/click-events-have-key-events': 'warn',
      'vue-a11y/form-control-has-label': 'warn',
      'vue-a11y/heading-has-content': 'warn',
      'vue-a11y/iframe-has-title': 'warn',
      'vue-a11y/label-has-for': 'warn',
      'vue-a11y/mouse-events-have-key-events': 'warn',
      'vue-a11y/no-static-element-interactions': 'warn',
      'vue/custom-event-name-casing': 'warn',
      'vue/eqeqeq': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/prop-name-casing': 'warn',
    }
  },
  // Overrides: Test files (MUST be last to take precedence)
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/tests/**/*.ts',
      '**/test/**/*.ts',
      'tests/**/*.ts',
      'tests/*.ts',
    ],
    rules: {
      'node/prefer-global/process': 'off',
      'no-restricted-globals': 'off',
      'ts/no-unused-vars': 'warn'
    }
  }
)
