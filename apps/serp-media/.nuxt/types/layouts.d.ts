import type { ComputedRef, MaybeRef } from 'vue';
export type LayoutKey = 'default';
declare module '../../../../node_modules/.pnpm/nuxt@3.15.4_drizzle-orm@0.36.4_eslint@9.20.1_typescript@5.7.3_vite@6.1.0/node_modules/nuxt/dist/pages/runtime/composables' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>;
  }
}
