<template>
  <div>
    <!-- hero -->
    <s-hero
      headline="SERP Media"
      subheadline="Media, Movies & More."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <!-- rows: movies -->
      <div class="mb-16">
        <nuxt-link to="/movies">
          <h2 class="pb-16 text-3xl">Movies</h2>
        </nuxt-link>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <post-card
            v-for="post in movieData.posts"
            :key="post.id"
            :post="post"
            :base-slug="`${post.module}/`"
            article-class="py-2"
          />
        </div>
      </div>

      <!-- rows: shop -->
      <div class="mb-16">
        <nuxt-link to="/shop">
          <h2 class="pb-16 text-3xl">Shop</h2>
        </nuxt-link>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <post-card
            v-for="post in shopData.posts"
            :key="post.id"
            :post="post"
            :base-slug="`${post.module}/best/`"
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
// const categories = await useCompanyCategories();

const shopData = await usePosts(page.value, limit.value, '', 'shop');
if (!shopData) {
  router.push('/404');
}

const movieData = await usePosts(page.value, limit.value, '', 'movies');
if (!movieData) {
  router.push('/404');
}

useSeoMeta({
  title: 'Home'
});
</script>
