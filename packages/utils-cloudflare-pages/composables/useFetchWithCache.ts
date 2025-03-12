export default async <T>(url: string) => {
  const runtimeConfig = useRuntimeConfig();
  const fetchUrl = `${runtimeConfig.public.apiUrl}${url}`;
  const { data, error } = await useFetch<T>(fetchUrl, {
    headers: useRequestHeaders(['cookie'])
  });

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    });
  }

  return data.value as T;
};
