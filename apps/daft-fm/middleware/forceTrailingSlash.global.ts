export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/' && !to.path.endsWith('/') && !to.path.endsWith('.xml')) {
    const { path, query, hash } = to;
    const nextPath = path + '/';
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
