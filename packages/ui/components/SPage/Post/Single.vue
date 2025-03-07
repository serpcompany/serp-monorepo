<template>
  <div>
    <main>
      <SinglePostsGlossaryPost v-if="data.module === 'Glossary'" :data="data" />
      <SinglePostsPost v-else :data="data" />
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ module?: string }>();

const computedModule = computed(() => props.module);

const route = useRoute();
const slug = route.params.slug as string;
const router = useRouter();
const data = await usePost(slug, computedModule.value);
if (!data) {
  router.push('/404');
}

useSeoMeta({
  title: () => data.title
});
</script>
