import redirects from '@/redirects.json';

// eslint-disable-next-line no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const { path, query, hash } = to;

  const pathWithNoTrailingSlash = path.replace(/\/$/, '');
  const redirectTarget = redirects[pathWithNoTrailingSlash];
  if (redirectTarget) {
    const nextRoute = { path: redirectTarget, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
