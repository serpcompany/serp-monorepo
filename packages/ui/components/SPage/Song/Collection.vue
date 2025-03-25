<template>
  <div class="container py-20">
    <h1 class="py-10">Songs</h1>
    <SongsLinkHub :songs="data?.songs" />
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

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

// Initialize page and limit from URL or default values
const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);

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
    if (newLimit !== 50) {
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
    `${runtimeConfig.public.apiUrl}/songs?page=${page.value}&limit=${limit.value}`
);

useSeoMeta({
  title: 'Songs',
  description:
    'A collection of songs & lyrics from every song in our database... And we have a really big D(atabase).'
});
</script>
