import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/test-utils/module`
     */
    ["testUtils"]: typeof import("@nuxt/test-utils/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     */
    ["ui"]: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/html-validator`
     */
    ["htmlValidator"]: typeof import("@nuxtjs/html-validator").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     */
    ["eslint"]: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-multi-cache`
     */
    ["multiCache"]: typeof import("nuxt-multi-cache").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-security`
     */
    ["security"]: typeof import("nuxt-security").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     */
    ["scripts"]: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/test-utils/module`
     */
    ["testUtils"]?: typeof import("@nuxt/test-utils/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     */
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/html-validator`
     */
    ["htmlValidator"]?: typeof import("@nuxtjs/html-validator").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     */
    ["eslint"]?: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-multi-cache`
     */
    ["multiCache"]?: typeof import("nuxt-multi-cache").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-security`
     */
    ["security"]?: typeof import("nuxt-security").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     */
    ["scripts"]?: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/test-utils/module", Exclude<NuxtConfig["testUtils"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@nuxtjs/html-validator", Exclude<NuxtConfig["htmlValidator"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/eslint", Exclude<NuxtConfig["eslint"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["nuxt-multi-cache", Exclude<NuxtConfig["multiCache"], boolean>] | ["nuxt-security", Exclude<NuxtConfig["security"], boolean>] | ["@nuxt/scripts", Exclude<NuxtConfig["scripts"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/test-utils/module`
     * @see https://www.npmjs.com/package/@nuxt/test-utils/module
     */
    ["testUtils"]: typeof import("@nuxt/test-utils/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     * @see https://ui3.nuxt.dev/getting-started/installation/nuxt
     */
    ["ui"]: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/html-validator`
     * @see https://www.npmjs.com/package/@nuxtjs/html-validator
     */
    ["htmlValidator"]: typeof import("@nuxtjs/html-validator").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     * @see https://www.npmjs.com/package/@nuxt/eslint
     */
    ["eslint"]: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module
     */
    ["site"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-multi-cache`
     * @see https://www.npmjs.com/package/nuxt-multi-cache
     */
    ["multiCache"]: typeof import("nuxt-multi-cache").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-security`
     * @see https://www.npmjs.com/package/nuxt-security
     */
    ["security"]: typeof import("nuxt-security").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     * @see https://www.npmjs.com/package/@nuxt/scripts
     */
    ["scripts"]: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/test-utils/module`
     * @see https://www.npmjs.com/package/@nuxt/test-utils/module
     */
    ["testUtils"]?: typeof import("@nuxt/test-utils/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     * @see https://ui3.nuxt.dev/getting-started/installation/nuxt
     */
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/html-validator`
     * @see https://www.npmjs.com/package/@nuxtjs/html-validator
     */
    ["htmlValidator"]?: typeof import("@nuxtjs/html-validator").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/image`
     * @see https://www.npmjs.com/package/@nuxt/image
     */
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     * @see https://www.npmjs.com/package/@nuxt/eslint
     */
    ["eslint"]?: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module
     */
    ["site"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]?: typeof import("/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-multi-cache`
     * @see https://www.npmjs.com/package/nuxt-multi-cache
     */
    ["multiCache"]?: typeof import("nuxt-multi-cache").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-security`
     * @see https://www.npmjs.com/package/nuxt-security
     */
    ["security"]?: typeof import("nuxt-security").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/scripts`
     * @see https://www.npmjs.com/package/@nuxt/scripts
     */
    ["scripts"]?: typeof import("@nuxt/scripts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/test-utils/module", Exclude<NuxtConfig["testUtils"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@nuxtjs/html-validator", Exclude<NuxtConfig["htmlValidator"], boolean>] | ["@nuxt/image", Exclude<NuxtConfig["image"], boolean>] | ["@nuxt/eslint", Exclude<NuxtConfig["eslint"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-site-config@2.2.21_vite@6.1.0_vue@3.5.13/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+robots@4.1.11_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.15.0_vite@6.1.0_vue@3.5.13/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-og-image@3.1.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-schema-org@3.5.0_unhead@1.11.18_vite@6.1.0_vue@3.5.13/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_vite@6.1.0_vue@3.5.13/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/Users/devin/repos/projects/serp-monorepo/node_modules/.pnpm/nuxt-link-checker@3.2.0_vite@6.1.0_vue@3.5.13/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["nuxt-multi-cache", Exclude<NuxtConfig["multiCache"], boolean>] | ["nuxt-security", Exclude<NuxtConfig["security"], boolean>] | ["@nuxt/scripts", Exclude<NuxtConfig["scripts"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },

   sitemap: {
      isI18nMapped: boolean,

      sitemapName: string,

      isMultiSitemap: boolean,

      excludeAppSources: Array<any>,

      cacheMaxAgeSeconds: number,

      autoLastmod: boolean,

      defaultSitemapsChunkSize: number,

      minify: boolean,

      sortEntries: boolean,

      debug: boolean,

      discoverImages: boolean,

      discoverVideos: boolean,

      sitemapsPathPrefix: string,

      isNuxtContentDocumentDriven: boolean,

      xsl: string,

      xslTips: boolean,

      xslColumns: Array<{

      }>,

      credits: boolean,

      version: string,

      sitemaps: {
         index: {
            sitemapName: string,

            _route: string,

            sitemaps: Array<any>,

            include: Array<any>,

            exclude: Array<any>,
         },

         modules: {
            include: Array<any>,

            exclude: Array<string>,

            includeAppSources: boolean,

            sitemapName: string,

            _route: string,

            _hasSourceChunk: boolean,
         },

         posts: {
            include: Array<any>,

            exclude: Array<string>,

            sitemapName: string,

            _route: string,

            _hasSourceChunk: number,
         },

         "post-categories": {
            include: Array<any>,

            exclude: Array<string>,

            sitemapName: string,

            _route: string,

            _hasSourceChunk: number,
         },
      },
   },

   multiCache: {
      debug: boolean,

      rootDir: string,

      cdn: {
         enabled: boolean,

         cacheControlHeader: string,

         cacheTagHeader: string,
      },

      component: boolean,

      data: boolean,

      route: boolean,

      api: {
         enabled: boolean,

         prefix: string,

         cacheTagInvalidationDelay: number,

         authorizationToken: string,

         authorizationDisabled: boolean,
      },
   },

   private: {
      basicAuth: boolean,
   },

   security: {
      strict: boolean,

      headers: {
         crossOriginResourcePolicy: string,

         crossOriginOpenerPolicy: string,

         crossOriginEmbedderPolicy: string,

         contentSecurityPolicy: {
            "base-uri": Array<string>,

            "font-src": Array<string>,

            "form-action": Array<string>,

            "frame-ancestors": Array<string>,

            "img-src": Array<string>,

            "object-src": Array<string>,

            "script-src-attr": Array<string>,

            "style-src": Array<string>,

            "script-src": Array<string>,

            "upgrade-insecure-requests": boolean,
         },

         originAgentCluster: string,

         referrerPolicy: string,

         strictTransportSecurity: {
            maxAge: number,

            includeSubdomains: boolean,
         },

         xContentTypeOptions: string,

         xDNSPrefetchControl: string,

         xDownloadOptions: string,

         xFrameOptions: string,

         xPermittedCrossDomainPolicies: string,

         xXSSProtection: string,

         permissionsPolicy: {
            camera: Array<any>,

            "display-capture": Array<any>,

            fullscreen: Array<any>,

            geolocation: Array<any>,

            microphone: Array<any>,
         },
      },

      requestSizeLimiter: {
         maxRequestSizeInBytes: number,

         maxUploadFileRequestInBytes: number,

         throwError: boolean,
      },

      rateLimiter: {
         tokensPerInterval: number,

         interval: number,

         headers: boolean,

         driver: {
            name: string,
         },

         throwError: boolean,
      },

      xssValidator: {
         methods: Array<string>,

         throwError: boolean,
      },

      corsHandler: {
         origin: string,

         methods: Array<string>,

         preflight: {
            statusCode: number,
         },
      },

      allowedMethodsRestricter: {
         methods: string,

         throwError: boolean,
      },

      hidePoweredBy: boolean,

      enabled: boolean,

      csrf: boolean,

      nonce: boolean,

      removeLoggers: boolean,

      ssg: {
         meta: boolean,

         hashScripts: boolean,

         hashStyles: boolean,

         nitroHeaders: boolean,

         exportToPresets: boolean,
      },

      sri: boolean,
   },

   "nuxt-scripts": {
      version: string,
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,
   },

   "nuxt-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-simple-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },
  }
  interface PublicRuntimeConfig {
   siteName: string,

   domain: string,

   siteUrl: string,

   apiUrl: string,

   environment: string,

   socialLinks: Array<{

   }>,

   brandLinks: Array<{

   }>,

   headerNavItems: Array<{

   }>,

   footerColumns: Array<{

   }>,

   legalLinks: Array<{

   }>,

   copyrightText: string,

   address: string,

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         id: string,
      },

      identity: string,

      version: string,
   },

   "nuxt-seo": {
      canonicalQueryWhitelist: Array<string>,
   },

   "nuxt-scripts": {
      version: any,

      defaultScriptOptions: {
         trigger: string,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }