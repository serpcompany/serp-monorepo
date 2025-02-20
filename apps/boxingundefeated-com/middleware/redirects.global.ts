import redirects from '@/redirects.json';

export default defineNuxtRouteMiddleware((to, from) => {
  const { path, query, hash } = to;
  console.log('Path:', path); // <-- Log requested path

  const pathWithNoTrailingSlash = path.replace(/\/$/, '');
  const redirectTarget = redirects[pathWithNoTrailingSlash];
  if (redirectTarget) {
    console.log('Redirecting:', path, '→', redirectTarget);
    const nextRoute = { path: redirectTarget, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
