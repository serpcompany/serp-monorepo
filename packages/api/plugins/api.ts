export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiUrl;

  const api = $fetch.create({
    baseURL,
    headers: useRequestHeaders(['cookie'])
  });

  return {
    provide: {
      api
    }
  };
});
