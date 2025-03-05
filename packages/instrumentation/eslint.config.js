import withNuxt from './.playground/.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/no-setup-props-destructure': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  },
  ignores: ['**/.playground/**', '**/.nuxt']
});
