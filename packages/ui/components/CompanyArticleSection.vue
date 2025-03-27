<script setup lang="ts">
  defineProps<{
    article: string;
  }>();
</script>

<template>
  <article v-if="article" role="article" aria-labelledby="article-title">
    <div role="document" v-html="article"></div>
  </article>
</template>
