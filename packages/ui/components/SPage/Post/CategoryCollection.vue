<template>
  <div>
    <SHero
      :headline="
        `
    Category: ${data.categoryName}` ||
        'If this is showing call 911, because something is very wrong.'
      "
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main class="pb-20">
      <!-- rows: posts -->
      <div class="space-y-4">
        <post-card v-for="post in data.posts" :key="post.id" :post="post" />
      </div>

      <u-pagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
        aria-label="pagination"
        class="mt-20 flex justify-center overflow-x-auto"
      />

      <s-link-hub
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="posts/category"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);
const categories = await usePostCategories();
const slug = route.params.slug as string;

let data = await usePosts(page.value, limit.value, slug);
if (!data) {
  router.push('/404');
}

watch([page, limit], async ([newPage, newLimit]) => {
  const query = { ...route.query };
  if (newPage !== 1) {
    query.page = String(newPage);
  } else {
    delete query.page;
  }
  if (newLimit !== 50) {
    query.limit = String(newLimit);
  } else {
    delete query.limit;
  }
  data = await usePosts(page.value, limit.value, slug);
  router.push({ query });
});

useSeoMeta({
  title: () => `${data.categoryName} Posts`
});
</script>
