export default defineAppConfig({
  myLayer: {
    name: '@serp/instrumentation'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
