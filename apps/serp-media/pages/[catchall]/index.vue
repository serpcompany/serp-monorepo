<template>
  <div>
    <section-hero-one :title="moduleTitle" />

    <div class="pb-20">
      <!-- rows:  posts -->
      <div class="space-y-4">
        <post-card v-for="post in data.posts" :key="post.id" :post="post" :base-slug="`${module}/`" article-class="py-2" />
      </div>

      <s-pagination
                    v-model:page="page"
                    :total="data?.pagination?.totalItems"
                    :items-per-page="limit"
                    :sibling-count="3" />

      <!-- <s-link-hub
        v-if="categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="posts/category"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);
// const categories = await usePostCategories();
const module = route.params.catchall as string;
const moduleTitle = computed(() => module.charAt(0).toUpperCase() + module.slice(1));
// split the title on ` Movies` and only grab/use the first part (which is the actor name)
let data = await usePosts(page.value, limit.value, '', module);
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
  data = await usePosts(page.value, limit.value, '', module);
  router.push({ query });
});

useSeoMeta({
  title: 'Posts'
});
</script>
