export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
