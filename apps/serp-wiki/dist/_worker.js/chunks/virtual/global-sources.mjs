const e = [
  {
    context: {
      name: 'sitemap:urls',
      description: 'Set with the `sitemap.urls` config.'
    },
    urls: [],
    sourceType: 'user'
  },
  {
    context: {
      name: 'nuxt:pages',
      description: 'Generated from your static page files.',
      tips: ["Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."]
    },
    urls: [
      { loc: '/' },
      { loc: '/legal/affiliate-disclosure' },
      { loc: '/legal/dmca' },
      { loc: '/legal' },
      { loc: '/legal/privacy-policy' },
      { loc: '/legal/terms-conditions' },
      { loc: '/posts/category' },
      { loc: '/posts' }
    ],
    sourceType: 'app'
  }
];
export { e as sources };
//# sourceMappingURL=global-sources.mjs.map
