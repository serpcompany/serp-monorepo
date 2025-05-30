<script setup lang="ts">
  defineProps<{
    article: string;
  }>();
</script>

<template>
  <UPageSection title="Buying Advice" class="bg-(--ui-bg)">
    <article v-if="article">
      <!-- eslint-disable vue/no-v-html -->
      <div
        role="document"
        class="prose dark:prose-invert mx-auto max-w-full"
        v-html="article"
      ></div>
    </article>
  </UPageSection>
</template>
