<script setup lang="ts">
  import type { Post } from '@serp/types/types';

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  const props = defineProps<{
    data: Post;
  }>();

  const isValidAuthor =
    props.data.author !== undefined &&
    props.data.author !== null &&
    props.data.author !== 'None';
</script>

<template>
  <div>
    <section class="mb-8">
      <SectionHeroOne :title="data.title" />
      <SPill base-slug="posts/category" :items="data.categories || []" />
    </section>
    <div class="items-end justify-between lg:flex">
      <div v-if="isValidAuthor">Author: {{ data.author }}</div>
      <div v-if="data?.createdAt">Published: {{ data.createdAt }}</div>
    </div>
    <USeparator class="my-4">
      <SLogo />
    </USeparator>
    <article class="prose dark:prose-invert" v-html="data.content"></article>

    <!-- Comments Section -->
    <div v-if="useAuth" class="mt-10">
      <h2 class="mb-4 text-2xl font-bold">Comments</h2>
      <CommentsContainer
        :id="data.slug"
        module="posts"
        :comments="data.comments || []"
        class="comments-github-style"
      />
    </div>
  </div>
</template>

<style>
  .comments-github-style {
    border-radius: 6px;
    margin-top: 16px;
  }
</style>
