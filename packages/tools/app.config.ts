export default defineAppConfig({
  myLayer: {
    name: '@serp/tools'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
