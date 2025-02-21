<template>
  <div>
    <!-- hero -->
    <s-hero
            headline="SERP Media"
            subheadline="Media, Movies & More."
            :show-search-bar="false"
            :show-buttons="false" />

    <main>
      <!-- rows: companies -->
      <div class="space-y-4">
        <post-card
                   v-for="post in data.posts"
                   :key="post.id"
                   :post="post"
                   :base-slug="`${post.module}/`"
                   article-class="py-2" />
      </div>

      <!-- pagination -->
      <s-pagination
                    v-model:page="page"
                    :total="data?.pagination?.totalItems"
                    :items-per-page="limit"
                    :sibling-count="3" />

      <!-- link hub -->
      <!-- <s-link-hub
                  v-if="categories && categories.length"
                  :categories="categories"
                  headline="Categories"
                  base-slug="reviews/best"
                  class="mt-20" /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);
// const categories = await useCompanyCategories();

let data = await usePosts(page.value, limit.value);
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
  data = await usePosts(page.value, limit.value);
  router.push({ query });
});

useSeoMeta({
  title: 'Home'
});
</script>
