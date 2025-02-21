export default defineAppConfig({
  myLayer: {
    name: '@serp/types'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string
    }
  }
}
