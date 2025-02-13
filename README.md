# Turborepo VueJS/NuxtJS starter


## Apps and Packages

- `docs`: a [Nuxt](https://nuxt.com/) app
- `web`: another [Vue3](https://vuejs.org/) app
- `ui`: a stub Vue component library shared by both `web` and `docs` applications
- [ ] `eslint-config-custom`: `eslint` configurations (includes `@nuxtjs/eslint-config-typescript` and `@vue/eslint-config-typescript`)
- [ ] `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Remote Caching

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel.
```
npx turbo login
```

This will authenticate the Turborepo CLI with your Vercel account

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```