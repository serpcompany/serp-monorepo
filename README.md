# README

## URL Patterns

EXPLAINER:

for each site... 

everytime you add a new module you would create a new page under:
- `pages/<module-name>/index.vue`
- `pages/<module-name>/best/[slug]/index.vue` 
- `pages/<module-name>/category/[slug/index.vue` 

that would simply hit that site's api endpoint to get the right data from the DB and the UI would render from the shared `packages/ui` package for the layout...and the SINGLE page for everything would just always go under /posts/ ---- exactly like we have setup for the `glossary` and `blog` on serp.co

ALL singles for everything could now go under /posts/[slug]/
- glossary == /posts/[slug]/
- software == /posts/[slug]/



### EXAMPLES:
```
- companies: serp.co/posts/SERP/
  pages/posts/<single>/
  
  pages/software/index.vue
  pages/software/best/index.vue

- service-providers: serp.co/posts/SERP/reviews
  pages/posts/<single>/reviews
  pages/providers/best/

- local businesses: serp.co/posts/dr-johns-dentistry-la-canada/
- ski resorts: serp.co/posts/big-sky-montana/
- games: serp.co/posts/counterstrike/
- movies: serp.co/posts/avengers-endgame/
- books: serp.co/posts/the-hobbit/
- shop: serp.co/posts/sony-playstation-4/
````

## Config

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


## Turbo

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel.
```
npx turbo login
```

This will authenticate the Turborepo CLI with your Vercel account

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```


## Cloudflare Pages Development

1. Build the project with `pnpm build`
2. Preview locally with `pnpm dlx wrangler pages dev dist` 

```
# run dev
pnpm dev
```
