export default defineNuxtRouteMiddleware((to, _from) => {
  const { path, query, hash } = to

  // Pattern matching for URLs like /products/[slug]/
  const productPathRegex = /^\/products\/([^/]+)\/?$/

  if (productPathRegex.test(path)) {
    // Extract the slug from the path
    const slug = path.match(productPathRegex)?.[1]

    if (slug) {
      // Construct the redirect URL: /products/[slug]/reviews/
      const redirectPath = `/products/${slug}/reviews/`

      // Preserve query parameters and hash
      return navigateTo(
        {
          path: redirectPath,
          query,
          hash,
        },
        { redirectCode: 301 },
      )
    }
  }
})
