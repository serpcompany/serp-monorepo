<template>
  <div>
    <!-- hero -->
    <SHero
      headline="Movie Stop"
      subheadline="Movies, TV Shows, and more."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <!-- rows: posts -->
      <div class="mb-16">
        <nuxt-link to="/posts">
          <h2 class="pb-16 text-3xl">Posts</h2>
        </nuxt-link>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PostCard
            v-for="post in postsData.posts"
            :key="post.id"
            :post="post"
            base-slug="posts/"
            article-class="py-2"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);

const postsData = await usePosts(page.value, limit.value);
if (!postsData) {
  router.push('/404');
}

useSeoMeta({
  title: 'Home'
});
</script>
