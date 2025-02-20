<template>
  <div>
    <main>
      <SinglePostsGlossaryPost v-if="data.module === 'Glossary'" :data="data" />
      <SinglePostsPost v-else :data="data" />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const router = useRouter();
const data = await usePost(slug);
if (!data) {
  router.push('/404');
}

useSeoMeta({
  title: () => data.title
});
</script>
