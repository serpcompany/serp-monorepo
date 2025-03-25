<template>
  <div>
    <NuxtLink
      :to="`/posts/${term.slug}/`"
      class="group hover:border-primary relative flex flex-col border-2 px-4 pt-4 pb-8"
    >
      <h2 class="text-sm font-medium">{{ term.keyword || term.title }}</h2>
      <p class="mt-4 text-sm">{{ term.oneLiner }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { PostIndex } from '@serp/types/types';

defineProps<{
  term: PostIndex;
}>();
</script>
