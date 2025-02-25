<template>
  <div>
    <main>
      <SinglePostsPost :data="data" />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const router = useRouter();
const module = 'movies';

const data = await usePost(slug, module);
if (!data) {
  router.push('/404');
}

useSeoMeta({
  title: () => data.title
});
</script>
