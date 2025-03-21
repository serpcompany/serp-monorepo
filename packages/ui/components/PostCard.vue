<template>
  <article :class="articleClass">
    <nuxt-link :to="`/${baseSlug}${post.slug}/`">
      <lazy-nuxt-img
        v-if="post.featuredImage"
        :src="post.featuredImage"
        :alt="displayTitle"
        class="mb-6 h-64 w-full object-cover"
      />
      <!-- Title -->
      <h2 class="mb-2 text-xl font-medium hover:underline">
        {{ displayTitle }}
      </h2>
    </nuxt-link>

    <p v-if="post.author" class="mb-2 italic">
      <span>By {{ post.author }}</span
      ><span v-if="post.createdAt"> | {{ post.createdAt }}</span>
    </p>
    <p v-if="post.excerpt" class="mb-8">{{ post.excerpt }}</p>

    <s-pill
      v-if="post.categories && post.categories.length"
      :base-slug="`${baseSlug}category`"
      :items="post.categories"
    />
  </article>
</template>

<script setup lang="ts">
import type { PostIndex } from '@serp/types/types';

const props = withDefaults(
  defineProps<{
    post: PostIndex;
    baseSlug?: string;
    articleClass?: string;
    title?: string;
  }>(),
  {
    baseSlug: 'posts/',
    articleClass: 'py-16',
    title: undefined
  }
);

const displayTitle = computed(() => {
  if (props.post.module === 'Glossary') {
    return props.post.keyword || props.post.title;
  }
  if (props.title) {
    return props.title;
  }
  return props.post.title;
});
</script>
