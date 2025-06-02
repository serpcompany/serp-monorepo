# README

## Turbo

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel.

```sh
pnpx turbo login
```

This will authenticate the Turborepo CLI with your Vercel account

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Cloudflare Pages Development

1. Build the project with `pnpm build`
2. Preview locally with `pnpm dlx wrangler pages dev dist`

```sh
# run dev
pnpm dev
```

## Nuxt Hub

```bash
# deploy to nuxt hub
cd apps/serp-wiki && pnpx nuxthub deploy
```

# ESLint

## How to use

You can add "global/default" eslint settings to this packages `eslint.config.mjs` file. or you can add app/package specific settings to their respestive `eslint.config.mjs` files.

> Note: If running a command at top level (ie through turbo) make sure you run turbo with no cache to test it using the ``--force` clag on the command, like `pnpm lint --force`

## ESLint Rules (INLINE)

```ts
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

// @ts-expect-error: Auto-imported from another layer
```

```vue
<!-- eslint-disable-next-line vue/no-v-html -->

<!-- eslint-disable-next-line no-console -->
```

### Eslint Rules (FILE)

```ts
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-console */
```
# CI Test Trigger
