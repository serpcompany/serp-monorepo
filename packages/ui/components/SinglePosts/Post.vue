<template>
  <div>
    <UpvoteButton :id="data.slug" module="posts" :upvotes="data.upvotes" />
    <CommentsContainer :id="data.slug" module="posts" :comments="data.comments || []" />
    <section class="mb-8">
      <section-hero-one :title="data.title" />
      <s-pill base-slug="posts/category" :items="data.categories" />
    </section>
    <div class="items-end justify-between lg:flex">
      <div v-if="data?.author">Author: {{ data.author }}</div>
      <div v-if="data?.createdAt">Published: {{ data.createdAt }}</div>
    </div>
    <u-separator class="my-4">
      <s-logo />
    </u-separator>
    <article class="prose dark:prose-invert" v-html="data.content"></article>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@serp/types/types';

defineProps<{
  data: Post;
}>();
</script>
