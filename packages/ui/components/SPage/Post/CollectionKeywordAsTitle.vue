<template>
  <div>
    <SectionHeroOne :title="props.moduleTitle || 'Posts'" />

    <div class="pb-20">
      <!-- rows:  posts -->
      <div
        :class="
          props.useGrid
            ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
            : 'space-y-4'
        "
      >
        <PostCard
          v-for="post in data.posts"
          :key="post.id"
          :post="post"
          :base-slug="props.baseSlug"
          :title="post.keyword"
        />
      </div>

      <SPagination
        v-model:page="page"
        :total="data?.pagination?.totalItems"
        :items-per-page="limit"
        :sibling-count="3"
      />

      <SLinkHub
        v-if="!props.noCategories && categories && categories.length"
        :categories="categories"
        headline="Categories"
        class="mt-20"
        base-slug="posts/category"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  module?: string;
  moduleTitle?: string;
  baseSlug?: string;
  seoTitle?: string;
  useGrid?: boolean;
  noCategories?: boolean;
  useCategories?: boolean;
}>();

const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);

const computedUseCategories = computed(() => props.useCategories);
const computedModule = computed(() => props.module);
const computedSeoTitle = computed(() => props.seoTitle);

const categories = computedUseCategories.value
  ? await usePostCategories()
  : null;

let data = await usePosts(page.value, limit.value, '', computedModule.value);
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
  data = await usePosts(page.value, limit.value, '', computedModule.value);
  router.push({ query });
});

useSeoMeta({
  title: () => computedSeoTitle.value || 'Posts'
});
</script>
