export default defineAppConfig({
  myLayer: {
    name: '@serp/utils-cloudflare-pages'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
