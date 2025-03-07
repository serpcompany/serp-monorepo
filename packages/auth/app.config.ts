export default defineAppConfig({
  myLayer: {
    name: '@serp/auth'
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
