<template>
  <div>
    <UpvoteButton
                  v-if="useAuth"
                  :id="data.slug"
                  module="posts"
                  :upvotes="data.upvotes" />
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

    <!-- Comments Section -->
    <div class="mt-10">
      <h2 class="mb-4 text-2xl font-bold">Comments</h2>
      <CommentsContainer
                         v-if="useAuth"
                         :id="data.slug"
                         module="posts"
                         :comments="data.comments || []"
                         class="comments-github-style" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@serp/types/types';

const config = useRuntimeConfig();
const useAuth = config.public.useAuth;

defineProps<{
  data: Post;
}>();
</script>

<style>
.comments-github-style {
  border-radius: 6px;
  margin-top: 16px;
}
</style>
