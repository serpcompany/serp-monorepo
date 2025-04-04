<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 100);

  watch(
    [page, limit],
    ([newPage, newLimit]) => {
      // Update URL when page or limit changes
      const query = { ...route.query };
      if (newPage !== 1) {
        query.page = newPage;
      } else {
        delete query.page;
      }
      if (newLimit !== 100) {
        query.limit = newLimit;
      } else {
        delete query.limit;
      }
      router.push({ query });
    },
    { immediate: true }
  );

  const { data } = await useFetch(
    () =>
      `${runtimeConfig.public.apiUrl}/artists?page=${page.value}&limit=${limit.value}`,
    {
      lazy: true
    }
  );

  useSeoMeta({
    title: 'Artists',
    description:
      'A collection of musicians, bands, singers, songwriters, producers & more from every artist in our database... And we have a really big D(atabase).'
  });
</script>

<template>
  <div class="container py-20">
    <h1 class="py-10">Artists</h1>
    <ArtistsLinkHub :artists="data?.artists" />
    <div class="my-20 flex w-full justify-center">
      <UPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
      />
    </div>
  </div>
</template>
