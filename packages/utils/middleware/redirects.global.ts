export default defineNuxtRouteMiddleware((to, _from) => {
  // Check if redirects are available via the app config or runtime config
  const appConfig = useAppConfig()
  const redirects = appConfig.redirects || {}

  // If no redirects available, skip processing
  if (!redirects || Object.keys(redirects).length === 0) {
    return
  }

  const { path, query, hash } = to
  const pathWithNoTrailingSlash = path.replace(/\/$/, '')
  const redirectTarget = redirects[pathWithNoTrailingSlash]

  if (redirectTarget) {
    const nextRoute = { path: redirectTarget, query, hash }
    return navigateTo(nextRoute, { redirectCode: 301 })
  }
})
