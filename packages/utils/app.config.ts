export default defineAppConfig({
  myLayer: {
    name: '@serp/utils'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
