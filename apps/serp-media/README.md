# README

Define your SFooter.vue links using this object

```ts
// nuxt.config.ts
footerColumns: [
        {
          title: 'Links',
          id: 1,
          slug: '',
          items: [
            { text: 'Companies', slug: '/reviews/' },
            { text: 'Tools', slug: '/tools/' },
            { text: 'Blog', slug: '/blog/' },
            { text: 'Glossary', slug: '/glossary/' },
            { text: 'Archive', slug: '/archive/' }
          ]
        },
        {
          title: '',
          id: 2,
          slug: '',
          items: [{ text: '', slug: '#' }]
        },
        {
          title: '',
          id: 3,
          slug: '#',
          items: [{ text: '', slug: '#' }]
        },
        {
          title: '',
          id: 4,
          slug: '#',
          items: [
            { text: '', slug: '#' },
            { text: '', slug: '#' }
          ]
        },
        {
          title: '',
          id: 5,
          slug: '#',
          items: [{ text: '', slug: '#' }]
        }
      ],
      legalLinks: [
        { text: 'Privacy', slug: '/legal/privacy-policy/' },
        { text: 'Terms', slug: '/legal/terms-conditions/' },
        { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
        { text: 'DMCA', slug: '/legal/dmca/' }
      ],
      copyrightText: '© SERP',
      address: '123 Rank St. Page One City, 90210 USA'
    }
```
