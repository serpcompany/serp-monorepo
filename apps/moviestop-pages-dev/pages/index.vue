<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();

  const page = ref(Number(route.query.page) || 1);
  const limit = ref(Number(route.query.limit) || 100);

  let postsData = await usePosts(page.value, limit.value);
  if (!postsData) {
    router.push('/404');
  }

  watch([page, limit], async ([newPage, newLimit]) => {
    const query = { ...route.query };
    if (newPage !== 1) {
      query.page = String(newPage);
    } else {
      delete query.page;
    }
    if (newLimit !== 100) {
      query.limit = String(newLimit);
    } else {
      delete query.limit;
    }
    postsData = await usePosts(page.value, limit.value, '');
    router.push({ query });
  });

  useSeoMeta({
    title: 'Home'
  });
</script>

<template>
  <UPage>
    <!-- hero -->
    <SHero
      headline="The Movie Stop"
      subheadline="Movies, TV Shows, and more."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <!-- rows: posts -->
      <div class="mb-16">
        <NuxtLink to="/posts">
          <h2 class="pb-16 text-3xl">Movies</h2>
        </NuxtLink>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PostCard
            v-for="post in postsData.posts"
            :key="post.id"
            :post="post"
            :title="post.keyword || post.title"
            base-slug="posts/"
            article-class="py-2"
          />
        </div>
      </div>
      <SPagination
        v-model:page="page"
        :total-items="postsData?.pagination?.totalItems"
        :limit="limit"
        :sibling-count="3"
      />
    </UMain>
  </UPage>
</template>
