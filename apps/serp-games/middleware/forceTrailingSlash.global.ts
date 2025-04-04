// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path !== '/' &&
    !to.path.endsWith('/') &&
    !to.path.endsWith('.xml') &&
    !to.path.endsWith('.txt')
  ) {
    const { path, query, hash } = to;
    const nextPath = path + '/';
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
